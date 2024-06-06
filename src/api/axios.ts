import axios, { InternalAxiosRequestConfig } from 'axios';
import LocalStorageService from '@/services/LocalStorage';
const API = process.env.VITE_API;
const BASE_URL = '/api';
const fetchClient = () => {
 
  const defaultOptions = {
    baseURL: process.env.NODE_ENV === 'production' ? API : BASE_URL,
    withCredentials: true,
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const instance = axios.create(defaultOptions);

  instance.interceptors.request.use(
    (config: InternalAxiosRequestConfig<any>) => {
      const token = LocalStorageService.getItem(LocalStorageService.AUTH_TOKEN);
      config!.headers!.Authorization = token ? `Bearer ${token}` : "";
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  return instance;
};




export default fetchClient();