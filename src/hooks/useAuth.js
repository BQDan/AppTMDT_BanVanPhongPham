import { useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, registerUser, loggedOut as logoutAction, selectCurrentUser} from "../store/authSlice";

export function useAuth(){
    const dispatch = useDispatch();
    const ready = useSelector(selectCurrentUser);

    const user = useMemo(() => {
        if(!account) return null;
        const { password: _pw, ...rest } = account;
        return rest;
    }, [account]);

    const login = useCallback((form) => dispatch(loginUser(form)), [dispatch]);
    const register = useCallback((form) => dispatch(registerUser(form)), [dispatch]);
    const logout = useCallback(() => dispatch(logoutAction()), [dispatch]);

    return useMemo(() => ({
        user, isAuthenticated: !!user, login, register, logout,
    }), [user, login, register, logout]);
}