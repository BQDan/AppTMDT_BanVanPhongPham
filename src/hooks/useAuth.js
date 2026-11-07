import { useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import {loginUser, registerUser, logout as logoutAction} from "../store/authSlice";
import {ROLES} from "../lib/constants";

export {ROLES};
export function useAuth(){
    const dispatch = useDispatch();
    const ready = useSelector((s) => s.auth.ready);
    const user = useSelector((s) => s.auth.user);

    const login = useCallback((form) => dispatch(loginUser(form)).unwrap(), [dispatch]);
    const register = useCallback((form) => dispatch(registerUser(form)).unwrap(), [dispatch]);
    const logout = useCallback(() => dispatch(logoutAction()), [dispatch]);

    return useMemo(() => ({
        ready, user, isAuthenticated: !!user,
        hasRole: (...roles) => !!user && roles.includes(user.role),
        login, register, logout
    }), [ready, user, login, register, logout]);
}