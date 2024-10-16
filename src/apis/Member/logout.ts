import { instance } from '@/apis/Instance';

export const logout = async () => {
  return instance.post('/logout'); // 로그아웃 요청
};