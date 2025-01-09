import { instance } from '@/apis/Instance';

// schedule 추가 함수
export const addSchedule = async (
  name: string,
  color: string,
  dateList: string[],
  startTime: string
) => {
  try {
    const response = await instance.post('/schedule', {
      name,
      color,
      dateList,
      startTime,
    });
    return response.data;
  } catch (error) {
    console.error('schedule 추가 중 에러 발생:', error);
  }
};
