import React, { useState } from 'react';
import { FolderDropDown } from '@/components/Main/MainTopBar/NewNoteModal/FolderDropDown/FolderDropDown';
import newNoteModalBg from '@/assets/webps/Main/newNoteModalBg.webp';
import xGray from '@/assets/svgs/Main/xGray.svg';

interface NewNoteModalProps {
  onClose: () => void;
}

export const NewNoteModal: React.FC<NewNoteModalProps> = ({ onClose }) => {
  const [selectedFolderOption, setSelectedFolderOption] = useState('없음');
  const [noteTitle, setNoteTitle] = useState(''); // 회의 제목 상태
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // 드롭다운 상태 관리

  // 모달 배경 or xBtn 클릭하면 닫힘
  const handleBackgroundClick = () => {
    onClose();
  };

  // 모달 내부를 클릭하면 이벤트가 전파되지 않도록 함
  const handleModalClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  // 드롭다운 옵션 선택 처리 함수
  const handleOptionSelect = (option: string) => {
    setSelectedFolderOption(option); // 옵션 선택 후 상태 업데이트
    setIsDropdownOpen(false); // 드롭다운 닫기
  };

  // input change 핸들러
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const trimmedValue = e.target.value.replace(/\s/g, ''); // 띄어쓰기 제외
    if (trimmedValue.length <= 11) {
      setNoteTitle(e.target.value); // 띄어쓰기 제외 11자 이내에서만 제출 가능
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-mainBlack bg-opacity-60"
      onClick={handleBackgroundClick}
    >
      <div
        className="w-[480px] h-[420px] absolute flex flex-col items-center rounded-[10px] bg-cover"
        onClick={handleModalClick}
        style={{
          backgroundImage: `url(${newNoteModalBg})`,
          filter: 'drop-shadow(0px 0px 4px rgba(0, 0, 0, 0.25))',
        }}
      >
        <p className="mt-[62px] text-mainBlack text-[24px] font-[700]">새 회의 노트</p>
        <img
          src={xGray}
          alt="xGray"
          onClick={handleBackgroundClick}
          className="w-[15px] h-[15px] absolute right-[27px] top-[27px] cursor-pointer"
        />
        <div className="relative mt-12">
          <input
            className="w-[408px] h-[76px] rounded-[10px] pt-[20px] px-4 text-[15px] font-[500] text-mainBlack focus:outline-none"
            style={{ boxShadow: '0 0 0 1px #D9D9D9 inset' }}
            onFocus={(e) => (e.target.style.boxShadow = '0 0 0 1px #2B2B2B inset')}
            onBlur={(e) => (e.target.style.boxShadow = '0 0 0 1px #D9D9D9 inset')}
            onChange={handleInputChange} // input 변경 핸들러 추가
            value={noteTitle}
          />
          <p className="absolute top-[10px] left-[16px] font-[500] text-[11px] text-gray05">
            회의 제목
          </p>
        </div>
        <FolderDropDown
          options={['없음', '학교', '직장']}
          selectedOption={selectedFolderOption}
          onOptionSelect={handleOptionSelect}
          isOpen={isDropdownOpen}
          setIsOpen={setIsDropdownOpen}
        />
        <div
          className={`${
            noteTitle.trim() ? 'bg-mainBlack cursor-pointer' : 'bg-gray03 cursor-default'
          } w-[72px] h-[46px] rounded-[4px] mt-[34px] flex justify-center items-center`}
        >
          <span className="text-white text-[14px] font-[500]">만들기</span>
        </div>
      </div>
    </div>
  );
};
