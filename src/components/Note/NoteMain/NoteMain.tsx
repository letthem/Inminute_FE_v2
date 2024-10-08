import { NoteTopBar } from '@/components/Note/NoteMain/NoteTopBar/NoteTopBar';
import { NoteTitle } from '@/components/Note/NoteMain/NoteTitle/NoteTitle';
import { ParticipantList } from '@/components/Note/NoteMain/ParticipantList/ParticipantList';
import { OneLineSummary } from '@/components/Note/NoteMain/OneLineSummary/OneLineSummary';
import { SummaryBySpeakerList } from '@/components/Note/NoteMain/SummaryBySpeakerList/SummaryBySpeakerList';
import { ToDoList } from '@/components/Note/NoteMain/ToDoList/ToDoList';

export const NoteMain = () => {
  return (
    <main className="flex flex-1 flex-col">
      <NoteTopBar />
      <NoteTitle />
      <div className="overflow-y-auto scrollbar-hide">
        <ParticipantList />
        <OneLineSummary />
        <SummaryBySpeakerList />
        <ToDoList />
      </div>
    </main>
  );
};
