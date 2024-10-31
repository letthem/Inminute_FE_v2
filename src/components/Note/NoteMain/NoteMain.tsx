import { NoteTopBar } from '@/components/Note/NoteMain/NoteTopBar/NoteTopBar';
import { NoteTitle } from '@/components/Note/NoteMain/NoteTitle/NoteTitle';
import { ParticipantList } from '@/components/Note/NoteMain/ParticipantList/ParticipantList';
import { OneLineSummary } from '@/components/Note/NoteMain/OneLineSummary/OneLineSummary';
import { useEffect, useState } from 'react';
import { NoteDetail } from '@/pages/Note/dto';
import { useSocket } from '@/context/SocketContext';

interface NoteMainProps {
  noteData: NoteDetail | null;
  uuid: string;
}

export const NoteMain: React.FC<NoteMainProps> = ({ noteData, uuid }) => {
  const [participants, setParticipants] = useState<string[]>([]); // participants 상태 선언
  const { messages } = useSocket();

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
      </div>
    </main>
  );
};
