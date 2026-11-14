import { Link } from 'react-router-dom';
import '../css/cart.css';

export default function NotFound()
{
    return (
        <section className='cart-empty'>
            <h1>404 - Không tìm thấy trang</h1>
            <Link to='/' className='btn btn-primary'>Về trang chủ</Link>
        </section>
    );
}
