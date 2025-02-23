import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5089/api',
  timeout: 10000,
});

// 请求拦截器：自动添加 Authorization 头
api.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
    config.headers['Cache-Control'] = 'no-cache';
    config.headers['Pragma'] = 'no-cache';
  }
  return config;
}, error => Promise.reject(error));

// 响应拦截器：自动处理 401（未授权）错误
api.interceptors.response.use(response => response, error => {
  if (error.response && error.response.status === 401) {
    console.error('Unauthorized, redirecting to login...');
    // 这里可以跳转到登录页，比如：
    window.location.href = '/login';
  }
  return Promise.reject(error);
});

export default api;
