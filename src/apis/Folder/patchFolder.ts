import { instance } from '@/apis/Instance';

export const patchFolder = async (folderId: number, name: string) => {
  try {
    await instance.patch(`/folders/${folderId}`, { name });
  } catch (error) {
    console.error('folder 수정 중 에러 발생:', error);
    throw error;
  }
};
