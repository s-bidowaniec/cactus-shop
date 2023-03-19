import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import initialState from './initialState';
import productsReducer, { ProductType } from './products/productsRedux';
import orderReducer, { OrderItemType } from './order/orderRedux';

// convert object to string and store in localStorage
function saveToLocalStorage(state: RootState) {
  try {
    const serialisedState = JSON.stringify(state);
    localStorage.setItem('persistantState', serialisedState);
  } catch (e) {
    console.warn(e);
  }
}

// load string from localStarage and convert into an Object
// invalid output must be undefined
const loadFromLocalStorage = ():
  | {
      products: ProductType[];
      order: OrderItemType[];
    }
  | undefined => {
  try {
    const serialisedState = localStorage.getItem('persistantState');
    if (serialisedState === null) return undefined;
    return JSON.parse(serialisedState);
  } catch (e) {
    console.warn(e);
    return undefined;
  }
};

const localState = loadFromLocalStorage();
const usedState = localState ?? initialState;

const store = configureStore({
  reducer: {
    products: productsReducer,
    order: orderReducer,
  },
  middleware: [thunk],
  preloadedState: usedState,
  enhancers: [],
});
// listen for store changes and use saveToLocalStorage to
// save them to localStorage
store.subscribe(() => saveToLocalStorage(store.getState()));
export default store;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
