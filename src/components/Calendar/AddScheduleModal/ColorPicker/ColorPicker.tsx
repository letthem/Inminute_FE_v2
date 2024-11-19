import { ColorModal } from '@/components/Calendar/AddScheduleModal/ColorPicker/ColorModal/ColorModal';
import colorPalette, { ColorGroup } from '@/constants/colorPalette';
import React, { useEffect, useRef, useState } from 'react';

interface ColorPickerProps {
  selectedColor: ColorGroup;
  onColorChange: (color: ColorGroup) => void;
}

export const ColorPicker: React.FC<ColorPickerProps> = ({ selectedColor, onColorChange }) => {
  const [isColorModalOpen, setIsColorModalOpen] = useState(false);
  const pickerRef = useRef<HTMLDivElement>(null);

  const handleColorSelect = (color: ColorGroup) => {
    onColorChange(color); // 색상 선택 처리
    setIsColorModalOpen(false); // 색상 선택 후 모달 닫기
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (pickerRef.current && !pickerRef.current.contains(event.target as Node)) {
      setIsColorModalOpen(false); // 모달 바깥 클릭 시 모달 닫기
    }
  };

  useEffect(() => {
    if (isColorModalOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isColorModalOpen]);

  return (
    <div
      ref={pickerRef}
      className="absolute bottom-[21px] right-[21px] w-5 h-5 rounded-full cursor-pointer"
      style={{ backgroundColor: colorPalette[selectedColor].main }}
      onClick={() => setIsColorModalOpen(!isColorModalOpen)}
    >
      {isColorModalOpen && (
        <ColorModal
          colors={colorPalette}
          onClose={() => setIsColorModalOpen(false)}
          onSelectColor={handleColorSelect}
        />
      )}
    </div>
  );
};
