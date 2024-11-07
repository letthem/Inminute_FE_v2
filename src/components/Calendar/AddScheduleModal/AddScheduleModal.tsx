import React, { useState } from 'react';
import xGray from '@/assets/svgs/Main/xGray.svg';

interface AddScheduleModalProps {
  onClose: () => void;
}
export const AddScheduleModal: React.FC<AddScheduleModalProps> = ({ onClose }) => {
  const [noteTitle, setNoteTitle] = useState(''); // 회의 제목 상태

  // 모달 배경 or xBtn 클릭하면 닫힘
  const handleBackgroundClick = () => {
    onClose();
  };

  // 모달 내부를 클릭하면 이벤트가 전파되지 않도록 함
  const handleModalClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  // input change 핸들러
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const trimmedValue = e.target.value.replace(/\s/g, ''); // 띄어쓰기 제외
    if (trimmedValue.length <= 11) {
      setNoteTitle(e.target.value); // 띄어쓰기 제외 11자 이내에서만 제출 가능
    }
  };

  // 새 일정 만들기
  const handleSubmit = async () => {
    if (!noteTitle.trim()) return; // 제목이 없을 경우 무시
    // todo: api 호출 로직 추가
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-mainBlack bg-opacity-60"
      onClick={handleBackgroundClick}
    >
      <div
        className="ml-[100px] w-[480px] h-[418px] absolute flex flex-col items-center rounded-[10px] bg-white leading-[22px]"
        onClick={handleModalClick}
        style={{
          filter: 'drop-shadow(0px 0px 4px rgba(0, 0, 0, 0.25))',
        }}
      >
        <p className="mt-[52px] text-mainBlack text-[24px] font-[700]">새 일정</p>
        <img
          src={xGray}
          alt="xGray"
          onClick={handleBackgroundClick}
          className="w-[15px] h-[15px] absolute right-[27px] top-[27px] cursor-pointer"
        />
        {/* 회의 제목 */}
        <div className="relative mt-[57px]">
          <input
            className="w-[408px] h-[76px] rounded-[10px] pt-[20px] px-4 text-[15px] font-[500] text-mainBlack focus:outline-none"
            style={{ boxShadow: '0 0 0 1px #D9D9D9 inset' }}
            onFocus={(e) => (e.target.style.boxShadow = '0 0 0 1px #2B2B2B inset')}
            onBlur={(e) => (e.target.style.boxShadow = '0 0 0 1px #D9D9D9 inset')}
            onChange={handleInputChange} // input 변경 핸들러 추가
            value={noteTitle}
          />
          <p className="absolute top-[10px] left-4 font-[500] text-[11px] text-gray05">회의 제목</p>
        </div>

        <div className="mt-5 flex gap-4">
          <div
            className="w-[196px] h-[53px]"
            style={{ boxShadow: '0 0 0 1px #D9D9D9 inset' }}
            onFocus={(e) => (e.target.style.boxShadow = '0 0 0 1px #2B2B2B inset')}
            onBlur={(e) => (e.target.style.boxShadow = '0 0 0 1px #D9D9D9 inset')}
          >
            날짜
          </div>
          <div
            className="w-[196px] h-[53px]"
            style={{ boxShadow: '0 0 0 1px #D9D9D9 inset' }}
            onFocus={(e) => (e.target.style.boxShadow = '0 0 0 1px #2B2B2B inset')}
            onBlur={(e) => (e.target.style.boxShadow = '0 0 0 1px #D9D9D9 inset')}
          >
            AM
          </div>
        </div>
        <div
          onClick={handleSubmit}
          className={`${
            noteTitle.trim() ? 'bg-mainBlack cursor-pointer' : 'bg-gray03 cursor-default'
          } w-[59px] h-[46px] rounded-[4px] mt-[60px] flex justify-center items-center`}
        >
          <span className="text-white text-[14px] font-[500]">저장</span>
        </div>
      </div>
    </div>
  );
};
