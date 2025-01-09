import { instance } from '@/apis/Instance';
import axios from 'axios';

export const checkMemberStatus = async (): Promise<boolean> => {
  try {
    const response = await instance.get('/members');
    return response.status === 200; // true 반환 (회원임)
  } catch (error: unknown) {
    if (axios.isAxiosError(error) && error.response && error.response.status === 401) {
      return false; // 신규 회원
    } else {
      console.error('회원 상태 확인 중 오류 발생:', error);
      throw error; // 기타 에러 발생 시 throw
    }
  }
};
