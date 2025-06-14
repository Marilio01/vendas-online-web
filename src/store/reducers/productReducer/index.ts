import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ProductType } from '../../../shared/types/ProductType';

interface ProductState {
  products: ProductType[];
  product?: ProductType;
  searchTerm: string;
}

const initialState: ProductState = {
  products: [],
  product: undefined,
  searchTerm: '', 
};

export const productSlice = createSlice({
  name: 'productReducer',
  initialState,
  reducers: {
    setProductsAction: (state, action: PayloadAction<ProductType[]>) => {
      state.products = action.payload;
    },
    setProductAction: (state, action: PayloadAction<ProductType | undefined>) => {
      state.product = action.payload;
    },
    setSearchTermAction: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload;
    },
  },
});

export const { setProductsAction, setProductAction, setSearchTermAction } = productSlice.actions;

export default productSlice.reducer;