import { Suspense } from 'react';

import { Routes, Route } from "react-router-dom";
import TopBar from "./components/layout/TopBar";
import Header from "./components/layout/Header";
import Navbar from "./components/layout/Navbar";
import HeroBanner from "./components/home/HeroBanner";
import RegisterPage from './pages/RegisterPage';

import "./components/layout/Layout.css";
import "./components/home/Home.css";
import "./Auth.css";

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
        </>
    );
}

function App() {
    return (
        <Routes>
            <Route element={<Custom />}>
                <Route path='/login' element={<Login />} />
                <Route path='/register' element={<RegisterPage />} />
            </Route>

            <Route path='/products' element={
                <Suspense fallback={<div className='page-loading'>Đang tải...</div>}>
                    <Products />
                </Suspense>
            } />

            <Route element={<MainLayout />}>
                <Route path='/' element={<Home />} />
                <Route path='/cart' element={<Cart />} />

                <Route element={<RequiredAuth />}>
                    <Route path='/checkout' element={<Checkout />} />
                    <Route path='/order-done/:id' element={<OrderDone />} />
                    <Route path='/account/orders' element={<Orders />} />
                </Route>

                <Route path='*' element={<NotFound />} />
            </Route>
        </Routes>
    );
}

export default App;
