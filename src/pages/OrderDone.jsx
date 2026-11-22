import { Link, Navigate, useParams } from 'react-router-dom';
import { useOrders } from "../hooks/useOrders";
import { formatVND } from '../lib/format';
import '../css/cart.css';

export default function OrderDone()
{
    const {id} = useParams();
    const {orders} = useOrders();
    const order = orders.find((o) => o.id === id);
    if(!order) return <Navigate to='/account/orders' replace/>;

    return (
        <section className='cart-empty'>
            <h1>Đặt hàng thành công!</h1>
            <p>Mã đơn hàng: <strong>{order.id}</strong></p>
            <p>Tổng thanh toán: <strong>{formatVND(order.total)}</strong></p>
            <div className='row-gap'>
                <Link to='/account/orders' className='btn btn-primary'>Xem đơn hàng</Link>
                <Link to='/' className='btn btn-ghost'>Tiếp tục mua hàng</Link>
            </div>
        </section>
    );
}