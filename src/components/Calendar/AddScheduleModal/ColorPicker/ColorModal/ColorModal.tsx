import colorPalette, { ColorGroup } from '@/constants/colorPalette';
import React from 'react';

interface ColorModalProps {
  colors: typeof colorPalette;
  onClose: () => void;
  onSelectColor: (color: ColorGroup) => void;
}

export const ColorModal: React.FC<ColorModalProps> = ({ colors, onClose, onSelectColor }) => {
  return (
    <div
      className="absolute top-[21px] right-[-12px] flex items-center justify-center z-20 cursor-default"
      onClick={onClose}
    >
      <div
        className="w-[184px] h-[44px] bg-mainBlack rounded-[10px] flex items-center justify-between gap-4 px-5 py-[14px]"
        onClick={(e) => e.stopPropagation()}
        style={{
          filter: 'drop-shadow(0px 0px 4px rgba(0, 0, 0, 0.25))',
        }}
      >
        {Object.keys(colors).map((colorName) => (
          <div
            key={colorName}
            className="w-4 h-4 rounded-full cursor-pointer"
            style={{ backgroundColor: colors[colorName as ColorGroup].main }}
            onClick={() => onSelectColor(colorName as ColorGroup)}
          />
        ))}
      </div>
    </div>
  );
};
