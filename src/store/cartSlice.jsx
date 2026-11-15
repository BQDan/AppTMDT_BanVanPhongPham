import { createSlice } from "@reduxjs/toolkit";
import { KEYS } from "../lib/storage";
import { MAX_QTY } from "../lib/constants";

const readCarts = () => {
    try {
        return JSON.parse(localStorage.getItem(KEYS.carts)) || {};
    } catch {
        return {};
    }
};
const readSessionId = () => {
    try {
        return JSON.parse(localStorage.getItem(KEYS.session))?.id || "guest";
    } catch {
        return "guest";
    }
};

const startKey = readSessionId();
const clamp = (n) => Math.max(1, Math.min(MAX_QTY, n));

const cartSlice = createSlice({
    name: "cart",
    initialState: { items: readCarts()[startKey] || [], loadedKey: startKey },
    reducers: {
        loadCart(state, action) {
            const key = action.payload;
            state.items = readCarts()[key] || [];
            state.loadedKey = key;
        },
        addItem(state, { payload: { id, qty } }) {
            const found = state.items.find((i) => i.id === id);
            if (found) found.qty = clamp(found.qty + qty);
            else state.items.push({ id, qty: clamp(qty) });
        },
        setQty(state, { payload: { id, qty } }) {
            const found = state.items.find((i) => i.id === id);
            if (found) found.qty = clamp(qty);
        },
        increase(state, { payload: id }) {
            const found = state.items.find((i) => i.id === id);
            if (found) found.qty = clamp(found.qty + 1);
        },
        decrease(state, { payload: id }) {
            const found = state.items.find((i) => i.id === id);
            if (found) found.qty = clamp(found.qty - 1);
        },
        removeItem(state, { payload: id }) {
            state.items = state.items.filter((i) => i.id !== id);
        },
        clearCart(state) {
            state.items = [];
        },
    },
});

export const { loadCart, addItem, setQty, increase, decrease, removeItem, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
