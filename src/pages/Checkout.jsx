import { useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useCart } from '../hooks/useCart';
import { useAuth } from '../hooks/useAuth';
import { useOrders } from '../hooks/useOrders';
import { PAYMENTS, shippingFor } from '../lib/constants';
import { formatVND } from '../lib/format';
import '../css/cart.css';

export default function Checkout()
{
    const { user } = useAuth();
    const {lines, subTotal, clearCart } = useCart();
    const { placeOrder } = useOrders();
    const navigate = useNavigate();
    const [form, setForm] = useState({
        fullName: user?.name || '',
        phone: '',
        email: user?.email || '',
        address: '',
        city: '',
        note: '',
        payment: 'cod'
    });
    const [errors, setErrors] = useState({});
    const [placed, setPlaced] = useState(false);

    if(!lines.length && !placed) return <Navigate to='/cart' replace />

    const shiping = shippingFor(subTotal);
    const onChange = (c) => setForm({ ...form, [c.target.name]: errors.target.value });

    const onSubmit = (s) => {
        s.prevemtDefault();
        const response = placeOrder(form, lines.map((l) => ({id: l.id, qty: l.qty })));
        if(!response.ok) return setErrors(response.errors);
        setPlaced(true);
        clearCart();
        navigate('/order-done/${response.order.id}', {replace: true});
    };

    const error = (e) => errors[e] && <span className='field-error' role='alert'>{errors[e]}</span>;

    return (
        <section className='cart-page'>
            <h1>Thông tin đặt hàng</h1>
            {errors._ && <div className='alert alert-error'>{errors._}</div>}

            <form className='cart-layout' onSubmit={onSubmit} noValidate>
                <div className='form-card'>
                    <h2>Thông tin giao hàng</h2>
                    <div className='form-grid'>
                        <div>
                            <label htmlFor='fullName'>Họ và tên</label>
                            <input id='fullName' name='fullName' value={form.fullName}
                                onChange={onChange} maxLength={60} autoComplete='name' />
                            {error('fullName')}
                        </div>
                        <div>
                            <label htmlFor='phone'>Số điện thoại</label>
                            <input id='phone' name='phone' value={form.phone} type='tel'
                                onChange={onChange} maxLength={15} autoComplete='tel' />
                            {error('phone')}
                        </div>
                        <div className='full'>
                            <label htmlFor='email'>Email</label>
                            <input id='email' name='email' value={form.email} type='email'
                                onChange={onChange} maxLength={120} autoComplete='email' />
                            {error('email')}
                        </div>
                        <div className='full'>
                            <label htmlFor='addres'>Địa chỉ nhận hàng</label>
                            <input id='addres' name='address' value={form.address}
                                onChange={onChange} maxLength={200} 
                                placeholder='Số nhà, đường, phường(xã)'
                                autoComplete='street-address' />
                            {error('address')}
                        </div>
                        <div className='full'>
                            <label htmlFor='city'>Tỉnh / Thành phố *</label>
                            <input id='city' name='city' value={form.city}
                                onChange={onChange} maxLength={60} />
                            {error('city')}
                        </div>
                        <div className='full'>
                            <label htmlFor='note'>Ghi chú</label>
                            <textarea id='note' name='note' value={form.note} rows={4}
                                onChange={onChange} maxLength={300}
                                placeholder='Ghi chú cho giao hàng...'
                                autoComplete='name' />
                        </div>
                    </div>

                    <h2>Phương thức thanh toán</h2>
                    <div className='pay-options'>
                        {Object.entries(PAYMENTS).map(([key, label]) => (
                            <label key={key} className={'pay-opt' + (form.payment === key ? ' active' : '')}>
                                <input type='radio' name='payments' value={key}
                                    checked={form.payment === key} onChange={onChange} />
                                {label}
                            </label>
                        ))}
                    </div>
                    {error('payment')}
                </div>

                <aside className='summary'>
                    <h2>Đơn hàng ({lines.length})</h2>
                    <ul className='mini-list'>
                        {lines.map((l) => (
                            <li key={l.id}>
                                <span>{l.name} <b>* {l.qty}</b></span>
                                <span>{formatVND(l.lineTotal)}</span>
                            </li>
                        ))}
                    </ul>
                    <dl>
                        <div><dt>Tạm tính</dt><dd>{formatVND(subTotal)}</dd></div>
                        <div><dt>Phí vận chuyển</dt><dd>{shiping ? formatVND(shiping) : 'Miễn phí'}</dd></div>
                        <div className='sum-total'><dt>Tổng cộng: </dt><dd>{formatVND(subTotal + shiping)}</dd></div>
                    </dl>
                    <button type='submit' className='btn btn-primary btn-block'>Xác nhận đặt hàng</button>
                    <Link to='/cart' className='btn btn-ghost btn-block'>Quay lại giỏ hàng</Link>
                </aside>
            </form>
        </section>
    );
}