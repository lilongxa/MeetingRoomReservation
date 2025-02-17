import React, { createContext, useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { login as loginService } from "../services/authService";
import { decodeJwt, isValidToken, setSession } from "../utils/jwt";

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState();
    const [isInit, setIsInit] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        const accessToken = localStorage.getItem("accessToken");

        // Check if both user and token exist and are valid
        if (storedUser && accessToken && isValidToken(accessToken)) {
            setSession(accessToken);
            setUser(JSON.parse(storedUser)); // Parse and set user from localStorage
        } else if (accessToken) {
            // If token exists but is invalid, clean up
            localStorage.removeItem("accessToken");
            localStorage.removeItem("user");
            setSession(null);
        }
        setIsInit(true)
    }, []);

    const login = async (email, password) => {
        var response = await loginService(email, password);
        if (response.statusCode === 200) {
            const token = response.data.token;
            setSession(token);
            setLoginUser(token);
        }

        throw (response?.message);
    };

    const setLoginUser = (accessToken) => {
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
    };

    const logout = () => {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("user");
        setUser(null);
        navigate("/login");
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, isInit }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);