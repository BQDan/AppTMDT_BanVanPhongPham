import { Link, useNavigate } from "react-router-dom";
import { useCart, MAX_QTY } from '../hooks/useCart';
import { useAuth } from '../hooks/useAuth';
import { CATEGORY_NAMES, FREE_SHIP_FROM, shippingFor } from "../lib/constants";
import { formatVND } from '../lib/format';
import '../css/cart.css';
import '../css/account.css';

export default function Cart()
{
    const {lines, subtotal, increase, decrease, setQty, removeItem, clearCart} = useCart();
    const {user, isAuthenticated} = useAuth();
    const navigate = useNavigate();
    const shipping = shippingFor(subtotal);
    
    if(!lines.length)
    {
        return (
            <section className="cart-empty">
                <div className="cart-empty-icon">🛒</div>
                <h1>Giỏ hàng đang trống</h1>
                <p>
                    {isAuthenticated
                        ? `Giỏ hàng của ${user.email} chưa có sản phẩm.`
                        : 'Hãy chọn thêm sản phẩm'}
                </p>
                <Link to='/products' className="btn btn-primary">Tiếp tục mua sắm</Link>
            </section>
        );
    }

    const onQtyInput = (line, value) => {
        const num = Math.floor(Number(value));
        if(!Number.isFinite(num)) return;
        setQty(line.id, Math.min(Math.max(num, 1), Math.min(line.stock, MAX_QTY)));
    };

    const goCheckOut = () => navigate('/checkout');
    return (
        <section className="cart-page">
            <h1>Giỏ hàng <span className="muted">({lines.length} loại sản phẩm)</span></h1>
            
            {isAuthenticated ? (
                <p className="account-note">
                    Giỏ hàng của <b>{user.name}</b> ({user.email}) - được lưu lại cho lần đăng nhập sau.
                </p>
            ) : (
                <p className="account-note guest">
                    Bạn chưa đăng nhập. <Link to='/login' state={{ from: '/cart' }}>Đăng nhập</Link> hoặc{''}
                    <Link to='/register' state={{ from: '/cart' }}>Đăng ký</Link> để lưu giỏ hàng vào tài khoản và đặt hàng.
                </p>
            )}

            <div className="cart-layout">
                <div className="cart-list">
                    <div className="cart-head">
                        <span>Sản phẩm</span>
                        <span>Đơn giá</span>
                        <span>Số lượng</span>
                        <span>Thành tiền</span>
                        <span />
                    </div>
                    
                    {lines.map((line) => (
                        <div className="cart-row" key={line.id}>
                            <div className="cart-product">
                                <div className="cart-thumb">
                                    <img src={line.image} alt={line.name} />
                                </div>
                                <div>
                                    <h3>{line.name}</h3>
                                    <small>{CATEGORY_NAMES[line.category] || line.category} - Còn {line.stock}</small>
                                </div>
                            </div>

                            <div className="cart-price" data-label='Đơn giá'>{formatVND(line.price)}</div>
                            
                            <div className="qty" data-label='Số lượng'>
                                
                                <button 
                                    type="button" 
                                    onClick={() => decrease(line.id)} 
                                    disabled={line.qty <= 1} 
                                    aria-label="Giảm số lượng"
                                >
                                    -
                                </button>
                                
                                <input 
                                    type="number" 
                                    min='1' 
                                    max={Math.min(line.stock, MAX_QTY)} 
                                    value={line.qty}
                                    onChange={(c) => onQtyInput(line, c.target.value)} 
                                    aria-label={`Số lượng ${line.name}`} 
                                />
                                
                                <button 
                                    type="button" 
                                    onClick={() => increase(line.id)} 
                                    disabled={line.qty >= Math.min(line.stock, MAX_QTY)} 
                                    aria-label="Tăng số lượng"
                                >
                                    +
                                </button>
                            </div>

                            <div className="cart-line-total" data-label='Thành tiền'>{formatVND(line.lineTotal)}</div>
                            
                            <button 
                                type="button" 
                                className="cart-remove"
                                onClick={() => removeItem(line.id)}
                                aria-label={`Xoá ${line.name}`}
                            >
                                ✕
                            </button>
                        </div>
                    ))}

                    <div className="cart-actions">
                        <Link to='/products' className="btn btn-ghost">Tiếp tục mua sắm</Link>
                        <button 
                            type="button" 
                            className="btn btn-ghost danger"
                            onClick={() => {
                                if(window.confirm('Xoá hết giỏ hàng?')) clearCart();
                            }}
                        >
                            Xoá giỏ hàng
                        </button>
                    </div>
                </div>

                <aside className="summary">
                    <h2>Tóm tắt đơn hàng</h2>
                    <dl>
                        <div><dt>Tạm tính</dt><dd>{formatVND(subtotal)}</dd></div>
                        <div><dt>Phí vận chuyển</dt><dd>{shipping ? formatVND(shipping) : 'Miễn phí'}</dd></div>
                        <div className="sum-total"><dt>Tổng cộng</dt><dd>{formatVND(subtotal + shipping)}</dd></div>
                    </dl>
                    {shipping > 0 &&(
                        <p className="ship-hint">Mua thêm {formatVND(FREE_SHIP_FROM - subtotal)} để được miễn phí vận chuyển.</p>
                    )}
                    <button
                        type="button" 
                        className="btn btn-primary btn-block"
                        onClick={goCheckOut}
                    >
                        {isAuthenticated ? 'Tiến hành đặt hàng' : 'Đăng nhập để đặt hàng'}
                    </button>
                </aside>
            </div>
        </section>
    );
}