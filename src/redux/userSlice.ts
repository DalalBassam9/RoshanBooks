import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

interface User {
    id: number;
    name: string;
    email: string;
    firstName: string;
    lastName: string;
    token:any;
}

interface UserState {
    token:any;
    user: User | null;
    loading: boolean;
    error?: string | null;
}
const ls = typeof window !== "undefined" ? window.localStorage : null;

const getToken = () => {
    const token = ls?.getItem('token');
    if (!token) {
        return [];
    }
    try {
        return JSON.parse(token);
    } catch (error) {
        console.error("Error parsing token from localStorage", error);
        return [];
    }
};

const initialState: UserState = {
    user: null,
    loading: false,
    error: null,
    token: ls?.getItem('token') ? ls?.getItem('token')  : null
};

export const loginUser = createAsyncThunk(

    'user/loginUser',
    async (formData: any, { rejectWithValue }) => {
        try {
            const response = await axios.post(process.env.NEXT_PUBLIC_API_URL + `/api/login`, formData);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);
export const fetchUser = createAsyncThunk(
    'user/fetchUser',
    async () => {
        try {
            const token = ls?.getItem('token');
            const response = await axios.get(process.env.NEXT_PUBLIC_API_URL + `/api/user`, {
                headers: {
                        'Authorization': `Bearer ${token}`
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
            const token = ls?.getItem('token');
            const response = await axios.post(process.env.NEXT_PUBLIC_API_URL + `/api/logout`, {}, {
                headers: {
                    'Authorization': `Bearer ${token}`
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
    reducers: {
    },
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
        builder.addCase(loginUser.fulfilled, (state, action) => {
            state.token = action.payload.access_token;
            localStorage.setItem("token", state.token as string);
            // handle the state update when the login is successful
        });

    },
});


export default userSlice.reducer;