import { instance } from '@/apis/Instance';

export const getMemberInfo = async () => {
  const response = await instance.get('/members');
  return response.data;
};
