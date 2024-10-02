import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import calendar from '@/assets/webps/Main/calendar.webp';

export const CardItem = () => {
  const [isBottomOverlayVisible, setIsBottomOverlayVisible] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  // 스크롤 가장 끝까지 내렸을 때 오버레이 숨기는 기능
  const handleScroll = () => {
    if (contentRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = contentRef.current;
      // 현재 보이는 화면의 가장 아래쪽 위치가 전체 콘텐츠의 높이보다 작을 때 참 -> 스크롤을 끝까지 내리지 않은 경우
      if (scrollTop + clientHeight < scrollHeight) {
        setIsBottomOverlayVisible(true);
      } else {
        // 스크롤을 끝까지 내렸을 때 오버레이 숨김
        setIsBottomOverlayVisible(false);
      }
    }
  };

  // 스크롤 이벤트 리스너
  useEffect(() => {
    const currentContent = contentRef.current;
    if (currentContent) {
      currentContent.addEventListener('scroll', handleScroll);
    }

    // 클린업 함수: 컴포넌트 언마운트 시 이벤트 리스너 제거
    return () => {
      if (currentContent) {
        currentContent.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);

  // 초기 렌더링 및 이후 스크롤 활성 여부를 체크하여 오버레이 필요 여부 설정
  useLayoutEffect(() => {
    const checkOverlayVisibility = () => {
      if (contentRef.current) {
        const contentHeight = contentRef.current.scrollHeight; // 전체 콘텐츠 높이
        const containerHeight = contentRef.current.clientHeight; // 컨테이너 높이

        // 컨텐츠 높이가 컨테이너 높이를 초과하면 스크롤이 생기므로 오버레이 표시
        if (contentHeight > containerHeight) {
          setIsBottomOverlayVisible(true);
        } else {
          setIsBottomOverlayVisible(false);
        }
      }
    };

    // 컴포넌트가 렌더링된 후 스크롤 여부를 체크
    checkOverlayVisibility();
  }, []);

  return (
    <div className="min-w-[280px] h-[187px] border border-gray03 hover:border-mainBlack transition-all duration-100 ease-in-out rounded-[20px] bg-white flex font-nanum leading-[22px] flex-col cursor-pointer">
      <div className="w-[75.6px] h-[23px] mt-5 ml-[23px] flex items-center bg-main06 rounded-[14.6px]">
        <img src={calendar} alt="calendar" className="w-[11px] h-[11px] mr-[3.6px] ml-[10px]" />
        <span className="text-white text-[8.5px] font-bold">24.05.07</span>
      </div>
      <p className="ml-6 mt-4 text-mainBlack text-[20px] font-bold ">브랜드 아이덴티티 전략 회의</p>
      <div className="relative mx-6 my-5">
        <div
          ref={contentRef}
          className="bg-gray01 h-[68px] px-4 py-3 overflow-y-auto scrollbar-hide rounded-[10px]"
        >
          <span className="text-gray06 font-pretendard font-normal text-[13px]">
            새로운 브랜드의 핵심 가치와 시각적 요소를 정의하는 전략을 수립하고 새로운 브랜드의 핵심
            가치를 새로운 브랜드화 했다. 새로운 브랜드의 핵심 가치와 시각적 요소를 정의하는 전략을
            수립하고 새로운 브랜드의 핵심 가치를 새로운 브랜드화 했다.
          </span>
        </div>
        {/* 하단 고정 회색 오버레이 */}
        {isBottomOverlayVisible && (
          <>
            <div className="pointer-events-none absolute bottom-0 left-0 w-full h-[13px] bg-gray01 rounded-b-[10px]" />
            <div className="pointer-events-none absolute bottom-[13px] left-0 w-full h-[22px] bg-gradient-to-t from-gray01 to-transparent" />
          </>
        )}
      </div>
    </div>
  );
};
