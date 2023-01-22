import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getProductById } from '../../../redux/products/productsRedux';
import { IMGS_URL } from '../../../config';
import { Carousel, Col, Row } from 'react-bootstrap';
import ProductCartButtons from '../../features/ProductCartButtons/ProductCartButtons';

const Product = () => {
  let { id } = useParams();
  const activeProduct = useSelector((state) => getProductById(state, id));
  const images = activeProduct.pictures
    .split(', ')
    .map((name) => `${IMGS_URL}${name}`);
  return (
    <div>
      <span
        style={{
          fontWeight: 'bold',
          fontSize: 'large',
        }}
      >
        Name: {activeProduct.name}
      </span>
      <Row md={2} xs={1}>
        <Col>
          <Carousel className="d-flex" variant="dark">
            {images.map((img) => {
              return (
                <Carousel.Item key={images.indexOf(img)}>
                  <img
                    className="d-block w-100 rounded"
                    style={{ objectFit: 'cover', maxHeight: '600px' }}
                    src={img}
                    alt="First slide"
                  />
                </Carousel.Item>
              );
            })}
          </Carousel>
        </Col>
        <Col className="d-flex flex-column">
          <h3>Description:</h3>
          {activeProduct.description}
          <div className="mt-auto">
            <ProductCartButtons id={id} />
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default Product;
