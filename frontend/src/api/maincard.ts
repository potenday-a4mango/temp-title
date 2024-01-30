import { jsonInstance } from './client';
import { AxiosResponse, AxiosError } from 'axios';

export const allProductGetApi = async (
  page?: number,
  size?: number,
): Promise<AxiosResponse> => {
  try {
    const response: AxiosResponse = await jsonInstance.get('/api/v1/', {
      params: {
        page: page,
        size: size,
      },
    });
    return response;
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      console.log('실패 : ', error.message);
    }
    throw error;
  }
};
