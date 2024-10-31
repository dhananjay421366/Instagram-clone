// axiosInstance.js
import axios from "axios";
import store from "@/redux/store";
import { logoutUser } from "@/redux/AuthSlice";

const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_API_BASE_URL, // Replace with your API base URL
    withCredentials: true,
});

axiosInstance.interceptors.response.use(
    response => response,
    error => {
        if (error.response && error.response.status === 401) {
            // Clear tokens and log the user out
            localStorage.removeItem("accessToken");
            localStorage.removeItem("refreshToken");
            store.dispatch(logoutUser());
            window.location.href = "/login";
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;
