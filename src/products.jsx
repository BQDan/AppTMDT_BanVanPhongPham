import { useState, useEffect } from 'react';
import './products.css';

// 1. Khai báo danh sách danh mục để làm sidebar/menu
const categoriesList = [
    { id: 'all', name: 'Tất cả sản phẩm', icon: '📂' },
    { id: 'paper', name: 'Giấy in - Giấy photo', icon: '📄' },
    { id: 'notebook', name: 'Tập vở - Sổ tay', icon: '🎒' },
    { id: 'pen', name: 'Dụng cụ viết', icon: '✏️' },
    { id: 'file', name: 'File & Lưu trữ', icon: '📁' }
];

export default function App() {
    // Task 1: Khai báo State và lấy dữ liệu từ API public/products.json
    const [productsData, setProductsData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('/products.json')
            .then(res => {
                if (!res.ok) throw new Error('Lỗi khi nạp dữ liệu từ API');
                return res.json();
            })
            .then(data => {
                setProductsData(data);
                setLoading(false);
            })
            .catch(err => {
                console.error("Lỗi Fetch API:", err);
                setLoading(false);
            });
    }, []);

    return (
        <div className="vhd-store-app">
            {/* Top Bar */}
            <div className="top-bar">
                <div className="container top-bar-container">
                    <div className="top-left">
                        <span>Chào mừng bạn đến Website của VHD Store!</span>
                        <span className="sep">|</span>
                        <span>Email: <a href="mailto:dvkhatvhdstore.com.vn">dvkhatvhdstore.com.vn</a></span>
                    </div>
                    <div className="top-right">
                        <a href="#login">Đăng nhập</a>
                        <a href="#register">Đăng ký</a>
                        <a href="#contact">Liên hệ</a>
                    </div>
                </div>
            </div>

            {/* Header */}
            <header className="main-header">
                <div className="container header-container">
                    <div className="logo-box">
                        <div className="logo-badge">VHD</div>
                        <span className="logo-text">STORE</span>
                    </div>

                    <div className="header-search">
                        <select className="cat-select">
                            <option value="all">Tất cả danh mục</option>
                            <option value="paper">Giấy in</option>
                            <option value="notebook">Tập vở - Sổ tay</option>
                            <option value="pen">Dụng cụ viết</option>
                            <option value="file">File & Lưu trữ</option>
                        </select>
                        <input
                            type="text"
                            placeholder="Tìm kiếm sản phẩm văn phòng phẩm..."
                        />
                        <button className="btn-search">🔍</button>
                    </div>

                    <div className="header-actions">
                        <div className="action-item hotline">
                            <span className="action-icon phone">📞</span>
                            <div className="action-info">
                                <span className="label">Gọi đặt hàng</span>
                                <span className="value">024.2246.2003</span>
                            </div>
                        </div>
                        <div className="action-item cart">
                            <span className="action-icon shopping-cart">🛒</span>
                            <div className="action-info">
                                <span className="label">Giỏ hàng</span>
                                <span className="value-cart">(0) sản phẩm</span>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            {/* Navigation Bar */}
            <nav className="nav-bar">
                <div className="container nav-items">
                    {categoriesList.map(cat => (
                        <button key={cat.id} className="nav-link">
                            {cat.icon} {cat.name.toUpperCase()}
                        </button>
                    ))}
                </div>
            </nav>

            {/* Hero Banner */}
            <section className="hero-banner">
                <div className="container banner-container">
                    <div className="banner-left">
                        <div className="brand-circle">
                            <span className="vhd-text">VHD</span>
                            <span className="store-text">STORE</span>
                        </div>
                        <h1 className="banner-title">
                            TỰ TIN HỌC TỐT<br />
                            CÙNG <span>VHD STORE</span>
                        </h1>
                    </div>
                    <div className="banner-right">
                        <img
                            src="https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?q=80&w=800&auto=format&fit=crop"
                            alt="Văn phòng phẩm"
                            className="banner-img"
                        />
                    </div>
                </div>
            </section>

            {/* Bố cục chính */}
            <main className="container main-content">
                <div className="content-layout">
                    {/* Sidebar danh mục bên trái */}
                    <aside className="sidebar">
                        <h3 className="sidebar-title">DANH MỤC SẢN PHẨM</h3>
                        <ul className="category-list">
                            {categoriesList.map(cat => (
                                <li key={cat.id} className="category-item">
                                    <span>{cat.icon} {cat.name}</span>
                                    <span className="arrow">›</span>
                                </li>
                            ))}
                        </ul>
                    </aside>

                    {/* Khu vực hiển thị sản phẩm */}
                    <section className="product-section">
                        <div className="section-header">
                            <h2 className="section-title">DANH SÁCH SẢN PHẨM ({productsData.length})</h2>
                        </div>

                        {/* ĐÂY LÀ VỊ TRÍ ĐƯA ĐOẠN CODE VÀO */}
                        {loading ? (
                            <div className="no-results">
                                <p>⏳ Đang tải dữ liệu sản phẩm...</p>
                            </div>
                        ) : (
                            <div className="product-grid">
                                {productsData.map(product => (
                                    <div key={product.id} className="product-card">
                                        <div className="card-image-box">
                                            <img src={product.image} alt={product.name} className="product-img" />
                                            <span className="badge-stock">{product.status}</span>
                                        </div>
                                        <div className="product-details">
                                            <h3 className="product-title">{product.name}</h3>
                                            <p className="product-desc">{product.description}</p>
                                            <div className="price-box">
                                                <span className="product-price">{product.price}</span>
                                                {product.oldPrice && (
                                                    <span className="product-old-price">{product.oldPrice}</span>
                                                )}
                                            </div>
                                        </div>
                                        <button className="btn-detail">Xem Chi Tiết</button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </section>
                </div>
            </main>
        </div>
    );
}