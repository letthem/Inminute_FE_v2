import { instance } from '@/apis/Instance';

export const deleteMember = async () => {
  try {
    const response = await instance.delete('/members');
    return response.data;
  } catch (error) {
    console.error('회원 정보 삭제 중 에러 발생: ', error);
  }
};
