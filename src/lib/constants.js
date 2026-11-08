export const ROLES = {ADMIN: 'admin', CUSTOMER: 'customer'};
export const MAX_QTY = 99;
export const FREE_SHIP_FROM = 150000;
export const SHIP_FEE = 15000;
export const PAYMENTS = {
    cod: 'Thanh toán khi nhận hàng (COD)',
    bank: 'Thanh toán online'
};
export const ORDER_STATUS = {
    pending: 'Chờ xác nhận',
    shipping: 'đang giao',,
    done: 'Hoàn thành đơn',
    cancelled: 'Đã huỷ'
};
export const shippingFor = (subtotal) => (
    subtotal === 0 ||
    subtotal >= FREE_SHIP_FROM ? 0 : SHIP_FEE
);