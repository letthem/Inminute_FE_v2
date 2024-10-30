import React, { useEffect, useState } from 'react';
import calendarBlack from '@/assets/webps/Note/calendarBlack.webp';
import timeBlack from '@/assets/webps/Note/timeBlack.webp';
import mic from '@/assets/svgs/Note/mic.svg';
import headphones from '@/assets/svgs/Note/headphones.svg';
import { NoteDetail } from '@/pages/Note/dto';
import { PlatformModal } from '@/components/Note/NoteMain/NoteTitle/PlatformModal/PlatformModal';
import CopyLink from '@/components/Note/NoteMain/NoteTitle/CopyLink/CopyLink';
import { useSocket } from '@/context/SocketContext';
import { Message } from '@stomp/stompjs';
import { MicButton } from '@/components/Note/NoteMain/NoteTitle/MicButton/MicButton';

interface NoteTitleProps {
  noteData: NoteDetail | null;
  uuid: string; // uuid 추가
}

export const NoteTitle: React.FC<NoteTitleProps> = ({ noteData, uuid }) => {
  const [isPlatformModalOpen, setIsPlatformModalOpen] = useState(false);
  const [isStart, setIsStart] = useState(false); // 회의 시작 상태
  const [isRecording, setIsRecording] = useState(false); // 녹음 상태
  const { stompClient } = useSocket(); // 소켓 클라이언트 가져오기

  useEffect(() => {
    if (!stompClient) return; // stompClient가 null일 경우 early return

    const handleMessageReceived = (message: Message) => {
      const chatMessage = JSON.parse(message.body);
      if (chatMessage.isStart === true) {
        setIsStart(true); // 회의 시작 상태 업데이트
      } else if (chatMessage.isStart === false) {
        setIsStart(false); // 회의 종료 상태 업데이트
      }
    };

    // STOMP 클라이언트가 활성화된 후 구독
    const subscription = stompClient.subscribe(`/topic/public/${uuid}`, handleMessageReceived); // UUID에 따라 구독

    return () => {
      subscription.unsubscribe(); // 컴포넌트 언마운트 시 구독 해제
    };
  }, [stompClient, uuid]); // stompClient와 uuid에 의존성 추가

  if (!noteData) {
    return <p>노트 정보를 불러오는 중입니다...</p>;
  }

  const date = new Date(noteData.createdAt);
  const formattedDate = `${date.getFullYear().toString().slice(-2)}.${(date.getMonth() + 1).toString().padStart(2, '0')}.${date.getDate().toString().padStart(2, '0')}`;
  const formattedTime = `${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}:${String(date.getSeconds()).padStart(2, '0')}`;
  const currentUrl = window.location.href;

  // 회의 시작 또는 종료 핸들러
  const handleMeetingToggle = () => {
    if (isStart) {
      // 회의 종료 요청
      const stopMeeting = {
        content: '안녕 내 사랑', // 요청 본문
      };
      stompClient?.publish({
        destination: `/app/chat.stop/${uuid}`, // 종료 요청 보내기
        body: JSON.stringify(stopMeeting),
      });
    } else {
      // 회의 시작 요청
      const startMeeting = {
        content: 'show me the mic',
      };
      stompClient?.publish({
        destination: `/app/chat.start/${uuid}`,
        body: JSON.stringify(startMeeting),
      });
    }
  };

  // 녹음 시작 및 종료 핸들러
  const toggleRecording = () => {
    setIsRecording((prev) => !prev); // 녹음 상태 전환
    // 여기에 녹음 시작/종료 로직 추가
    if (!isRecording) {
      // 녹음 시작 로직
    } else {
      // 녹음 종료 로직
    }
  };

  return (
    <>
      <section className="relative">
        {isStart && <MicButton isRecording={isRecording} onToggleRecording={toggleRecording} />}
        <div className="flex justify-between items-center mt-[30px]">
          <p className="text-[26px] font-bold ml-12 mr-[120px] leading-[30px]">{noteData.name}</p>
          <div className="flex text-white text-[10.5px] leading-[18px]">
            <CopyLink url={currentUrl} />
            <div
              onClick={() => {
                setIsPlatformModalOpen(true);
              }}
              className="flex justify-center items-center w-[42px] h-[30px] mr-3 bg-main06 rounded-[3.2px] cursor-pointer"
            >
              <img src={headphones} alt="headphones" />
            </div>
            <div
              onClick={handleMeetingToggle} // 회의 시작/종료 핸들러 추가
              className={`flex items-center ${isStart ? 'w-[66px]' : 'w-[88px]'} h-[30px] mr-[27px] bg-mainBlack rounded-[3.2px] cursor-pointer`}
            >
              {!isStart && (
                <img className="w-[15px] h-[15px] ml-[12.3px] mr-[6.3px]" src={mic} alt="mic" />
              )}
              <span className={`font-[500] w-[43px] ${isStart ? 'ml-[12px]' : ''}`}>
                {isStart ? '회의 종료' : '회의 시작'}
              </span>
            </div>
          </div>
        </div>

        <div className="flex ml-[49px] mt-[13px] items-center mb-2">
          <div className="flex items-center">
            <img src={calendarBlack} alt="calendarBlack" className="w-[14px] h-[14px]" />
            <span className="h-4 ml-[6px] text-[10px] font-medium leading-4">{formattedDate}</span>
          </div>
          <div className="ml-5 flex items-center">
            <img src={timeBlack} alt="timeBlack" className="w-[14px] h-[14px]" />
            <span className="h-4 ml-[6px] text-[10px] font-medium leading-4">{formattedTime}</span>
          </div>
        </div>
      </section>
      {isPlatformModalOpen && <PlatformModal onClose={() => setIsPlatformModalOpen(false)} />}
    </>
  );
};
