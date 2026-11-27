import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";

import { useCart } from "../hooks/useCart";
import { useAuth } from "../hooks/useAuth";
import { useOrders } from "../hooks/useOrders";
import { PAYMENTS, shippingFor } from "../lib/constants";
import { formatVND } from "../lib/format";
import "../css/cart.css";
import '../css/account.css';

export default function Checkout() {
    const { user } = useAuth();
    const { lines, subtotal } = useCart();
    const { placeOrder, lastShipping } = useOrders();
    const navigate = useNavigate();

    const [form, setForm] = useState({
        fullName: user?.name || "",
        phone: user?.phone || lastShipping?.phone || "",
        email: user?.email || "",
        address: lastShipping?.address || "",
        city: lastShipping?.city || "",
        note: "",
        payment: "cod",
    });
    const [errors, setErrors] = useState({});
    const [submitting, setSubmitting] = useState(false);
    // vì sau khi đặt xong thì giỏ sẽ bị xoá
    // ngăn tự chuyển trang về cart trước khi qua order-done
    const [placed, setPlaced] = useState(false);

    if (!lines.length && !placed) {
        return <Navigate to="/cart" replace />;
    }

    const shipping = shippingFor(subtotal);

    const onChange = (event) => {
        const { name, value } = event.target;

        setForm((currentForm) => ({
            ...currentForm,
            [name]: value,
        }));

        setErrors((currentErrors) => ({
            ...currentErrors,
            [name]: "",
            _: "",
        }));
    };

    const onSubmit = (event) => {
        event.preventDefault();
        if(submitting || placed) return;
        setSubmitting(true);

        const response = placeOrder(form);

        if (!response.ok) {
            setSubmitting(false);
            setErrors(response.errors);
            requestAnimationFrame(() => 
                document.querySelector('.alert-error, .field-error')
                    ?.scrollIntoView({ block: 'center', behavior:'smooth' })
            );
            return;
        }

        setPlaced(true);
        navigate(`/order-done/${response.order.id}`, { replace: true });
    };

    const showError = (field) =>
        errors[field] ? (
            <span className="field-error" role="alert">
                {errors[field]}
            </span>
        ) : null;

    return (
        <section className="cart-page">
            <h1>Thông tin đặt hàng</h1>

            <p className="account-note">
                Đặt hàng bằng tài khoản <b>{user.name}</b> ({user.email}). Đơn hàng sẽ có trong mục{' '}
                <Link to='/account/orders'>Đơn hàng của tôi</Link>
            </p>

            {errors._ && (
                <div className="alert alert-error" role="alert">
                    {errors._}
                </div>
            )}

            <form className="cart-layout" onSubmit={onSubmit} noValidate>
                <div className="form-card">
                    <h2>Thông tin giao hàng</h2>

                    <div className="form-grid">
                        <div>
                            <label htmlFor="fullName">Họ và tên</label>
                            <input
                                id="fullName"
                                name="fullName"
                                value={form.fullName}
                                onChange={onChange}
                                maxLength={60}
                                autoComplete="name"
                            />
                            {showError("fullName")}
                        </div>

                        <div>
                            <label htmlFor="phone">Số điện thoại</label>
                            <input
                                id="phone"
                                name="phone"
                                type="tel"
                                value={form.phone}
                                onChange={onChange}
                                maxLength={15}
                                autoComplete="tel"
                            />
                            {showError("phone")}
                        </div>

                        <div className="full">
                            <label htmlFor="email">Email</label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                value={form.email}
                                onChange={onChange}
                                maxLength={120}
                                autoComplete="email"
                            />
                            {showError("email")}
                        </div>

                        <div className="full">
                            <label htmlFor="address">Địa chỉ nhận hàng</label>
                            <input
                                id="address"
                                name="address"
                                value={form.address}
                                onChange={onChange}
                                maxLength={200}
                                placeholder="Số nhà, đường, phường/xã"
                                autoComplete="street-address"
                            />
                            {showError("address")}
                        </div>

                        <div className="full">
                            <label htmlFor="city">Tỉnh / Thành phố</label>
                            <input
                                id="city"
                                name="city"
                                value={form.city}
                                onChange={onChange}
                                maxLength={60}
                                autoComplete="address-level1"
                            />
                            {showError("city")}
                        </div>

                        <div className="full">
                            <label htmlFor="note">Ghi chú</label>
                            <textarea
                                id="note"
                                name="note"
                                value={form.note}
                                onChange={onChange}
                                rows={4}
                                maxLength={300}
                                placeholder="Ghi chú cho giao hàng..."
                            />
                        </div>
                    </div>

                    <h2>Phương thức thanh toán</h2>

                    <div className="pay-options">
                        {Object.entries(PAYMENTS).map(([key, label]) => (
                            <label
                                key={key}
                                className={
                                    "pay-opt" +
                                    (form.payment === key ? " active" : "")
                                }
                            >
                                <input
                                    type="radio"
                                    name="payment"
                                    value={key}
                                    checked={form.payment === key}
                                    onChange={onChange}
                                />
                                {label}
                            </label>
                        ))}
                    </div>

                    {showError("payment")}
                </div>

                <aside className="summary">
                    <h2>Đơn hàng ({lines.length})</h2>

                    <ul className="mini-list">
                        {lines.map((line) => (
                            <li key={line.id}>
                                <span>
                                    {line.name} <b>× {line.qty}</b>
                                </span>
                                <span>{formatVND(line.lineTotal)}</span>
                            </li>
                        ))}
                    </ul>

                    <dl>
                        <div>
                            <dt>Tạm tính</dt>
                            <dd>{formatVND(subtotal)}</dd>
                        </div>

                        <div>
                            <dt>Phí vận chuyển</dt>
                            <dd>
                                {shipping
                                    ? formatVND(shipping)
                                    : "Miễn phí"}
                            </dd>
                        </div>

                        <div className="sum-total">
                            <dt>Tổng cộng</dt>
                            <dd>{formatVND(subtotal + shipping)}</dd>
                        </div>
                    </dl>

                    <button
                        type="submit"
                        className="btn btn-primary btn-block"
                        disabled={submitting}
                    >
                        {submitting ? 'Đang xử lý...' : 'Xác nhận đặt hàng'}
                    </button>

                    <Link to="/cart" className="btn btn-ghost btn-block">
                        Quay lại giỏ hàng
                    </Link>
                </aside>
            </form>
        </section>
    );
}
