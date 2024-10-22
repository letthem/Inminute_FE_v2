import React from 'react';

interface TextItemProps {
  feature: string;
  desc1: string;
  desc2: string;
}

export const TextItem: React.FC<TextItemProps> = ({ feature, desc1, desc2 }) => {
  return (
    <div className="mt-[72px] mb-[484px]">
      <p className="leading-[76px] text-[40px] font-bold font-nanumv text-white">{feature}</p>
      <div className="text-gray05 leading-[170%] text-[18px] font-[400] mt-[6px]">
        <p>{desc1}</p>
        <p>{desc2}</p>
      </div>
    </div>
  );
};
