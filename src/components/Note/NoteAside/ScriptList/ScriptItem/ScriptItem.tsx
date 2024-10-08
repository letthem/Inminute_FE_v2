import userMint from '@/assets/svgs/Note/userMint.svg';
import React from 'react';

interface ScriptItemProps {
  name: string;
  script: string;
}

export const ScriptItem: React.FC<ScriptItemProps> = ({ name, script }) => {
  return (
    <div className="mb-8">
      <div className="flex items-center">
        <img src={userMint} alt="user icon" className="w-[28px] h-[28px] mr-[10px]" />
        <span className="font-bold text-[14px] text-main07">{name}</span>
      </div>
      <p className="font-pretendard font-normal text-[13px] leading-[24px] mt-3">{script}</p>
    </div>
  );
};
