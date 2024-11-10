import { ColorPicker } from '@/components/Calendar/AddScheduleModal/ColorPicker/ColorPicker';
import React, { useState } from 'react';

interface TitleInputProps {
  value: string;
  onChange: (value: string) => void;
}

export const TitleInput: React.FC<TitleInputProps> = ({ value, onChange }) => {
  const [isFocused, setIsFocused] = useState(false);
  const [selectedColor, setSelectedColor] = useState('#FFA800');

  return (
    <div className="relative mt-[57px]">
      <input
        className="w-[408px] h-[76px] rounded-[10px] pt-[20px] px-4 text-[15px] font-[500] text-mainBlack focus:outline-none placeholder:text-gray03 placeholder:text-[13px]"
        style={{
          boxShadow: isFocused ? '0 0 0 1px #2B2B2B inset' : '0 0 0 1px #D9D9D9 inset',
        }}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        onChange={(e) => onChange(e.target.value.replace(/\s/g, ''))}
        value={value}
        placeholder={isFocused && !value ? ' 띄어쓰기 제외 11자' : ''}
      />
      <p className="absolute top-[10px] left-4 font-[500] text-[11px] text-gray05">회의 제목</p>
      <ColorPicker selectedColor={selectedColor} onColorChange={setSelectedColor} />
    </div>
  );
};
