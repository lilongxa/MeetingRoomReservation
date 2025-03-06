import { jwtDecode } from "jwt-decode";
import axiosInstance from "./axios";

const isValidToken = (accessToken) => {
    if (!accessToken) return false;

    const decoded = jwtDecode(accessToken);

    return Date.now() < decoded.exp * 1000;
};

const setSession = (accessToken) => {
    if (accessToken) {
        axiosInstance.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
    } else {
        delete axiosInstance.defaults.headers.common.Authorization;
    }
};

const decodeJwt = (accessToken) => {
    if (!accessToken) return null;

    return jwtDecode(accessToken);
}

export { isValidToken, setSession, decodeJwt };