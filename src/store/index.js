import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import cartReducer from './cartSlice';
import ordersReducer from './orderSlice';
import { startPersist } from './persist';

export const store = configureStore({
    reducer: { auth: authReducer, cart: cartReducer, orders: ordersReducer },
});

startPersist(store);
