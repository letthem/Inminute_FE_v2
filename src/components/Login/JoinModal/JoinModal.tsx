import { instance } from '@/apis/Instance';
import React, { useRef, useState } from 'react';

interface JoinModalProps {
  onClose: () => void;
}

export const JoinModal: React.FC<JoinModalProps> = ({ onClose }) => {
  const [userName, setUserName] = useState(''); // 사용자 이름 상태
  const inputRef = useRef<HTMLInputElement | null>(null);

  // 모달 배경을 클릭하면 닫힘
  const handleBackgroundClick = () => {
    onClose();
  };

  // 모달 내부를 클릭하면 이벤트가 전파되지 않도록 함
  const handleModalClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  // 이름 입력 핸들러 - 7자 이내로 입력 제한
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length <= 7) {
      setUserName(e.target.value);
    }
  };

  // 이름 제출 함수
  const handleSubmit = async () => {
    if (userName.length >= 1 && userName.length <= 7) {
      try {
        // 서버로 patch 요청 보내기
        await instance.patch('/members', { nickname: userName });
        window.location.href = '/'; // 완료 후 '/'로 리다이렉트
      } catch (error) {
        console.log('닉네임 저장 에러:', error);
      }
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-mainBlack bg-opacity-60 font-nanum"
      onClick={handleBackgroundClick}
    >
      <div
        className="bg-white w-[480px] h-[348px] rounded-[20px] relative flex flex-col"
        onClick={handleModalClick}
      >
        <div className="flex flex-col items-center">
          <p className="text-[#444444] text-[19px] font-[700] leading-[24px] mt-[46px]">
            사용할 이름을 입력해주세요
          </p>
          <input
            value={userName}
            ref={inputRef}
            className="w-[392px] h-[68px] mt-10 rounded-[10px] px-5 text-[17px] leading-[24px] font-[600] text-[#444444] focus:outline-none"
            style={{ boxShadow: '0 0 0 1px #D9D9D9 inset' }}
            onFocus={(e) => (e.target.style.boxShadow = '0 0 0 1px #2B2B2B inset')}
            onBlur={(e) => (e.target.style.boxShadow = '0 0 0 1px #D9D9D9 inset')}
            onChange={handleNameChange}
          />
        </div>
        <ul className="mt-4 text-gray04 text-[11px] font-600 list list-outside list-disc ml-[60px] leading-[22px]">
          <li>변경이 불가능하니, 신중하게 입력해주세요</li>
          <li>7글자 이내로 입력해주세요</li>
        </ul>
        <div
          onClick={handleSubmit}
          className={`w-[59px] h-[46px] mt-8 rounded-[4px] flex justify-center items-center cursor-pointer mx-auto ${
            userName.length > 0 && userName.length <= 7 ? 'bg-mainBlack' : 'bg-gray-300'
          }`}
        >
          <span className="text-white text-[14px] leading-[22px] font-500">완료</span>
        </div>
      </div>
    </div>
  );
};
