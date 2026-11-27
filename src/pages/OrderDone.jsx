import { Link, Navigate, useParams } from 'react-router-dom';
import { useOrders } from "../hooks/useOrders";
import { PAYMENTS } from '../lib/constants';
import { formatVND } from '../lib/format';
import '../css/cart.css';
import '../css/account.css';

export default function OrderDone()
{
    const {id} = useParams();
    const {getOrder} = useOrders();
    const order = getOrder(id);
    if(!order) return <Navigate to='/account/orders' replace/>;

    return (
        <section className='cart-empty'>
            <h1>Đặt hàng thành công!</h1>
            <p>Mã đơn hàng: <strong>{order.id}</strong></p>
            <p>Tổng thanh toán: <strong>{formatVND(order.total)}</strong> ({PAYMENTS[order.info.payment]})</p>
            <p>Giao tới: {order.info.fullName} - {order.info.phone}<br />{order.info.address}, {order.info.city}</p>
            <p className="muted-text">Đơn hàng thuộc tài khoản {order.customer?.email || order.info.email}</p>
            <div className='row-gap'>
                <Link to='/account/orders' className='btn btn-primary'>Xem đơn hàng</Link>
                <Link to='/products' className='btn btn-ghost'>Tiếp tục mua hàng</Link>
            </div>
        </section>
    );
}