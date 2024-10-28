import React from 'react';
import folder from '@/assets/webps/FolderBar/folder.webp';

interface NewFolderInputProps {
  newFolderName: string;
  setNewFolderName: (name: string) => void;
  handleKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

export const NewFolderInput: React.FC<NewFolderInputProps> = ({
  newFolderName,
  setNewFolderName,
  handleKeyDown,
}) => (
  <div className="mt-3 ml-8 flex items-center">
    <img className="w-5 h-5 mr-[10px]" src={folder} alt="new folder" />
    <input
      type="text"
      className="font-[350] text-[14px] placeholder-gray07 text-white bg-transparent focus:outline-none"
      placeholder="새 폴더"
      value={newFolderName}
      onChange={(e) => {
        if (e.target.value.length <= 9) {
          setNewFolderName(e.target.value);
        }
      }}
      onKeyDown={handleKeyDown}
    />
  </div>
);
