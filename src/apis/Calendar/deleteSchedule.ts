import { instance } from '@/apis/Instance';

export const deleteSchedule = async (scheduleId: number) => {
  try {
    await instance.delete(`/schedule/${scheduleId}`);
  } catch (error) {
    console.error('schedule 삭제 중 에러 발생:', error);
    throw error;
  }
};
