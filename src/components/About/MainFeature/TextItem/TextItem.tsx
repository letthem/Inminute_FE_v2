import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

interface TextItemProps {
  feature: string;
  desc1: string;
  desc2: string;
}

export const TextItem: React.FC<TextItemProps> = ({ feature, desc1, desc2 }) => {
  useEffect(() => {
    AOS.init({
      duration: 700,
      once: false,
    });
  }, []);

  return (
    <div data-aos="fade-up" className="mt-[102px] mb-[1000px]">
      <p className="leading-[76px] text-[40px] font-bold font-nanumv text-white">{feature}</p>
      <div className="text-gray05 leading-[170%] text-[19px] font-pretendard font-[400] mt-[9px]">
        <p>{desc1}</p>
        <p>{desc2}</p>
      </div>
    </div>
  );
};
