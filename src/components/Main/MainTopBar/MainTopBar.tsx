import { useEffect, useState } from 'react';
import search from '@/assets/webps/Main/search.webp';
import notePlus from '@/assets/webps/Main/notePlus.webp';
import down from '@/assets/webps/Main/downBlack.webp';

export const MainTopBar = () => {
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [showSearchButton, setShowSearchButton] = useState(false);

  // 검색바 확대
  const handleSearchClick = () => {
    setIsSearchActive(true);
  };

  // 검색바 축소
  const handleBlur = () => {
    if (searchText === '') {
      setIsSearchActive(false);
      setShowSearchButton(false);
    }
  };

  // 검색
  const handleSearch = () => {
    if (searchText.trim() === '') {
      return; // 검색어가 없을 경우 검색 실행 X
    }
    // 검색 기능 실행 로직 넣기

    // 검색 후 검색바를 축소
    setIsSearchActive(false);
    setSearchText('');
  };

  // enter 키로 검색
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  useEffect(() => {
    if (isSearchActive) {
      // 애니메이션이 끝난 후에 '검색' 버튼 보여주기
      const timer = setTimeout(() => {
        setShowSearchButton(true);
      }, 300);
      return () => clearTimeout(timer);
    } else {
      // 검색바가 축소될 때 '검색' 버튼 감추기
      setShowSearchButton(false);
    }
  }, [isSearchActive]);

  return (
    <section>
      <div className="h-24 flex justify-between items-center font-nanum leading-[22px] z-10 bg-bg">
        <div
          className={`flex items-center border transition-all duration-300 ${
            isSearchActive ? 'w-[440px] border-mainBlack' : 'w-[100px] border-gray03'
          } h-12 ml-[72px] bg-white rounded-[20px]`}
          onClick={handleSearchClick}
        >
          <img className="w-[22px] h-[22px] ml-4" src={search} alt="search" />
          {isSearchActive ? (
            <>
              <input
                className="ml-4 w-[320px] h-[24px] outline-none bg-transparent font-pretendard text-[18px]"
                type="text"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                onBlur={handleBlur}
                onKeyDown={handleKeyDown}
                autoFocus
              />
              {showSearchButton && (
                <span
                  className={`w-[27px] h-[24px] ml-[19px] mr-[20px] font-medium text-[14px] cursor-pointer ${
                    searchText ? 'text-mainBlack' : 'text-[#dadada]'
                  }`}
                  onMouseDown={(e) => {
                    e.preventDefault(); // handleBlur와 충돌 방지
                    handleSearch();
                  }}
                >
                  검색
                </span>
              )}
            </>
          ) : (
            <div className="w-[56px] h-[22px] mr-[6px] cursor-text" />
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
