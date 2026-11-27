import { Routes, Route } from "react-router-dom";
import TopBar from "./components/layout/TopBar";
import Header from "./components/layout/Header";
import Navbar from "./components/layout/Navbar";
import HeroBanner from "./components/home/HeroBanner";

import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";

import "./components/layout/Layout.css";
import "./components/home/Home.css";
import "./Auth.css";
import Products from "./products.jsx";
import Cart from "./pages/Cart.jsx";
import Checkout from "./pages/Checkout.jsx";
import Order from "./pages/Order.jsx";
import OrderDone from "./pages/OrderDone.jsx";
import NotFound from "./pages/NotFound.jsx";
import { RequiredAuth } from "./routes/Custom.jsx";
import Footer from "./components/layout/Footer";
function HomePage() {
    return (
        <>
            <TopBar />
            <Header />
            <Navbar />

            <main className="site-container">
                <HeroBanner />

                <h1>Chào mừng đến với VHD Store</h1>
                <p>Cửa hàng văn phòng phẩm của chúng tôi</p>
            </main>
            <Footer />
        </>
    );
}

function App() {
    return (
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/products" element={<Products />} />
            <Route path="/cart" element={<Cart />} />

            <Route element={<RequiredAuth />}>
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/account/orders" element={<Order />} />
                <Route path="/order-done/:id" element={<OrderDone />} />
            </Route>

            <Route path="*" element={<NotFound />} />
        </Routes>

    );
}

export default App;