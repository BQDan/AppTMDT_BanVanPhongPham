import { createSlice } from '@reduxjs/toolkit';
import { KEYS, readJSON } from '../lib/storage';
import { ORDER_STATUS, PAYMENTS, shippingFor } from '../lib/constants';
import { cleanText, isValidName, isValidEmail, isValidPhone, isValidAddress, isNotEmpty} from '../lib/valid';
import { getProduct } from '../data/products';
import { selectCurrentUser } from './authSlice';
import { clearCart, selectCartItems } from './cartSlice';

const isValidOrder = (o) => {
    return Boolean(o && typeof o === 'object' && typeof o.id === 'string' && o.id &&
        typeof o.userId === 'string' && o.userId && o.info && typeof o.info === 'object' &&
        Array.isArray(o.items) && o.items.length > 0 &&
        o.items.every((i) => i && i.id && typeof i.name === 'string' &&
            Number.isFinite(Number(i.price)) && Number(i.price) >= 0 &&
            Number.isInteger(Number(i.qty)) && Number(i.qty) > 0) &&
        Number.isFinite(Number(o.total)) && Number(o.createdAt) > 0);
};

function loadOrders() {
    const raw = readJSON(KEYS.orders, []);
    const all = (Array.isArray(raw) ? raw : []).filter(isValidOrder).map((o) => ({
        ...o,
        status: ORDER_STATUS[o.status] ? o.status : 'pending'
    }));
    return {all};
}

const ordersSlice = createSlice({
    name: 'orders',
    initialState: loadOrders,
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

const normalizePhone = (p) => {
    const phone = cleanText(p, 15).split(' ').join('');
    return phone.startsWith('+84') ? '0' + phone.slice(3) : phone;
}

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

const newOrderId = (all) => {
    let id;
    do {
        id='VHD' + Date.now().toString(36).toUpperCase() + Math.random().toString(36).slice(2, 4).toUpperCase();
    } while (all.some((o) => o.id === id));
    return id;
};

export const placeOrder = (rawInfo) => (dispatch, getState) => {
    const state = getState();
    const user = selectCurrentUser(state);
    if (!user) return { ok: false, errors: { _: 'Phiên đăng nhập hết hạn, vui lòng đăng nhập lại để đặt hàng.' } };

    const cart = selectCartItems(state);
    if(!cart.length) return { ok: false, errors:{ _: 'Giỏ hàng đang trống.'}};

    const info = {
        fullName: cleanText(rawInfo.fullName, 60),
        phone: normalizePhone(rawInfo.phone, 15),
        email: cleanText(rawInfo.email, 120).toLowerCase(),
        address: cleanText(rawInfo.address, 200),
        city: cleanText(rawInfo.city, 60),
        note: cleanText(rawInfo.note, 300),
        payment: rawInfo.payment,
    };
    const errors = validateInfo(info);

    const items = [];
    const problems = [];
    for (const ci of cart) {
        const p = getProduct(ci.id);
        if (!p || p.stock < 1) problems.push(`"${p ? p.name : ci.id}" hiện không còn hàng.`);
        else if (ci.qty < 1 || ci.qty > p.stock) problems.push(`"${p.name}" chỉ còn ${p.stock} sản phẩm.`);
        else items.push({ id: p.id, name: p.name, price: p.price, qty: ci.qty, image: p.image });
    }
    if(problems.length) errors._ = problems.join(' ');
    if (Object.keys(errors).length) return { ok: false, errors };

    const subtotal = items.reduce((s, i) => s + i.price * i.qty, 0);
    const shipping = shippingFor(subtotal);
    const order = {
        id: newOrderId(state.orders.all),
        userId: user.id,
        customer: { id: user.id, name: user.name, email: user.email, phone: user.phone || '' },
        info,
        items,
        subtotal,
        shipping,
        total: subtotal + shipping,
        status: 'pending',
        createdAt: Date.now(),
    };
    dispatch(orderAdded(order));
    dispatch(clearCart());
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
