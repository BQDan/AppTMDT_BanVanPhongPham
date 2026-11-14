import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import '../css/auth.css';

export function Login() 
{
    const { login } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const [form, setForm] = useState({email: '', password:''});
    const [error, setError] = useState('');
    const [busy, setBusy] = useState(false);
    const [showPW, setShowPW] = useState(false);

    const onChange = (c) => setForm({...form, [e.target.name]: e.target.value});
    const onSubmit = async (s) => {
        s.preventDefault();
        setError('');

        setBusy(true);
        const response = await login(form);
        setBusy(false);
        
        if(!response.ok) return setError(response.error);
        
        navigate(location.state?.from || '/', {replace:true});
    };

    return (
        <div className='auth-page'>
            <div className='auth-card'>
                <Link to='/' className='brand'>
                    VHD<span>STORE</span>
                </Link>

                <h1>Đăng nhập</h1>
                <p>Chào mừng bạn quay trở lại với VHD</p>

                {location.state?.from && (
                    <div className='alert alert-info'>Vui lòng đăng nhập để tiếp tục.</div>
                )}
                {error && <div className='alert alert-error' role='alert'>{}error</div>}

                <form onSubmit={onSubmit} noValidate>
                    <label htmlFor='email'>Email</label>
                    <input id='email' name='email' type="email" autoComplete='username' 
                    placeholder='Nhập email...' value={form.email} onChange={onChange} required/>

                    <label htmlFor='password'>Mật khẩu</label>
                    <div className='pw-wrap'>
                        <input id='password' name='password' type={showPW?'text':'password'}
                        autoComplete='current-password' placeholder='Nhập mật khẩu'
                        value={form.password} onChange={onChange} required/>

                        <button type='button' className='pw-toggle' onClick={() => setShowPW(!showPW)}>
                            {showPW ? 'Ẩn' : 'Hiện'}
                        </button>
                    </div>
                        

                    <button type='submit' disabled={busy}>{busy ? 'Đang xử lý...' : 'Đăng nhập'}</button>
                </form>
                
                <p className='auth-switch'>
                    Chưa có tài khoản?
                    <Link to='/register'> Đăng ký ngay</Link>
                </p>
            </div>
        </div>
    );
}