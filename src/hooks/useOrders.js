import { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";

import * as OD from "../store/ordersSlice";
import { ROLES, PAYMENTS, ORDER_STATUS, FREE_SHIP_FROM, shippingFor } from "../lib/constants";

export { PAYMENTS, ORDER_STATUS, FREE_SHIP_FROM, shippingFor };
export function useOrders()
{
    const dispatch = useDispatch();
    const all = useSelector((s) => s.orders.all);
    const user = useSelector((s) => s.auth.user);

    const orders = useMemo(() => {
        if(!user) return [];
        const list = user.role === ROLES.ADMIN ? all : all.filter((od) => od.userId === user.id);
        return [...list].sort((a, b) => b.createdAt - a.createdAt);
    }, [all, user]);
    
    return useMemo(() => ({
        orders,
        placeOrder: (infor, items) => dispatch(OD.placeOrder(infor, items)),
        updateStatus: (id, status) => dispatch(OD.updateOrderStatus(id, status)),
        cancelOrder: (id) => dispatch(OD.cancelOrder(id)),
    }), [orders, dispatch]);
}
