import axios from 'axios';
import config from '../config/config';
import { mockApi } from './mockData';

const api = config.USE_MOCK_API ? mockApi : axios.create({
  baseURL: config.API_BASE_URL
});

// Add interceptors only for real API
if (!config.USE_MOCK_API) {
  api.interceptors.request.use(
    config => {
      const token = localStorage.getItem('accessToken');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    error => {
      return Promise.reject(error);
    }
  );

  api.interceptors.response.use(
    response => response,
    error => {
      if (error.response?.status === 401) {
        localStorage.removeItem('accessToken');
        window.location.href = '/login';
      }
      return Promise.reject(error);
    }
  );
}

export default api;
