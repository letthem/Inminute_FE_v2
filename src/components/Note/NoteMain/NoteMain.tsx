import { NoteTopBar } from '@/components/Note/NoteMain/NoteTopBar/NoteTopBar';
import { NoteTitle } from '@/components/Note/NoteMain/NoteTitle/NoteTitle';
// import { ParticipantList } from '@/components/Note/NoteMain/ParticipantList/ParticipantList';
import { OneLineSummary } from '@/components/Note/NoteMain/OneLineSummary/OneLineSummary';
// import { SummaryBySpeakerList } from '@/components/Note/NoteMain/SummaryBySpeakerList/SummaryBySpeakerList';
// import { ToDoList } from '@/components/Note/NoteMain/ToDoList/ToDoList';
import { useState } from 'react';
import { NoteDetail } from '@/pages/Note/dto';

interface NoteMainProps {
  noteData: NoteDetail | null;
  uuid: string;
}

export const NoteMain: React.FC<NoteMainProps> = ({ noteData }) => {
  const [showContent] = useState(false);

  // 회의가 끝난 이후 handleShowContent 추후 호출 예정
  // const handleShowContent = () => {
  //   setShowContent(true);
  // };

  return (
    <main className="flex flex-1 flex-col">
      <NoteTopBar noteData={noteData} />
      <NoteTitle noteData={noteData} />
      <div className="overflow-y-auto scrollbar-hide">
        {showContent && (
          <>
            {/* <ParticipantList noteData={noteData} /> */}
            <OneLineSummary noteData={noteData} />
            {/* <SummaryBySpeakerList noteData={noteData} />
            <ToDoList noteData={noteData} /> */}
          </>
        )}
      </div>
    </main>
  );
};
