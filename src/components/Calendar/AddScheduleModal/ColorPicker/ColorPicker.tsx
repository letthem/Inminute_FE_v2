import { ColorModal } from '@/components/Calendar/AddScheduleModal/ColorPicker/ColorModal/ColorModal';
import React, { useEffect, useRef, useState } from 'react';

interface ColorPickerProps {
  selectedColor: string;
  onColorChange: (color: string) => void;
}

export const ColorPicker: React.FC<ColorPickerProps> = ({ selectedColor, onColorChange }) => {
  const [isColorModalOpen, setIsColorModalOpen] = useState(false);
  const colors = {
    orange: '#FFA800',
    pink: '#FF94A4',
    green: '#5CC688',
    blue: '#7582FF',
    purple: '#BE5BFF',
  };
  const pickerRef = useRef<HTMLDivElement>(null);

  const handleColorSelect = (color: string) => {
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
      style={{ backgroundColor: selectedColor }}
      onClick={() => setIsColorModalOpen(!isColorModalOpen)}
    >
     {isColorModalOpen && (
        <ColorModal
          colors={colors} // colors 리스트를 ColorModal로 전달
          onClose={() => setIsColorModalOpen(false)}
          onSelectColor={handleColorSelect}
        />
      )}
    </div>
  );
};
