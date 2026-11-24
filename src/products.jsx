import { useEffect, useRef, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";

import { PRODUCTS } from "./data/products";
import { useCart } from "./hooks/useCart";
import { formatVND } from "./lib/format";
import { MAX_QTY } from "./lib/constants";
import "./products.css";

const categoriesList = [
    { id: "all", name: "Tất cả sản phẩm", icon: "📂" },
    { id: "paper", name: "Giấy in - Giấy photo", icon: "📄" },
    { id: "notebook", name: "Tập vở - Sổ tay", icon: "🎒" },
    { id: "pen", name: "Dụng cụ viết", icon: "✏️" },
    { id: "file", name: "File & Lưu trữ", icon: "📁" },
    { id: "device", name: "Thiết bị văn phòng", icon: "🖨️" },
];

const removeVietnameseTones = (str) => {
    if (!str) return "";
    return str
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/đ/g, "d")
        .replace(/Đ/g, "D")
        .toLowerCase()
        .replace(/\s+/g, " ")
        .trim();
};

export default function App() {
    const productsData = PRODUCTS;
    const { addItem, count, lines } = useCart();
    const [searchParams, setSearchParams] = useSearchParams();

    const [searchTerm, setSearchTerm] = useState(
        searchParams.get("search") || ""
    );
    const [addedProductId, setAddedProductId] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [openJumpIndex, setOpenJumpIndex] = useState(null);
    const [jumpInput, setJumpInput] = useState("");

    const itemsPerPage = 9;
    const productSectionRef = useRef(null);

    useEffect(() => {
        const query = searchParams.get("search") || "";
        setSearchTerm(query);
        setCurrentPage(1);
        setOpenJumpIndex(null);
    }, [searchParams]);

    const filteredProducts = productsData.filter((product) => {
        const keyword = removeVietnameseTones(searchTerm);
        if (!keyword) return true;

        const productName = removeVietnameseTones(product.name);
        const productDesc = removeVietnameseTones(product.description);

        return (
            productName.includes(keyword) ||
            productDesc.includes(keyword)
        );
    });

    const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentProducts = filteredProducts.slice(
        indexOfFirstItem,
        indexOfLastItem
    );

    const handleSearchChange = (event) => {
        const value = event.target.value;
        setSearchTerm(value);
        setCurrentPage(1);
        setOpenJumpIndex(null);

        if (value.trim()) {
            setSearchParams({ search: value }, { replace: true });
        } else {
            setSearchParams({}, { replace: true });
        }
    };

    const handleSearchSubmit = (event) => {
        event.preventDefault();
        setCurrentPage(1);
        productSectionRef.current?.scrollIntoView({
            behavior: "smooth",
            block: "start",
        });
    };

    const handlePageChange = (pageNumber) => {
        if (pageNumber < 1 || pageNumber > totalPages) return;

        setCurrentPage(pageNumber);
        setOpenJumpIndex(null);
        setJumpInput("");

        productSectionRef.current?.scrollIntoView({
            behavior: "smooth",
            block: "start",
        });
    };

    const getPaginationItems = () => {
        if (totalPages <= 5) {
            return Array.from({ length: totalPages }, (_, index) => index + 1);
        }

        if (currentPage <= 2) {
            return [1, 2, 3, "...", totalPages];
        }

        if (currentPage >= totalPages - 1) {
            return [1, "...", totalPages - 2, totalPages - 1, totalPages];
        }

        return [
            1,
            "...",
            currentPage - 1,
            currentPage,
            currentPage + 1,
            "...",
            totalPages,
        ];
    };

    const handleJumpSubmit = (event) => {
        event.preventDefault();

        const targetPage = Number.parseInt(jumpInput, 10);

        if (
            Number.isInteger(targetPage) &&
            targetPage >= 1 &&
            targetPage <= totalPages
        ) {
            handlePageChange(targetPage);
        }
    };

    const handleAddToCart = (product) => {
        addItem(product.id);
        setAddedProductId(product.id);

        window.setTimeout(() => {
            setAddedProductId((currentId) =>
                currentId === product.id ? null : currentId
            );
        }, 1200);
    };

    return (
        <div className="vhd-store-app">
            <div className="top-bar">
                <div className="container top-bar-container">
                    <div className="top-left">
                        <span>Chào mừng bạn đến Website của VHD Store!</span>
                        <span className="sep">|</span>
                        <span>
                            Email:{" "}
                            <a href="mailto:dvkhatvhdstore.com.vn">
                                dvkhatvhdstore.com.vn
                            </a>
                        </span>
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
                    <Link
                        to="/"
                        className="logo-box"
                        aria-label="VHD Store"
                        onClick={() => {
                            setSearchTerm("");
                            setSearchParams({});
                            setCurrentPage(1);
                        }}
                    >
                        <div className="logo-badge">VHD</div>
                        <span className="logo-text">STORE</span>
                    </Link>

                    <form
                        className="header-search"
                        onSubmit={handleSearchSubmit}
                    >
                        <select
                            className="cat-select"
                            aria-label="Chọn danh mục"
                        >
                            <option value="all">Tất cả danh mục</option>
                            <option value="paper">Giấy in</option>
                            <option value="notebook">Tập vở - Sổ tay</option>
                            <option value="pen">Dụng cụ viết</option>
                            <option value="file">File & Lưu trữ</option>
                            <option value="device">Thiết bị văn phòng</option>
                        </select>

                        <input
                            type="search"
                            value={searchTerm}
                            onChange={handleSearchChange}
                            placeholder="Tìm kiếm sản phẩm văn phòng phẩm..."
                            aria-label="Tìm kiếm sản phẩm"
                        />

                        <button
                            type="submit"
                            className="btn-search"
                            aria-label="Tìm kiếm"
                        >
                            🔍
                        </button>
                    </form>

                    <div className="header-actions">
                        <div className="action-item hotline">
                            <span className="action-icon phone">📞</span>
                            <div className="action-info">
                                <span className="label">Gọi đặt hàng</span>
                                <span className="value">024.2246.2003</span>
                            </div>
                        </div>

                        <Link to="/cart" className="action-item cart">
                            <span className="action-icon shopping-cart">🛒</span>
                            <div className="action-info">
                                <span className="label">Giỏ hàng</span>
                                <span className="value-cart">
                                    ({count}) sản phẩm
                                </span>
                            </div>
                        </Link>
                    </div>
                </div>
            </header>

            <nav className="nav-bar">
                <div className="container nav-items">
                    {categoriesList.map((category) => (
                        <button
                            key={category.id}
                            type="button"
                            className="nav-link"
                        >
                            {category.icon} {category.name.toUpperCase()}
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
                            TỰ TIN HỌC TỐT
                            <br />
                            CÙNG <span>VHD STORE</span>
                        </h1>
                    </div>

                    <div className="banner-right">
                        <img
                            src="https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?q=80&w=800&auto=format&fit=crop"
                            alt="Các sản phẩm văn phòng phẩm"
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
                            {categoriesList.map((category) => (
                                <li key={category.id} className="category-item">
                                    <span>
                                        {category.icon} {category.name}
                                    </span>
                                    <span className="arrow">›</span>
                                </li>
                            ))}
                        </ul>
                    </aside>

                    <section
                        className="product-section"
                        ref={productSectionRef}
                    >
                        <div className="section-header">
                            <h2 className="section-title">
                                DANH SÁCH SẢN PHẨM ({filteredProducts.length})
                            </h2>
                        </div>

                        {currentProducts.length === 0 ? (
                            <div className="no-results">
                                <p>
                                    {searchTerm.trim()
                                        ? `Không tìm thấy sản phẩm nào phù hợp với từ khóa "${searchTerm}".`
                                        : "Hiện chưa có sản phẩm."}
                                </p>
                            </div>
                        ) : (
                            <div className="product-grid">
                                {currentProducts.map((product) => {
                                    const cartQty =
                                        lines.find(
                                            (line) => line.id === product.id
                                        )?.qty || 0;

                                    const maxQty = Math.min(
                                        product.stock,
                                        MAX_QTY
                                    );
                                    const unavailable =
                                        product.stock < 1 || cartQty >= maxQty;

                                    return (
                                        <article
                                            key={product.id}
                                            className="product-card"
                                        >
                                            <div className="card-image-box">
                                                <img
                                                    src={product.image}
                                                    alt={product.name}
                                                    className="product-img"
                                                />
                                                <span className="badge-stock">
                                                    {unavailable
                                                        ? "Đã đạt số lượng tối đa"
                                                        : product.status}
                                                </span>
                                            </div>

                                            <div className="product-details">
                                                <h3 className="product-title">
                                                    {product.name}
                                                </h3>

                                                <p className="product-desc">
                                                    {product.description}
                                                </p>

                                                <div className="price-box">
                                                    <span className="product-price">
                                                        {formatVND(product.price)}
                                                    </span>

                                                    {product.oldPrice && (
                                                        <span className="product-old-price">
                                                            {product.oldPrice}
                                                        </span>
                                                    )}
                                                </div>
                                            </div>

                                            <button
                                                type="button"
                                                className="btn-detail"
                                                disabled={unavailable}
                                                onClick={() =>
                                                    handleAddToCart(product)
                                                }
                                            >
                                                {unavailable
                                                    ? "Đã đạt số lượng tối đa"
                                                    : addedProductId === product.id
                                                        ? "Đã thêm vào giỏ"
                                                        : "Thêm vào giỏ hàng"}
                                            </button>
                                        </article>
                                    );
                                })}
                            </div>
                        )}

                        {totalPages > 1 && (
                            <div className="pagination">
                                <button
                                    type="button"
                                    className="page-btn"
                                    onClick={() =>
                                        handlePageChange(currentPage - 1)
                                    }
                                    disabled={currentPage === 1}
                                >
                                    {"<< Trước"}
                                </button>

                                {getPaginationItems().map((item, index) =>
                                    item === "..." ? (
                                        <div
                                            key={`dots-${index}`}
                                            className="page-dots-wrapper"
                                        >
                                            <button
                                                type="button"
                                                className={`page-btn page-dots ${
                                                    openJumpIndex === index
                                                        ? "active"
                                                        : ""
                                                }`}
                                                onClick={() =>
                                                    setOpenJumpIndex(
                                                        openJumpIndex === index
                                                            ? null
                                                            : index
                                                    )
                                                }
                                                title="Chọn trang muốn tới"
                                            >
                                                ...
                                            </button>

                                            {openJumpIndex === index && (
                                                <div className="page-jump-popover">
                                                    <div className="jump-header">
                                                        Chọn trang (1 - {totalPages})
                                                    </div>

                                                    <div className="jump-grid">
                                                        {Array.from(
                                                            { length: totalPages },
                                                            (_, pageIndex) =>
                                                                pageIndex + 1
                                                        ).map((page) => (
                                                            <button
                                                                key={page}
                                                                type="button"
                                                                className={`jump-num ${
                                                                    currentPage === page
                                                                        ? "active"
                                                                        : ""
                                                                }`}
                                                                onClick={() =>
                                                                    handlePageChange(
                                                                        page
                                                                    )
                                                                }
                                                            >
                                                                {page}
                                                            </button>
                                                        ))}
                                                    </div>

                                                    <form
                                                        onSubmit={handleJumpSubmit}
                                                        className="jump-form"
                                                    >
                                                        <input
                                                            type="number"
                                                            min="1"
                                                            max={totalPages}
                                                            value={jumpInput}
                                                            onChange={(event) =>
                                                                setJumpInput(
                                                                    event.target.value
                                                                )
                                                            }
                                                            placeholder="Số trang..."
                                                            aria-label="Nhập số trang"
                                                        />
                                                        <button type="submit">
                                                            Đi
                                                        </button>
                                                    </form>
                                                </div>
                                            )}
                                        </div>
                                    ) : (
                                        <button
                                            key={item}
                                            type="button"
                                            className={`page-btn ${
                                                currentPage === item
                                                    ? "active"
                                                    : ""
                                            }`}
                                            onClick={() =>
                                                handlePageChange(item)
                                            }
                                        >
                                            {item}
                                        </button>
                                    )
                                )}

                                <button
                                    type="button"
                                    className="page-btn"
                                    onClick={() =>
                                        handlePageChange(currentPage + 1)
                                    }
                                    disabled={currentPage === totalPages}
                                >
                                    {"Sau >>"}
                                </button>
                            </div>
                        )}
                    </section>
                </div>
            </main>
        </div>
    );
}