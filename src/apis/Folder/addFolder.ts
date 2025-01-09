import { instance } from '@/apis/Instance';

// 폴더 추가 함수
export const addFolder = async (name: string) => {
  try {
    const response = await instance.post('/folders', {
      name, // 폴더 이름
    });
    return response.data;
  } catch (error) {
    console.error('폴더 추가 중 에러 발생:', error);
  }
};
