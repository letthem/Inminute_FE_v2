import { useEffect, useState } from 'react';
import { getNoteAll } from '@/apis/Note/getNote';
import { CardData, NoteResponse } from '@/pages/Main/dto';
import { FolderBar } from '@/components/FolderBar/FolderBar';
import { MainTopBar } from '@/components/Main/MainTopBar/MainTopBar';
import { NavBar } from '@/components/NavBar/NavBar';
import { CardList } from '@/components/Main/CardList/CardList';
import noteMint from '@/assets/webps/Main/noteMint.webp';
import searchMint from '@/assets/webps/Main/searchMint.webp';

const transformNoteData = (note: NoteResponse) => {
  const date = new Date(note.createdAt);
  const formattedDate = `${date.getFullYear().toString().slice(-2)}.${(date.getMonth() + 1).toString().padStart(2, '0')}.${date.getDate().toString().padStart(2, '0')}`;

  return {
    date: formattedDate,
    title: note.name,
    summary: note.summary || '아직 한 줄 요약이 없어요!',
    folder: note.folderName,
    createdAt: note.createdAt,
  };
};

export const MainPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOption, setSortOption] = useState('최신순');
  const [selectedFolder, setSelectedFolder] = useState<string | null>(null);
  const [cardData, setCardData] = useState<CardData[]>([]); // 카드 데이터 상태 추가

  const fetchNotes = async () => {
    const data = await getNoteAll();
    const notes = data.result.notes;
    const transformedNotes = notes.map(transformNoteData); // 각 노트를 변환
    setCardData(transformedNotes); // 상태에 변환된 데이터 설정
  };

  const parseDate = (dateString: string) => {
    return new Date(dateString);
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
        return parseDate(b.createdAt).getTime() - parseDate(a.createdAt).getTime();
      } else if (sortOption === '오래된 순') {
        return parseDate(a.createdAt).getTime() - parseDate(b.createdAt).getTime();
      } else if (sortOption === '가나다 순') {
        return a.title.localeCompare(b.title);
      }
      return 0;
    });

  useEffect(() => {
    fetchNotes(); // 컴포넌트 마운트 시 데이터 가져오기
  }, []);

  return (
    <>
      <div className="w-screen h-screen flex flex-row bg-bg font-nanum leading-[22px]">
        <FolderBar onFolderSelect={setSelectedFolder} />
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
