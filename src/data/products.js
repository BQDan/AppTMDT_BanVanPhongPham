import data from './products.json';

export const PRODUCTS = data;
export const getProduct = (id) => PRODUCTS.find((p) => p.id === id) || null;
export const CATEGORIES = [...new Set(PRODUCTS.map((p) => p.category))];
