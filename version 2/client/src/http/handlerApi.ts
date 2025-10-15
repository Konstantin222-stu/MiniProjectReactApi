import axios, { type AxiosInstance } from 'axios';
import type { CreateAxiosInstanceConfig, AuthAxiosRequestConfig } from '../types/handlerApi.type';

const createAxiosInstance = (baseURL?: string, withAuth: boolean = false): AxiosInstance => {
  const config: CreateAxiosInstanceConfig = {
    baseURL: baseURL || import.meta.env.VITE_API_URL,
    timeout: 10000, 
  };

  const instance = axios.create(config);

  if (withAuth) {
    instance.interceptors.request.use((config: AuthAxiosRequestConfig) => {
      const token = localStorage.getItem('authToken');
      if (token) {
        config.headers = config.headers || {};
        config.headers.Authorization = `Bearer ${token}`;
      } else {
        console.warn('No auth token found in localStorage');
      }
      return config;
    });
  }

  return instance;
};

const setupResponseInterceptors = (instance: AxiosInstance): void => {
  instance.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response?.status === 401) {
        console.error('Unauthorized access - possibly invalid token');
      }
      return Promise.reject(error);
    }
  );
};

const $host: AxiosInstance = createAxiosInstance();
const $authHost: AxiosInstance = createAxiosInstance(undefined, true);

setupResponseInterceptors($host);
setupResponseInterceptors($authHost);

export { $host, $authHost };