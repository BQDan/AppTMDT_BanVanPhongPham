
const navItems = [
    "VĂN PHÒNG PHẨM",
    "ĐỒ DÙNG HỌC SINH",
    "HỌA CỤ SAKURA",
    "KALA-Y",
    "STEAM/STEM",
    "KHUYẾN MÃI",
    "BLOG",
];

function Navbar() {
    return (
        <nav className="main-nav">
            <div className="site-container nav-inner">
                {navItems.map((item, index) => (
                    <a href={`/products?category=${index}`} key={item}>
                        {item}
                    </a>
                ))}
            </div>
        </nav>
    );
}

export default Navbar;
