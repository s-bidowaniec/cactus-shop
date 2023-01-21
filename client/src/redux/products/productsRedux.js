import { API_URL } from '../../config';
// selectors
export const getAllProducts = ({ products }) => products;
export const getProductById = ({ products }, id) => products.find((product) => product.id === id);
// actions
const createActionName = (actionName) => `app/products/${actionName}`;
const UPDATE_PRODUCTS = createActionName('UPDATE_PRODUCTS');
//action creators
export const updateProducts = (payload) => ({ type: UPDATE_PRODUCTS, payload });
// thunk actions
export const fetchProducts = () => {
  return (dispatch) => {
    fetch(`${API_URL}/api/products`)
      .then((res) => res.json())
      .then((products) => dispatch(updateProducts([...products])));
  };
};
//reducer
const productsReducer = (statePart = null, action) => {
  switch (action.type) {
    case UPDATE_PRODUCTS:
      return [...action.payload];
    default:
      return statePart;
  }
};
export default productsReducer;
