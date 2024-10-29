import React, { useState, useEffect, useRef } from 'react';
import { ScriptList } from '@/components/Note/NoteAside/ScriptList/ScriptList';
import aside from '@/assets/webps/Note/aside.webp';
import { NoteDetail } from '@/pages/Note/dto';

interface NoteAsideProps {
  noteData: NoteDetail | null;
  uuid: string;
}

export const NoteAside: React.FC<NoteAsideProps> = ({ noteData }) => {
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

  if (!noteData) {
    return <div>노트 데이터가 없습니다.</div>;
  }

  return (
    <aside className="w-[375px] flex flex-col border-l border-gray03 overflow-hidden">
      <div className="h-12" />
      {/* 스크롤 영역 */}
      <section
        ref={asideRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className={`flex flex-col flex-1 overflow-y-auto ${hasScrollbar && isHovered ? 'w-[361px] scrollbar-visible mr-[12px] scrollbar-mid-custom' : 'scrollbar-hide w-[375px]'} `}
      >
        <div className="justify-between items-center flex mb-8">
          <p className="font-bold text-mainBlack text-[17px] ml-[32px] mr-[32px]">회의 스크립트</p>
          <img
            src={aside}
            alt="aside icon"
            className={`w-[18px] h-[18px] cursor-pointer ${hasScrollbar && isHovered ? 'mr-[2px]' : 'mr-5'}`}
          />
        </div>

        <div
          ref={contentRef}
          className={`ml-[18px] mb-[94px] ${hasScrollbar && isHovered ? 'mr-[3px]' : 'scrollbar-hide mr-[21px]'}`}
        >
          <ScriptList />
        </div>
      </section>

      {/* {!showScript && (
        <section className="flex flex-col">
          <div>socket test용 채팅 구현</div>
          <ChatRoom uuid={uuid as string} />
        </section>
      )} */}
    </aside>
  );
};
