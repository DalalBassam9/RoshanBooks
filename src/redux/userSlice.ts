import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

interface User {
    id: number;
    name: string;
    email: string;
    firstName: string;
    lastName: string
}

interface UserState {
    user: User | null;
    loading: boolean;
    error?: string | null;
}

const initialState: UserState = {
    user: null,
    loading: false,
    error: null,
};

export const fetchUser = createAsyncThunk(
    'user/fetchUser',
    async () => {
        try {
            const response = await axios.get(process.env.NEXT_PUBLIC_API_URL + `/api/user`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            const user = response.data.data;
            localStorage.setItem('user', JSON.stringify(user));
            return user;

        }
        catch (err: any) {
            console.log(err.response.data);
        }
    }
);
export const logoutUser = createAsyncThunk(
    'user/logoutUser',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.post(process.env.NEXT_PUBLIC_API_URL + `/api/logout`, {}, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            localStorage.removeItem('token');
            return response.data;
        } catch (err: any) {
            return rejectWithValue(err.response.data);
        }
    }
);
const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(fetchUser.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(logoutUser.fulfilled, (state) => {
            return initialState;
        })
            .addCase(fetchUser.fulfilled, (state, action) => {
                state.user = action.payload;
                state.loading = false;
            })

            .addCase(fetchUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error ? action.error.message : null;
            })

    },
});



export default userSlice.reducer;