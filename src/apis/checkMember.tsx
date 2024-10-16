import { instance } from '@/apis/Instance';
import axios from 'axios';

export const checkMemberStatus = async (setIsMember: (value: boolean) => void) => {
  try {
    const response = await instance.get('/members');
    if (response.status === 200) {
      setIsMember(true); // 회원임
    }
  } catch (error: unknown) {
    if (axios.isAxiosError(error) && error.response && error.response.status === 401) {
      setIsMember(false); // 신규 회원
    } else {
      console.error('회원 상태 확인 중 오류 발생:', error);
    }
  }
};
