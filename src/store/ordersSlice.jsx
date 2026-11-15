import { createSlice } from "@reduxjs/toolkit";
import { KEYS } from "../lib/storage";
import { clearCart } from "./cartSlice";

const readOrders = () => {
    try {
        return JSON.parse(localStorage.getItem(KEYS.orders)) || [];
    } catch {
        return [];
    }
};

const ordersSlice = createSlice({
    name: "orders",
    initialState: { all: readOrders() },
    reducers: {
        orderAdded(state, action) {
            state.all.push(action.payload);
        },
        statusChanged(state, { payload: { id, status } }) {
            const od = state.all.find((o) => o.id === id);
            if (od) od.status = status;
        },
    },
});

const { orderAdded, statusChanged } = ordersSlice.actions;

// useOrders gọi: placeOrder(infor, items), updateOrderStatus(id, status), cancelOrder(id)
export const placeOrder = (infor, items) => (dispatch, getState) => {
    const user = getState().auth.user;
    const order = {
        id: "OD" + Date.now(),
        userId: user ? user.id : null,
        ...infor,
        items,
        status: "pending",
        createdAt: Date.now(),
    };
    dispatch(orderAdded(order));
    dispatch(clearCart());
    return order;
};
export const updateOrderStatus = (id, status) => (dispatch) => dispatch(statusChanged({ id, status }));
export const cancelOrder = (id) => (dispatch) => dispatch(statusChanged({ id, status: "cancelled" }));

export default ordersSlice.reducer;
