import { instance } from '@/apis/Instance';

export const getFolder = async () => {
  try {
    const response = await instance.get('/folders/all');
    return response.data;
  } catch (error) {
    console.error('폴더 정보 가져오는 중 에러 발생: ', error);
  }
};
