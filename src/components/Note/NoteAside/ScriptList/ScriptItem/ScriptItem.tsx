import React, { useState, ReactNode } from 'react';
import userMint from '@/assets/svgs/Note/userMint.svg';
import kebab from '@/assets/svgs/Note/kebab.svg';

interface ScriptItemProps {
  name: string;
  script: ReactNode;
}

export const ScriptItem: React.FC<ScriptItemProps> = ({ name, script }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="pb-4 pt-4 pl-[15px] pr-3 hover:bg-gray02 rounded-[10px]"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <img src={userMint} alt="user icon" className="w-[28px] h-[28px] mr-[10px]" />
          <span className="font-bold text-[14px] text-main07">{name}</span>
        </div>
        {isHovered && (
          <img
            src={kebab}
            alt="kebab icon"
            className="w-[10.5px] h-[13.5px] mr-[4.5px] px-[4px] cursor-pointer"
          />
        )}
      </div>
      <div className="mt-3">
        <span className="font-pretendard font-[350] text-[13px] leading-[24px]">{script}</span>
      </div>
    </div>
  );
};
