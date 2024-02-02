import axios, { AxiosInstance } from 'axios';
import { AxiosApiFunction } from '../types/api';

if (!process.env.REACT_APP_BASE_URL) {
  throw new Error('REACT_APP_BASE_URL is not defined');
}
const BASE_URL = process.env.REACT_APP_BASE_URL;
const HEADER_JSON = {
  headers: {
    'Content-Type': 'application/json',
  },
};

const HEADER_FORM = {
  headers: {
    'Content-Type': 'multipart/form-data',
  },
};

// CORS: 리소스 접근 허용
axios.defaults.headers['Access-Control-Allow-Origin'] = '*';

// CORS: 서로 다른 도메인간 쿠키 전달 허용
axios.defaults.withCredentials = true;

const axiosApi: AxiosApiFunction = (url, options = {}) => {
  const instance = axios.create({ baseURL: url, ...options });
  return instance;
};

export const jsonInstance: AxiosInstance = axiosApi(BASE_URL, HEADER_JSON);
export const formInstance: AxiosInstance = axiosApi(BASE_URL, HEADER_FORM);
