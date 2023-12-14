import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

interface User {
    id: number;
    name: string;
    email: string;
    firstName: string;
    lastName:string
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

// Async thunk for fetching user data
export const fetchUser = createAsyncThunk(
    'user/fetchUser',
    async () => {
        try {
            const response = await axios.get(`http://127.0.0.1:8000/api/user`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            return response.data.data;
        }
        catch (err: any) {
            console.log(err.response.data);
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