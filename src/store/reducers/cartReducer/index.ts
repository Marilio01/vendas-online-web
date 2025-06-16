import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CartType } from '../../../shared/types/CartType';

interface CartState {
  cart: CartType[];
}

const initialState: CartState = {
  cart: [],
};

export const cartSlice = createSlice({
  name: 'cartReducer',
  initialState,
  reducers: {
    setCartAction: (state, action: PayloadAction<CartType[]>) => {
      state.cart = action.payload;
    },
    updateItemAmountAction: (state, action: PayloadAction<{ id: number; amount: number }>) => {
      const itemIndex = state.cart.findIndex((item) => item.id === action.payload.id);
      if (itemIndex !== -1) {
        state.cart[itemIndex].amount = action.payload.amount;
      }
    },
    removeItemAction: (state, action: PayloadAction<number>) => {
      state.cart = state.cart.filter(item => item.id !== action.payload);
    },
  },
});

export const { setCartAction, updateItemAmountAction, removeItemAction } = cartSlice.actions;

export default cartSlice.reducer;