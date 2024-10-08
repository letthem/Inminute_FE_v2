import { FolderBar } from '@/components/FolderBar/FolderBar';
import { NoteMain } from '@/components/Note/NoteMain/NoteMain';
import { NoteAside } from '@/components/Note/NoteAside/NoteAside';

export const NotePage = () => {
  return (
    <>
      <div className="w-screen h-screen flex flex-row bg-bg font-nanum leading-[22px]">
        <FolderBar />
        <div className="flex w-[calc(100vw-280px)] h-full">
          <NoteMain />
          <NoteAside />
        </div>
      </div>
    </>
  );
};
