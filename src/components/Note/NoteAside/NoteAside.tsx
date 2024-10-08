import { useState, useEffect, useRef } from 'react';
import userMint from '@/assets/svgs/Note/userMint.svg';
import aside from '@/assets/webps/Note/aside.webp';

export const NoteAside = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [hasScrollbar, setHasScrollbar] = useState(false);
  const asideRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  // 스크롤 바 있는 지
  useEffect(() => {
    const checkScrollbar = () => {
      if (asideRef.current) {
        const hasScroll = asideRef.current.scrollHeight > asideRef.current.clientHeight;
        setHasScrollbar(hasScroll);
      }
    };

    checkScrollbar();

    window.addEventListener('resize', checkScrollbar);

    // 클린업
    return () => {
      window.removeEventListener('resize', checkScrollbar);
    };
  }, []);

  // 호버 상태 제어 함수
  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <aside
      ref={asideRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`w-[375px] border-l border-gray03 pt-12 overflow-y-auto ${hasScrollbar && isHovered ? 'w-[361px] scrollbar-visible mr-[14px] scrollbar-mid-custom' : 'scrollbar-hide w-[375px]'}`}
    >
      <title className="flex justify-between items-center">
        <p className="font-bold text-mainBlack text-[17px] ml-[32px] mr-[32px]">회의 스크립트</p>
        <img
          src={aside}
          alt="aside icon"
          className={`w-[18px] h-[18px] cursor-pointer ${hasScrollbar && isHovered ? 'mr-[2px]' : 'mr-5'}`}
        />
      </title>

      <div
        ref={contentRef}
        className={`ml-8 mb-[94px] ${hasScrollbar && isHovered ? 'mr-[14px]' : 'scrollbar-hide mr-[32px]'}`}
      >
        <div className="mt-12 mb-8">
          <div className="flex items-center">
            <img src={userMint} alt="user icon" className="w-[28px] h-[28px] mr-[10px]" />
            <span className="font-bold text-[14px] text-main07">노태일</span>
          </div>
          <p className="font-pretendard font-normal text-[13px] leading-[24px] mt-3">
            안녕하세요 다들 잘 지내셨죠 오늘 회의는 브랜드 아이덴티티에 관한 내용을 중심으로
            진행하려 합니다 우리 브랜드가 시장에서 어떤 이미지를 구축해야 할지 논의하고자 해요 우선
            각자 아이디어나 제안을 간략하게 말씀해 주세요 그럼 디자이너님부터 시작해 볼까요
          </p>
        </div>

        <div className="mb-8">
          <div className="flex items-center">
            <img src={userMint} alt="user icon" className="w-[28px] h-[28px] mr-[10px]" />
            <span className="font-bold text-[14px] text-main07">심수연</span>
          </div>
          <p className="font-pretendard font-normal text-[13px] leading-[24px] mt-3">
            네 저는 브랜드의 비주얼 아이덴티티에 대해 말씀드리고 싶습니다 현재 트렌드와 우리 제품의
            핵심 가치를 반영한 로고와 색상 팔레트를 제안하려고 해요 우선 브랜드가 전달하고자 하는
            메시지가 명확하게 시각적으로 드러나야 한다고 생각해요. 예를 들어 심플함과 정체성을
            강조하는 디자인을 고려 중입니다
          </p>
        </div>

        <div className="mb-8">
          <div className="flex items-center">
            <img src={userMint} alt="user icon" className="w-[28px] h-[28px] mr-[10px]" />
            <span className="font-bold text-[14px] text-main07">노태일</span>
          </div>
          <p className="font-pretendard font-normal text-[13px] leading-[24px] mt-3">
            좋은 의견이에요 브랜드의 시각적인 요소가 중요한 역할을 하니까요 그럼 제품 기획자님은
            어떤 생각을 하고 계신가요
          </p>
        </div>

        <div className="mb-8">
          <div className="flex items-center">
            <img src={userMint} alt="user icon" className="w-[28px] h-[28px] mr-[10px]" />
            <span className="font-bold text-[14px] text-main07">노태일</span>
          </div>
          <p className="font-pretendard font-normal text-[13px] leading-[24px] mt-3">
            네 제가 생각하는 브랜드 아이덴티티는 제품 자체와 연결되는 부분이 중요하다고 봅니다 저희
            제품이 제공하는 핵심 가치가 무엇인지 명확히 설정하고 이를 브랜드 이미지와 일관되게
            전달해야 한다고 생각해요
          </p>
        </div>

        <div className="mb-8">
          <div className="flex items-center">
            <img src={userMint} alt="user icon" className="w-[28px] h-[28px] mr-[10px]" />
            <span className="font-bold text-[14px] text-main07">노태일</span>
          </div>
          <p className="font-pretendard font-normal text-[13px] leading-[24px] mt-3">
            고급스러움과 편안함을 함께 가져가는 방향성 좋네요 마케팅 전문가님은 어떤 의견이신가요
          </p>
        </div>

        <div className="mb-8">
          <div className="flex items-center">
            <img src={userMint} alt="user icon" className="w-[28px] h-[28px] mr-[10px]" />
            <span className="font-bold text-[14px] text-main07">노태일</span>
          </div>
          <p className="font-pretendard font-normal text-[13px] leading-[24px] mt-3">
            네 제가 생각하는 브랜드 아이덴티티는 제품 자체와 연결되는 부분이 중요하다고 봅니다 저희
            제품이 제공하는 핵심 가치가 무엇인지 명확히 설정하고 이를 브랜드 이미지와 일관되게
            전달해야 한다고 생각해요
          </p>
        </div>
      </div>
    </aside>
  );
};
