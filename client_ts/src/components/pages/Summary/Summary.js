import { Col, Container, Row, Table } from 'react-bootstrap';
import ProductRow from '../../features/ProductRow/ProductRow';
import { useSelector } from 'react-redux';
import { getOrder } from '../../../redux/order/orderRedux';
import { OrderTotalPrice } from '../../features/OrderTotalPrice/OrderTotalPrice';

import OrderForm from '../../features/OrderForm/OrderForm';

const Summary = () => {
  const order = useSelector((state) => getOrder(state));
  return (
    <Container>
      <h3>Order Summary:</h3>
      <OrderTotalPrice />
      <Row>
        <Col lg={6}>
          <Table className="bordered hover">
            <thead>
              <tr>
                <th>Img</th>
                <th>Name</th>
                <th>Count</th>
                <th>Price</th>
              </tr>
            </thead>
            {order.map((item) => (
              <ProductRow key={item.id} {...item} variant="summary" />
            ))}
          </Table>
        </Col>
        <Col lg={6}>
          <OrderForm />
        </Col>
      </Row>
    </Container>
  );
};
export default Summary;
