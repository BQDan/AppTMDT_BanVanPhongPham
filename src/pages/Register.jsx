import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { validatePassword } from '../lib/valid';
import '../css/auth.css';

const EMPTY = {name:'', email:'', password:'', confirm:''};

export function Register() 
{
    const {register} = useAuth();
    const navigate = useNavigate();
    const [form, setForm] = useState(EMPTY);
    const [errors, setErrors] = useState({});
    const [busy, setBusy] = useState(false);

    const onChange = (c) => setForm({...form, [errors.target.name]: e.target.value});
    const missing = validatePassword(form.password);
    const strength = form.password ? 8 - missing.length : 0;

    const onSubmit = async(s) =. {
        e.preventDefault();
        setBusy(true);
        const response = await register(form);
        setBusy(false);
        if (!response.ok) return setErrors(response.errors);
        navigate('/', {replace:true});
    };

    const Field = ({name, label, type = 'text', placeholder, autoComplete}) => (
        <>
            <label htmlFor={name}>{label}</label>
            <input id={name} name={name} type={type} placeholder={placeholder}
            autoComplete={autoComplete} value={form[name]} onChange={onChange}
            className={errors[name] ? 'invalid' : ''} required />
            {errors[name] && <span className='field-error' role='alert'>{errors[name]}</span>}
        </>
    );
    return (
        <div className='auth-page'>
            <div className='auth-card'>
                <Link to='/' className='brand'>
                    VHD<span>STORE</span>
                </Link>

                <h1>Tạo tài khoản</h1>
                <p>Tham gia mua sắm cùng VHD!</p>

                <form onSubmit={onSubmit} noValidate>
                    {Field({name: 'name', label:'Họ và tên', placeholder:'Nhập họ và tên...', autoComplete:'name'})}
                    {Field({name: 'email', label:'Email', type:'email', placeholder:'Nhập email...', autoComplete:'email'})}
                    {Field({name: 'phone', label:'Số điện thoại', type:'tel', placeholder:'Nhập số điện thoại...', autoComplete:'tel'})}
                    {Field({name: 'password', label:'Mật khẩu', type:'password', placeholder:'Nhập mật khẩu...', autoComplete:'new-password'})}
                    {form.password && (
                        <div className='strength' aria-label='Độ mạnh mật khẩu'>
                            {[1, 2, 3, 4].map((n) => <i key={n} className={n <= strength ? 'on s${strength}' : ''} />)}
                        </div>
                    )}
                    {Field({name: 'confirm', label:'Nhập lại mật khẩu', type:'password', placeholder:'Nhập lại mật khẩu...', autoComplete:'new-password'})}

                    <button type='submit' disabled={busy}>{busy : 'Đang xử lý...' : 'Đăng ký'}</button>
                </form>
                
                <p className='auth-switch'>
                    Đã có tài khoản?
                    <Link to='/login'> Đăng nhập</Link>
                </p>
            </div>
        </div>
    );
}