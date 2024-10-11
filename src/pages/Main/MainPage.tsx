import { useState } from 'react';
import { FolderBar } from '@/components/FolderBar/FolderBar';
import { MainTopBar } from '@/components/Main/MainTopBar/MainTopBar';
import { NavBar } from '@/components/NavBar/NavBar';
import { CardList } from '@/components/Main/CardList/CardList';
import noteMint from '@/assets/webps/Main/noteMint.webp';
import searchMint from '@/assets/webps/Main/searchMint.webp';

interface CardData {
  date: string;
  title: string;
  summary: string;
  folder: string;
}

const cardData: CardData[] = [
  {
    date: '24.05.07',
    title: '해커톤 정기회의 2차',
    summary:
      '새로운 브랜드의 핵심 가치와 시각적 요소를 정의하는 전략을 수립하고 새로운 브랜드의 핵심 가치를 새로운 브랜드화했다.',
    folder: '학교',
  },
  {
    date: '24.06.15',
    title: '플로우 회의',
    summary: '다양한 마케팅 전략을 통해 브랜드 인지도를 높이는 방안을 논의',
    folder: '학교',
  },
  {
    date: '24.07.10',
    title: '브랜드 아이덴티티 전략 회의',
    summary:
      '새로운 브랜드의 핵심 가치와 시각적 요소를 정의하는 전략을 수립하고 새로운 브랜드의 핵심 가치를 새롭게 브랜드화했다. 새로운 브랜드의 핵심 가치와 시각적 요소를',
    folder: '직장',
  },
  {
    date: '24.05.07',
    title: '해커톤 정기회의 2차',
    summary:
      '새로운 브랜드의 핵심 가치와 시각적 요소를 정의하는 전략을 수립하고 새로운 브랜드의 핵심 가치를 새로운 브랜드화했다.',
    folder: '학교',
  },
  {
    date: '24.06.15',
    title: '플로우 회의',
    summary: '다양한 마케팅 전략을 통해 브랜드 인지도를 높이는 방안을 논의',
    folder: '학교',
  },
  {
    date: '24.07.10',
    title: '브랜드 아이덴티티 전략 회의',
    summary:
      '새로운 브랜드의 핵심 가치와 시각적 요소를 정의하는 전략을 수립하고 새로운 브랜드의 핵심 가치를 새롭게 브랜드화했다. 새로운 브랜드의 핵심 가치와 시각적 요소를',
    folder: '직장',
  },
  {
    date: '24.05.07',
    title: '해커톤 정기회의 2차',
    summary:
      '새로운 브랜드의 핵심 가치와 시각적 요소를 정의하는 전략을 수립하고 새로운 브랜드의 핵심 가치를 새로운 브랜드화했다.',
    folder: '학교',
  },
  {
    date: '24.06.15',
    title: '플로우 회의',
    summary: '다양한 마케팅 전략을 통해 브랜드 인지도를 높이는 방안을 논의',
    folder: '학교',
  },
  {
    date: '24.07.10',
    title: '브랜드 아이덴티티 전략 회의',
    summary:
      '새로운 브랜드의 핵심 가치와 시각적 요소를 정의하는 전략을 수립하고 새로운 브랜드의 핵심 가치를 새롭게 브랜드화했다. 새로운 브랜드의 핵심 가치와 시각적 요소를',
    folder: '직장',
  },
  {
    date: '24.05.07',
    title: '해커톤 정기회의 2차',
    summary:
      '새로운 브랜드의 핵심 가치와 시각적 요소를 정의하는 전략을 수립하고 새로운 브랜드의 핵심 가치를 새로운 브랜드화했다.',
    folder: '학교',
  },
  {
    date: '24.06.15',
    title: '플로우 회의',
    summary: '다양한 마케팅 전략을 통해 브랜드 인지도를 높이는 방안을 논의',
    folder: '학교',
  },
  {
    date: '24.07.10',
    title: '브랜드 아이덴티티 전략 회의',
    summary:
      '새로운 브랜드의 핵심 가치와 시각적 요소를 정의하는 전략을 수립하고 새로운 브랜드의 핵심 가치를 새롭게 브랜드화했다. 새로운 브랜드의 핵심 가치와 시각적 요소를',
    folder: '직장',
  },
  {
    date: '24.05.07',
    title: '해커톤 정기회의 2차',
    summary:
      '새로운 브랜드의 핵심 가치와 시각적 요소를 정의하는 전략을 수립하고 새로운 브랜드의 핵심 가치를 새로운 브랜드화했다.',
    folder: '학교',
  },
  {
    date: '24.06.15',
    title: '플로우 회의',
    summary: '다양한 마케팅 전략을 통해 브랜드 인지도를 높이는 방안을 논의',
    folder: '학교',
  },
  {
    date: '24.07.10',
    title: '브랜드 아이덴티티 전략 회의',
    summary:
      '새로운 브랜드의 핵심 가치와 시각적 요소를 정의하는 전략을 수립하고 새로운 브랜드의 핵심 가치를 새롭게 브랜드화했다. 새로운 브랜드의 핵심 가치와 시각적 요소를',
    folder: '직장',
  },
];

export const MainPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOption, setSortOption] = useState('최신순');
  const [selectedFolder, setSelectedFolder] = useState<string | null>(null);

  const parseDate = (dateString: string) => {
    const [year, month, day] = dateString.split('.').map(Number);
    return new Date(year + 2000, month - 1, day);
  };

  // 폴더 선택, 검색어, SortDropDown에 맞는 카드 필터링
  const filteredCards = cardData
    .filter((card) => {
      // 선택된 폴더가 있으면 해당 폴더의 카드만, 없으면 모든 카드
      if (selectedFolder) {
        return card.folder === selectedFolder;
      }
      return true;
    })
    .filter((card) => card.title.toLowerCase().includes(searchQuery.toLowerCase()))
    .sort((a, b) => {
      if (sortOption === '최신순') {
        return parseDate(b.date).getTime() - parseDate(a.date).getTime();
      } else if (sortOption === '오래된 순') {
        return parseDate(a.date).getTime() - parseDate(b.date).getTime();
      } else if (sortOption === '가나다 순') {
        return a.title.localeCompare(b.title);
      }
      return 0;
    });

  return (
    <>
      <div className="w-screen h-screen flex flex-row bg-bg font-nanum leading-[22px]">
        <FolderBar onFolderSelect={setSelectedFolder}/>
        <section className="flex flex-col w-[calc(100vw-280px)] h-full">
          <NavBar />
          <MainTopBar onSearch={setSearchQuery} onSort={setSortOption} />
          {filteredCards.length > 0 ? (
            <CardList cards={filteredCards} />
          ) : searchQuery ? (
            <div className="flex flex-col items-center justify-center">
              <img className="w-[131px] h-[139.5px] mt-[159px]" src={searchMint} alt="search" />
              <p className="mt-[19.5px] text-mainBlack font-medium text-[15px]">
                검색 결과가 존재하지 않습니다!
              </p>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center">
              <img className="w-[147px] h-[154px] mt-[136px]" src={noteMint} alt="note" />
              <p className="mt-[27.5px] text-mainBlack font-medium text-[15px]">
                회의 노트를 추가해보세요 !
              </p>
            </div>
          )}
        </section>
      </div>
    </>
  );
};
