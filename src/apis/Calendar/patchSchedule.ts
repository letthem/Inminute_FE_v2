import { instance } from '@/apis/Instance';

export const patchSchedule = async (scheduleId: number, name: string) => {
  try {
    await instance.patch(`/schedule/${scheduleId}`, { name });
  } catch (error) {
    console.error('schedule 수정 중 에러 발생:', error);
    throw error;
  }
};
