import { Routes, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Footer from "./components/views/Footer/Footer";
import Header from "./components/views/Header/Header";
import Home from "./components/pages/Home/Home";
import Product from "./components/pages/Product/Product";
import Cart from "./components/pages/Cart/Cart";
import Order from "./components/pages/Order/Order";
import { useDispatch } from "react-redux";
import { fetchProducts } from "./redux/products/productsRedux";
import { useEffect } from "react";

function App() {
  const dispatch = useDispatch();
  useEffect(() => dispatch(fetchProducts()), [dispatch]);
  return (
    <main>
      <Container>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product/:id" element={<Product />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/order" element={<Order />} />
        </Routes>
        <Footer />
      </Container>
    </main>
  );
}

export default App;
