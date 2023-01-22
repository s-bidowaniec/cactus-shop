// order
// selectors
export const getOrder = ({ order }) => order;
export const getOrderedProductById = ({ order }, productId) =>
  order.find((item) => item.id === productId);
// actions
const createActionName = (actionName) => `app/orders/${actionName}`;
const ADD_ITEM = createActionName('ADD_ITEM');
const INCREMENT_ITEM = createActionName('INCREMENT_ITEM');
const DECREMENT_ITEM = createActionName('DECREMENT_ITEM');
const REMOVE_ITEM = createActionName('REMOVE_ITEM');
//action creators
export const addItem = (payload) => ({ type: ADD_ITEM, payload });
export const incrementItem = (payload) => ({ type: INCREMENT_ITEM, payload });
export const decrementItem = (payload) => ({ type: DECREMENT_ITEM, payload });
export const removeItem = (payload) => ({ type: REMOVE_ITEM, payload });
// thunk actions
// send order
//reducer
const ordersReducer = (statePart = null, action) => {
  switch (action.type) {
    case ADD_ITEM:
      if (!statePart.some((item) => item.id === action.payload.id)) {
        statePart.push({
          id: action.payload.id,
          count: action.payload.count,
        });
        return [...statePart];
      } else {
        return statePart;
      }
    case INCREMENT_ITEM:
      return statePart.map((item) =>
        item.id === action.payload.id
          ? { ...item, count: item.count + 1 }
          : { ...item },
      );
    case DECREMENT_ITEM:
      const reducedItems = statePart.map((item) =>
        item.id === action.payload.id
          ? { ...item, count: item.count - 1 }
          : { ...item },
      );
      return reducedItems.filter((item) => item.count > 0);
    case REMOVE_ITEM:
      return statePart.filter((item) => item.id !== action.payload.id);
    default:
      return statePart;
  }
};
export default ordersReducer;
