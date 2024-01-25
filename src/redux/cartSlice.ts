import { createSlice, createAsyncThunk, PayloadAction, AsyncThunkAction } from '@reduxjs/toolkit'
import axios from 'axios'
import Swal from 'sweetalert2'
import { toast } from 'react-toastify';
export interface CartItem {

  productId: any;
  quantity: any;

}

interface CartState {
  items: CartItem[];
  loading: 'idle' | 'loading' | 'succeeded' | 'failed';
  error?: string;
  cartItemsCount: number;
}

const initialState: CartState = { items: [], cartItemsCount: JSON.parse(localStorage.getItem('cartItemsCount') ?? '0') || 0, 
loading: 'idle' }
export const addToCart = createAsyncThunk('cart/addToCart',
  async (items: CartItem, { rejectWithValue }) => {
    try {
      const response = await axios.post(process.env.NEXT_PUBLIC_API_URL + '/api/cart', items, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      })
      toast.success('Product added to cart!');
      return response.data.data
 
    } catch (error: any) {
      toast.error(`Oops Failed to add product to cart`);
    }
  })

export const getCartItems = createAsyncThunk('cart/getCartItems', async () => {
  const response = await axios.get(process.env.NEXT_PUBLIC_API_URL + '/api/cart', {
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
  });
  return response.data.data;

});


export const updateQuantity = createAsyncThunk(
  'cart/updateQuantity',
  async ({ productId, quantity }: { productId: string; quantity: number }) => {
    const response = await axios.put(process.env.NEXT_PUBLIC_API_URL + `/api/cart`, { productId, quantity }, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    });
    return response.data.data;
  }
);


export const removeFromCart = createAsyncThunk('cart/removeFromCart',
  async (cartId: number, { rejectWithValue }) => {
    try {
      const response = await axios.delete(process.env.NEXT_PUBLIC_API_URL + `/api/cart/${cartId}`,
        {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        }
      )
      return response.data.data;
    } catch (err: any) {
      return rejectWithValue(err.response.data)
    }
  })

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    clearCart: (state) => {
      state.cartItemsCount = 0;
      localStorage.removeItem('cartItemsCount');
    },
  },
  extraReducers: builder => {
    builder.addCase(getCartItems.pending, (state) => {
      state.loading = 'loading';
    })

    builder.addCase(getCartItems.fulfilled, (state, action) => {
      state.loading = 'succeeded';
      state.items = action.payload;
    })

    builder.addCase(getCartItems.rejected, (state, action) => {
      state.loading = 'failed';
      if (action.error && action.error.message) {
        state.error = action.error.message;
      }
    })

    builder.addCase(addToCart.pending, (state) => {
      state.loading = 'loading'
    })

    builder.addCase(addToCart.fulfilled, (state, action: PayloadAction<CartItem>) => {
      state.loading = 'idle'
      state.items.push(action.payload)
      state.cartItemsCount += 1;
      localStorage.setItem('cartItemsCount', JSON.stringify(state.cartItemsCount));
    })

    builder.addCase(addToCart.rejected, (state, action) => {
      state.loading = 'failed';
      if (action.error && action.error.message) {
        state.error = action.error.message;
      }
    })

    builder.addCase(updateQuantity.fulfilled, (state, action: PayloadAction<CartItem>) => {
      const item = state.items.find((item: CartItem) => item.productId === action.payload.productId);
      if (item) {
        item.quantity = action.payload.quantity;
      }
      state.cartItemsCount = state.items.reduce((total, item) => total + item.quantity, 0);
      localStorage.setItem('cartItemsCount', JSON.stringify(state.cartItemsCount));
    })

    builder.addCase(removeFromCart.pending, (state) => {
      state.loading = 'loading'
    })
    builder.addCase(removeFromCart.fulfilled, (state, action: PayloadAction<CartItem>) => {
      state.loading = 'idle'
      const index = state.items.findIndex((item: any) => item.cartId === action.payload);
      state.items.splice(index, 1); 
      state.cartItemsCount -= 1;
      localStorage.setItem('cartItemsCount', JSON.stringify(state.cartItemsCount));
    })
  }
})
export const { clearCart } = cartSlice.actions;
export const cartReducer = cartSlice.reducer;