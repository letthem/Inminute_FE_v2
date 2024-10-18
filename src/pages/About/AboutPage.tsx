import { NavBar } from '@/components/NavBar/NavBar';
import { useEffect, useState } from 'react';
import pain1 from '@/assets/svgs/About/pain1.svg';
import pain2 from '@/assets/svgs/About/pain2.svg';
import pain3 from '@/assets/svgs/About/pain3.svg';
import double from '@/assets/svgs/About/double.svg';

export const AboutPage = () => {
  const [isVisible, setIsVisible] = useState(false);

  // about 페이지 로드 시 애니메이션 트리거
  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <>
      <section
        className={`bg-bg font-nanum flex flex-col w-screen h-screen transition-opacity duration-500 ease-in-out ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <NavBar />
        <div className="overflow-y-auto scrollbar-hide">
          <div className="flex mt-[158px] ml-[199px]">
            <div className="flex flex-col text-mainBlack leading-[150%] text-[62px] font-[800]">
              <p>
                <span className="text-[#0BCDB3]">회의의 모든 순간</span>을
              </p>
              <p>Inminute과 함께</p>
            </div>
            <div className="flex flex-col mt-[101px] ml-[60px] text-[20px] font-[400] leading-[190%]">
              <p>나를 위한 AI 회의록 서비스,</p>
              <p>스크립트부터 요약까지 한 번에 !</p>
            </div>
          </div>
          <div className="flex mt-[68px] mx-[177px] justify-between mb-12">
            <div className="flex flex-col items-center">
              <img src={pain1} alt="pain1" className="w-[355px] h-[355px]" />
              <img src={double} alt="double" className="w-11 h-[30.7px] mt-11" />
              <div className="flex flex-col items-center text-mainBlack text-[16px] font-500 leading-[190%] mt-[36.3px]">
                <span>회의도 진행해야 하는데</span>
                <span>회의록까지 쓰는 건</span>
                <span>혼자 하기엔 너무 벅차</span>
              </div>
            </div>
            <div className="flex flex-col items-center">
              <img src={pain2} alt="pain2" className="w-[355px] h-[355px]" />
              <img src={double} alt="double" className="w-11 h-[30.7px] mt-11" />
              <div className="flex flex-col items-center text-mainBlack text-[16px] font-500 leading-[190%] mt-[36.3px]">
                <span>비대면 회의가 반복되니</span>
                <span>지난 회의 내용을 기억하기 힘들어</span>
                <span>핵심만 요약해서 볼 수 있으면 좋겠어</span>
              </div>
            </div>
            <div className="flex flex-col items-center">
              <img src={pain3} alt="pain3" className="w-[355px] h-[355px]" />
              <img src={double} alt="double" className="w-11 h-[30.7px] mt-11" />
              <div className="flex flex-col items-center text-mainBlack text-[16px] font-500 leading-[190%] mt-[36.3px]">
                <span>회의 후에 팀원들이 해야 할 일과</span>
                <span>완료한 일을 파악하기 어려워</span>
                <span>또, 팀원들 각자의 의견도 기억하고 싶어</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
