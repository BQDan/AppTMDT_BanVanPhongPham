import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../hooks/useAuth";

function RegisterPage() {
    const navigate = useNavigate();
    const { register } = useAuth();

    const [errors, setErrors] = useState({});
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleRegister = (event) => {
        event.preventDefault();
        setErrors({});

        // Số điện thoại VN: 10 chữ số, bắt đầu bằng 0
        if (!/^0\d{9}$/.test(phone.trim())) {
            setErrors({ phone: "Số điện thoại phải gồm 10 chữ số, bắt đầu bằng 0." });
            return;
        }

        const result = register({
            name,
            email,
            phone,
            password,
            confirm: confirmPassword,
        });

        if (!result.ok) {
            setErrors(result.errors);
            return;
        }

        navigate("/");
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
                        {errors.name && <small className="field-error">{errors.name}</small>}
                    </div>

                    <div className="form-group">
                        <label>Email</label>
                        <input
                            type="email"
                            placeholder="Nhập email"
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                        />
                        {errors.email && <small className="field-error">{errors.email}</small>}
                    </div>

                    <div className="form-group">
                        <label>Số điện thoại</label>
                        <input
                            type="tel"
                            placeholder="Nhập số điện thoại"
                            value={phone}
                            onChange={(event) => setPhone(event.target.value)}
                        />
                        {errors.phone && <small className="field-error">{errors.phone}</small>}
                    </div>

                    <div className="form-group">
                        <label>Mật khẩu</label>
                        <input
                            type="password"
                            placeholder="Nhập mật khẩu"
                            value={password}
                            onChange={(event) => setPassword(event.target.value)}
                        />
                        {errors.password && <small className="field-error">{errors.password}</small>}
                    </div>

                    <div className="form-group">
                        <label>Xác nhận mật khẩu</label>
                        <input
                            type="password"
                            placeholder="Nhập lại mật khẩu"
                            value={confirmPassword}
                            onChange={(event) => setConfirmPassword(event.target.value)}
                        />
                        {errors.confirm && <small className="field-error">{errors.confirm}</small>}
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
