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

export const getNoteAllByFolder = async (folderId: number) => {
  try {
    const response = await instance.get(`/notes${folderId ? `?folderId=${folderId}` : ''}`);
    return response.data;
  } catch (error) {
    console.error('폴더별 노트 로드 중 오류 발생:', error);
    throw error;
  }
};

export const getNoteMainContents = async (uuid: string) => {
  try {
    const response = await instance.post(`/notes/${uuid}/stop`, {
      uuid,
    });
    return response.data;
  } catch (error) {
    console.error('회의 종료 후 AI 생성 회의 노트 로드 중 오류 발생:', error);
    throw error;
  }
};
