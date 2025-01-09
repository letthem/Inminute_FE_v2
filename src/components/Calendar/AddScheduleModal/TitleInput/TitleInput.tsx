import { ColorPicker } from '@/components/Calendar/AddScheduleModal/ColorPicker/ColorPicker';
import { ColorGroup } from '@/constants/colorPalette';
import React, { useState } from 'react';

interface TitleInputProps {
  value: string;
  onChange: (value: string) => void;
  selectedColor: ColorGroup; // 색상 그룹
  onColorChange: (color: ColorGroup) => void;
}

export const TitleInput: React.FC<TitleInputProps> = ({
  value,
  onChange,
  selectedColor,
  onColorChange,
}) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    const trimmedValue = inputValue.replace(/\s/g, '');
    if (trimmedValue.length <= 11) {
      onChange(inputValue);
    }
  };

  return (
    <div className="relative mt-[57px]">
      <input
        className="w-[408px] h-[76px] rounded-[10px] pt-[20px] px-4 text-[15px] font-[500] text-mainBlack focus:outline-none placeholder:text-gray03 placeholder:text-[13px]"
        style={{
          boxShadow: isFocused ? '0 0 0 1px #2B2B2B inset' : '0 0 0 1px #D9D9D9 inset',
        }}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        onChange={handleInputChange}
        value={value}
        placeholder={isFocused && !value ? ' 띄어쓰기 제외 11자' : ''}
      />
      <p className="absolute top-[10px] left-4 font-[500] text-[11px] text-gray05">회의 제목</p>
      <ColorPicker selectedColor={selectedColor} onColorChange={onColorChange} />
    </div>
  );
};
