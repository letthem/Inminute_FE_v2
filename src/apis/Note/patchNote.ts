import { instance } from '@/apis/Instance';

export const checkToDo = async (toDoId: number, content: string, isDone: boolean) => {
  try {
    await instance.patch(`/to-do/${toDoId}`, { content, isDone });
  } catch (error) {
    console.error('to do check 중 에러 발생:', error);
    throw error;
  }
};
