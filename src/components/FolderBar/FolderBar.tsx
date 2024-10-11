import { useState, useEffect } from 'react';
import logo from '@/assets/webps/Layout/logo.webp';
import folder from '@/assets/webps/FolderBar/folder.webp';
import folderMint from '@/assets/webps/FolderBar/folderMint.webp';
import down from '@/assets/webps/FolderBar/downGray.webp';
import up from '@/assets/webps/FolderBar/upGray.webp';
import note from '@/assets/webps/FolderBar/note.webp';
import logout from '@/assets/webps/FolderBar/logout.webp';

interface Folder {
  name: string;
  notes: string[];
}

export const FolderBar = ({ onFolderSelect }: { onFolderSelect: (folder: string) => void }) => {
  const [folders, setFolders] = useState<Folder[]>([
    { name: '학교', notes: ['해커톤 정기회의 2차', '플로우 회의'] },
    {
      name: '직장',
      notes: ['브랜드 아이덴티티 전략 회의'],
    },
  ]);
  const [unassignedNotes] = useState<string[]>([
    'TF팀 회의',
    '해커톤 정기회의 3차',
    '업무 역할 분배',
  ]);
  const [newFolderName, setNewFolderName] = useState('');
  const [isAddingFolder, setIsAddingFolder] = useState(false);
  const [expandedFolders, setExpandedFolders] = useState<boolean[]>(folders.map(() => false));
  const [hoveredFolderIndex, setHoveredFolderIndex] = useState<number | null>(null); // 호버 상태 관리
  const [selectedFolderIndex, setSelectedFolderIndex] = useState<number | null>(null); // 클릭 상태 관리

  const handleAddFolder = () => {
    if (newFolderName.trim() !== '') {
      // 중복 호출 방지
      if (isAddingFolder) return;

      setIsAddingFolder(true);
      setFolders((prevFolders) => [...prevFolders, { name: newFolderName.trim(), notes: [] }]);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddFolder();
    }
  };

  // 폴더가 추가된 후 입력 값 초기화
  useEffect(() => {
    if (isAddingFolder) {
      setNewFolderName('');
      setIsAddingFolder(false);
      setExpandedFolders((prev) => [...prev, false]); // 새 폴더에 대해 확장 여부를 추가
    }
  }, [folders, isAddingFolder]);

  // 폴더 toggle
  const toggleFolder = (index: number) => {
    setExpandedFolders((prevExpandedFolders) => {
      const updatedFolders = [...prevExpandedFolders];
      updatedFolders[index] = !updatedFolders[index]; // 열리고 접히는 상태 toggle
      return updatedFolders;
    });
  };

  return (
    <aside>
      <div className="w-[280px] h-full bg-subBlack flex flex-col font-nanum leading-[22px]">
        {/* 로고 및 상단 영역 */}
        <section className="flex-none">
          <img className="w-[208px] mt-[47px] ml-[36px]" src={logo} alt="logo" />
          <p className="ml-9 mt-6 font-medium text-[16px] text-white">
            <span className="font-extrabold text-main04">
              수연<span className="font-normal"> </span>
            </span>
            님의 회의공간
          </p>
          <div className="w-[216px] h-[1px] ml-8 mt-5 bg-gray06" />
        </section>

        {/* 스크롤 영역 */}
        <section className="flex-1 overflow-y-auto mt-5 scrollbar-hide">
          {/* 폴더와 해당 폴더에 속한 노트들 */}
          {folders.map((folderItem, index) => (
            <div key={index}>
              <div className={`flex ${index !== 0 ? 'mt-4' : ''}`}>
                <img
                  className="w-5 h-5 ml-8 mr-2"
                  src={
                    hoveredFolderIndex === index || selectedFolderIndex === index
                      ? folderMint
                      : folder
                  } // 호버에 따른 이미지 변경
                  alt="folder"
                />
                <span
                  onMouseEnter={() => setHoveredFolderIndex(index)} // 호버 시작
                  onMouseLeave={() => setHoveredFolderIndex(null)} // 호버 끝
                  className={`mr-[10px] font-bold text-[14px] cursor-pointer active:scale-95 ${hoveredFolderIndex === index || selectedFolderIndex === index ? 'text-main04' : 'text-white'}`}
                  onClick={() => {
                    setSelectedFolderIndex(index); // 폴더 클릭 시 인덱스 저장
                    onFolderSelect(folderItem.name); // 선택된 폴더 이름 전달
                  }}
                >
                  {folderItem.name}
                </span>
                <img
                  className="w-5 h-5 mr-6 cursor-pointer transition-transform duration-300 ease-in-out"
                  src={expandedFolders[index] ? up : down}
                  alt={expandedFolders[index] ? 'up' : 'down'}
                  onClick={() => toggleFolder(index)}
                />
              </div>
              <div
                className={`ml-[52px] overflow-hidden transition-all duration-300 ease-in-out ${
                  expandedFolders[index] ? 'max-h-[300px]' : 'max-h-0'
                }`}
                style={{
                  maxHeight: expandedFolders[index] ? `${folderItem.notes.length * 100}px` : '0',
                }}
              >
                <div className="mb-1">
                  {folderItem.notes.map((noteItem, noteIndex) => (
                    <div key={noteIndex} className="mt-4 flex">
                      <img className="w-5 h-5 mr-[10px]" src={note} alt="note" />
                      <span className="font-[350] w-[170px] text-[14px] text-white cursor-pointer active:scale-[97%]">
                        {noteItem}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}

          {/* 폴더에 속하지 않은 노트들 */}
          {unassignedNotes.map((noteItem, noteIndex) => (
            <div key={`unassigned-${noteIndex}`} className="mt-4 ml-8 flex items-center">
              <img className="w-5 h-5 mr-[10px]" src={note} alt="note" />
              <span className="font-[350] text-[14px] text-white cursor-pointer active:scale-[97%]">
                {noteItem}
              </span>
            </div>
          ))}

          {/* 새 폴더 만들기 */}
          <div className="mt-4 ml-8 flex items-center">
            <img className="w-5 h-5 mr-[10px]" src={folder} alt="new folder" />
            <input
              type="text"
              className="font-[350] text-[14px] placeholder-gray07 text-white bg-transparent focus:outline-none"
              placeholder="새 폴더"
              value={newFolderName}
              onChange={(e) => setNewFolderName(e.target.value)}
              onKeyDown={handleKeyDown}
            />
          </div>
        </section>

        {/* 로그아웃 섹션 */}
        <section className="flex-none pt-[120px] pb-9">
          <div className="inline-flex h-[38px] ml-6 px-4 py-2 items-center cursor-pointer rounded-[10px] hover:bg-mainBlack">
            <img className="w-5 h-5 mr-[8px]" src={logout} alt="logout" />
            <span className="font-light text-[14px] w-[54px] text-white active:scale-95">
              로그아웃
            </span>
          </div>
        </section>
      </div>
    </aside>
  );
};
