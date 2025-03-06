import React, { createContext, useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { login as loginService } from "../services/authService";
import { decodeJwt, isValidToken, setSession } from "../utils/jwt";

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [isInit, setIsInit] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const initAuth = () => {
            try {
                const storedUser = localStorage.getItem("user");
                const accessToken = localStorage.getItem("accessToken");

                if (storedUser && accessToken && isValidToken(accessToken)) {
                    const parsedUser = JSON.parse(storedUser);
                    setSession(accessToken);
                    setUser(parsedUser);
                    setIsAuthenticated(true);
                } else {
                    // 只有在 token 无效时才清理
                    if (accessToken && !isValidToken(accessToken)) {
                        localStorage.removeItem("accessToken");
                        localStorage.removeItem("user");
                        setSession(null);
                        setIsAuthenticated(false);
                        navigate("/login");
                    }
                }
            } catch (error) {
                console.error("Auth initialization error:", error);
                localStorage.removeItem("accessToken");
                localStorage.removeItem("user");
                setSession(null);
                setIsAuthenticated(false);
            } finally {
                setIsInit(true);
            }
        };

        initAuth();
    }, [navigate]);

    const login = async (email, password) => {
        try {
            const response = await loginService(email, password);
            
            if (response.status === 200 && response.data?.token) {
                const token = response.data.token;
                setSession(token);
                setLoginUser(token);
                setIsAuthenticated(true);
                return true;
            }
            
            throw new Error(response.message || '登录失败，请检查用户名和密码');
        } catch (error) {
            console.error('Login error:', error);
            setIsAuthenticated(false);
            throw error;
        }
    };

    const setLoginUser = (accessToken) => {
        try {
            const jwtPayload = decodeJwt(accessToken);
            const user = {
                id: jwtPayload.id,
                email: jwtPayload.email,
                username: jwtPayload.unique_name,
                role: jwtPayload.role,
            };
            localStorage.setItem("accessToken", accessToken);
            localStorage.setItem("user", JSON.stringify(user));
            setUser(user);
        } catch (error) {
            console.error('Error setting user:', error);
            logout();
        }
    };

    const logout = () => {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("user");
        setSession(null);
        setUser(null);
        setIsAuthenticated(false);
        navigate("/login");
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, isInit, isAuthenticated }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);