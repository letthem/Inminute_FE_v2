import React from 'react';
import note from '@/assets/webps/FolderBar/note.webp';
import kebabWhite from '@/assets/webps/FolderBar/kebabWhite.webp';
import dragGray from '@/assets/webps/FolderBar/dragGray.webp';

interface UnassignedNotesProps {
  notes: string[];
}

export const UnassignedNotes: React.FC<UnassignedNotesProps> = ({ notes }) => (
  <>
    {notes.map((noteItem, noteIndex) => (
      <div
        key={`unassigned-${noteIndex}`}
        className="mb-1 ml-8 py-2 mr-6 hover:ml-[10px] rounded-[10px] flex items-center justify-between pb-2 group hover:bg-mainBlack cursor-pointer"
      >
        <div className="flex items-center">
          <img src={dragGray} alt="move" className="w-2 h-[15px] ml-2 hidden group-hover:block" />
          <img className="w-5 h-5 group-hover:ml-[6px] mr-[10px]" src={note} alt="note" />
          <span className="font-[350] text-[14px] text-white cursor-pointer active:scale-[97%]">
            {noteItem}
          </span>
        </div>
        <img
          src={kebabWhite}
          alt="kebab menu"
          className="w-[2.5px] h-[13px] mr-[11.5px] hidden group-hover:block"
        />
      </div>
    ))}
  </>
);
