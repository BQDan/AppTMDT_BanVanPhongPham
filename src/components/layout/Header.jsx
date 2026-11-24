import { useState, useEffect } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useCart } from "../../hooks/useCart";

function Header() {
    const { count } = useCart();
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const [keyword, setKeyword] = useState(searchParams.get("search") || "");

    useEffect(() => {
        setKeyword(searchParams.get("search") || "");
    }, [searchParams]);

    const handleSearchSubmit = (event) => {
        event.preventDefault();
        const trimmed = keyword.trim();
        if (trimmed) {
            navigate(`/products?search=${encodeURIComponent(trimmed)}`);
        } else {
            navigate("/products");
        }
    };

    return (
        <header className="site-header">
            <div className="site-container header-inner">

                <Link className="brand" to="/">
                    <img
                        src="/images/logo/vhd-logo.png"
                        alt="VHD Store"
                    />
                </Link>

                <form
                    className="search"
                    onSubmit={handleSearchSubmit}
                >
                    <input
                        type="search"
                        value={keyword}
                        onChange={(e) => setKeyword(e.target.value)}
                        placeholder="Bạn muốn tìm sản phẩm gì?"
                    />

                    <button type="submit" aria-label="Tìm kiếm">
                        <span>⌕</span>
                    </button>
                </form>

                <a className="header-contact" href="tel:02422462003">
                    <span className="header-icon">☎</span>
                    <div>
                        <small>Hotline hỗ trợ</small>
                        <strong>024.2246.2003</strong>
                    </div>
                </a>

                <Link className="header-cart" to="/cart">
                    <span className="header-icon">
                        🛒
                        {count > 0 && <span className='cart-badge'>{count > 99 ? '99+' : count}</span>}</span>
                    <div>
                        <strong>Giỏ hàng</strong>
                        <small>{count > 0 ? `${count} sản phẩm` : 'Kiểm tra đơn hàng'}</small>
                    </div>
                </Link>

            </div>
        </header>
    );
}

export default Header;