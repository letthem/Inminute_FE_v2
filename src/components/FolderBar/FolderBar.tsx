import { useState, useEffect } from 'react';
import logo from '@/assets/webps/Layout/logo.webp';
import folder from '@/assets/webps/FolderBar/folder.webp';
import down from '@/assets/webps/FolderBar/down.webp';
import note from '@/assets/webps/FolderBar/note.webp';
import logout from '@/assets/webps/FolderBar/logout.webp';

interface Folder {
  name: string;
  notes: string[];
}

export const FolderBar = () => {
  const [folders, setFolders] = useState<Folder[]>([
    { name: '학교', notes: ['해커톤 정기회의 2차', '플로우 회의'] },
    { name: '직장', notes: ['브랜드 아이덴티티 전략 회의'] },
  ]);
  const [unassignedNotes] = useState<string[]>([
    'TF팀 회의',
    '해커톤 정기회의 3차',
    '업무 역할 분배',
  ]);
  const [newFolderName, setNewFolderName] = useState('');
  const [isAddingFolder, setIsAddingFolder] = useState(false);

  const handleAddFolder = () => {
    if (newFolderName.trim() !== '') {
      // 중복 호출 방지
      if (isAddingFolder) return; // isAddingFolder가 true라면 폴더를 추가하는 작업이 이미 진행 중이므로 함수를 즉시 종료

      setIsAddingFolder(true);
      setFolders((prevFolders) => [...prevFolders, { name: newFolderName.trim(), notes: [] }]);
    }
  };

  // 폴더가 추가된 후 입력 값 초기화
  useEffect(() => {
    if (isAddingFolder) {
      setNewFolderName('');
      setIsAddingFolder(false);
    }
  }, [folders, isAddingFolder]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault(); // 기본 동작 방지
      handleAddFolder();
    }
  };

  return (
    <aside>
      <div className="w-[280px] h-full bg-subBlack flex flex-col justify-between font-nanum leading-[22px]">
        <section>
          <img className="w-[214px] mt-[47px] ml-[36px]" src={logo} alt="logo" />
          <p className="ml-9 mt-7 font-medium text-[17px] text-white">
            <span className="font-extrabold text-main04">
              수연<span className="font-normal"> </span>
            </span>
            님의 회의공간
          </p>
          <div className="w-[216px] h-[1.5px] ml-8 mt-6 bg-gray06" />

          {/* 폴더와 해당 폴더에 속한 노트들 */}
          {folders.map((folderItem, index) => (
            <div key={index}>
              <div className="mt-6 flex items-center">
                <img className="w-5 h-5 ml-8 mr-2" src={folder} alt="folder" />
                <span className="mr-[10px] font-bold text-[14px] text-white cursor-pointer">
                  {folderItem.name}
                </span>
                <img className="w-5 h-5 cursor-pointer" src={down} alt="down" />
              </div>
              {folderItem.notes.map((noteItem, noteIndex) => (
                <div key={noteIndex} className="mt-5 ml-[52px] flex items-center">
                  <img className="w-5 h-5 mr-[10px]" src={note} alt="note" />
                  <span className="font-[350] text-[14px] text-white cursor-pointer">
                    {noteItem}
                  </span>
                </div>
              ))}
            </div>
          ))}

          {/* 폴더에 속하지 않은 노트들 */}
          {unassignedNotes.map((noteItem, noteIndex) => (
            <div key={`unassigned-${noteIndex}`} className="mt-6 ml-8 flex items-center">
              <img className="w-5 h-5 mr-[10px]" src={note} alt="note" />
              <span className="font-[350] text-[14px] text-white cursor-pointer">{noteItem}</span>
            </div>
          ))}

          {/* 새 폴더 만들기 */}
          <div className="mt-6 ml-8 flex items-center">
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

        {/* 로그아웃 */}
        <section>
          <div className="fixed bottom-9 ml-10 mt-20 flex items-center">
            <img className="w-5 h-5 mr-[10px]" src={logout} alt="logout" />
            <span className="font-light text-[14px] text-white cursor-pointer">로그아웃</span>
          </div>
        </section>
      </div>
    </aside>
  );
};
