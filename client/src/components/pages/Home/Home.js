import { useSelector } from "react-redux";
import { getAllProducts } from "../../../redux/products/productsRedux";

const Home = () => {
  const products = useSelector((state)=>getAllProducts(state))
  console.log(products)
  return <p>home</p>;
};

export default Home;