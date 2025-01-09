import { instance } from '@/apis/Instance';

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


// 참여자, 한 줄 요약 GET
export const getNoteDetail = async (uuid: string) => {
  try {
    const response = await instance.get(`/notes/detail/${uuid}`);
    return response.data;
  } catch (error) {
    console.error('회의 참여자, 한 줄 요약 로드 중 오류 발생:', error);
    throw error;
  }
};

// 화자별 요약 GET
export const getSummaryBySpeaker = async (uuid: string) => {
  try {
    const response = await instance.get(`/notes/join-member/${uuid}`);
    return response.data;
  } catch (error) {
    console.error('화자별 요약 로드 중 오류 발생:', error);
    throw error;
  }
};

// 화자별 To Do GET
export const getToDoList = async (uuid: string) => {
  try {
    const response = await instance.get(`to-do/${uuid}`);
    return response.data;
  } catch (error) {
    console.error('화자별 To Do 로드 중 오류 발생:', error);
    throw error;
  }
};

// 회의 스크립트 GET
export const getMeetingScripts = async (uuid: string) => {
  try {
    const response = await instance.get(`notes/${uuid}/chats/all`);
    return response.data;
  } catch (error) {
    console.error('회의 스크립트 로드 중 오류 발생');
    throw error;
  }
};
