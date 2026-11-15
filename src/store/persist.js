import { KEYS, writeJSON } from '../lib/storage';

export function startPersist(store) {
    let prev = store.getState();

    return store.subscribe(() => {
        const next = store.getState();
        if (next.auth.users !== prev.auth.users) writeJSON(KEYS.users, next.auth.users);
        if (next.auth.currentId !== prev.auth.currentId) writeJSON(KEYS.session, next.auth.currentId);
        if (next.cart.carts !== prev.cart.carts) writeJSON(KEYS.carts, next.cart.carts);
        if (next.orders.all !== prev.orders.all) writeJSON(KEYS.orders, next.orders.all);
        prev = next;
    });
}
