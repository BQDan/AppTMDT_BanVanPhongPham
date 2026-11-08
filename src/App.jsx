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
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
        </Routes>
    );
}

export default App;