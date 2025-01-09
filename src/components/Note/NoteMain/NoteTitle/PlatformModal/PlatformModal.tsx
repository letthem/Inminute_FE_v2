import React, { useState } from 'react';
import zoom from '@/assets/webps/Note/zoom.webp';
import webex from '@/assets/webps/Note/webex.webp';
import googleMeet from '@/assets/webps/Note/googleMeet.webp';
import microsoftTeams from '@/assets/webps/Note/microsoftTeams.webp';

interface PlatformModalProps {
  onClose: () => void;
}

export const PlatformModal: React.FC<PlatformModalProps> = ({ onClose }) => {
  const [selectedPlatform, setSelectedPlatform] = useState<string | null>(null); // 선택된 플랫폼

  const platforms = [
    { src: zoom, alt: 'zoom', label: 'zoom', link: 'https://zoom.us/signin#/login' },
    {
      src: webex,
      alt: 'webex',
      label: 'webex',
      link: 'https://signin.webex.com/signin?surl=https%3A%2F%2Fsignin.webex.com%2Fcollabs%2Fauth%3F',
    },
    {
      src: googleMeet,
      alt: 'google meet',
      label: 'google meet',
      link: 'https://meet.google.com/landing',
    },
    {
      src: microsoftTeams,
      alt: 'microsoft teams',
      label: 'microsoft teams',
      link: 'https://teams.microsoft.com/v2/',
    },
  ];

  // 모달 배경을 클릭하면 닫힘
  const handleBackgroundClick = () => {
    onClose();
  };

  // 모달 내부를 클릭하면 이벤트가 전파되지 않도록 함
  const handleModalClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  // 플랫폼 선택 함수
  const handlePlatformSelect = (platform: string) => {
    setSelectedPlatform(platform); // 선택된 플랫폼 상태 업데이트
  };

  // 확인 버튼 클릭 함수
  const handleConfirm = () => {
    if (selectedPlatform) {
      const platform = platforms.find((p) => p.label === selectedPlatform);
      if (platform) {
        window.open(platform.link, '_blank'); // 선택한 플랫폼의 링크를 새 창으로 열기
        onClose();
      }
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-mainBlack bg-opacity-40 font-nanum"
      onClick={handleBackgroundClick}
    >
      <div className="bg-white rounded-[40px] fixed flex justify-center items-center top-[32px] w-[418px] h-[38px]">
        <span className="text-mainBlack text-[12px] font-[700] leading-[22px]">
          플랫폼을 선택하여 회의를 생성하고, 링크 공유로 참여자를 초대하세요!
        </span>
      </div>
      <div
        className="bg-white w-[692px] h-[366px] rounded-[20px] relative flex flex-col"
        onClick={handleModalClick}
      >
        <h2 className="text-[#444] text-[18px] font-[700] leading-[24px] mx-auto mt-[40px]">
          회의를 진행할 플랫폼을 선택하세요
        </h2>
        <ul className="mt-9 mx-auto gap-3 flex">
          {platforms.map((platform, index) => (
            <li
              key={index}
              className="w-[140px] h-[150px] rounded-[20px] flex flex-col justify-center items-center cursor-pointer
              hover:bg-gray02"
              onClick={() => handlePlatformSelect(platform.label)} // 플랫폼 선택
              style={{
                boxShadow:
                  selectedPlatform === platform.label
                    ? '0 0 0 1px #2B2B2B inset'
                    : '0 0 0 1px #ECECEC inset',
              }}
            >
              <img className="w-[72px] h-[72px] mx-auto" src={platform.src} alt={platform.alt} />
              <span className="mt-4 text-[12px] font-[600] leading-[22px] text-mainBlack">
                {platform.label}
              </span>
            </li>
          ))}
        </ul>
        <div
          onClick={handleConfirm}
          className={`mt-[38px] mx-auto w-[59px] h-[46px] ${selectedPlatform ? 'bg-mainBlack cursor-pointer' : 'bg-gray03 cursor-default'} rounded-[4px] flex justify-center items-center`}
        >
          <span className="text-white text-[14px] font-[500] leading-[22px]">확인</span>
        </div>
      </div>
    </div>
  );
};
