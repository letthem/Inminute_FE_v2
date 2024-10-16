import { instance } from '@/apis/Instance';
import { useSetRecoilState } from 'recoil';
import { isMemberState } from '@/recoil/atoms/authState';
import axios from 'axios';

export const checkMemberStatus = async () => {
  const setIsMember = useSetRecoilState(isMemberState);

  try {
    const response = await instance.get('/members');
    if (response.status === 200) {
      setIsMember(true); // 회원임
    }
  } catch (error: unknown) {
    // unknown 타입을 사용
    if (axios.isAxiosError(error)) {
      // axios 에러 타입 체크
      if (error.response && error.response.status === 401) {
        setIsMember(false); // 신규 회원
      }
    } else {
      console.error('회원 상태 확인 중 오류 발생:', error);
    }
  }
};
