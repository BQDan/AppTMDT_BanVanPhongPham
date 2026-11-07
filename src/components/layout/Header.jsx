import { Link } from "react-router-dom";
import { useCart } from "../../hooks/useCart";
function Header() {
    const { count } = useCart();

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
                    onSubmit={(event) => event.preventDefault()}
                >
                    <input
                        type="search"
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
