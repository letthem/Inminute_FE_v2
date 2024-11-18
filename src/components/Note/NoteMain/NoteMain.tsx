import { NoteTopBar } from '@/components/Note/NoteMain/NoteTopBar/NoteTopBar';
import { NoteTitle } from '@/components/Note/NoteMain/NoteTitle/NoteTitle';
import { ParticipantList } from '@/components/Note/NoteMain/ParticipantList/ParticipantList';
import { OneLineSummary } from '@/components/Note/NoteMain/OneLineSummary/OneLineSummary';
import { useEffect, useState } from 'react';
import { NoteDetail, SummaryByMember } from '@/pages/Note/dto';
import { useSocket } from '@/context/SocketContext';
import { getNoteDetail } from '@/apis/Note/getNote';
import { Loading } from '@/components/Common/Loading/Loading';
import { SummaryBySpeakerList } from '@/components/Note/NoteMain/SummaryBySpeakerList/SummaryBySpeakerList';
// import { ToDoList } from '@/components/Note/NoteMain/ToDoList/ToDoList';

interface NoteMainProps {
  initialNoteData: NoteDetail | null;
  uuid: string;
}

export const NoteMain: React.FC<NoteMainProps> = ({ initialNoteData, uuid }) => {
  const [noteData, setNoteData] = useState<NoteDetail | null>(initialNoteData);
  const [participants, setParticipants] = useState<string[]>([]); // participants 상태 선언
  const [isMeetingEnded, setIsMeetingEnded] = useState(false); // 회의 종료 상태
  const { messages } = useSocket();

  // 초기 로딩 시 nicknameList 데이터를 불러오기
  useEffect(() => {
    const loadNoteData = async () => {
      try {
        const noteDetail = await getNoteDetail(uuid); // uuid로 노트 상세 정보 가져오기
        setNoteData(noteDetail.result); // noteData 상태 업데이트
        setParticipants(noteDetail.result.nicknameList); // nicknameList를 participants에 설정
      } catch (error) {
        console.error('Failed to load participants from note detail:', error);
      }
    };
    loadNoteData();
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

  // NoteTitle에서 summary를 업데이트
  const handleSummaryUpdate = (summary: string, summaryByMemberList: SummaryByMember[]) => {
    setIsMeetingEnded(true);
    setNoteData((prevNoteData) => ({
      ...prevNoteData!,
      summary,
      summaryByMemberList,
    }));
  };

  return (
    <main className="flex flex-1 flex-col">
      <NoteTopBar noteData={noteData} />
      <NoteTitle
        noteData={noteData}
        uuid={uuid}
        onSummaryUpdate={handleSummaryUpdate}
        setIsMeetingEnded={setIsMeetingEnded}
      />
      <div className="overflow-y-auto scrollbar-hide">
        <ParticipantList participants={participants} />
        {isMeetingEnded && !noteData?.summary ? ( // 회의 종료 후 summary가 업데이트될 때까지 Loading 표시
          <div className="flex flex-col gap-5 justify-center items-center h-[50vh]">
            <div style={{ transform: 'scale(2)' }}>
              <Loading />
            </div>
            <p className="text-mainBlack font-[500] text-[15px] leading-[24px]">
              회의 내용을 불러오고 있어요
            </p>
          </div>
        ) : noteData?.summary ? (
          <>
            <OneLineSummary noteData={noteData} />
            <SummaryBySpeakerList noteData={noteData} />
            {/* <ToDoList /> */}
          </>
        ) : null}
      </div>
    </main>
  );
};
