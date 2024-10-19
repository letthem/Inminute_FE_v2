import { instance } from '@/apis/Instance';

// 노트 uuid get API
export const getNoteDetail = async (uuid: string) => {
  return instance.get(`/notes/detail/${uuid}`);
};