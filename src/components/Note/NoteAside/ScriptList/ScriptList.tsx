import { useSocket } from '@/context/SocketContext';
import { ScriptItem } from '@/components/Note/NoteAside/ScriptList/ScriptItem/ScriptItem';
import { useEffect, useRef, useState } from 'react';
import { Loading } from '@/components/Common/Loading/Loading';

interface ChatMessage {
  id: number;
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

  // 메시지가 수신될 때만 업데이트 로직 실행
  useEffect(() => {
    const latestMessage = messages[messages.length - 1];

    // 메시지가 `CHAT` 또는 `EDIT`일 경우에만 `displayMessages` 업데이트
    if (latestMessage?.type === 'CHAT' || latestMessage?.type === 'EDIT') {
      setDisplayMessages((prevMessages) => {
        if (latestMessage.type === 'EDIT') {
          // 기존 메시지 수정 반영
          return prevMessages.map((msg) =>
            msg.id === latestMessage.id ? { ...msg, content: latestMessage.content } : msg
          );
        } else {
          // 새로운 `CHAT` 메시지 추가
          return [...prevMessages, latestMessage];
        }
      });
    }

    // `CONVERTING` 메시지 처리
    if (latestMessage?.type === 'CONVERTING') {
      setIsLoading(true);
      if (!currentSpeakers.includes(latestMessage.nickname)) {
        setCurrentSpeakers((prevSpeakers) => [...prevSpeakers, latestMessage.nickname]);
      }
    } else {
      // `CONVERTING` 메시지가 아니면 로딩 상태 해제 및 발화자 제거
      setIsLoading(false);
      setCurrentSpeakers((prevSpeakers) =>
        prevSpeakers.filter((speaker) => speaker !== latestMessage.nickname)
      );
    }
  }, [messages]);

  const handleUpdateScript = (index: number, newContent: string) => {
    const messageToUpdate = displayMessages[index];

    if (stompClient && stompClient.connected) {
      stompClient.publish({
        destination: `/app/chat.update/${uuid}`,
        body: JSON.stringify({
          chatId: messageToUpdate.id,
          nickname: messageToUpdate.nickname,
          content: newContent,
        }),
      });
    }
  };

  const handleDeleteScript = (index: number) => {
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
          key={message.id}
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
