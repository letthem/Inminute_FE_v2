import { instance } from '@/apis/Instance';

// 노트 추가 함수
export const addNote = async (name: string, folderId: number | null) => {
  try {
    const response = await instance.post('/notes', {
      name, // 노트 이름
      folderId, // 폴더 ID
    });
    return response.data; // 서버에서 반환된 데이터 (UUID 포함)
  } catch (error) {
    console.error('노트 추가 중 에러 발생:', error);
  }
};
