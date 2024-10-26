import { instance } from '@/apis/Instance';

export const updateNickname = async (nickname: string) => {
  try {
    const response = await instance.patch('/members', { nickname });
    return response.data;
  } catch (error) {
    console.error('닉네임 업데이트 중 오류 발생:', error);
  }
};
