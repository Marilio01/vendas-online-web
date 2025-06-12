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
    // ### ADICIONE ESTE NOVO REDUCER AQUI ###
    // Ele será responsável por atualizar a quantidade de um item específico.
    updateItemAmountAction: (state, action: PayloadAction<{ id: number; amount: number }>) => {
      const { id, amount } = action.payload;
      const itemIndex = state.cart.findIndex((item) => item.id === id);
      
      if (itemIndex !== -1) {
        state.cart[itemIndex].amount = amount;
      }
    },
  },
});

// Exporte a nova action
export const { setCartAction, updateItemAmountAction } = cartSlice.actions;

export default cartSlice.reducer;