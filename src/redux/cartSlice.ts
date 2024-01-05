import { createSlice, createAsyncThunk, PayloadAction, AsyncThunkAction } from '@reduxjs/toolkit'
import axios from 'axios'
import Swal from 'sweetalert2'

interface CartItem {
  cartId: number;
  productId: number;
  quantity: number;
  name: string,
  price: number,
}

interface CartState {
  items: CartItem[];
  loading: 'idle' | 'loading' | 'succeeded' | 'failed';
  error?: string;
}

const initialState: CartState = { items: [], loading: 'idle' }

export const addToCart = createAsyncThunk('cart/addToCart',
  async (items: CartItem, { rejectWithValue }) => {
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/cart', items, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      })
      Swal.fire('Success', 'Item added to cart', 'success')
      return response.data.data
    } catch (err: any) {

      Swal.fire('Error', 'Failed to add item to cart', 'error')
    }
  })
export const getCartItems = createAsyncThunk('cart/getCartItems', async () => {
  const response = await axios.get('http://127.0.0.1:8000/api/cart', {
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
  });
  return response.data.data;

});


export const updateQuantity = createAsyncThunk(
  'cart/updateQuantity',
  async ({ productId, quantity }: { productId: string; quantity: number }) => {
    const response = await axios.put(`http://localhost:8000/api/cart`, { productId, quantity }, {
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
      const response = await axios.delete(`http://localhost:8000/api/cart/${cartId}`,
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
      state.items=[]
    }
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
    })

    builder.addCase(removeFromCart.pending, (state) => {
      state.loading = 'loading'
    })
    builder.addCase(removeFromCart.fulfilled, (state, action: PayloadAction<number>) => {
      state.loading = 'idle'
      const index = state.items.findIndex(item => item.cartId === action.payload);
      state.items.splice(index, 1);

    })
  }
})
export const { clearCart } = cartSlice.actions;
export const cartReducer = cartSlice.reducer;