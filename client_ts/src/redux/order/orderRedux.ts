import { API_URL } from '../../config';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppDispatch } from '../store';
import axios, { AxiosResponse } from 'axios';
import orderInitialState from './orderInitialState';

// TypeScript models
export interface OrderItemType {
  id: string;
  quantity: number;
}

export interface PostOrderDataType {
  name: string;
  surname: string;
  address: string;
  items: OrderItemType[];
}

// Selectors
export const getOrder = (state: RootState): OrderItemType[] => state.order;
export const getOrderedProductById = (
  state: RootState,
  productId: string,
): OrderItemType | undefined =>
  state.order.find((item: OrderItemType) => item.id === productId);

// Slice

export const ordersSlice = createSlice({
  name: 'order',
  initialState: orderInitialState,
  reducers: {
    addItem: (state, action: PayloadAction<OrderItemType>) => {
      const index = state.findIndex((item) => item.id === action.payload.id);
      if (index === -1) {
        state.push(action.payload);
      } else {
        state[index].quantity += action.payload.quantity;
      }
      return state;
    },
    incrementItem: (state, action: PayloadAction<{ id: string }>) => {
      const index = state.findIndex((item) => item.id === action.payload.id);
      console.log(action.payload.id);
      console.log(index);
      if (index !== -1) {
        state[index].quantity += 1;
        console.log(state[index].quantity);
      }
    },
    decrementItem: (state, action: PayloadAction<{ id: string }>) => {
      const index = state.findIndex((item) => item.id === action.payload.id);
      if (index !== -1) {
        state[index].quantity -= 1;
        if (state[index].quantity === 0) {
          state.splice(index, 1);
        }
      }
      return state;
    },
    removeItem: (state, action: PayloadAction<OrderItemType>) => {
      return state.filter((item) => item.id !== action.payload.id);
    },
    clearOrder: (state) => {
      return [];
    },
  },
});

// Actions
export const { addItem, incrementItem, decrementItem, removeItem, clearOrder } =
  ordersSlice.actions;

// Thunks
export const addOrderRequest = (
  orderData: PostOrderDataType,
  setStatus: Function,
) => {
  return async (dispatch: AppDispatch) => {
    setStatus('loading');
    try {
      const { data } = await axios.post<PostOrderDataType, AxiosResponse>(
        `${API_URL}/api/orders`,
        orderData,
      );
      console.log(data);
      setStatus('success');
      dispatch(clearOrder());
    } catch (e) {
      if (axios.isAxiosError(e) && e.response?.status === 400) {
        setStatus('clientError');
      } else {
        setStatus('serverError');
      }
    }
  };
};

// Reducer
const orderReducer = ordersSlice.reducer;
export default orderReducer;
