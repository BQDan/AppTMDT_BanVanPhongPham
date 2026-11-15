import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { KEYS } from "../lib/storage";
import { ROLES } from "../lib/constants";

const read = (key, fallback) => {
    try {
        const raw = localStorage.getItem(key);
        return raw ? JSON.parse(raw) : fallback;
    } catch {
        return fallback;
    }
};
const write = (key, value) => {
    try {
        localStorage.setItem(key, JSON.stringify(value));
    } catch { /* bỏ qua */ }
};

export const registerUser = createAsyncThunk(
    "auth/register",
    async ({ name, email, phone, password }, { rejectWithValue }) => {
        const users = read(KEYS.users, []);
        const mail = String(email).trim().toLowerCase();
        if (users.some((u) => u.email === mail)) {
            return rejectWithValue("Email đã được đăng ký");
        }
        const user = {
            id: "u" + Date.now(),
            name, email: mail, phone, password,
            role: users.length === 0 ? ROLES.ADMIN : ROLES.CUSTOMER,
        };
        write(KEYS.users, [...users, user]);
        const { password: _pw, ...safe } = user;
        write(KEYS.session, safe);
        return safe;
    }
);

export const loginUser = createAsyncThunk(
    "auth/login",
    async ({ email, password }, { rejectWithValue }) => {
        const users = read(KEYS.users, []);
        const mail = String(email).trim().toLowerCase();
        const found = users.find((u) => u.email === mail && u.password === password);
        if (!found) return rejectWithValue("Email hoặc mật khẩu không đúng");
        const { password: _pw, ...safe } = found;
        write(KEYS.session, safe);
        return safe;
    }
);

const authSlice = createSlice({
    name: "auth",
    initialState: { user: read(KEYS.session, null), ready: true },
    reducers: {
        logout(state) {
            state.user = null;
            localStorage.removeItem(KEYS.session);
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(registerUser.fulfilled, (state, action) => { state.user = action.payload; })
            .addCase(loginUser.fulfilled, (state, action) => { state.user = action.payload; });
    },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
