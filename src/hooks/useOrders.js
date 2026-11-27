import { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";

import * as OD from "../store/orderSlice";
import { selectCurrentUser } from "../store/authSlice";

export function useOrders()
{
    const dispatch = useDispatch();
    const all = useSelector((s) => s.orders.all);
    const user = useSelector(selectCurrentUser);

    const orders = useMemo(() => {
        if(!user) return [];
        const list = all.filter((od) => od.userId === user.id);
        return [...list].sort((a, b) => b.createdAt - a.createdAt);
    }, [all, user]);
    
    const lastShipping = useMemo(() => {
        const info = orders[0]?.info;
        return info ? { phone: info.phone, address: info.address, city: info.city } : null;
    }, [orders]);

    return useMemo(() => ({
        orders,
        lastShipping,
        getOrder: (id) => orders.find((od) => od.id === id) || null,
        placeOrder: (infor, items) => dispatch(OD.placeOrder(infor, items)),
        cancelOrder: (id) => dispatch(OD.cancelOrder(id)),
    }), [orders, lastShipping, dispatch]);
}