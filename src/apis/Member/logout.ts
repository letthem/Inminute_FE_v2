import { instance } from '@/apis/Instance';

export const logout = async () => {
  try {
    await instance.post('/logout'); // 로그아웃 요청
  } catch (error) {
    console.error('로그아웃 중 오류 발생:', error);
  }
};
