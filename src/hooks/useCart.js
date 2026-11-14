import { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";

import * as C from "../store/cartSlice";
import { getProduct } from "./data/products";
import { MAX_QTY } from "../lib/constants";

export { MAX_QTY };

export function useCart()
{
    const dispatch = useDispatch();
    const items = useSelector((s) => s.cart.items);

    return useMemo(() => {
        const lines = items.map((i) => {
            const product = getProduct(i.id);
            return {...product, qty: i.qty, lineTotals: product.price * i.qty};
        });
        return {
            lines,
            count: lines.reduce((s, l) => s + l.qty, 0),
            subtotal: lines.reduce((s, l) => s + l.lineTotals, 0),
            addItem: (id, qty = 1) => dispatch(C.addItem({id, qty})),
            setQty: (id, qty) => dispatch(C.setQty({id, qty}));
            increase: (id) => dispatch(C.increase(id)),
            decrease: (id) => dispatch(C.decrease(id)),
            removeItem: (id) => dispatch(C.removeItem(id)),
            clearCart: (id) => dispatch(C.clearCart(id)),
        };
    }, [items, dispatch]);
}