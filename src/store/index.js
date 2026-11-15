import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import cartReducer, { loadCart } from "./cartSlice";
import ordersReducer from "./ordersSlice";
import { KEYS } from "../lib/storage";

export const store = configureStore({
    reducer: { auth: authReducer, cart: cartReducer, orders: ordersReducer },
});

const save = (key, value) => {
    try {
        localStorage.setItem(key, JSON.stringify(value));
    } catch { /* bỏ qua */ }
};

store.subscribe(() => {
    const { auth, cart, orders } = store.getState();
    const key = auth.user?.id || "guest";

    // đổi tài khoản (đăng nhập/đăng xuất) -> nạp giỏ hàng của tài khoản đó
    if (cart.loadedKey !== key) {
        store.dispatch(loadCart(key));
        return;
    }

    let carts = {};
    try {
        carts = JSON.parse(localStorage.getItem(KEYS.carts)) || {};
    } catch { /* bỏ qua */ }
    carts[key] = cart.items;
    save(KEYS.carts, carts);
    save(KEYS.orders, orders.all);
});

export default store;
