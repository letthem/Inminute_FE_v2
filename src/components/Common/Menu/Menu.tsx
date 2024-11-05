import React from 'react';
import editBlack from '@/assets/webps/FolderBar/editBlack.webp';
import deleteBlack from '@/assets/webps/FolderBar/deleteBlack.webp';

interface MenuItemProps {
  label: string;
  icon: string;
  onClick: () => void;
  imgGap: string;
  padding: string;
}

interface MenuProps {
  menuGap?: string;
  imgGap?: string;
  padding?: string;
  top?: string;
  left?: string;
  width?: string;
  height?: string;
  editLabel: string;
  deleteLabel: string;
  onEdit: () => void;
  onDelete: () => void;
}

const MenuItem: React.FC<MenuItemProps> = ({ label, icon, onClick, imgGap, padding }) => (
  <div
    style={{ padding, gap: imgGap }}
    className="flex items-center hover:bg-gray02 rounded-[4px] cursor-pointer"
    onClick={onClick}
  >
    <img src={icon} alt={label} className="w-[14px] h-[14px]" />
    <p className="text-[9px] font-[500] leading-normal">{label}</p>
  </div>
);

export const Menu: React.FC<MenuProps> = ({
  menuGap = '2px',
  imgGap = '6px',
  padding = '6px',
  top = '7px',
  left = '-8px',
  width = '92px',
  height = '66px',
  editLabel,
  deleteLabel,
  onEdit,
  onDelete,
}) => {
  return (
    <div
      style={{
        filter: 'drop-shadow(0px 0px 4px rgba(0, 0, 0, 0.25))',
        width,
        gap: menuGap,
        height,
        top,
        left,
      }}
      className="rounded-[10px] bg-white absolute flex flex-col overflow-visible z-10 px-[6px] py-[7px]"
    >
      <MenuItem
        label={editLabel}
        icon={editBlack}
        onClick={onEdit}
        imgGap={imgGap}
        padding={padding}
      />
      <MenuItem
        label={deleteLabel}
        icon={deleteBlack}
        onClick={onDelete}
        imgGap={imgGap}
        padding={padding}
      />
    </div>
  );
};
