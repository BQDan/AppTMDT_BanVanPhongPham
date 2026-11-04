
function Header() {
    return (
        <header className="site-header">
            <div className="site-container header-inner">

                <a className="brand" href="/">
                    <img
                        src="/images/logo/vhd-logo.png"
                        alt="VHD Store"
                    />
                </a>

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

                <a className="header-cart" href="/cart">
                    <span className="header-icon">🛒</span>
                    <div>
                        <strong>Giỏ hàng</strong>
                        <small>Kiểm tra đơn hàng</small>
                    </div>
                </a>

            </div>
        </header>
    );
}

export default Header;
