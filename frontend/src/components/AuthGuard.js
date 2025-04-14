import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

function AuthGuard({ children }) {
    const { user, isInit } = useAuth();
    if (isInit) {
        if (!user) {
            return <Navigate to="/login" />;
        }
    }
    return children;
}

export default AuthGuard;