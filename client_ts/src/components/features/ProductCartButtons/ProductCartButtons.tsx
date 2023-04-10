import { Button } from 'react-bootstrap';
import {
  addItem,
  decrementItem,
  getOrderedProductById,
  incrementItem,
  removeItem,
} from '../../../redux/order/orderRedux';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';

const ProductCartButtons = (props: { id: string }) => {
  const dispatch = useDispatch();
  const orderProduct = useSelector((state: RootState) =>
    getOrderedProductById(state, props.id),
  );
  return (
    <div className="w-100">
      {orderProduct === undefined ? (
        <Button
          className="w-100"
          onClick={() => {
            return dispatch(addItem({ id: props.id, quantity: 1 }));
          }}
        >
          + Add to cart
        </Button>
      ) : (
        <div
          className="d-flex align-items-center flex-column"
          style={{ gap: '.5rem' }}
        >
          <div
            className="d-flex align-items-center justify-content-center flex-row"
            style={{ gap: '.5rem' }}
          >
            <Button onClick={() => dispatch(decrementItem({ id: props.id }))}>
              -
            </Button>
            <div>
              <span className="fs-3">
                {orderProduct && orderProduct.quantity}
              </span>
              in cart
            </div>
            <Button onClick={() => dispatch(incrementItem({ id: props.id }))}>
              +
            </Button>
          </div>
          <Button
            variant="danger"
            size="sm"
            onClick={() => dispatch(removeItem({ id: props.id }))}
          >
            Remove
          </Button>
        </div>
      )}
    </div>
  );
};

export default ProductCartButtons;
