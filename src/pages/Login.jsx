import { Link } from 'react-router-dom';

export function Login() 
{
    return (
        <div className='auth-page'>
            <div className='auth-card'>
                <Link to='/' className='brand'>
                    VHD<span>STORE</span>
                </Link>

                <h1>Đăng nhập</h1>
                <p>Chào mừng bạn quay trở lại với VHD</p>

                <form>
                    <label>Email</label>
                    <input type="email" placeholder='Nhập email...' required/>

                    <label>Mật khẩu</label>
                    <input type="password" placeholder='Nhập mật khẩu' required/>

                    <button type='submit'>Đăng nhập</button>
                </form>
                
                <p className='auth-switch'>
                    Chưa có tài khoản?
                    <Link to='/register'> Đăng ký ngay</Link>
                </p>
            </div>
        </div>
    );
}