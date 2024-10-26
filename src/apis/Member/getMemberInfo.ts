import { instance } from '@/apis/Instance';

export const getMemberInfo = async () => {
  try {
    const response = await instance.get('/members');
    return response.data;
  } catch (error) {
    console.error('회원 정보 가져오는 중 에러 발생: ', error);
  }
};
