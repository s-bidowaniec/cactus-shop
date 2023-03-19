import { API_URL } from '../../config';
import { AppDispatch, RootState } from '../store';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// TypeScript model
export interface ProductType {
  id: string;
  name: string;
  price: number;
  pictures: string;
  category: string;
  description: string;
}

// selectors
export const getAllProducts = (state: RootState): ProductType[] =>
  state.products;

export const getProductById = (
  state: RootState,
  id: string,
): ProductType | undefined =>
  state.products.find((product: ProductType) => product.id === id);

// actions
const productsSlice = createSlice({
  name: 'products',
  initialState: [] as ProductType[],
  reducers: {
    updateProducts: (state, action: PayloadAction<ProductType[]>) => {
      return action.payload;
    },
  },
});

export const { updateProducts } = productsSlice.actions;

// thunk actions
export const fetchProducts = () => {
  return (dispatch: AppDispatch) => {
    fetch(`${API_URL}/api/products`)
      .then((res) => res.json())
      .then((products) => dispatch(updateProducts(products)));
  };
};

// reducer
const productsReducer = productsSlice.reducer;

export default productsReducer;
