export const KEYS = {
    users: 'vhd_users',
    session: 'vhd_session',
    attempts: 'vhd_login_attempts',
    carts: 'vhd_carts',
    orders: 'vhd_orders'
};

export function readJSON(key, fallback) {
    try {
        const raw = localStorage.getItem(key);
        return raw ? JSON.parse(raw) : fallback;
    } catch {
        return fallback;
    }
}

export function writeJSON(key, value){
    try {
        localStorage.setItem(key, JSON.stringify(value));
        return true;
    } catch(error) {
        console.error("Không lưu được", error);
        return false;
    }
}