import { lazy, Suspense } from "react";
import { Route, Routes } from 'react-router-dom';
import MainLayout from './components/layout/MainLayout';
import { RequireAuth, Custom} from './routes/custom';

import { Home } from './pages/Home';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import OrderDone from './pages/OrderDone';
import Orders from './pages/Order';
import NotFound from './pages/NotFound';
import { Login } from './pages/Login';
import { Register } from './pages/Register';

const Products = lazy(() => import('./products.jsx');

export default function App()
{
    return (
        <Routes>
            <Route element={<Custom />}>
                <Route path='/login' element={<Login/>} />
                <Route path='/register' element={<Register/>} />
            </Route>

            <Route path='/products' element={
                <Suspense fallback={<div className='page-loading'>Đang tải...</div>}>
                    <Products />
                </Suspense>
            } />

            <Route element={<MainLayout />}>
                <Route path='/'  element={<Home />} />
                <Route path='/cart'  element={<Cart />} />

                <Route element={<RequireAuth />}>
                    <Route path='/checkout' element={<Checkout />} />
                    <Route path='/order-done/:id' element={<OrderDone />} />
                    <Route path='/account/orders' element={<Orders />} />
                </Route>
                <Route path='*' element={<NotFound />} />
            </Route>
        </Routes>
    ) 
}