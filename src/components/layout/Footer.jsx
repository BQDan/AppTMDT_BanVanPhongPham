import { Link } from "react-router-dom";

function Footer() {
    return (
        <footer className="site-footer" id="contact">
            <div className="site-container footer-grid">
                <div className="footer-col">
                    <Link className="footer-brand" to="/">
                        <img
                            src="/images/logo/vhd-logo.png"
                            alt="VHD Store"
                        />
                    </Link>
                    <p className="footer-desc">
                        Chuyên cung cấp văn phòng phẩm, dụng cụ học tập và thiết
                        bị văn phòng chính hãng với giá tốt nhất cho học sinh,
                        sinh viên và doanh nghiệp.
                    </p>
                    <ul className="footer-contact-list">
                        <li>📍 Khu phố 6, P. Linh Trung, TP. Thủ Đức, TP.HCM</li>
                        <li>
                            📞 Hotline:{" "}
                            <a href="tel:02422462003">024.2246.2003</a>
                        </li>
                        <li>
                            ✉️ Email:{" "}
                            <a href="mailto:dvkhatvhdstore.com.vn">
                                dvkhatvhdstore.com.vn
                            </a>
                        </li>
                    </ul>
                </div>

                <div className="footer-col">
                    <h4 className="footer-heading">DANH MỤC NỔI BẬT</h4>
                    <ul className="footer-links">
                        <li>
                            <Link to="/products?search=giay">
                                Giấy in - Giấy photo
                            </Link>
                        </li>
                        <li>
                            <Link to="/products?search=vo">
                                Tập vở - Sổ tay
                            </Link>
                        </li>
                        <li>
                            <Link to="/products?search=but">
                                Dụng cụ viết
                            </Link>
                        </li>
                        <li>
                            <Link to="/products?search=file">
                                File & Lưu trữ
                            </Link>
                        </li>
                        <li>
                            <Link to="/products?search=thiet bi">
                                Thiết bị văn phòng
                            </Link>
                        </li>
                    </ul>
                </div>

                <div className="footer-col">
                    <h4 className="footer-heading">HỖ TRỢ KHÁCH HÀNG</h4>
                    <ul className="footer-links">
                        <li>
                            <Link to="/products">Tất cả sản phẩm</Link>
                        </li>
                        <li>
                            <Link to="/cart">Giỏ hàng của bạn</Link>
                        </li>
                        <li>
                            <Link to="/account/orders">Tra cứu đơn hàng</Link>
                        </li>
                        <li>
                            <Link to="/login">Đăng nhập tài khoản</Link>
                        </li>
                        <li>
                            <Link to="/register">Đăng ký thành viên</Link>
                        </li>
                    </ul>
                </div>

                <div className="footer-col">
                    <h4 className="footer-heading">CHÍNH SÁCH & CAM KẾT</h4>
                    <ul className="footer-policy">
                        <li>✔ Cam kết 100% hàng chính hãng</li>
                        <li>✔ Giao hàng nhanh toàn quốc</li>
                        <li>✔ Đổi trả miễn phí trong 7 ngày</li>
                        <li>✔ Xuất hóa đơn VAT đầy đủ</li>
                    </ul>
                    <div className="footer-hours">
                        <strong>Giờ làm việc:</strong> 08:00 – 21:00 (Thứ 2 – Chủ nhật)
                    </div>
                </div>
            </div>

            <div className="footer-bottom">
                <div className="site-container footer-bottom-inner">
                    <span>
                        © {new Date().getFullYear()} VHD Store. Bảo lưu mọi
                        quyền.
                    </span>
                    <span>Website Thương Mại Điện Tử Bán Văn Phòng Phẩm</span>
                </div>
            </div>
        </footer>
    );
}

export default Footer;