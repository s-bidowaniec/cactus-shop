import { useSelector } from 'react-redux';
import { getOrder } from '../../../redux/order/orderRedux';
import { Button, Container, Table } from 'react-bootstrap';
import ProductRow from '../../features/ProductRow/ProductRow';
import { Link } from 'react-router-dom';
import { OrderTotalPrice } from '../../features/OrderTotalPrice/OrderTotalPrice';
import { RootState } from '../../../redux/store';

const Cart = () => {
  const order = useSelector((state: RootState) => getOrder(state));
  return (
    <Container>
      <Table className="bordered hover">
        <thead>
          <tr>
            <th>Img</th>
            <th>Name</th>
            <th>Count</th>
            <th>Price</th>
            <th>+</th>
            <th>-</th>
            <th>Remove</th>
          </tr>
        </thead>
        {order.map((item) => (
          <ProductRow {...item} />
        ))}
      </Table>
      <h3>
        Total price: <OrderTotalPrice />
      </h3>
      <Link to="/summary">
        <Button>Order Now!</Button>
      </Link>
    </Container>
  );
};

export default Cart;
