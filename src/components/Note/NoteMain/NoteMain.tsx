import { NoteTopBar } from '@/components/Note/NoteMain/NoteTopBar/NoteTopBar';
import { NoteTitle } from '@/components/Note/NoteMain/NoteTitle/NoteTitle';
import { ParticipantList } from '@/components/Note/NoteMain/ParticipantList/ParticipantList';
import { OneLineSummary } from '@/components/Note/NoteMain/OneLineSummary/OneLineSummary';
import { SummaryBySpeakerList } from '@/components/Note/NoteMain/SummaryBySpeakerList/SummaryBySpeakerList';
import { ToDoList } from '@/components/Note/NoteMain/ToDoList/ToDoList';
import { useState } from 'react';

export const NoteMain = () => {
  const [showContent] = useState(false);

  // 회의가 끝난 이후 handleShowContent 추후 호출 예정
  // const handleShowContent = () => {
  //   setShowContent(true);
  // };

  return (
    <main className="flex flex-1 flex-col">
      <NoteTopBar />
      <NoteTitle />
      <div className="overflow-y-auto scrollbar-hide">
        {showContent && (
          <>
            <ParticipantList />
            <OneLineSummary />
            <SummaryBySpeakerList />
            <ToDoList />
          </>
        )}
      </div>
    </main>
  );
};
