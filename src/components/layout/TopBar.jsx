import { Link, useNavigate } from "react-router-dom";
import { useAuth, ROLES } from "../../hooks/useAuth";

export default function TopBar() {
    const {use, logout} = useAuth();
    const navigate = useNavigate();

    return (
        <div className="topbar">
            <div className="site-container topbar-inner">
                <p>
                    {user ? <>Xin chào, <strong>{user.name}</strong></> : <>Chào mừng bạn đến với <strong>VHD Store</strong></>}
                </p>

                <div className="topbar-links">
                    {user ? (
                        <>
                            <Link to='/account/orders'>Đơn hàng của tôi</Link>
                            <button type='button' className='link-btn' onClick={() => { logout(); navigate('/'); }}>
                                Đăng xuất
                            </button>
                        </>
                    ) : (
                        <>
                            <Link to='/login' className='login-link'>
                                Đăng nhập
                            </Link>
                            <Link to='/register' className='register-link'>
                                Đăng ký
                            </Link>
                        </>
                    )}
                    <a href="#contact">Liên hệ</a>
                </div>
            </div>
        </div>
    );
}
export default TopBar;