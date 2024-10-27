import { instance } from '@/apis/Instance';

export const getNoteDetail = async (uuid: string) => {
  try {
    const response = await instance.get(`/notes/detail/${uuid}`);
    return response.data;
  } catch (error) {
    console.error('노트 상세 정보 로드 중 오류 발생:', error);
    throw error;
  }
};

export const getNoteAll = async () => {
  try {
    const response = await instance.get('/notes/all');
    return response.data;
  } catch (error) {
    console.error('전체 노트 로드 중 오류 발생:', error);
    throw error;
  }
};
