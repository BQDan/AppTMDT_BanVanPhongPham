import { Link } from 'react-router-dom';
import { useOrders, ORDER_STATUS, PAYMENTS } from "../hooks/useOrders";
import { formatVND } from '../lib/format';
import '../css/cart.css';

export default function Orders()
{
    const {orders, cancelOrder} = useOrders();
    if(!orders.length)
    {
        return (
            <section className='cart-empty'>
                <h1>Bạn chưa có đon hàng nào</h1>
                <Link to='/' className='btn btn-primary'>Hãy mua hàng ngay</Link>
            </section>
        );
    }
    return (
        <section className='cart-page'>
            <h1>Đơn hàng của tôi</h1>
            {orders.map((o) =>(
                <article className='order-card' key={o.id}>
                    <header>
                        <div><strong>{o.id}</strong><small>{new Date(o.createAt).toLocaleString('vi-VN')}</small></div>
                        <span className={'status st-${o.status}'}>{ORDER_STATUS[o.status]}</span>
                    </header>
                    <ul className='mini-list'>
                        {o.items.map((i) => (
                            <li key={i.id}><span>{i.name} <b> * {i.qty}</b></span><span>{formatVND(i.price * i.qty)}</span></li>
                        ))}
                    </ul>
                    <footer>
                        <span>{PAYMENTS[o.info.payment]} - Giao tới: {o.info.address}, {o.info.city}</span>
                        <strong>{formatVND(o.total)}</strong>
                    </footer>
                    {o.status === 'pending' && (
                        <button type='button' className='btn btn-ghost danger'
                            onClick={() => {if(window.confirm('Huỷ đơn hàng này')) cancelOrder(o.id); }}>
                            Huỷ đơn
                        </button>
                    )}
                </article>
            ))}
        </section>
    );
}