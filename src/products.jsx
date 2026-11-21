import { useState, useEffect, useRef } from 'react';
import './products.css';
import { Link } from "react-router-dom";
const categoriesList = [
    { id: 'all', name: 'Tất cả sản phẩm', icon: '📂' },
    { id: 'paper', name: 'Giấy in - Giấy photo', icon: '📄' },
    { id: 'notebook', name: 'Tập vở - Sổ tay', icon: '🎒' },
    { id: 'pen', name: 'Dụng cụ viết', icon: '✏️' },
    { id: 'file', name: 'File & Lưu trữ', icon: '📁' },
    { id: 'device', name: 'Thiết bị văn phòng', icon: '🖨️' }
];

export default function App() {
    const [productsData, setProductsData] = useState([]);
    const [loading, setLoading] = useState(true);

    const [currentPage, setCurrentPage] = useState(1);
    const [openJumpIndex, setOpenJumpIndex] = useState(null);
    const [jumpInput, setJumpInput] = useState('');
    const itemsPerPage = 9;
    const productSectionRef = useRef(null);

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

    const totalPages = Math.ceil(productsData.length / itemsPerPage);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentProducts = productsData.slice(indexOfFirstItem, indexOfLastItem);

    const handlePageChange = (pageNumber) => {
        if (pageNumber < 1 || pageNumber > totalPages) return;
        setCurrentPage(pageNumber);
        setOpenJumpIndex(null);
        setJumpInput('');
        if (productSectionRef.current) {
            productSectionRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    const getPaginationItems = () => {
        if (totalPages <= 5) {
            return Array.from({ length: totalPages }, (_, i) => i + 1);
        }
        if (currentPage <= 2) {
            return [1, 2, 3, '...', totalPages];
        }
        if (currentPage >= totalPages - 1) {
            return [1, '...', totalPages - 2, totalPages - 1, totalPages];
        }
        return [1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages];
    };

    const handleJumpSubmit = (e) => {
        e.preventDefault();
        const target = parseInt(jumpInput, 10);
        if (!isNaN(target) && target >= 1 && target <= totalPages) {
            handlePageChange(target);
        }
    };

    return (
        <div className="vhd-store-app">
            <div className="top-bar">
                <div className="container top-bar-container">
                    <div className="top-left">
                        <span>Chào mừng bạn đến Website của VHD Store!</span>
                        <span className="sep">|</span>
                        <span>Email: <a href="mailto:dvkhatvhdstore.com.vn">dvkhatvhdstore.com.vn</a></span>
                    </div>
                    <div className="top-right">
                        <Link to="/login">Đăng nhập</Link>
                        <Link to="/register">Đăng ký</Link>
                        <a href="#contact">Liên hệ</a>
                    </div>
                </div>
            </div>

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
                            <option value="device">Thiết bị văn phòng</option>
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

            <nav className="nav-bar">
                <div className="container nav-items">
                    {categoriesList.map(cat => (
                        <button key={cat.id} className="nav-link">
                            {cat.icon} {cat.name.toUpperCase()}
                        </button>
                    ))}
                </div>
            </nav>

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

            <main className="container main-content">
                <div className="content-layout">
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

                    <section className="product-section" ref={productSectionRef}>
                        <div className="section-header">
                            <h2 className="section-title">DANH SÁCH SẢN PHẨM ({productsData.length})</h2>
                        </div>

                        {loading ? (
                            <div className="no-results">
                                <p>⏳ Đang tải dữ liệu sản phẩm...</p>
                            </div>
                        ) : (
                            <>
                                <div className="product-grid">
                                    {currentProducts.map(product => (
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

                                {totalPages > 1 && (
                                    <div className="pagination">
                                        <button
                                            className="page-btn"
                                            onClick={() => handlePageChange(currentPage - 1)}
                                            disabled={currentPage === 1}
                                        >
                                            {'<< Trước'}
                                        </button>

                                        {getPaginationItems().map((item, idx) =>
                                            item === '...' ? (
                                                <div key={`dots-${idx}`} className="page-dots-wrapper">
                                                    <button
                                                        className={`page-btn page-dots ${openJumpIndex === idx ? 'active' : ''}`}
                                                        onClick={() => setOpenJumpIndex(openJumpIndex === idx ? null : idx)}
                                                        title="Chọn trang muốn tới"
                                                    >
                                                        ...
                                                    </button>

                                                    {openJumpIndex === idx && (
                                                        <div className="page-jump-popover">
                                                            <div className="jump-header">Chọn trang (1 - {totalPages})</div>
                                                            <div className="jump-grid">
                                                                {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
                                                                    <button
                                                                        key={p}
                                                                        type="button"
                                                                        className={`jump-num ${currentPage === p ? 'active' : ''}`}
                                                                        onClick={() => handlePageChange(p)}
                                                                    >
                                                                        {p}
                                                                    </button>
                                                                ))}
                                                            </div>
                                                            <form onSubmit={handleJumpSubmit} className="jump-form">
                                                                <input
                                                                    type="number"
                                                                    min="1"
                                                                    max={totalPages}
                                                                    value={jumpInput}
                                                                    onChange={(e) => setJumpInput(e.target.value)}
                                                                    placeholder="Số trang..."
                                                                />
                                                                <button type="submit">Đi</button>
                                                            </form>
                                                        </div>
                                                    )}
                                                </div>
                                            ) : (
                                                <button
                                                    key={item}
                                                    className={`page-btn ${currentPage === item ? 'active' : ''}`}
                                                    onClick={() => handlePageChange(item)}
                                                >
                                                    {item}
                                                </button>
                                            )
                                        )}

                                        <button
                                            className="page-btn"
                                            onClick={() => handlePageChange(currentPage + 1)}
                                            disabled={currentPage === totalPages}
                                        >
                                            {'Sau >>'}
                                        </button>
                                    </div>
                                )}
                            </>
                        )}
                    </section>
                </div>
            </main>
        </div>
    );
}