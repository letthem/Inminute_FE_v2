import { SearchBar } from '@/components/Main/MainTopBar/SearchBar/SearchBar';
import notePlus from '@/assets/webps/Main/notePlus.webp';
import { SortDropdown } from '@/components/Main/MainTopBar/\bSortDropDown/SortDropDown';
import { useState } from 'react';

interface MainTopBarProps {
  onSearch: (searchText: string) => void;
}

export const MainTopBar: React.FC<MainTopBarProps> = ({ onSearch }) => {
  const [selectedSortOption, setSelectedSortOption] = useState('최신순');

  // 검색 결과 처리 함수
  const handleSearch = (searchText: string) => {
    onSearch(searchText); // 부모 컴포넌트로 검색어 전달
  };

  // 드롭다운 옵션 선택 처리 함수
  const handleOptionSelect = (option: string) => {
    setSelectedSortOption(option);
  };

  return (
    <section>
      <div className="h-24 flex justify-between items-center font-nanum leading-[22px] z-10 bg-bg">
        <SearchBar onSearch={handleSearch} />

        <div className="flex items-center">
          <SortDropdown
            options={['최신순', '오래된 순', '가나다 순']}
            selectedOption={selectedSortOption}
            onOptionSelect={handleOptionSelect}
          />

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
