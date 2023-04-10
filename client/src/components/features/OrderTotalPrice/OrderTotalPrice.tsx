import { useSelector } from 'react-redux';
import { getOrder } from '../../../redux/order/orderRedux';
import {
  getAllProducts,
  ProductType,
} from '../../../redux/products/productsRedux';
import { formatCurrency } from '../../../utilities/formatCurrency';
import { RootState } from '../../../redux/store';

const productPrice = (products: ProductType[], currentItem: { id: string }) => {
  const product = products.find((prod) => prod.id === currentItem.id);
  if (typeof product !== 'undefined') {
    return product.price;
  } else {
    return 0;
  }
};
export const OrderTotalPrice = () => {
  const order = useSelector((state: RootState) => getOrder(state));
  const products = useSelector((state: RootState) => getAllProducts(state));

  const totalPrice = order.reduce(
    (accumulator, currentItem) =>
      accumulator + currentItem.quantity * productPrice(products, currentItem),
    0,
  );
  return <span>{formatCurrency(totalPrice)}</span>;
};
