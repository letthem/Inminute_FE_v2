import { NoteTopBar } from '@/components/Note/NoteMain/NoteTopBar/NoteTopBar';
import { NoteTitle } from '@/components/Note/NoteMain/NoteTitle/NoteTitle';
import { ParticipantList } from '@/components/Note/NoteMain/ParticipantList/ParticipantList';
import { OneLineSummary } from '@/components/Note/NoteMain/OneLineSummary/OneLineSummary';
import { useEffect, useState } from 'react';
import { NoteDetail } from '@/pages/Note/dto';
import { useSocket } from '@/context/SocketContext';
import { getNoteDetail } from '@/apis/Note/getNote';
// import { SummaryBySpeakerList } from '@/components/Note/NoteMain/SummaryBySpeakerList/SummaryBySpeakerList';
// import { ToDoList } from '@/components/Note/NoteMain/ToDoList/ToDoList';

interface NoteMainProps {
  noteData: NoteDetail | null;
  uuid: string;
}

export const NoteMain: React.FC<NoteMainProps> = ({ noteData, uuid }) => {
  const [participants, setParticipants] = useState<string[]>([]); // participants 상태 선언
  const { messages } = useSocket();

  // 초기 로딩 시 nicknameList 데이터를 불러오기
  useEffect(() => {
    const loadParticipants = async () => {
      try {
        const noteDetail = await getNoteDetail(uuid); // uuid로 노트 상세 정보 가져오기
        setParticipants(noteDetail.result.nicknameList); // nicknameList를 participants에 설정
      } catch (error) {
        console.error('Failed to load participants from note detail:', error);
      }
    };
    loadParticipants();
  }, [uuid]);

  // 소켓에서 JOIN 메시지 수신 처리
  useEffect(() => {
    if (messages.length > 0) {
      const latestMessage = messages[messages.length - 1];
      if (latestMessage.type === 'JOIN' && latestMessage.nickname) {
        setParticipants((prevParticipants) => {
          // 중복 참가자 확인 후 추가
          if (!prevParticipants.includes(latestMessage.nickname)) {
            return [...prevParticipants, latestMessage.nickname];
          }
          return prevParticipants;
        });
      }
    }
  }, [messages]);

  return (
    <main className="flex flex-1 flex-col">
      <NoteTopBar noteData={noteData} />
      <NoteTitle noteData={noteData} uuid={uuid} />
      <div className="overflow-y-auto scrollbar-hide">
        <ParticipantList participants={participants} />
        <OneLineSummary noteData={noteData} />
        {/* <SummaryBySpeakerList/> */}
        {/* <ToDoList/> */}
      </div>
    </main>
  );
};
