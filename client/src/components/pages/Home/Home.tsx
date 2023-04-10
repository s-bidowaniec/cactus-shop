import { useSelector } from 'react-redux';
import { getAllProducts } from '../../../redux/products/productsRedux';
import { Row, Col } from 'react-bootstrap';
import ProductCard from '../../features/ProductCard/ProductCard';
import { RootState } from '../../../redux/store';

const Home = () => {
  const products = useSelector((state: RootState) => getAllProducts(state));
  return (
    <>
      <h1>Cactus Store</h1>
      <Row md={2} xs={1} lg={3} className="g-3">
        {products.map((product) => (
          <Col key={product.id}>
            <ProductCard {...product} />
          </Col>
        ))}
      </Row>
    </>
  );
};

export default Home;
