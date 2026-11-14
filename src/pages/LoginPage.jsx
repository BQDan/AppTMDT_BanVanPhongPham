import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

function LoginPage() {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = (event) => {
        event.preventDefault();

        if (!email || !password) {
            alert("Vui lòng nhập đầy đủ email và mật khẩu!");
            return;
        }

        alert("Đăng nhập thành công!");

        navigate("/");
    };

    return (
        <div className="auth-page">
            <div className="auth-card">
                <div className="auth-logo">
                    <img src="/images/logo/vhd-logo.png" alt="VHD Store" />
                </div>

                <h1>Đăng nhập</h1>
                <p className="auth-description">
                    Đăng nhập để tiếp tục mua sắm tại VHD Store
                </p>

                <form onSubmit={handleLogin}>
                    <div className="form-group">
                        <label>Email</label>
                        <input
                            type="email"
                            placeholder="Nhập email của bạn"
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
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

                    <div className="auth-options">
                        <label className="remember">
                            <input type="checkbox" />
                            Ghi nhớ đăng nhập
                        </label>

                        <a href="#forgot-password">Quên mật khẩu?</a>
                    </div>

                    <button type="submit" className="auth-button">
                        ĐĂNG NHẬP
                    </button>
                </form>

                <div className="auth-footer">
                    <span>Chưa có tài khoản?</span>{" "}
                    <Link to="/register">Đăng ký ngay</Link>
                </div>
            </div>
        </div>
    );
}

export default LoginPage;