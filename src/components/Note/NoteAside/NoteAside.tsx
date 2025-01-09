import React, { useState, useEffect, useRef } from 'react';
import { ScriptList } from '@/components/Note/NoteAside/ScriptList/ScriptList';
import aside from '@/assets/webps/Note/aside.webp';
import { NoteDetail } from '@/pages/Note/dto';

interface NoteAsideProps {
  noteData: NoteDetail | null;
  uuid: string;
  isAsideVisible: boolean;
  setIsAsideVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

export const NoteAside: React.FC<NoteAsideProps> = ({
  uuid,
  isAsideVisible,
  setIsAsideVisible,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [hasScrollbar, setHasScrollbar] = useState(false);
  const asideRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  // NoteAside 슬라이드 토글
  const toggleAsideVisibility = () => {
    setIsAsideVisible((prev) => !prev);
  };

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
    <>
      {!isAsideVisible && (
        <button
          onClick={toggleAsideVisibility}
          className="w-9 h-9 mt-[32px] mr-[26px] z-10 bg-white rounded-[6px] flex justify-center items-center hover:bg-gray02 hover:transition-all hover:duration-300 hover:ease-in-out hover:border-[0.5px] hover:border-gray03"
          style={{ boxShadow: '0px 0px 4px 0px rgba(187, 187, 187, 0.80)' }}
        >
          <img src={aside} alt="Open Aside" className="w-[18px] h-[18px]" />
        </button>
      )}
      {isAsideVisible && (
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
              <p className="font-bold text-mainBlack text-[17px] ml-[32px] mr-[32px]">
                회의 스크립트
              </p>
              <button
                onClick={toggleAsideVisibility}
                className={`${hasScrollbar && isHovered ? 'mr-[2px]' : 'mr-5'} w-8 h-8 rounded-[6px] hover:transition-all hover:duration-300 hover:ease-in-out bg-transparent hover:bg-gray02 flex justify-center items-center`}
              >
                <img src={aside} alt="aside icon" className={`w-[18px] h-[18px] cursor-pointer`} />
              </button>
            </div>

            <div
              ref={contentRef}
              className={`ml-[18px] mb-[94px] ${hasScrollbar && isHovered ? 'mr-[3px]' : 'scrollbar-hide mr-[21px]'}`}
            >
              <ScriptList uuid={uuid} />
            </div>
          </section>
        </aside>
      )}
    </>
  );
};
