import { jsonInstance } from './client';

export const allProductGetApi = async (page: number, size: number) => {
  try {
    const response = await jsonInstance.get('/api/v1/', {
      params: {
        page: page,
        size: size,
      },
    });
    return response;
  } catch (error) {
    console.log('실패 : ', error);
    throw error;
  }
};
