import { useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, registerUser, logout as logoutAction, currentUser} from "../store/authSlice";

export function useAuth(){
    const dispatch = useDispatch();
    const ready = useSelector(currentUser);
    
    const user = useMemo(() => {
        if(!ready) return null;
        const { password: _pw, ...rest } = ready;
        return rest;
    }, [ready]);

    const login = useCallback((form) => dispatch(loginUser(form)).unwrap(), [dispatch]);
    const register = useCallback((form) => dispatch(registerUser(form)).unwrap(), [dispatch]);
    const logout = useCallback(() => dispatch(logoutAction()), [dispatch]);

    return useMemo(() => ({
        user, isAuthenticated: !!user, login, register, logout,
    }), [user, login, register, logout]);
}