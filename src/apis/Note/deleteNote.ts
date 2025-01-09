import { instance } from '@/apis/Instance';

export const deleteNote = async (noteId: number) => {
  try {
    const response = await instance.delete(`/notes/${noteId}`);
    return response.data;
  } catch (error) {
    console.error('노트 삭제 중 에러 발생: ', error);
  }
};
