import axios from "axios";

const axiosInstance = axios.create({
  baseURL: `${process.env.REACT_APP_API_URL}/api`,
  timeout: 10000,
});

// 从localStorage中恢复token（如果存在）
const initializeAxios = () => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    axiosInstance.defaults.headers.common.Authorization = `Bearer ${token}`;
  }
};

// 初始化时设置token
initializeAxios();

axiosInstance.interceptors.request.use(
  (config) => {
    // 每次请求时重新检查token
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      // 清理所有认证相关的存储
      localStorage.removeItem("accessToken");
      localStorage.removeItem("user");
      // 使用 replace 而不是 href 来避免在历史记录中保留需要认证的页面
      if (!window.location.pathname.includes('/login')) {
        window.location.replace("/login");
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;