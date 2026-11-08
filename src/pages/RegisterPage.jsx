import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

function RegisterPage() {
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleRegister = (event) => {
        event.preventDefault();

        if (!name || !email || !phone || !password || !confirmPassword) {
            alert("Vui lòng nhập đầy đủ thông tin!");
            return;
        }

        if (password !== confirmPassword) {
            alert("Mật khẩu xác nhận không khớp!");
            return;
        }

        alert("Đăng ký tài khoản thành công!");

        navigate("/login");
    };

    return (
        <div className="auth-page">
            <div className="auth-card register-card">
                <div className="auth-logo">
                    <img src="/images/logo/vhd-logo.png" alt="VHD Store" />
                </div>

                <h1>Đăng ký tài khoản</h1>

                <p className="auth-description">
                    Tạo tài khoản để mua sắm tại VHD Store
                </p>

                <form onSubmit={handleRegister}>
                    <div className="form-group">
                        <label>Họ và tên</label>
                        <input
                            type="text"
                            placeholder="Nhập họ và tên"
                            value={name}
                            onChange={(event) => setName(event.target.value)}
                        />
                    </div>

                    <div className="form-group">
                        <label>Email</label>
                        <input
                            type="email"
                            placeholder="Nhập email"
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                        />
                    </div>

                    <div className="form-group">
                        <label>Số điện thoại</label>
                        <input
                            type="tel"
                            placeholder="Nhập số điện thoại"
                            value={phone}
                            onChange={(event) => setPhone(event.target.value)}
                        />
                    </div>

                    <div className="form-group">
                        <label>Mật khẩu</label>
                        <input
                            type="password"
                            placeholder="Nhập mật khẩu"
                            value={password}
                            onChange={(event) => setPassword(event.target.value)}
                        />
                    </div>

                    <div className="form-group">
                        <label>Xác nhận mật khẩu</label>
                        <input
                            type="password"
                            placeholder="Nhập lại mật khẩu"
                            value={confirmPassword}
                            onChange={(event) => setConfirmPassword(event.target.value)}
                        />
                    </div>

                    <button type="submit" className="auth-button">
                        ĐĂNG KÝ
                    </button>
                </form>

                <div className="auth-footer">
                    <span>Đã có tài khoản?</span>{" "}
                    <Link to="/login">Đăng nhập</Link>
                </div>
            </div>
        </div>
    );
}

export default RegisterPage;