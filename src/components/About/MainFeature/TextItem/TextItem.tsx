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
    <div data-aos="fade-up" className="mt-[102px] mb-[1000px] h-[150px]">
      <p className="text-center s1000:text-start text-[28px] tab:text-[36px] s1000:text-[23px] s1200:text-[32px] s1300:text-[40px] s14:text-[35px] s16:text-[40px] leading-[76px] font-bold font-nanumv text-white">{feature}</p>
      <div className="text-center s1000:text-start text-[14px] tab:text-[19px] s1000:text-[13px] s1200:text-[15px] s1300:text-[19px] s14:text-[16px] s16:text-[19px] text-gray05 leading-[170%] font-pretendard font-[400] mt-[9px]">
        <p>{desc1}</p>
        <p>{desc2}</p>
      </div>
    </div>
  );
};
