import { instance } from '@/apis/Instance';

export const updateNickname = async (nickname: string) => {
  return instance.patch('/members', { nickname });
};
