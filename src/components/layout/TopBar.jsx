import { Link } from "react-router-dom";

export function TopBar() {
    return (
        <div className="topbar">
            <div className="site-container topbar-inner">
                <p>
                    Chào mừng bạn đến với <strong>VHD Store</strong>
                </p>

                <div className="topbar-links">
                    <Link to='/login' className='login-link'>
                    Đăng nhập
                    </Link>
                    <Link to='/register' className='register-link'>
                    Đăng ký
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default TopBar;
