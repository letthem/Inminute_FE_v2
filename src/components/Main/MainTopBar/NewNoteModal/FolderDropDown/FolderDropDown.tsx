import React, { useEffect, useRef } from 'react';
import down from '@/assets/svgs/Main/downGray.svg';
import up from '@/assets/svgs/Main/upGray.svg';
import check from '@/assets/svgs/Main/check.svg';

interface FolderDropdownProps {
  options: { id: number | null; name: string }[]; // 배열의 타입을 수정
  selectedOption: { id: number | null; name: string }; // 수정된 타입
  onOptionSelect: (option: { id: number | null; name: string }) => void; // 수정된 타입
  isOpen: boolean; // 드롭다운 열림/닫힘 상태
  setIsOpen: (open: boolean) => void; // 상태 변경 함수
}

export const FolderDropDown: React.FC<FolderDropdownProps> = ({
  options,
  selectedOption,
  onOptionSelect,
  isOpen,
  setIsOpen,
}) => {
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleDropdownToggle = (e: React.MouseEvent) => {
    e.stopPropagation(); // 이벤트 전파 차단
    setIsOpen(!isOpen);
  };

  // 외부 클릭 시 드롭다운 닫기
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false); // 외부 클릭 시 드롭다운 닫기
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, setIsOpen]);

  return (
    <>
      <div
        tabIndex={0}
        className="relative w-[408px] h-[76px] rounded-[10px] mt-6 cursor-pointer"
        style={{ boxShadow: '0 0 0 1px #D9D9D9 inset' }}
        onFocus={(e) => (e.target.style.boxShadow = '0 0 0 1px #2B2B2B inset')}
        onBlur={(e) => (e.target.style.boxShadow = '0 0 0 1px #D9D9D9 inset')}
        ref={dropdownRef}
        onClick={(e) => {
          e.stopPropagation(); // 이벤트 전파 차단
          handleDropdownToggle(e);
        }}
      >
        <p className="font-[500] text-[11px] mt-[10px] ml-4 text-gray05">폴더 선택</p>
        <img
          src={isOpen ? up : down}
          alt="toggle dropdown"
          className="absolute w-5 h-5 top-10 right-3"
        />
        <span className="absolute pt-[6px] px-4 text-[15px] font-[500] text-mainBlack">
          {selectedOption.name}
        </span>
      </div>

      {/* 드롭다운 목록 */}
      {isOpen && (
        <div
          className={`absolute w-[408px] top-[303px] bg-white rounded-[10px] shadow-[0_0_4px_0_rgba(0,0,0,0.25)] z-20 overflow-hidden`}
        >
          <ul className="mx-[10px] mt-[7px] max-h-[115px] overflow-y-auto scrollbar-hide">
            {options.map((option) => (
              <li
                key={option.id}
                className={`pl-2 h-[32px] mb-[6px] pt-[4px] pb-[5px] text-[14px] leading-[15px] font-medium cursor-pointer rounded flex items-center hover:bg-gray02 ${
                  option.id === selectedOption.id ? 'text-gray04' : 'text-mainBlack'
                }`}
                onMouseDown={(e) => {
                  e.preventDefault(); // 마우스 이벤트의 기본 동작 방지
                  onOptionSelect(option);
                  setIsOpen(false);
                }}
              >
                {option.name}
                {option.id === selectedOption.id && (
                  <img className="w-[11px] ml-[12px]" src={check} alt="selected" />
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
};
