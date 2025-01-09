import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import SockJS from 'sockjs-client';
import { Client } from '@stomp/stompjs';

interface ChatMessage {
  id: number;
  type: string;
  nickname: string;
  content: string;
}

interface SocketContextType {
  stompClient: Client | null;
  messages: ChatMessage[]; // ChatMessage 타입 배열로 수정
}

const SocketContext = createContext<SocketContextType>({
  stompClient: null,
  messages: [],
});

interface SocketProviderProps {
  children: ReactNode;
  uuid: string;
}

export const SocketProvider: React.FC<SocketProviderProps> = ({ children, uuid }) => {
  const [stompClient, setStompClient] = useState<Client | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]); // ChatMessage 타입 배열로 수정

  const baseUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const socket = new SockJS(`${baseUrl}/ws`);
    const client = new Client({
      webSocketFactory: () => socket,
      onConnect: () => {
        console.log('SockJS WebSocket 연결 성공');
        setStompClient(client); // 연결 후 클라이언트 상태 설정

        // uuid에 따라 구독
        client.subscribe(`/topic/public/${uuid}`, (message) => {
          const chatMessage = JSON.parse(message.body);

          setMessages((prevMessages) => {
            if (chatMessage.type === 'EDIT') {
              // 수정된 메시지 반영
              return prevMessages.map((msg) =>
                msg.id === chatMessage.id ? { ...msg, content: chatMessage.content } : msg
              );
            }

            // 기본 메시지 추가
            return [
              ...prevMessages,
              {
                id: chatMessage.id,
                type: chatMessage.type,
                nickname: chatMessage.nickname,
                content: chatMessage.content,
              },
            ];
          });
        });
      },
      onDisconnect: () => {
        console.log('SockJS WebSocket 연결 종료');
      },
    });

    client.activate(); // 클라이언트 활성화

    return () => {
      client.deactivate(); // 언마운트 시 클라이언트 비활성화
    };
  }, [uuid]); // uuid 변경 시 새로운 소켓 연결

  return (
    <SocketContext.Provider value={{ stompClient, messages }}>{children}</SocketContext.Provider>
  );
};

export const useSocket = () => {
  return useContext(SocketContext);
};
