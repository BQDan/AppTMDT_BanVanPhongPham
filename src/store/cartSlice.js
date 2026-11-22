import { createSlice } from '@reduxjs/toolkit';
import { KEYS, readJSON } from '../lib/storage';
import { MAX_QTY } from '../lib/constants';
import { getProduct } from '../data/products';
import { loggedIn, loggedOut } from './authSlice';

export function cleanItems(items) {
    if (!Array.isArray(items)) return [];
    const map = new Map();
    for (const it of items) {
        const p = it && getProduct(it.id);
        if (!p) continue;
        const qty = Math.floor(Number(it.qty));
        if (!Number.isFinite(qty) || qty < 1) continue;
        map.set(p.id, Math.min((map.get(p.id) || 0) + qty, Math.min(p.stock, MAX_QTY)));
    }
    return [...map].map(([id, qty]) => ({ id, qty }));
}

function loadInitial() {
    const saved = readJSON(KEYS.carts, {});
    const users = readJSON(KEYS.users, []);
    const sessionId = readJSON(KEYS.session, null);
    const carts = {};
    for (const key of Object.keys(saved)) carts[key] = cleanItems(saved[key]);
    if (!carts.guest) carts.guest = [];

    const ownerKey = users.some((u) => u.id === sessionId) ? sessionId : 'guest';
    if (!carts[ownerKey]) carts[ownerKey] = [];
    return { carts, ownerKey };
}

const current = (state) => state.carts[state.ownerKey];
const update = (state, id, fn) => {
    state.carts[state.ownerKey] = cleanItems(current(state).map((i) => (i.id === id ? fn(i) : i)));
};

const cartSlice = createSlice({
    name: 'cart',
    initialState: loadInitial,
    reducers: {
        addItem(state, { payload: { id, qty = 1 } }) {
            const list = current(state);
            state.carts[state.ownerKey] = cleanItems(
                list.some((i) => i.id === id)
                    ? list.map((i) => (i.id === id ? { ...i, qty: i.qty + qty } : i))
                    : [...list, { id, qty }]
            );
        },
        setQty(state, { payload: { id, qty } }) { update(state, id, (i) => ({ ...i, qty })); },
        increase(state, { payload: id }) { update(state, id, (i) => ({ ...i, qty: i.qty + 1 })); },
        decrease(state, { payload: id }) { update(state, id, (i) => ({ ...i, qty: Math.max(1, i.qty - 1) })); },
        removeItem(state, { payload: id }) {
            state.carts[state.ownerKey] = current(state).filter((i) => i.id !== id);
        },
        clearCart(state) { state.carts[state.ownerKey] = []; },
    },

    extraReducers: (b) => {
        b.addCase(loggedIn, (state, { payload: userId }) => {
            state.carts[userId] = cleanItems([...(state.carts[userId] || []), ...state.carts.guest]);
            state.carts.guest = [];
            state.ownerKey = userId;
        });
        b.addCase(loggedOut, (state) => { state.ownerKey = 'guest'; });
    },
});

export const { addItem, setQty, increase, decrease, removeItem, clearCart } = cartSlice.actions;
export default cartSlice.reducer;

const EMPTY = [];
export const selectCartItems = (s) => s.cart.carts[s.cart.ownerKey] || EMPTY;
