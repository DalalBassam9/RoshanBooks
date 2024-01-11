import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
// Add the import statement for the Item interface
export interface Item {
    productId: any;
    name: string;
    description: string;
    price: number;
    image: string;
}

interface WishlistState {
    items: Item[];
    loading: 'idle' | 'pending' | 'succeeded' | 'failed';
}

const initialState: WishlistState = { items: [], loading: 'idle' };

const token = localStorage.getItem('token');

  export const isWishlisted = (state: WishlistState, productId: string) => {
    return state.items.some(item => item.productId === productId);
  };
// Async thunk for getting the wishlist

export const getMyWishlist = createAsyncThunk('wishlist/getMyWishlist', async () => {
    const response = await axios.get(process.env.NEXT_PUBLIC_API_URL + '/api/my/wishlist', {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
    });
    return response.data.data;

});

// Async thunk for adding to wishlist

export const addToWishlist = createAsyncThunk('wishlist/add',
    async ({ productId }: { productId: string }) => {
        try {
            const response = await axios.post(process.env.NEXT_PUBLIC_API_URL + `/api/my/wishlist/`, { productId },
                {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
            return response.data.data;
        } catch (err: any) {

        }
    });

export const removeFromWishlist = createAsyncThunk('wishlist/remove',
    async ({ productId }: { productId: string }) => {
        try {
            const response = await axios.delete(process.env.NEXT_PUBLIC_API_URL + `/api/my/wishlist/${productId}`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            return response.data.data;
        } catch (err: any) {
            return err.response.data;
        }
    });


// Wishlist slice
export const wishlistSlice = createSlice({
    name: 'wishlist',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getMyWishlist.pending, (state) => {
                state.loading = 'pending';
            })
            .addCase(getMyWishlist.fulfilled, (state, action: PayloadAction<Item[]>) => {
                state.items = action.payload;
                state.loading = 'succeeded';
            })
            .addCase(addToWishlist.pending, (state) => {
                state.loading = 'pending';
            })
            .addCase(addToWishlist.fulfilled, (state, action: PayloadAction<Item>) => {
                state.items.push(action.payload);
                state.loading = 'succeeded';
            })
            .addCase(removeFromWishlist.pending, (state) => {
                state.loading = 'pending';
            })
            .addCase(removeFromWishlist.fulfilled, (state, action: PayloadAction<Item>) => {
                const index = state.items.findIndex(item => item.productId === action.payload.productId);
                state.items.splice(index, 1);
                state.loading = 'succeeded';
            });
    }
});

export default wishlistSlice.reducer;

