import React, { useEffect, useRef, useState } from 'react';
import down from '@/assets/svgs/Main/downGray.svg';
import up from '@/assets/svgs/Main/upGray.svg';
import check from '@/assets/svgs/Main/check.svg';

interface FolderDropdownProps {
  options: string[];
  selectedOption: string;
  onOptionSelect: (option: string) => void;
}

export const FolderDropDown: React.FC<FolderDropdownProps> = ({
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
    <>
      <div
        tabIndex={0}
        className="relative w-[408px] h-[76px] rounded-[10px] mt-6 cursor-pointer"
        style={{ boxShadow: '0 0 0 1px #D9D9D9 inset' }}
        onFocus={(e) => (e.target.style.boxShadow = '0 0 0 1px #2B2B2B inset')}
        onBlur={(e) => (e.target.style.boxShadow = '0 0 0 1px #D9D9D9 inset')}
        ref={dropdownRef}
        onClick={handleDropdownToggle}
      >
        <p className="font-[500] text-[11px] mt-[10px] ml-4 text-gray05">폴더 선택</p>
        <img
          src={isDropdownOpen ? up : down}
          alt="toggle dropdown"
          className="absolute w-5 h-5 top-10 right-3"
        />
        <span className="absolute pt-[6px] px-4 text-[15px] font-[500] text-mainBlack">
          {selectedOption}
        </span>
      </div>
      <div
        className={`w-[408px] h-[122px] absolute top-[303px] bg-white rounded-[10px] shadow-[0_0_4px_0_rgba(0,0,0,0.25)] z-20 transition-all duration-200 ease-in-out overflow-hidden ${
          isDropdownOpen ? 'max-h-[200px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <ul className="mx-[10px] mt-[7px]">
          {options.map((option) => (
            <li
              key={option}
              className={`pl-2 h-[32px] mb-[6px] pt-[4px] pb-[5px] text-[14px] leading-[15px] font-medium cursor-pointer rounded flex items-center hover:bg-gray02 ${
                option === selectedOption ? 'text-gray04' : 'text-mainBlack'
              }`}
              onClick={() => {
                onOptionSelect(option);
                setIsDropdownOpen(false);
              }}
            >
              {option}
              {option === selectedOption && (
                <img className="w-[11px] ml-[12px]" src={check} alt="selected" />
              )}
            </li>
          ))}
        </ul>
      </div>
      
    </>
  );
};
