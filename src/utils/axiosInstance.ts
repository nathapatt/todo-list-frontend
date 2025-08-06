import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_PROXY_PATH || '/api', // Backend URL from environment
});

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token');

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default axiosInstance;