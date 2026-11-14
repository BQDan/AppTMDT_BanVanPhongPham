import { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";

import * as OD from "../store/ordersSlice";
import {currentUser} from '../store/authSlice';

export function useOrders()
{
    const dispatch = useDispatch();
    const all = useSelector((s) => s.orders.all);
    const user = useSelector(currentUser);

    const orders = useMemo(() => {
        if(!user) return [];
        const list = all.filter((od) => od.userId === user.id);
        return [...list].sort((a, b) => b.createdAt - a.createdAt);
    }, [all, user]);
    
    return useMemo(() => ({
        orders,
        placeOrder: (infor, items) => dispatch(OD.placeOrder(infor, items)),
        cancelOrder: (id) => dispatch(OD.cancelOrder(id)),
    }), [orders, dispatch]);
}
