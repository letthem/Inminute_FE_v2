import React from 'react';
import editBlack from '@/assets/webps/FolderBar/editBlack.webp';
import deleteBlack from '@/assets/webps/FolderBar/deleteBlack.webp';

interface MenuProps {
  onEdit: () => void;
  onDelete: () => void;
}

export const Menu: React.FC<MenuProps> = ({ onEdit, onDelete }) => {
  return (
    <div
      style={{ filter: 'drop-shadow(0px 0px 4px rgba(0, 0, 0, 0.25))' }}
      className="rounded-[10px] bg-white absolute top-[7px] left-[-8px] w-[92px] h-[66px] flex flex-col overflow-visible z-10"
    >
      <div
        className="ml-[6px] mt-[6px] w-20 h-[26px] flex items-center hover:bg-gray02 rounded-[4px]"
        onClick={onEdit}
      >
        <img src={editBlack} alt="edit" className="w-[14px] h-[14px] mx-[6px]" />
        <p className="text-[9px] font-[500]">이름 변경</p>
      </div>
      <div
        className="ml-[6px] mt-[2px] w-20 h-[26px] flex items-center hover:bg-gray02 rounded-[4px]"
        onClick={onDelete}
      >
        <img src={deleteBlack} alt="delete" className="w-[14px] h-[14px] mx-[6px]" />
        <p className="text-[9px] font-[500]">삭제하기</p>
      </div>
    </div>
  );
};
