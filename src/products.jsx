import { useState } from 'react';
import './products.css';

const productsData = [
    {
        id: 1,
        name: "Giấy In A4 Double A 70gsm",
        category: "paper",
        price: "85.000 đ",
        image: "https://via.placeholder.com/200?text=Giay+A4",
        description: "Giấy in cao cấp Double A định lượng 70gsm, độ trắng sáng chuẩn, bề mặt láng mịn giúp in không bị kẹt giấy."
    },
    {
        id: 2,
        name: "Bút Bi Gel Deli 0.5mm Mực Xanh",
        category: "pen",
        price: "12.000 đ",
        image: "https://via.placeholder.com/200?text=But+Bi+Deli",
        description: "Bút bi gel mực xanh nét mượt 0.5mm, thiết kế đệm cao su êm ái chống mỏi tay khi viết lâu."
    },
    {
        id: 3,
        name: "Sổ Tay Lò Cố A5 200 Trang",
        category: "notebook",
        price: "35.000 đ",
        image: "https://via.placeholder.com/200?text=So+Tay+A5",
        description: "Sổ tay bìa cứng cao cấp chống gập gãy, giấy kẻ ngang chống lóa mắt, lò xo thép chắc chắn."
    },
    {
        id: 4,
        name: "File Hộp Vuông 15cm Deli W38118",
        category: "file",
        price: "88.200 đ",
        image: "https://via.placeholder.com/200?text=File+Luu+Tru",
        description: "File hộp nhựa khóa cài chắc chắn, sức chứa lớn chuyên dùng bảo quản tài liệu, chứng từ văn phòng."
    }
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
        <div>
            <header className="navbar">
                <div className="container nav-container">
                    <h1 className="logo">VPP <span>Store</span></h1>
                    <div className="search-box">
                        <input
                            type="text"
                            placeholder="Tìm kiếm sản phẩm..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <button>Tìm kiếm</button>
                    </div>
                </div>
            </header>

            <main className="container main-container">
                <section className="category-section">
                    <h2 className="title-category">Danh Mục Sản Phẩm</h2>
                    <div className="category-tags">
                        {[
                            { id: 'all', name: 'Tất cả' },
                            { id: 'paper', name: 'Giấy in' },
                            { id: 'notebook', name: 'Tập vở - sổ tay' },
                            { id: 'pen', name: 'Dụng cụ viết' },
                            { id: 'file', name: 'File & Lưu trữ' }
                        ].map(cat => (
                            <button
                                key={cat.id}
                                className={`filter-btn ${currentCategory === cat.id ? 'active' : ''}`}
                                onClick={() => setCurrentCategory(cat.id)}
                            >
                                {cat.name}
                            </button>
                        ))}
                    </div>
                </section>

                <section className="product-section">
                    <div className="product-grid">
                        {filteredProducts.map(product => (
                            <div key={product.id} className="product-card">
                                <img src={product.image} alt={product.name} className="product-img" />
                                <div>
                                    <h3 className="product-title">{product.name}</h3>
                                    <p className="product-price">{product.price}</p>
                                </div>
                                <button className="btn-detail" onClick={() => setSelectedProduct(product)}>
                                    Xem Chi Tiết
                                </button>
                            </div>
                        ))}
                    </div>

                    {filteredProducts.length === 0 && (
                        <p className="no-results">Không tìm thấy sản phẩm phù hợp.</p>
                    )}
                </section>
            </main>

            {selectedProduct && (
                <div className="modal-overlay" onClick={() => setSelectedProduct(null)}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <button className="close-btn" onClick={() => setSelectedProduct(null)}>×</button>
                        <div className="modal-body">
                            <img src={selectedProduct.image} alt={selectedProduct.name} className="modal-img" />
                            <div className="modal-info">
                                <h2>{selectedProduct.name}</h2>
                                <p className="price">{selectedProduct.price}</p>
                                <p className="desc">{selectedProduct.description}</p>
                                <button className="btn-detail" onClick={() => alert('Đã thêm sản phẩm vào giỏ hàng!')}>
                                    Thêm Vào Giỏ Hàng
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}