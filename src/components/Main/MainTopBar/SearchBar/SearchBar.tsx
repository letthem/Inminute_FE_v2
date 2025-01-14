import { useState, useRef, useEffect } from 'react';
import searchIcon from '@/assets/webps/Main/search.webp';

interface SearchBarProps {
  onSearch: (searchText: string) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [isSearched, setIsSearched] = useState(false);
  const [showSearchButton, setShowSearchButton] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

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

    // 부모 컴포넌트로 검색어 전달.
    onSearch(searchText);

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

  // 검색어 변경 시 부모 컴포넌트로 전달
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
    onSearch(e.target.value);
  };

  // 검색바 애니메이션 후 '검색' 버튼 표시
  useEffect(() => {
    if (isSearchActive) {
      const timer = setTimeout(() => {
        setShowSearchButton(true);
      }, 300);
      return () => clearTimeout(timer);
    } else {
      setShowSearchButton(false);
    }
  }, [isSearchActive]);

  return (
    <div
      className={`flex items-center border transition-all duration-300 ${
        isSearchActive || isSearched
          ? 's1100:w-[440px] s960:w-[300px] s900:w-[200px] w-[140px]'
          : 'w-[100px]'
      } h-12 ml-[72px] bg-white rounded-[20px] ${
        isSearchActive && !isSearched ? 'border-mainBlack' : 'border-gray03'
      }`}
      onClick={handleSearchClick}
    >
      <img className="w-[22px] h-[22px] ml-4" src={searchIcon} alt="search" />
      {!isSearchActive && <span className="w-10 h-[22px] ml-2 cursor-text" />}
      {isSearchActive && (
        <input
          ref={inputRef}
          className="ml-4 s1100:w-[320px] s960:w-[180px] s900:w-[80px] w-[20px] h-[24px] outline-none bg-transparent font-pretendard text-[17px]"
          type="text"
          value={searchText}
          // onChange={(e) => setSearchText(e.target.value)}
          onChange={handleChange}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          autoFocus={isSearchActive && !isSearched}
        />
      )}
      {showSearchButton && (
        <span
          className={`break-keep w-[27px] h-[24px] ml-[19px] mr-[20px] font-medium text-[14px] cursor-pointer ${
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
  );
};
