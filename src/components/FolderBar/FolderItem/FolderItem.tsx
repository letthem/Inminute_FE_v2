import React from 'react';
import { NoteItem } from '@/components/FolderBar/FolderItem/NoteItem/NoteItem';
import folder from '@/assets/webps/FolderBar/folder.webp';
import folderMint from '@/assets/webps/FolderBar/folderMint.webp';
import down from '@/assets/webps/FolderBar/downGray.webp';
import up from '@/assets/webps/FolderBar/upGray.webp';
import kebabWhite from '@/assets/webps/FolderBar/kebabWhite.webp';
import dragGray from '@/assets/webps/FolderBar/dragGray.webp';

interface Folder {
  name: string;
  notes: string[];
}

interface FolderItemProps {
  index: number;
  folderItem: Folder;
  expanded: boolean;
  hoveredFolderName: number | null;
  selectedFolderName: number | null;
  toggleFolder: (index: number) => void;
  setHoveredFolderName: (index: number | null) => void;
  setSelectedFolderName: (index: number) => void;
  onFolderSelect?: (folder: string) => void;
}

export const FolderItem: React.FC<FolderItemProps> = ({
  index,
  folderItem,
  expanded,
  hoveredFolderName,
  selectedFolderName,
  toggleFolder,
  setHoveredFolderName,
  setSelectedFolderName,
  onFolderSelect,
}) => (
  <div>
    <div
      className={`group mb-1 flex hover:bg-mainBlack ml-[10px] mr-6 py-2 rounded-[10px] justify-between cursor-pointer items-center`}
    >
      <div className="flex items-center">
        <img src={dragGray} alt="drag" className="w-2 h-[15px] ml-2 hidden group-hover:block" />

        <img
          className="w-5 h-5 group-hover:ml-[6px] ml-[22px] mr-2"
          src={hoveredFolderName === index || selectedFolderName === index ? folderMint : folder}
          alt="folder"
        />
        <span
          onMouseEnter={() => setHoveredFolderName(index)}
          onMouseLeave={() => setHoveredFolderName(null)}
          className={`mr-[10px] font-bold text-[14px] cursor-pointer active:scale-95 ${
            hoveredFolderName === index || selectedFolderName === index
              ? 'text-main04'
              : 'text-white'
          }`}
          onClick={() => {
            setSelectedFolderName(index);
            if (onFolderSelect) {
              onFolderSelect(folderItem.name);
            }
          }}
        >
          {folderItem.name}
        </span>
        <img
          className="w-5 h-5 mr-6 cursor-pointer transition-transform duration-300 ease-in-out"
          src={expanded ? up : down}
          alt={expanded ? 'up' : 'down'}
          onClick={() => toggleFolder(index)}
        />
      </div>
      <div className="mr-[10px]">
        <img
          src={kebabWhite}
          alt="kebab menu"
          className="w-[3px] h-[15px] hidden group-hover:block"
        />
      </div>
    </div>
    <div
      className={`ml-[30px] overflow-hidden transition-all duration-300 ease-in-out ${
        expanded ? 'max-h-[300px]' : 'max-h-0'
      }`}
      style={{
        maxHeight: expanded ? `${folderItem.notes.length * 100}px` : '0',
      }}
    >
      <div className="mb-2">
        {folderItem.notes.map((noteItem, noteIndex) => (
          <NoteItem key={noteIndex} noteItem={noteItem} />
        ))}
      </div>
    </div>
  </div>
);
