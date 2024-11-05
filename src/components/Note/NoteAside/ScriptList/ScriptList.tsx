import { useSocket } from '@/context/SocketContext';
import { ScriptItem } from '@/components/Note/NoteAside/ScriptList/ScriptItem/ScriptItem';
import { useEffect, useState } from 'react';
import { Loading } from '@/components/Common/Loading/Loading';

interface ChatMessage {
  id?: number;
  type: string;
  nickname: string;
  content: string;
}

export const ScriptList = () => {
  const { messages } = useSocket();
  const [isLoading, setIsLoading] = useState(false);
  const [displayMessages, setDisplayMessages] = useState<ChatMessage[]>([]);
  const [currentSpeakers, setCurrentSpeakers] = useState<string[]>([]); // 여러 사용자 관리

  useEffect(() => {
    if (messages.length > 0) {
      const latestMessage = messages[messages.length - 1];

      if (latestMessage.type === 'CONVERTING') {
        setIsLoading(true);
        setCurrentSpeakers(
          (prevSpeakers) =>
            prevSpeakers.includes(latestMessage.nickname)
              ? prevSpeakers
              : [...prevSpeakers, latestMessage.nickname] // 중복 방지
        );
      } else if (latestMessage.type === 'CHAT') {
        setIsLoading(false);
        setDisplayMessages((prev) => [
          ...prev,
          { type: 'CHAT', nickname: latestMessage.nickname, content: latestMessage.content },
        ]);

        // `CHAT` 메시지 수신 시 해당 사용자를 currentSpeakers에서 제거
        setCurrentSpeakers((prevSpeakers) =>
          prevSpeakers.filter((speaker) => speaker !== latestMessage.nickname)
        );
      }
    }
  }, [messages]);

  return (
    <>
      {displayMessages.map((message, index) => (
        <ScriptItem key={index} name={message.nickname} script={message.content} />
      ))}
      {/* 여러 사용자의 로딩 UI 표시 */}
      {isLoading &&
        currentSpeakers.map((speaker, index) => (
          <ScriptItem key={`loading-${index}`} name={speaker} script={<Loading />} />
        ))}
    </>
  );
};
