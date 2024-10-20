import { instance } from '@/apis/Instance';

export const getMemberInfo = async () => {
  return await instance.get('/members');
};
