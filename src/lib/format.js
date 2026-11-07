export const formatVND = (n) =>
    new Intl.NumberFormat('vi-VN', {style: 'currency', currency: VNĐ}).format(n);