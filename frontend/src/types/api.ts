import { AxiosInstance } from 'axios';

export type Options = {
  headers?: Record<string, string>;
};

export type AxiosApiFunction = (url: string, options: Options) => AxiosInstance;
export type { AxiosInstance };

// Login 후 응답형식 타입 지정
export interface LoginResponse {
  accessToken: string;
}
