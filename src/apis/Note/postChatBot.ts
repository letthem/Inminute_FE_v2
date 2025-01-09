import { instance } from '@/apis/Instance';

export const postChatBot = async (question: string, uuid: string) => {
  try {
    const response = await instance.post(`/notes/${uuid}/chat-bot`, {
      question,
    });
    return response.data;
  } catch (error) {
    console.error('챗봇 응답 중 에러 발생:', error);
  }
};
