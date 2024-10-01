import { useState, useEffect, useRef } from 'react';
import down from '@/assets/webps/Main/downBlack.webp';
import up from '@/assets/webps/Main/upBlack.webp';
import check from '@/assets/svgs/Main/check.svg';

interface SortDropdownProps {
  options: string[];
  selectedOption: string;
  onOptionSelect: (option: string) => void;
}

export const SortDropdown: React.FC<SortDropdownProps> = ({
  options,
  selectedOption,
  onOptionSelect,
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // 드롭다운 열기/닫기 toggle 함수
  const handleDropdownToggle = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  // 외부 클릭 시 드롭다운 닫기
  const handleClickOutside = (event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setIsDropdownOpen(false);
    }
  };

  useEffect(() => {
    if (isDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isDropdownOpen]);

  return (
    <div className="relative" ref={dropdownRef}>
      <div
        className="h-[22px] mr-6 flex items-center cursor-pointer"
        onClick={handleDropdownToggle}
      >
        <span className="mr-2 font-medium text-mainBlack text-[14px]">{selectedOption}</span>
        <img className="w-5 h-5" src={isDropdownOpen ? up : down} alt="toggle dropdown" />
      </div>

      {isDropdownOpen && (
        <div className="w-[120px] y-[100px] absolute top-full mt-3 right-6 bg-white rounded-[10px] shadow-[0_0_4px_0_rgba(0,0,0,0.25)] z-20">
          <ul className="mx-[6px] my-2">
            {options.map((option) => (
              <li
                key={option}
                className={`pl-2 pt-[7px] pb-2 text-[12px] font-medium cursor-pointer rounded flex items-center hover:bg-gray02 justify-between ${
                  option === selectedOption ? 'text-gray04' : 'text-mainBlack'
                }`}
                onClick={() => {
                  onOptionSelect(option);
                  setIsDropdownOpen(false);
                }}
              >
                {option}
                {option === selectedOption && (
                  <img className="w-[11px] mr-[14px]" src={check} alt="selected" />
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
