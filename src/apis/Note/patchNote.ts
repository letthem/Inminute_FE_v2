import { instance } from '@/apis/Instance';

export const checkToDo = async (toDoId: number, content: string, isDone: boolean) => {
  try {
    await instance.patch(`/to-do/${toDoId}`, { content, isDone });
  } catch (error) {
    console.error('to do check 중 에러 발생:', error);
    throw error;
  }
};

export const patchNoteTitle = async (noteId: number, name: string) => {
  try {
    await instance.patch(`notes/${noteId}`, { name });
  } catch (error) {
    console.error('note 제목 수정 중 에러 발생:', error);
    throw error;
  }
};

export const patchOneLineSummary = async (noteId: number, summary: string) => {
  try {
    await instance.patch(`notes/${noteId}`, { summary });
  } catch (error) {
    console.error('note 한 줄 요약 수정 중 에러 발생:', error);
    throw error;
  }
};

export const patchSummaryBySpeaker = async (noteJoinMemberId: number, summary: string) => {
  try {
    await instance.patch(`notes/join-member/${noteJoinMemberId}`, { summary });
  } catch (error) {
    console.error('note 화자별 요약 수정 중 에러 발생:', error);
    throw error;
  }
};
