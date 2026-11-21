import products from "./products.json";

export const PRODUCTS = products;

export const getProduct = (id) =>
    PRODUCTS.find((product) => String(product.id) === String(id)) ?? null;