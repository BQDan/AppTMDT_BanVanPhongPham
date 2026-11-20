import { useState } from "react";
import { useCart } from "../../hooks/useCart";
import { formatVND } from "../../lib/format";

export default function ProductCard({ product })
{
    const {addItem, lines} = useCart();
    const [added, setAdded] = useState(false);
    const inCart = lines.find((ln) => ln.id === product.id)?.qty || 0;
    const soldOut = inCart >= product.stock;

    const handle = () => {
        addItem(product.id, 1);
        setAdded(true);
        setTimeout(() => setAdded(false), 1000);
    };

    return (
        <article className='product-card'>
            <div className='product-thumb' aria-hidden='true'>{product.image}</div>
            <span className='product-cat'>{product.category}</span>
            <h3>{product.name}</h3>
            <p className='product-price'>{formatVND(product.price)}</p>
            <button type='button' className='btn-add-item' onClick={handle} disabled={soldOut}>
                {soldOut ? 'Đã hết hàng' : added ? 'Đã thêm sản phẩm' : 'Thêm vào giỏ hàng'}
            </button>

        </article>
    );
}