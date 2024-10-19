import React from 'react';

interface ChatRoomProps {
  uuid: string;
}

export const ChatRoom: React.FC<ChatRoomProps> = ({ uuid }) => {
  return <>ChatRoom입니다.{uuid}</>;
};
