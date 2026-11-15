export const PRODUCTS = [
    {id: 'pid01', name: 'Bút thiên long TL-027 (Hộp 20 cây)', price:50000}
];
export const getProduct = (id) => PRODUCTS.find((p) => p.id === id);