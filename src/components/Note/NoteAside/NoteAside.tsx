import { useState, useEffect, useRef } from 'react';
import { ScriptList } from '@/components/Note/NoteAside/ScriptList/ScriptList';
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
      <title className="flex justify-between items-center mb-12">
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
        <ScriptList />
      </div>
    </aside>
  );
};
