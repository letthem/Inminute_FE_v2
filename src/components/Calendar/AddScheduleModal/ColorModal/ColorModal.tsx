import React from 'react';

interface ColorModalProps {
  onClose: () => void;
  onSelectColor: (color: string) => void;
}

export const ColorModal: React.FC<ColorModalProps> = ({ onClose, onSelectColor }) => {
  const colors = ['#FFA800', '#FF94A4', '#5CC688', '#7582FF', '#BE5BFF'];

  return (
    <div
      className="absolute top-[21px] right-[-12px] flex items-center justify-center z-20 cursor-default"
      onClick={onClose}
    >
      <div
        className="w-[184px] h-[44px] bg-mainBlack rounded-[10px] flex items-center justify-between gap-4 px-5 py-[14px]"
        onClick={(e) => e.stopPropagation()}
      >
        {colors.map((color) => (
          <div
            key={color}
            className="w-4 h-4 rounded-full cursor-pointer"
            style={{ backgroundColor: color }}
            onClick={() => onSelectColor(color)}
          />
        ))}
      </div>
    </div>
  );
};
