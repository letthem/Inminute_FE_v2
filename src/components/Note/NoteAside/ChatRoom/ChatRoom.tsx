import React, { useState, useEffect, useRef } from 'react';
import { Client, Message, IFrame } from '@stomp/stompjs';
import SockJS from 'sockjs-client';

interface ChatRoomProps {
  uuid: string;
}

interface ChatMessage {
  nickname: string;
  content: string;
}

const ChatRoom: React.FC<ChatRoomProps> = ({ uuid }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputMessage, setInputMessage] = useState<string>('');
  const [connected, setConnected] = useState<boolean>(false);
  const stompClientRef = useRef<Client | null>(null);

  const baseUrl = import.meta.env.VITE_API_URL;

  // WebSocket 연결 설정
  useEffect(() => {
    const connectWebSocket = () => {
      const socketUrl = `${baseUrl}/ws`;
      const stompClient = new Client({
        webSocketFactory: () => new SockJS(socketUrl),
        reconnectDelay: 5000,
        onConnect: () => onConnected(stompClient),
        onStompError: onError, // IFrame을 받는 함수로 수정
      });
      stompClient.activate();
      stompClientRef.current = stompClient;
    };

    connectWebSocket();

    return () => {
      stompClientRef.current?.deactivate();
    };
  }, []);

  // WebSocket 연결 성공 시 호출되는 함수
  const onConnected = (stompClient: Client) => {
    setConnected(true);
    console.log('Connected to WebSocket');
    stompClient.subscribe(`/topic/public/${uuid}`, onMessageReceived);
  };

  // 메시지 전송
  const sendMessage = () => {
    const stompClient = stompClientRef.current;
    if (stompClient && inputMessage.trim() !== '') {
      const chatMessage: ChatMessage = {
        nickname: 'User', // 사용자 이름 필요
        content: inputMessage,
      };

      stompClient.publish({
        destination: `/app/chat.sendMessage/${uuid}`,
        body: JSON.stringify(chatMessage),
      });

      setInputMessage(''); // 입력 후 초기화
    }
  };

  // 메시지 받기
  const onMessageReceived = (message: Message) => {
    const chatMessage: ChatMessage = JSON.parse(message.body);
    setMessages((prevMessages) => [...prevMessages, chatMessage]);
  };

  // 오류 처리 함수, IFrame으로 타입 수정
  const onError = (frame: IFrame) => {
    console.error('WebSocket error: ', frame);
    setConnected(false);
  };

  return (
    <div>
      <h2>채팅방: {uuid}</h2>

      <div>
        {messages.map((msg, index) => (
          <div key={index}>
            <strong>{msg.nickname}:</strong> {msg.content}
          </div>
        ))}
      </div>

      <div>
        <input
          type="text"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          placeholder="메시지를 입력하세요"
        />
        <button onClick={sendMessage} disabled={!connected}>
          전송
        </button>
      </div>
    </div>
  );
};

export default ChatRoom;
