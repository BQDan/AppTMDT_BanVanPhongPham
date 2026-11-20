import { Link } from 'react-router-dom';

export function Home()
{
    return (
        <div className='home-page'>
            <header className='home-header'>
                <Link to='/' className='brand'>
                    VHD<span>STORE</span>
                </Link>

                <nav>
                    <Link to='/'>Trang chủ</Link>
                    <a href='#products'>Sản phẩm</a>
                    <a href='#about'>Giới thiệu</a>
                </nav>

                <div className='header-actions'>
                    <Link to='/login' className='login-link'>
                        Đăng nhập
                    </Link>

                    <Link to='/register' className='register-link'>
                        Đăng ký
                    </Link>
                </div>
            </header>
            <main>
                <section className='main'>
                    <div className='content'>
                        <span className='label'>
                            VHDSTORE - Văn phòng phẩm chất lượng
                        </span>

                        <h1>
                            Khơi nguồn sáng tạo,
                            <br />
                            từ những điều nhỏ nhất
                        </h1>

                        <p>
                            Khám phá văn phòng phẩm của chúng tôi với nhiều mặt hàng phục vụ học tập và công việc.
                        </p>

                        <a href='#products' className='shop-btn'>
                            Khám phá ngay
                        </a>
                    </div>
                </section>
                <section id='products' className='product-sec'>
                    <h2>Sản phẩm nổi bật</h2>
                    <p>Những sản phẩm văn phòng được ưa chuộng</p>

                    <div className='product-placeholder'>
                        Sản phẩm sẽ được cập nhật liên tục ngay khi có thay đổi.
                    </div>
                </section>
                <section id='about' className='about-sec'>
                    <h2>Về VHDSTORE</h2>
                    <p>
                        VHDSTORE mang đến giải pháp mua sắm văn phòng phẩm tiện lợi, chất lượng và tiêt kiệm.
                    </p>
                </section>
            </main>
            <footer className='home-footer'>
                © 2026 VHDSTORE. All rights reserved.
            </footer>
        </div>
    );
}