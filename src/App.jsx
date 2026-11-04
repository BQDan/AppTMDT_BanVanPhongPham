
import TopBar from "./components/layout/TopBar";
import Header from "./components/layout/Header";
import Navbar from "./components/layout/Navbar";
import "./components/layout/Layout.css";

import HeroBanner from "./components/home/HeroBanner";
import "./components/home/Home.css";

function App() {
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

export default App;
