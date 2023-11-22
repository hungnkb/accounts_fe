import axios from 'axios';

const instance = axios.create({
  baseURL: import.meta.env.VITE_API,
});

instance.interceptors.request.use(
  function (config) {
    config.headers.Authorization = localStorage.getItem('token') ?? undefined;
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

// Add a response interceptor
instance.interceptors.response.use(
  function (response) {
    return response.data;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export default instance;
