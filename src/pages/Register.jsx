import { Link } from 'react-router-dom';

export function Register() 
{
    return (
        <div className='auth-page'>
            <div className='auth-card'>
                <Link to='/' className='brand'>
                    VHD<span>STORE</span>
                </Link>

                <h1>Tạo tài khoản</h1>
                <p>Tham gia mua sắm cùng VHD!</p>

                <form>
                    <label>Họ và tên</label>
                    <input type='text' placeholder='Nhập họ tên...' required />

                    <label>Email</label>
                    <input type='email' placeholder='Nhập email...' required/>

                    <label>Số điện thoại</label>
                    <input type='tel' placeholder='Nhập số điện thoại...' required />

                    <label>Mật khẩu</label>
                    <input type='password' placeholder='Nhập mật khẩu...' required/>

                    <label>Nhập lại mật khẩu</label>
                    <input type='password' placeholder='Nhập lại mật khẩu...' required/>

                    <button type='submit'>Đăng ký</button>
                </form>
                
                <p className='auth-switch'>
                    Đã có tài khoản?
                    <Link to='/login'> Đăng nhập</Link>
                </p>
            </div>
        </div>
    );
}