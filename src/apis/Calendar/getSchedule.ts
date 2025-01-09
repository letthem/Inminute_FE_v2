import { instance } from '@/apis/Instance';

export const getScheduleByMonth = async (year: number, month: number) => {
  try {
    const response = await instance.get(`/schedule${`?year=${year}&month=${month}`}`);
    return response.data.result.schedules;
  } catch (error) {
    console.error('schedule 로드 중 오류 발생:', error);
    throw error;
  }
};
