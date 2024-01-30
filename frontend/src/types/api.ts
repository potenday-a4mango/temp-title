import { AxiosInstance } from 'axios';

export type Options = {
  headers?: Record<string, string>;
};

export type AxiosApiFunction = (url: string, options: Options) => AxiosInstance;
export type { AxiosInstance };
