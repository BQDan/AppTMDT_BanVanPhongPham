import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../hooks/useAuth";

function LoginPage() {
    const navigate = useNavigate();
    const location = useLocation();
    const { login } = useAuth();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleLogin = (event) => {
        event.preventDefault();
        setError("");

        if (!email || !password) {
            setError("Vui lòng nhập đầy đủ email và mật khẩu.");
            return;
        }

        const result = login({ email, password });

        if (!result.ok) {
            setError(result.errors);
            return;
        }

        navigate(location.state?.from || "/", { replace: true });
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
                        <label htmlFor="email">Email</label>
                        <input
                            id="email"
                            type="email"
                            placeholder="Nhập email của bạn"
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Mật khẩu</label>
                        <input
                            id="password"
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

                    {error && <p className="auth-error">{error}</p>}

                    <button type="submit" className="auth-button">
                        ĐĂNG NHẬP
                    </button>
                </form>

                <div className="auth-footer">
                    <span>Chưa có tài khoản?</span>{" "}
                    <Link to="/register" state={location.state}>
                        Đăng ký ngay
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default LoginPage;