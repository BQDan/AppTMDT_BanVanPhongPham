import { createSlice } from '@reduxjs/toolkit';
import { KEYS, readJSON } from '../lib/storage';
import { PAYMENTS, shippingFor } from '../lib/constants';
import { cleanText, isValidName, isValidEmail, isValidPhone, isValidAddress, isNotEmpty} from '../lib/valid';
import { getProduct } from '../data/products';
import { selectCurrentUser } from './authSlice';

const ordersSlice = createSlice({
    name: 'orders',
    initialState: () => ({ all: readJSON(KEYS.orders, []) }),
    reducers: {
        orderAdded(state, { payload }) { state.all.push(payload); },
        orderCancelled(state, { payload: id }) {
            const o = state.all.find((x) => x.id === id);
            if (o) o.status = 'cancelled';
        },
    },
});

export const { orderAdded, orderCancelled } = ordersSlice.actions;
export default ordersSlice.reducer;

function validateInfo(info) {
    const e = {};
    if (!isValidName(info.fullName)) e.fullName = 'Họ tên từ 2 đến 60 ký tự.';
    if (!isValidPhone(info.phone)) e.phone = 'Số điện thoại không hợp lệ.';
    if (!isValidEmail(info.email)) e.email = 'Email không hợp lệ.';
    if (!isValidAddress(info.address)) e.address = 'Vui lòng nhập địa chỉ cụ thể (số nhà, đường).';
    if (!isNotEmpty(info.city)) e.city = 'Vui lòng nhập tỉnh/thành phố.';
    if (!PAYMENTS[info.payment]) e.payment = 'Vui lòng chọn phương thức thanh toán.';
    return e;
}

export const placeOrder = (rawInfo, cartItems) => (dispatch, getState) => {
    const user = selectCurrentUser(getState());
    if (!user) return { ok: false, errors: { _: 'Bạn cần đăng nhập để đặt hàng.' } };

    const info = {
        fullName: cleanText(rawInfo.fullName, 60),
        phone: cleanText(rawInfo.phone, 15).split(' ').join(''),
        email: cleanText(rawInfo.email, 120).toLowerCase(),
        address: cleanText(rawInfo.address, 200),
        city: cleanText(rawInfo.city, 60),
        note: cleanText(rawInfo.note, 300),
        payment: rawInfo.payment,
    };
    const errors = validateInfo(info);
    if (Object.keys(errors).length) return { ok: false, errors };

    const items = [];
    for (const ci of cartItems) {
        const p = getProduct(ci.id);
        if (!p || ci.qty < 1 || ci.qty > p.stock) {
            return { ok: false, errors: { _: 'Giỏ hàng có sản phẩm không hợp lệ hoặc vượt tồn kho.' } };
        }
        items.push({ id: p.id, name: p.name, price: p.price, qty: ci.qty });
    }
    if (!items.length) return { ok: false, errors: { _: 'Giỏ hàng đang trống.' } };

    const subtotal = items.reduce((s, i) => s + i.price * i.qty, 0);
    const shipping = shippingFor(subtotal);
    const order = {
        id: 'VHD' + Date.now().toString(36).toUpperCase() + Math.random().toString(36).slice(2, 4).toUpperCase(),
        userId: user.id,
        info,
        items,
        subtotal,
        shipping,
        total: subtotal + shipping,
        status: 'pending',
        createdAt: Date.now(),
    };
    dispatch(orderAdded(order));
    return { ok: true, order };
};

export const cancelOrder = (id) => (dispatch, getState) => {
    const state = getState();
    const user = selectCurrentUser(state);
    const o = state.orders.all.find((x) => x.id === id);
    if (!user || !o || o.userId !== user.id || o.status !== 'pending') return false;
    dispatch(orderCancelled(id));
    return true;
};
