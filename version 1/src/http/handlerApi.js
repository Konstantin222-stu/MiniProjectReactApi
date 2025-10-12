import axios from 'axios';

const createAxiosInstance = (baseURL, withAuth = false) => {
  const instance = axios.create({
    baseURL: baseURL || import.meta.env.VITE_API_URL,
    timeout: 10000, 
  });

  if (withAuth) {
    instance.interceptors.request.use((config) => {
      const token = localStorage.getItem('authToken');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`; 
      } else {
        console.warn('No auth token found in localStorage');
      }
      return config;
    }, (error) => {
      return Promise.reject(error);
    });
  }

  return instance;
};


const $host = createAxiosInstance();
const $authHost = createAxiosInstance(null, true);

const setupResponseInterceptors = (instance) => {
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

setupResponseInterceptors($host);
setupResponseInterceptors($authHost);

export { $host, $authHost };