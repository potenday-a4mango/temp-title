import { AxiosResponse } from 'axios';
import { jsonInstance } from './client';
import { LoginResponse } from '../types/api';

// 카카오 로그인 API 호출 함수
export const Login = async (code: string): Promise<LoginResponse> => {
  try {
    const response: AxiosResponse<LoginResponse> = await jsonInstance.post(
      '/api/v1/auth/kakao',
      { code },
    );
    return response.data;
  } catch (error) {
    console.error('카카오 로그인 실패:', error);
    throw error;
  }
};
