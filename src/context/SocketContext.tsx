import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import SockJS from 'sockjs-client';
import { Client } from '@stomp/stompjs';

interface SocketContextType {
  stompClient: Client | null;
  messages: string[];
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
  const [messages, setMessages] = useState<string[]>([]);

  const baseUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const socket = new SockJS(`${baseUrl}/ws`);
    const client = new Client({
      webSocketFactory: () => socket,
      onConnect: () => {
        console.log('SockJS WebSocket 연결 성공');
        client.subscribe(`/topic/public/${uuid}`, (message) => {
          // uuid에 따라 구독
          const chatMessage = JSON.parse(message.body);
          setMessages((prev) => [...prev, chatMessage]);
        });
      },
      onDisconnect: () => {
        console.log('SockJS WebSocket 연결 종료');
      },
    });

    client.activate();
    setStompClient(client);

    return () => {
      client.deactivate(); // 컴포넌트 언마운트 시 소켓 종료
    };
  }, [uuid]); // uuid가 변경될 때 소켓 연결 설정

  return (
    <SocketContext.Provider value={{ stompClient, messages }}>{children}</SocketContext.Provider>
  );
};

export const useSocket = () => {
  return useContext(SocketContext);
};
