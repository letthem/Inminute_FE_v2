import React, { useState, useRef, useEffect } from 'react';
import chatbot from '@/assets/webps/Note/chatbot.webp';
import userIcon from '@/assets/webps/Note/userIcon.webp';
import send from '@/assets/webps/Note/send.webp';
import { postChatBot } from '@/apis/Note/postChatBot';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'bot';
}

interface QnAModalProps {
  onClose: () => void; // 모달 닫기 핸들러
  uuid: string; // UUID
}

export const QnAModal: React.FC<QnAModalProps> = ({ onClose, uuid }) => {
  const modalRef = useRef<HTMLDivElement | null>(null);

  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: '안녕하세요, Inminute의 ChatGPT입니다.\n이 회의록과 관련해서 어떤 부분이 궁금하신가요?',
      sender: 'bot',
    },
  ]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const sendQuestionToBot = async (question: string) => {
    const response = await postChatBot(question, uuid);
    return response.result.answer; // 서버 응답의 answer 값 반환
  };

  const handleSend = async () => {
    if (!inputText.trim()) return;

    // 사용자 메시지 추가
    const userMessage: Message = {
      id: messages.length + 1,
      text: inputText,
      sender: 'user',
    };
    setMessages((prev) => [...prev, userMessage]);

    // 입력창 비우기
    setInputText('');

    // 로딩 상태 활성화
    setIsLoading(true);

    // 챗봇 응답 가져오기
    const botResponse = await sendQuestionToBot(inputText);

    // 로딩 상태 비활성화 후 봇 메시지 추가
    setIsLoading(false);
    const botMessage: Message = {
      id: messages.length + 2,
      text: botResponse,
      sender: 'bot',
    };
    setMessages((prev) => [...prev, botMessage]);
  };

  // 새로운 메시지 추가 후 스크롤을 가장 아래로 이동
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // 모달 바깥 클릭 처리
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose(); // 모달 닫기
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  return (
    <div
      ref={modalRef}
      className="font-pretendard font-[350] text-[12px] leading-[180%] absolute w-[482px] bottom-[98px] right-6 bg-white h-[702px] rounded-[20px] pl-6 pr-2 pb-6 flex flex-col"
      style={{ boxShadow: '0px 0px 6px 0px rgba(96, 96, 96, 0.16)' }}
    >
      {/* 메시지 목록 */}
      <div className="flex-1 overflow-y-auto scrollbar-visible scrollbar-thin-custom flex flex-col-reverse">
        <div>
          {messages.map((message) => (
            <div
              key={message.id}
              className={`mt-5 mb-5 flex items-start ${
                message.sender === 'bot' ? 'justify-start' : 'justify-end'
              }`}
            >
              {message.sender === 'bot' && (
                <img src={chatbot} alt="chatbot icon" className="w-7 h-7 mr-3" />
              )}
              <div
                className={`py-[10px] px-[18px] rounded-b-[20px] max-w-[342px] ${
                  message.sender === 'bot'
                    ? 'bg-main02 rounded-tr-[20px] text-black'
                    : 'bg-white rounded-tl-[20px] text-black border-[1px] border-gray01'
                }`}
                style={{ whiteSpace: 'pre-wrap' }} // 줄바꿈 반영
              >
                {message.text}
              </div>
              {message.sender === 'user' && (
                <div
                  className="rounded-full w-7 h-7 ml-3 mr-[8px] bg-white flex justify-center items-center"
                  style={{ boxShadow: '0px 0px 2px 0px rgba(0, 0, 0, 0.10)' }}
                >
                  <img src={userIcon} alt="user icon" className="w-[15px] h-[15px]" />
                </div>
              )}
            </div>
          ))}
          {isLoading && (
            <div className="mt-5 mb-5 flex items-start justify-start">
              <img src={chatbot} alt="chatbot icon" className="w-7 h-7 mr-3" />
              <div className="py-[17px] px-[18px] rounded-b-[20px] max-w-[342px] bg-main02 rounded-tr-[20px] flex gap-1">
                <div className="w-[3px] h-[3px] rounded-full bg-mainBlack" />
                <div className="w-[3px] h-[3px] rounded-full bg-mainBlack" />
                <div className="w-[3px] h-[3px] rounded-full bg-mainBlack" />
              </div>
            </div>
          )}
          <div ref={messagesEndRef}></div>
        </div>
      </div>

      {/* 입력창 */}
      <div className="mt-2 relative flex items-center">
        <input
          value={inputText}
          onKeyDown={(e) => {
            if (!e.nativeEvent.isComposing && e.key === 'Enter') {
              handleSend(); // Enter 키로 메시지 전송
            }
          }}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="텍스트를 입력하세요."
          className="text-[12px] outline-none font-[350] leading-[180%] flex-1 mr-4 rounded-[20px] pl-[18px] pr-10 py-[10px] placeholder:text-gray03 focus:shadow-[0_0_0_1px_#2B2B2B_inset] shadow-[0_0_0_1px_#ECECEC_inset]"
        />
        <img
          src={send}
          alt="send"
          onClick={handleSend}
          className="absolute right-[30px] w-5 h-5 cursor-pointer flex justify-center items-center"
        />
      </div>
    </div>
  );
};
