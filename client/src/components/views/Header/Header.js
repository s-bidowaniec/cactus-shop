import { Button, Container, Nav, Navbar } from 'react-bootstrap';
import { Link, NavLink } from 'react-router-dom';
import { FaShoppingCart } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { getOrder } from '../../../redux/order/orderRedux';
const Header = () => {
  const order = useSelector((state) => getOrder(state));
  console.log(order);
  return (
    <Navbar sticky="top" className="bg-white shadow-sm mb-3">
      <Container>
        <Nav className="me-auto">
          <Nav.Link to={'/'} as={NavLink}>
            Home
          </Nav.Link>
        </Nav>
        <Link to="/cart">
          <Button
            style={{ width: '3rem', height: '3rem', position: 'relative' }}
            variant="outline-primary"
            className="rounded-circle"
          >
            <FaShoppingCart />
            <div
              className="rounded-circle bg-danger d-flex justify-content-center align-items-center"
              style={{
                color: 'white',
                width: '1.5rem',
                height: '1.5rem',
                position: 'absolute',
                bottom: 0,
                right: 0,
                transform: 'translate(25%, 25%)',
              }}
            >
              {order.reduce((partialSum, item) => partialSum + item.count, 0)}
            </div>
          </Button>
        </Link>
      </Container>
    </Navbar>
  );
};

export default Header;
