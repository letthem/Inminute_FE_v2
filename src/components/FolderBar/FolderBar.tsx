import { useState, useEffect } from 'react';
import { Logo } from '@/components/FolderBar/Logo/Logo';
import { Logout } from '@/components/FolderBar/Logout/Logout';
import folder from '@/assets/webps/FolderBar/folder.webp';
import folderMint from '@/assets/webps/FolderBar/folderMint.webp';
import down from '@/assets/webps/FolderBar/downGray.webp';
import up from '@/assets/webps/FolderBar/upGray.webp';
import note from '@/assets/webps/FolderBar/note.webp';
import kebabWhite from '@/assets/webps/FolderBar/kebabWhite.webp';
import dragGray from '@/assets/webps/FolderBar/dragGray.webp';

interface Folder {
  name: string;
  notes: string[];
}

interface FolderBarProps {
  onFolderSelect?: (folder: string) => void;
}

export const FolderBar: React.FC<FolderBarProps> = ({ onFolderSelect }) => {
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
  const [hoveredFolderName, setHoveredFolderName] = useState<number | null>(null); // 폴더 이름 호버 상태 관리
  const [selectedFolderName, setSelectedFolderName] = useState<number | null>(null); // 클릭 상태 관리

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
        <Logo />

        {/* 스크롤 영역 */}
        <section className="flex-1 overflow-y-auto mt-3 scrollbar-hide">
          {/* 폴더와 해당 폴더에 속한 노트들 */}
          {folders.map((folderItem, index) => (
            <div key={index}>
              <div
                className={`group flex hover:bg-mainBlack ml-[10px] mr-6 py-2 rounded-[10px] justify-between cursor-pointer items-center`}
              >
                <div className="flex items-center">
                  <img
                    src={dragGray}
                    alt="drag"
                    className="w-2 h-[15px] ml-2 hidden group-hover:block"
                  />

                  <img
                    className="w-5 h-5 group-hover:ml-[6px] ml-[22px] mr-2"
                    src={
                      hoveredFolderName === index || selectedFolderName === index
                        ? folderMint
                        : folder
                    } // 호버에 따른 이미지 변경
                    alt="folder"
                  />
                  <span
                    onMouseEnter={() => setHoveredFolderName(index)} // 호버 시작
                    onMouseLeave={() => setHoveredFolderName(null)} // 호버 끝
                    className={`mr-[10px] font-bold text-[14px] cursor-pointer active:scale-95 ${hoveredFolderName === index || selectedFolderName === index ? 'text-main04' : 'text-white'}`}
                    onClick={() => {
                      setSelectedFolderName(index); // 폴더 클릭 시 인덱스 저장
                      if (onFolderSelect) {
                        onFolderSelect(folderItem.name); // 선택된 폴더 이름 전달
                      }
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
                <div className="mr-[10px]">
                  <img
                    src={kebabWhite}
                    alt="kebab menu"
                    className="w-[3px] h-[15px] hidden group-hover:block"
                  />
                </div>
              </div>
              <div
                className={`ml-[30px] overflow-hidden transition-all duration-300 ease-in-out ${
                  expandedFolders[index] ? 'max-h-[300px]' : 'max-h-0'
                }`}
                style={{
                  maxHeight: expandedFolders[index] ? `${folderItem.notes.length * 100}px` : '0',
                }}
              >
                <div className="mb-2">
                  {folderItem.notes.map((noteItem, noteIndex) => (
                    <div
                      key={noteIndex}
                      className="mt-1 mr-[10px] flex justify-between items-center group hover:bg-mainBlack ml-[22px] hover:ml-[0px] py-2 rounded-[10px] cursor-pointer"
                    >
                      <div className="flex items-center">
                        <img
                          src={dragGray}
                          alt="move"
                          className="w-2 h-[15px] ml-2 hidden group-hover:block"
                        />
                        <img
                          className={`w-5 h-5 ml-[0] group-hover:ml-[6px] mr-[11px]`}
                          src={note}
                          alt="note"
                        />
                        <span className="font-[350] w-[170px] text-[14px] text-white cursor-pointer active:scale-[97%]">
                          {noteItem}
                        </span>
                      </div>
                      <img
                        src={kebabWhite}
                        alt="kebab menu"
                        className="w-[3px] h-[15px] mr-[10px] hidden group-hover:block"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}

          {/* 폴더에 속하지 않은 노트들 */}
          {unassignedNotes.map((noteItem, noteIndex) => (
            <div
              key={`unassigned-${noteIndex}`}
              className="mt-1 ml-8 py-2 mr-6 hover:ml-[10px] rounded-[10px] flex items-center justify-between pb-2 group hover:bg-mainBlack cursor-pointer"
            >
              <div className="flex items-center">
                <img
                  src={dragGray}
                  alt="move"
                  className="w-2 h-[15px] ml-2 hidden group-hover:block"
                />
                <img className="w-5 h-5 group-hover:ml-[6px] mr-[10px]" src={note} alt="note" />
                <span className="font-[350] text-[14px] text-white cursor-pointer active:scale-[97%]">
                  {noteItem}
                </span>
              </div>
              <img
                src={kebabWhite}
                alt="kebab menu"
                className="w-[3px] h-[15px] mr-[10px] hidden group-hover:block"
              />
            </div>
          ))}

          {/* 새 폴더 만들기 */}
          <div className="mt-3 ml-8 flex items-center">
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
        <Logout />
      </div>
    </aside>
  );
};
