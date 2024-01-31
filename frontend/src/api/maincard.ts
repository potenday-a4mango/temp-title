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

export const countPostApi = async (workId: number) => {
  try {
    const response: AxiosResponse = await jsonInstance.post(`/api/v1/count`, {
      workId,
    });
    return response;
  } catch (error) {
    console.log('실패 : ', error);
    throw error;
  }
};
