import PropTypes from 'prop-types';
import { Button, Card } from 'react-bootstrap';
import { IMGS_URL } from '../../../config';
import { formatCurrency } from '../../../utilities/formatCurrency';
import { Link } from 'react-router-dom';
import ProductCartButtons from '../ProductCartButtons/ProductCartButtons';
type ProductCardProps = {
  id: string;
  name: string;
  price: number;
  description: string;
  category: string;
  pictures: string;
};
const ProductCard = (props: ProductCardProps) => {
  const images = props.pictures.split(', ').map((name) => `${IMGS_URL}${name}`);
  return (
    <Card className="h-100">
      <Card.Img
        variant="top"
        src={images[0]}
        height="400px"
        style={{ objectFit: 'cover' }}
      />
      <Card.Body className="d-flex flex-column">
        <Card.Title className="d-flex justify-content-between align-items-baseline mb-4">
          <span className="fs-2">{props.name}</span>
          <span className="ms-2 text-muted">{formatCurrency(props.price)}</span>
        </Card.Title>
        <div className="mt-auto">
          <div
            className="d-flex align-items-center flex-column"
            style={{ gap: '.5rem' }}
          >
            <Link className="w-100" to={`/product/${props.id}`}>
              <Button className="w-100">More info</Button>
            </Link>
            <ProductCartButtons id={props.id} />
          </div>
        </div>
      </Card.Body>
    </Card>
  );
};

export default ProductCard;
