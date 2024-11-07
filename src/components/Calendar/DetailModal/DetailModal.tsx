import React from 'react';
import xGray from '@/assets/svgs/Calendar/xGray.svg';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';

interface DetailModalProps {
  selectedDate: Date;
  position: { top: number; left: number };
  onClose: () => void;
}

export const DetailModal: React.FC<DetailModalProps> = ({ selectedDate, position, onClose }) => {
  return (
    <div
      style={{
        position: 'absolute',
        top: position.top || 0,
        left: position.left || 0,
        boxShadow: '0px 0px 6px 0px rgba(96, 96, 96, 0.16)',
      }}
      className="bg-white rounded-[10px] w-[276px] pb-[26px] z-10"
    >
      <div className="flex justify-between">
        <h2 className="text-[18px] font-[500] ml-6 mt-[26px] mb-[18px]">
          {format(selectedDate, 'MM')}월 {format(selectedDate, 'dd')}일 (
          {format(selectedDate, 'E', { locale: ko })})
        </h2>
        <img
          src={xGray}
          alt="close"
          onClick={onClose}
          className="w-[10px] h-[10px] mt-5 mr-5 cursor-pointer"
        />
      </div>
      {/* 회의 일정 내용 */}
      <div className="ml-6 mr-[22px] flex mt-[18px]">
        <span className="text-[11px] font-[700] leading-[20px] text-mainBlack mr-[11px] mt-[12px]">
          20:00
        </span>
        <div className="w-full h-8 bg-[#FCF2EB] rounded-[4px] px-[10px] py-[5px] flex justify-between items-center">
          <span className="text-[#DB7A08] text-[13px] leading-[22px] font-[500]">해커톤 정기회의</span>
          <div className="w-[2px] h-[11px] flex flex-col justify-between cursor-pointer">
            <div className="bg-[#DB7A08] w-[2px] h-[2px] rounded-[2px]" />
            <div className="bg-[#DB7A08] w-[2px] h-[2px] rounded-[2px]" />
            <div className="bg-[#DB7A08] w-[2px] h-[2px] rounded-[2px]" />
          </div>
        </div>
      </div>
      {/* 회의 일정 내용 2 */}
      <div className="ml-6 mr-[22px] flex mt-[18px]">
        <span className="text-[11px] font-[700] leading-[20px] text-mainBlack mr-[11px] mt-[12px]">
          22:00
        </span>
        <div className="w-full h-8 bg-[#F3E9FF] rounded-[4px] px-[10px] py-[5px] flex justify-between items-center">
          <span className="text-[#BE5BFF] text-[13px] leading-[22px] font-[500]">운영진 회의</span>
          <div className="w-[2px] h-[11px] flex flex-col justify-between cursor-pointer">
            <div className="bg-[#BE5BFF] w-[2px] h-[2px] rounded-[2px]" />
            <div className="bg-[#BE5BFF] w-[2px] h-[2px] rounded-[2px]" />
            <div className="bg-[#BE5BFF] w-[2px] h-[2px] rounded-[2px]" />
          </div>
        </div>
      </div>
    </div>
  );
};
