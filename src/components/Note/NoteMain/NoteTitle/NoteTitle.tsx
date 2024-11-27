import React, { useEffect, useState } from 'react';
import calendarBlack from '@/assets/webps/Note/calendarBlack.webp';
import timeBlack from '@/assets/webps/Note/timeBlack.webp';
import mic from '@/assets/svgs/Note/mic.svg';
import headphones from '@/assets/svgs/Note/headphones.svg';
import { NoteDetail, SummaryByMember, ToDoByMember } from '@/pages/Note/dto';
import { PlatformModal } from '@/components/Note/NoteMain/NoteTitle/PlatformModal/PlatformModal';
import CopyLink from '@/components/Note/NoteMain/NoteTitle/CopyLink/CopyLink';
import { useSocket } from '@/context/SocketContext';
import { Message } from '@stomp/stompjs';
import { MicButton } from '@/components/Note/NoteMain/NoteTitle/MicButton/MicButton';
import { useNickName } from '@/apis/Member/hooks';

interface NoteTitleProps {
  noteData: NoteDetail | null;
  uuid: string;
  onSummaryUpdate: (
    summary: string,
    summaryByMemberList: SummaryByMember[],
    toDoResponseList: ToDoByMember[]
  ) => void; // summary 업데이트 핸들러
  setIsMeetingEnded: (ended: boolean) => void; // 회의 종료 상태 업데이트 핸들러
  setIsStart: (isStart: boolean) => void;
}

export const NoteTitle: React.FC<NoteTitleProps> = ({
  noteData,
  uuid,
  onSummaryUpdate,
  setIsMeetingEnded,
  setIsStart,
}) => {
  const { stompClient } = useSocket(); // 소켓 클라이언트 가져오기
  const { data: nickname } = useNickName(); // 닉네임 가져오기
  const [isPlatformModalOpen, setIsPlatformModalOpen] = useState(false);
  const [isStart, setIsStartLocal] = useState(false); // 회의 시작 상태
  const [isRecording, setIsRecording] = useState(false); // 녹음 상태
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null); // MediaRecorder 인스턴스

  useEffect(() => {
    if (!stompClient) return; // stompClient가 null일 경우 early return

    let isStopCall = false;

    const handleMessageReceived = (message: Message) => {
      const chatMessage = JSON.parse(message.body);

      console.log(chatMessage);
      if (chatMessage.isStart === true) {
        setIsStartLocal(true); // 회의 시작 상태 업데이트
        setIsStart(true); // NoteMain에도 회의 시작 상태 전달
      } else if (chatMessage.isStart === false) {
        setIsStartLocal(false); // 회의 종료 상태 업데이트
        setIsStart(false); // NoteMain에도 회의 종료 상태 전달
        setIsMeetingEnded(true);

        // stop 호출이 중복되지 않도록 조건 추가
        if (!isStopCall) {
          isStopCall = true;
          const stopMeeting = {
            content: '안녕 내 사랑', // 요청 본문
          };
          stompClient?.publish({
            destination: `/app/chat.stop/${uuid}`,
            body: JSON.stringify(stopMeeting),
          });
        }

        // 회의 종료 시 summary, summaryByMemberList, toDoResponseList 수신 처리
        if (
          chatMessage.summary &&
          chatMessage.summaryByMemberList &&
          chatMessage.toDoResponseList
        ) {
          onSummaryUpdate(
            chatMessage.summary,
            chatMessage.summaryByMemberList,
            chatMessage.toDoResponseList
          );
        }
      }
    };

    // STOMP 클라이언트가 활성화된 후 구독
    const subscription = stompClient.subscribe(`/topic/public/${uuid}`, handleMessageReceived); // UUID에 따라 구독

    return () => {
      subscription.unsubscribe(); // 컴포넌트 언마운트 시 구독 해제
    };
  }, [stompClient, uuid]); // stompClient와 uuid에 의존성 추가

  if (!noteData) {
    return <></>;
  }

  const date = new Date(noteData.createdAt);
  const formattedDate = `${date.getFullYear().toString().slice(-2)}.${(date.getMonth() + 1).toString().padStart(2, '0')}.${date.getDate().toString().padStart(2, '0')}`;
  const formattedTime = `${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;
  const currentUrl = window.location.href;

  // 회의 시작 또는 종료 핸들러
  const handleMeetingToggle = async () => {
    if (!stompClient || !stompClient.connected) {
      console.error('STOMP 클라이언트가 연결되지 않았습니다.');
      return; // 연결되지 않은 경우 early return
    }
    if (isStart) {
      // 회의 종료 요청
      const stopMeeting = {
        content: '안녕 내 사랑', // 요청 본문
      };
      stompClient?.publish({
        destination: `/app/chat.click/${uuid}`, // 종료 요청 보내기
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

  const toggleRecording = async () => {
    if (!isRecording) {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);

      recorder.ondataavailable = (event) => {
        if (stompClient && stompClient.connected && event.data.size > 0) {
          const reader = new FileReader();
          reader.onloadend = () => {
            if (reader.result) {
              const base64data = (reader.result as string).split(',')[1];

              stompClient.publish({
                destination: `/app/chat.sendAudioByChunk/${uuid}`,
                body: JSON.stringify({
                  nickname: nickname,
                  chunkCode: base64data,
                }),
              });
            }
          };
          reader.readAsDataURL(event.data);
        }
      };

      recorder.onstop = () => {
        // 녹음 종료 시 마지막 청크 전송
        if (stompClient && stompClient.connected) {
          stompClient.publish({
            destination: `/app/chat.sendAudioByChunk/${uuid}`,
            body: JSON.stringify({
              nickname: nickname,
              chunkCode: 'END',
            }),
          });
        }
      };

      recorder.start(200); // 0.2초마다 데이터 청크 생성
      setMediaRecorder(recorder);
    } else {
      mediaRecorder?.stop();
    }
    setIsRecording((prev) => !prev);
  };

  return (
    <>
      <section className="relative">
        {isStart && <MicButton isRecording={isRecording} onToggleRecording={toggleRecording} />}
        <div className="flex justify-between items-center mt-[30px]">
          <h1 className="text-[26px] font-bold ml-12 mr-4 leading-[30px] break-keep">
            {noteData.name}
          </h1>
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
