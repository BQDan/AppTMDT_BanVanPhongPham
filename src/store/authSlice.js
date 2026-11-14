import { createSlice } from '@reduxjs/toolkit';
import { KEYS, readJSON } from '../lib/storage';
import { ROLES } from '../lib/constants';

import { cleanText, isValidName, isValidEmail, validatePassword } from '../lib/valid';

function loadInit(){
    const users = readJSON(KEYS.users, []);
    const sessionId = readJSON(KEYS.session, null);
    return {
        users: Array.isArray(users) ? users : [],
        currentId; users.some((u) => u.id === sessionId ? sessionId : null)
    };
}

const authSlice = createSlice({
    name: 'auth',
    initialState: loadInit,
    reducers: {
        userAdded(state, {payload}) {state.users.push(payload); },
        loggedIn(state, {payload: id}) {state.currentId = id; },
        loggedOut(state) {state.currentId = null; }
    },
});

export const { userAdded, loggedIn, loggedOut } = authSlice.actions;
export default authSlice.reducers;

export const selectCurrentUser = (s) => 
    s.auth.users.find((u) => u.id === s.auth.currentId) || null;

export const registerUser = (form) => (dispatch, getState) => {
    const name = cleanText(form.name, 60);
    const email = cleanText(form.email, 60).toLowerCase();
    const { password = '', confirm = '' } = form;

    const errors = {};
    if (!isValidName(name)) errors.name = 'Họ tên phải 2-60 ký tự.';
    if (!isValidEmail(email)) errors.email = 'Email không hợp lệ.';
    
    const pwErrors = validatePassword(password);
    if (pwErrors.length) errors.password = 'Mật khẩu cần: ' + pwErrors.join(', ') + '.';
    if (password !== confirm) errors.confirm = 'Nhập lại mật khẩu không khớp.';
    if(Object.keys(errors).length) return { ok: false, errors };

    if(getState().auth.users.some((u) => u.email === email)) {
        return { ok: false, errors: { email: 'Email đã được đăng ký.'} };
    }

    const user = {
        id: 'u_' + Date.now().toString(36) + Math.random().toString(36).slice(2, 6),
        name,
        email,
        password,
        role: ROLES.CUSTOMER,
        createdAt: Date.now()
    };

    dispatch(userAdded(user));
    dispatch(loggedIn(user.id));
    return { ok: true };
};

export const loginUser = ({ email, password }) => (dispatch, getState) => {
    const mail = cleanText(email, 120).toLowerCase();
    if(!isValidEmail(mail)) return { ok: false, errors: 'Email không hợp lệ.' };
    if(!password) return { ok: false, errors: 'Vui lòng nhập lại mật khẩu.' };

    const user = getState().auth.users.find((u) => u.email === mail && u.password === password);
    if(!user) return { ok: false, errors: 'Email hoặc mật khẩu không đúng.' };

    dispatch(loggedIn(user.id));
    return { ok: true };
};