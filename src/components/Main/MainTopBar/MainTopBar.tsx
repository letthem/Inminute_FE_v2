import { useState, useRef, useEffect } from 'react';
import search from '@/assets/webps/Main/search.webp';
import notePlus from '@/assets/webps/Main/notePlus.webp';
import down from '@/assets/webps/Main/downBlack.webp';

export const MainTopBar = () => {
  const [isSearchActive, setIsSearchActive] = useState(false); // 검색바 클릭 상태 관리
  const [searchText, setSearchText] = useState(''); // 검색어 상태 관리
  const [isSearched, setIsSearched] = useState(false); // 검색 후 상태 관리
  const [showSearchButton, setShowSearchButton] = useState(false); // 검색 버튼 표시 여부 관리
  const inputRef = useRef<HTMLInputElement>(null); // input 엘리먼트 참조

  // 검색바 클릭 시 호출
  const handleSearchClick = () => {
    setIsSearchActive(true);
    setIsSearched(false);
    if (inputRef.current) {
      inputRef.current.focus(); // 검색창 클릭 시 자동 포커스
    }
  };

  // 검색 실행
  const handleSearch = () => {
    if (searchText.trim() === '') {
      setIsSearchActive(false);
      setShowSearchButton(false);
      if (inputRef.current) {
        inputRef.current.blur(); // 검색 후 포커스를 제거하여 커서가 사라지도록
      }
      return; // 검색어가 없으면 검색을 실행하지 않음
    }

    // 검색 기능 실행 로직 수행

    setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.blur(); // 검색 후 포커스를 제거하여 커서가 사라지도록
      }
      setIsSearched(true); // 검색 후 상태 변경
    }, 100);
  };

  // Enter 키로 검색 실행
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      if (e.nativeEvent.isComposing) return;
      e.preventDefault(); // 기본 동작 방지하여 마지막 글자가 중복으로 나타나는 문제 해결
      handleSearch();
    }
  };

  // 검색 바 외부 클릭 시 기본 상태로 돌아가기
  const handleBlur = () => {
    if (!isSearched && searchText === '') {
      setIsSearchActive(false);
      setShowSearchButton(false);
    }
  };

  // 검색바 애니메이션 후 '검색' 버튼 표시
  useEffect(() => {
    if (isSearchActive) {
      // 애니메이션이 끝난 후에 '검색' 버튼 표시
      const timer = setTimeout(() => {
        setShowSearchButton(true);
      }, 300);
      return () => clearTimeout(timer);
    } else {
      // 검색바가 축소될 때 '검색' 버튼 숨김
      setShowSearchButton(false);
    }
  }, [isSearchActive]);

  return (
    <section>
      <div className="h-24 flex justify-between items-center font-nanum leading-[22px] z-10 bg-bg">
        <div
          className={`flex items-center border transition-all duration-300 ${
            isSearchActive || isSearched ? 'w-[440px]' : 'w-[100px]'
          } h-12 ml-[72px] bg-white rounded-[20px] ${
            isSearchActive && !isSearched ? 'border-mainBlack' : 'border-gray03'
          }`}
          onClick={handleSearchClick}
        >
          <img className="w-[22px] h-[22px] ml-4" src={search} alt="search" />
          <input
            ref={inputRef}
            className="ml-4 w-[320px] h-[24px] outline-none bg-transparent font-pretendard text-[18px]"
            type="text"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
            autoFocus={isSearchActive && !isSearched}
          />
          {showSearchButton && (
            <span
              className={`w-[27px] h-[24px] ml-[19px] mr-[20px] font-medium text-[14px] cursor-pointer ${
                searchText && !isSearched ? 'text-mainBlack' : 'text-gray03'
              }`}
              onMouseDown={(e) => {
                e.preventDefault(); // handleBlur가 먼저 실행되는 것을 방지
                handleSearch(); // 검색 실행
              }}
            >
              검색
            </span>
          )}
        </div>

        <div className="flex items-center">
          <div className="w-[68px] h-[22px] mr-6 flex items-center cursor-pointer">
            <span className="w-[40px] mr-2 font-medium text-[14px]">최신순</span>
            <img className="w-5 h-5" src={down} alt="down" />
          </div>
          <div className="w-[123px] h-[38px] mr-[72px] bg-mainBlack flex items-center rounded cursor-pointer">
            <img className="w-[18px] h-[18px] ml-[14px]" src={notePlus} alt="note plus" />
            <span className="w-[69px] text-[13px] font-medium text-white ml-[8px]">
              새 회의 노트
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
