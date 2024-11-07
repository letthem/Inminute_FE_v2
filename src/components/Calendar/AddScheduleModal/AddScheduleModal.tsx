import React, { useState } from 'react';
import xGray from '@/assets/svgs/Main/xGray.svg';
import calendarBlack from '@/assets/webps/Calendar/calendarBlack.webp';
import { ColorModal } from '@/components/Calendar/AddScheduleModal/ColorModal/ColorModal';

interface AddScheduleModalProps {
  onClose: () => void;
}
export const AddScheduleModal: React.FC<AddScheduleModalProps> = ({ onClose }) => {
  const [noteTitle, setNoteTitle] = useState(''); // 회의 제목 상태
  const [isTitleFocused, setIsTitleFocused] = useState(false); // 제목 필드 포커스 상태
  const [isTimeBoxFocused, setIsTimeBoxFocused] = useState(false);
  const [meridiem, setMeridiem] = useState<'AM' | 'PM'>('AM');
  const [hours, setHours] = useState('');
  const [minutes, setMinutes] = useState('');
  const [isColorModalOpen, setIsColorModalOpen] = useState(false); // color 모달 상태 관리
  const [selectedColor, setSelectedColor] = useState('#FFA800'); // 기본 색상 설정

  const toggleColorModal = () => {
    setIsColorModalOpen(!isColorModalOpen);
  };

  const handleColorChange = (color: string) => {
    setSelectedColor(color);
    setIsColorModalOpen(false); // 색상 선택 후 모달 닫기
  };

  // 모달 배경 or xBtn 클릭하면 닫힘
  const handleBackgroundClick = () => {
    onClose();
  };

  // 모달 내부를 클릭하면 이벤트가 전파되지 않도록 함
  const handleModalClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // AddScheduleModal 클릭 이벤트 전파 방지
    if (isColorModalOpen) {
      setIsColorModalOpen(false); // ColorModal 닫기
    }
  };


  // input change 핸들러
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const trimmedValue = e.target.value.replace(/\s/g, ''); // 띄어쓰기 제외
    if (trimmedValue.length <= 11) {
      setNoteTitle(e.target.value); // 띄어쓰기 제외 11자 이내에서만 제출 가능
    }
  };

  // 회의 제목 focus & blur
  const handleFocus = () => setIsTitleFocused(true);
  const handleBlur = () => setIsTitleFocused(false);

  // 시간 box focus & blur
  const handleTimeBoxClick = () => {
    setIsTimeBoxFocused(true);
  };
  const handleBlurTimeBox = (e: React.FocusEvent<HTMLDivElement>) => {
    if (!e.currentTarget.contains(e.relatedTarget)) {
      setIsTimeBoxFocused(false);
    }
  };

  const handleMeridiemClick = (value: 'AM' | 'PM') => {
    setMeridiem(value);
  };

  const handleHoursChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;

    // 빈 문자열 처리: placeholder 보이기
    if (value === '') {
      setHours('');
      return;
    }

    // '0' 또는 '00'을 그대로 입력할 수 있게 하고, 나머지 숫자만 앞의 0 제거
    if (value !== '0' && value !== '00') {
      value = value.replace(/^0+/, ''); // 앞의 0 제거
    }

    // 숫자만 허용하며, 0부터 12까지의 범위로 제한
    if (/^(0?[0-9]|1[0-2])$/.test(value)) {
      setHours(value.length === 1 ? `0${value}` : value); // 한 자리일 때 앞에 0 추가
    }
  };

  const handleMinutesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;

    // 빈 문자열 처리: placeholder 보이기
    if (value === '') {
      setMinutes('');
      return;
    }

    // '0' 또는 '00'을 그대로 입력할 수 있게 하고, 나머지 숫자만 앞의 0 제거
    if (value !== '0' && value !== '00') {
      value = value.replace(/^0+/, ''); // 앞의 0 제거
    }

    // 숫자만 허용하며, 0부터 59까지의 범위로 제한
    if (/^([0-5]?[0-9])$/.test(value)) {
      setMinutes(value.length === 1 ? `0${value}` : value); // 한 자리일 때 앞에 0 추가
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
            className="w-[408px] h-[76px] rounded-[10px] pt-[20px] px-4 text-[15px] font-[500] text-mainBlack focus:outline-none placeholder:text-gray03 placeholder:text-[13px]"
            style={{ boxShadow: '0 0 0 1px #D9D9D9 inset' }}
            onFocus={(e) => {
              handleFocus();
              e.target.style.boxShadow = '0 0 0 1px #2B2B2B inset';
            }}
            onBlur={(e) => {
              handleBlur();
              e.target.style.boxShadow = '0 0 0 1px #D9D9D9 inset';
            }}
            onChange={handleInputChange} // input 변경 핸들러 추가
            value={noteTitle}
            placeholder={isTitleFocused && !noteTitle ? ' 띄어쓰기 제외 11자' : ''}
          />
          <p className="absolute top-[10px] left-4 font-[500] text-[11px] text-gray05">회의 제목</p>

          {/* 회의 색상 */}
          <div
            onClick={(e) => {
              e.stopPropagation(); // 모달 내부 클릭은 전파 방지
              toggleColorModal();
            }}
            className="absolute bottom-[21px] right-[21px] w-5 h-5 rounded-full cursor-pointer"
            style={{ backgroundColor: selectedColor }}
          >
            {isColorModalOpen && (
              <ColorModal onClose={toggleColorModal} onSelectColor={handleColorChange} />
            )}
          </div>
        </div>

        {/* 회의 날짜 */}
        <div className="mt-5 flex gap-4">
          <div
            className="w-[196px] h-[53px] rounded-[10px] pl-4 pr-[17px] flex justify-between items-center"
            style={{ boxShadow: '0 0 0 1px #D9D9D9 inset' }}
            onFocus={(e) => (e.target.style.boxShadow = '0 0 0 1px #2B2B2B inset')}
            onBlur={(e) => (e.target.style.boxShadow = '0 0 0 1px #D9D9D9 inset')}
          >
            <span className="text-gray05 text-[11px] font-[500]">날짜</span>
            <img src={calendarBlack} alt="calendar black" className="w-4 h-4" />
          </div>

          {/* 회의 시간 */}
          <div
            className="w-[196px] h-[53px] rounded-[10px] flex justify-between px-4 items-center text-[13px]"
            style={{
              boxShadow: isTimeBoxFocused ? '0 0 0 1px #2B2B2B inset' : '0 0 0 1px #D9D9D9 inset',
            }}
            onMouseDown={handleTimeBoxClick}
            onBlur={handleBlurTimeBox}
            tabIndex={0}
          >
            <div className="flex gap-3 font-[700]">
              <span
                className={`cursor-pointer ${meridiem === 'AM' ? 'text-mainBlack' : 'text-gray02'}`}
                onClick={() => handleMeridiemClick('AM')}
              >
                AM
              </span>
              <span
                className={`cursor-pointer ${meridiem === 'PM' ? 'text-mainBlack' : 'text-gray02'}`}
                onClick={() => handleMeridiemClick('PM')}
              >
                PM
              </span>
            </div>
            <div className="flex gap-3 text-mainBlack">
              <input
                type="text"
                className="w-5 placeholder:text-gray02 font-[700] focus:outline-none"
                placeholder="00"
                value={hours}
                onChange={handleHoursChange}
              />
              <span className="font-[500]">:</span>
              <input
                type="text"
                className="w-5 placeholder:text-gray02 font-[700] focus:outline-none"
                placeholder="00"
                value={minutes}
                onChange={handleMinutesChange}
              />
            </div>
          </div>
        </div>

        {/* 저장 */}
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
