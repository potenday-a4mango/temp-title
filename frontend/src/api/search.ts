import { jsonInstance } from './client';
import { AxiosResponse } from 'axios';

export const keywordSearchGetApi = async (
  keyword: string,
): Promise<AxiosResponse> => {
  console.log(keyword);
  try {
    const response: AxiosResponse = await jsonInstance.get(
      `/api/v1/search/${keyword}`,
    );

    return response;
  } catch (error: unknown) {
    console.log('실패 : ', error);
    throw error;
  }
};
