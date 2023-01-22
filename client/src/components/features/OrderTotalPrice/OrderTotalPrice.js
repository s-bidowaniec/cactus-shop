import { useSelector } from 'react-redux';
import { getOrder } from '../../../redux/order/orderRedux';
import { getAllProducts } from '../../../redux/products/productsRedux';
import { formatCurrency } from '../../../utilities/formatCurrency';

export const OrderTotalPrice = () => {
  const order = useSelector((state) => getOrder(state));
  const products = useSelector((state) => getAllProducts(state));
  const totalPrice = order.reduce(
    (accumulator, currentItem) =>
      accumulator +
      currentItem.count *
        products.find((prod) => prod.id === currentItem.id).price,
    0,
  );
  return <span>{formatCurrency(totalPrice)}</span>;
};
