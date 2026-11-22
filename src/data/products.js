import catalog from '../../products.json';

export const PRODUCTS = catalog.map((product) => ({
    ...product,
    id: String(product.id),
    price: Number(String(product.price).replace(/[^\d]/g, '')),
    stock: product.stock ?? (product.status === 'Còn hàng' ? 99 : 0),
}));

export const getProduct = (id) =>
    PRODUCTS.find((product) => String(product.id) === String(id)) ?? null;