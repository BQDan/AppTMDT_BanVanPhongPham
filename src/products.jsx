import { useState } from 'react';
import './products.css';

const productsData = [
    {
        id: 1,
        name: "Giấy In A4 Double A 70gsm",
        category: "paper",
        price: "85.000 đ",
        oldPrice: "95.000 đ",
        image: "https://via.placeholder.com/200?text=Giay+A4",
        status: "Còn hàng",
        description: "Giấy in cao cấp Double A định lượng 70gsm, độ trắng sáng chuẩn, bề mặt láng mịn giúp in không bị kẹt giấy."
    },
    {
        id: 2,
        name: "Bút Bi Gel Deli 0.5mm Mực Xanh",
        category: "pen",
        price: "12.000 đ",
        oldPrice: "15.000 đ",
        image: "https://via.placeholder.com/200?text=But+Bi+Deli",
        status: "Còn hàng",
        description: "Bút bi gel mực xanh nét mượt 0.5mm, thiết kế đệm cao su êm ái chống mỏi tay khi viết lâu."
    },
    {
        id: 3,
        name: "Sổ Tay Lò Cố A5 200 Trang",
        category: "notebook",
        price: "35.000 đ",
        oldPrice: "40.000 đ",
        image: "https://via.placeholder.com/200?text=So+Tay+A5",
        status: "Còn hàng",
        description: "Sổ tay bìa cứng cao cấp chống gập gãy, giấy kẻ ngang chống lóa mắt, lò xo thép chắc chắn."
    },
    {
        id: 4,
        name: "File Hộp Vuông 15cm Deli W38118",
        category: "file",
        price: "88.200 đ",
        oldPrice: "98.000 đ",
        image: "https://via.placeholder.com/200?text=File+Luu+Tru",
        status: "Còn hàng",
        description: "File hộp nhựa khóa cài chắc chắn, sức chứa lớn chuyên dùng bảo quản tài liệu, chứng từ văn phòng."
    }
];

const categoriesList = [
    { id: 'all', name: 'Tất cả sản phẩm', icon: '📂' },
    { id: 'paper', name: 'Giấy in - Giấy photo', icon: '📄' },
    { id: 'notebook', name: 'Tập vở - Sổ tay', icon: '🎒' },
    { id: 'pen', name: 'Dụng cụ viết', icon: '✏️' },
    { id: 'file', name: 'File & Lưu trữ', icon: '📁' }
];

function removeAccents(str) {
    if (!str) return "";
    return str.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/đ/g, "d").trim();
}

export default function App() {
    const [searchTerm, setSearchTerm] = useState("");
    const [currentCategory, setCurrentCategory] = useState("all");
    const [selectedProduct, setSelectedProduct] = useState(null);

    const filteredProducts = productsData.filter((product) => {
        const matchCategory = currentCategory === "all" || product.category === currentCategory;
        const cleanSearch = removeAccents(searchTerm);
        const nameNoAccent = removeAccents(product.name);
        const descNoAccent = removeAccents(product.description);

        return matchCategory && (nameNoAccent.includes(cleanSearch) || descNoAccent.includes(cleanSearch));
    });

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
                        <a href="#login">Đăng nhập</a>
                        <a href="#register">Đăng ký</a>
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
                        <select
                            className="cat-select"
                            value={currentCategory}
                            onChange={(e) => setCurrentCategory(e.target.value)}
                        >
                            <option value="all">Tất cả danh mục</option>
                            <option value="paper">Giấy in</option>
                            <option value="notebook">Tập vở - Sổ tay</option>
                            <option value="pen">Dụng cụ viết</option>
                            <option value="file">File & Lưu trữ</option>
                        </select>
                        <input
                            type="text"
                            placeholder="Tìm kiếm sản phẩm văn phòng phẩm..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
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
                        <button
                            key={cat.id}
                            className={`nav-link ${currentCategory === cat.id ? 'active' : ''}`}
                            onClick={() => setCurrentCategory(cat.id)}
                        >
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
                        <div className="badges-list">
                            <div className="badge-item">
                                <span className="badge-icon">🛡️</span>
                                <div>
                                    <strong>CHÍNH HÃNG</strong>
                                    <p>100%</p>
                                </div>
                            </div>
                            <div className="badge-item">
                                <span className="badge-icon">🚚</span>
                                <div>
                                    <strong>GIAO HÀNG</strong>
                                    <p>TOÀN QUỐC</p>
                                </div>
                            </div>
                            <div className="badge-item">
                                <span className="badge-icon">🎧</span>
                                <div>
                                    <strong>HỖ TRỢ</strong>
                                    <p>TẬN TÂM</p>
                                </div>
                            </div>
                        </div>
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
                                <li
                                    key={cat.id}
                                    className={`category-item ${currentCategory === cat.id ? 'active' : ''}`}
                                    onClick={() => setCurrentCategory(cat.id)}
                                >
                                    <span>{cat.icon} {cat.name}</span>
                                    <span className="arrow">›</span>
                                </li>
                            ))}
                        </ul>
                    </aside>

                    <section className="product-section">
                        <div className="section-header">
                            <h2 className="section-title">DANH SÁCH SẢN PHẨM</h2>
                            {searchTerm && (
                                <p className="search-status">
                                    Kết quả tìm kiếm cho: "<strong>{searchTerm}</strong>" ({filteredProducts.length} sản phẩm)
                                </p>
                            )}
                        </div>

                        <div className="product-grid">
                            {filteredProducts.map(product => (
                                <div key={product.id} className="product-card">
                                    <div className="card-image-box">
                                        <img src={product.image} alt={product.name} className="product-img" />
                                    </div>
                                    <div className="product-details">
                                        <h3 className="product-title" title={product.name}>{product.name}</h3>
                                        <div className="price-box">
                                            <span className="product-price">{product.price}</span>
                                            {product.oldPrice && <span className="old-price">{product.oldPrice}</span>}
                                        </div>
                                    </div>
                                    <button className="btn-detail" onClick={() => setSelectedProduct(product)}>
                                        Xem Chi Tiết
                                    </button>
                                </div>
                            ))}
                        </div>

                        {filteredProducts.length === 0 && (
                            <div className="no-results">
                                <p>⚠️ Không tìm thấy sản phẩm phù hợp.</p>
                            </div>
                        )}
                    </section>
                </div>
            </main>

            {selectedProduct && (
                <div className="modal-overlay" onClick={() => setSelectedProduct(null)}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <button className="close-btn" onClick={() => setSelectedProduct(null)}>×</button>
                        <div className="modal-body">
                            <div className="modal-img-box">
                                <img src={selectedProduct.image} alt={selectedProduct.name} className="modal-img" />
                            </div>
                            <div className="modal-info">
                                <h2 className="modal-title">{selectedProduct.name}</h2>
                                <p className="modal-status">Trạng thái: <span className="status-badge">{selectedProduct.status || 'Còn hàng'}</span></p>
                                <div className="modal-price-box">
                                    <span className="price">{selectedProduct.price}</span>
                                </div>
                                <div className="modal-desc-box">
                                    <h4>Mô tả sản phẩm:</h4>
                                    <p className="desc">{selectedProduct.description}</p>
                                </div>
                                <div className="modal-actions">
                                    <button className="btn-add-cart" onClick={() => alert(`Đã thêm "${selectedProduct.name}" vào giỏ hàng!`)}>
                                        🛒 Thêm Vào Giỏ Hàng
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}