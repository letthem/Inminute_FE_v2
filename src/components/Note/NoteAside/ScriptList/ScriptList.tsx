import { useSocket } from '@/context/SocketContext';
import { ScriptItem } from '@/components/Note/NoteAside/ScriptList/ScriptItem/ScriptItem';
import { useEffect, useRef, useState } from 'react';
import { Loading } from '@/components/Common/Loading/Loading';

interface ChatMessage {
  id?: number;
  type: string;
  nickname: string;
  content: string;
}

interface ScriptListProps {
  uuid: string;
}

export const ScriptList: React.FC<ScriptListProps> = ({ uuid }) => {
  const { stompClient, messages } = useSocket();
  const [isLoading, setIsLoading] = useState(false);
  const [displayMessages, setDisplayMessages] = useState<ChatMessage[]>([]);
  const [currentSpeakers, setCurrentSpeakers] = useState<string[]>([]); // 여러 사용자 관리
  const bottomRef = useRef<HTMLDivElement | null>(null);

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

  const handleUpdateScript = (index: number, newContent: string) => {
    const updatedMessages = [...displayMessages];
    const messageToUpdate = updatedMessages[index];

    if (stompClient && stompClient.connected) {
      stompClient.publish({
        destination: `/app/chat.update/${uuid}`,
        body: JSON.stringify({
          chatId: messageToUpdate.id,
          nickname: messageToUpdate.nickname,
          content: newContent,
        }),
      });

      // 로컬 상태 업데이트
      updatedMessages[index].content = newContent;
      setDisplayMessages(updatedMessages);
    }
  };

  const handleDeleteScript = (index: number) => {
    // 로컬 상태에서만 메시지 삭제
    setDisplayMessages((prevMessages) => prevMessages.filter((_, i) => i !== index));
  };

  // 새 메시지가 추가될 때 가장 아래로 스크롤
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [displayMessages]);

  return (
    <>
      {displayMessages.map((message, index) => (
        <ScriptItem
          key={index}
          name={message.nickname}
          script={message.content}
          onUpdateScript={(newContent) => handleUpdateScript(index, newContent)}
          onDeleteScript={() => handleDeleteScript(index)}
        />
      ))}
      {/* 여러 사용자의 로딩 UI 표시 */}
      {isLoading &&
        currentSpeakers.map((speaker, index) => (
          <ScriptItem key={`loading-${index}`} name={speaker} script={<Loading />} />
        ))}
      <div ref={bottomRef} />
    </>
  );
};
