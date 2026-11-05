
function TopBar() {
    return (
        <div className="topbar">
            <div className="site-container topbar-inner">
                <p>
                    Chào mừng bạn đến với <strong>VHD Store</strong>
                </p>

                <div className="topbar-links">
                    <a href="/login">Đăng nhập</a>
                    <a href="/register">Đăng ký</a>
                    <a href="#contact">Liên hệ</a>
                </div>
            </div>
        </div>
    );
}

export default TopBar;
