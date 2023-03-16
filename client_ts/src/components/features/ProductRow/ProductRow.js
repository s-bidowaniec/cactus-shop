//const activeProduct = useSelector((state) => getProductById(state, id));

import { useDispatch, useSelector } from 'react-redux';
import { getProductById } from '../../../redux/products/productsRedux';
import { IMGS_URL } from '../../../config';
import { formatCurrency } from '../../../utilities/formatCurrency';
import {
  decrementItem,
  incrementItem,
  removeItem,
} from '../../../redux/order/orderRedux';
import { Button } from 'react-bootstrap';

const ProductRow = (props) => {
  const dispatch = useDispatch();
  const activeProduct = useSelector((state) => getProductById(state, props.id));
  const images = activeProduct.pictures
    .split(', ')
    .map((name) => `${IMGS_URL}${name}`);
  return (
    <tbody>
      <tr>
        <td>
          <img
            style={{ height: '200px', width: '200px', objectFit: 'cover' }}
            src={images[0]}
            alt="product-img"
          />
        </td>
        <td>{activeProduct.name}</td>
        <td>{props.count}</td>
        <td>{formatCurrency(props.count * activeProduct.price)}</td>
        {props.variant !== 'summary' && (
          <td>
            <Button
              onClick={() => dispatch(incrementItem({ id: activeProduct.id }))}
            >
              +
            </Button>
          </td>
        )}
        {props.variant !== 'summary' && (
          <td>
            <Button
              onClick={() => dispatch(decrementItem({ id: activeProduct.id }))}
            >
              -
            </Button>
          </td>
        )}
        {props.variant !== 'summary' && (
          <td>
            <Button
              variant="danger"
              onClick={() => dispatch(removeItem({ id: activeProduct.id }))}
            >
              Remove
            </Button>
          </td>
        )}
      </tr>
    </tbody>
  );
};

export default ProductRow;
