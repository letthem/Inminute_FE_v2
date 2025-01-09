import { useEffect, useRef, useState } from 'react';
import { useSocket } from '@/context/SocketContext';
import { ScriptItem } from '@/components/Note/NoteAside/ScriptList/ScriptItem/ScriptItem';
import { Loading } from '@/components/Common/Loading/Loading';
import { getMeetingScripts, getNoteDetail } from '@/apis/Note/getNote';

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

  useEffect(() => {
    // 초기 로딩: 노트 상세 데이터 가져오기
    const fetchNoteDetail = async () => {
      try {
        const response = await getNoteDetail(uuid);

        // 회의 종료 상태라면 DB에서 회의 스크립트 가져오기
        if (!response.result.isStart) {
          const scriptsResponse = await getMeetingScripts(uuid);
          const dbMessages = scriptsResponse.result.chats.filter(
            (chat: ChatMessage) => chat.id !== null // id가 null이 아닌 경우만 렌더링
          );
          setDisplayMessages(dbMessages);
        }
      } catch (error) {
        console.error('노트 상세 데이터 로드 중 오류 발생:', error);
      }
    };

    fetchNoteDetail();
  }, [uuid]);

  useEffect(() => {
    // 로딩 상태 업데이트: CONVERTING 메시지 처리
    const latestMessage = messages[messages.length - 1];
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

  useEffect(() => {
    // messages에 변화가 생길 때마다 displayMessages 동기화
    setDisplayMessages((prevMessages) =>
      messages
        .filter((msg) => msg.type === 'CHAT' || msg.type === 'EDIT')
        .map((msg) => {
          // EDIT 메시지를 수신했을 때 해당 ID의 메시지 업데이트
          const existingMessage = prevMessages.find((prevMsg) => prevMsg.id === msg.id);
          return existingMessage && msg.type === 'EDIT'
            ? { ...existingMessage, content: msg.content }
            : msg;
        })
    );
  }, [messages]);

  // 새 메시지가 추가될 때 가장 아래로 스크롤
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [displayMessages]);

  return (
    <>
      {displayMessages.map((message, index) => (
        <ScriptItem
          key={message.id}
          name={message.nickname || ''}
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
