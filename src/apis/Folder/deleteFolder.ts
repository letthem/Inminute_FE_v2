import { instance } from '@/apis/Instance';

export const deleteFolder = async (folderId: number) => {
  try {
    await instance.delete(`/folders/${folderId}`);
  } catch (error) {
    console.error('폴더 삭제 중 에러 발생:', error);
    throw error;
  }
};