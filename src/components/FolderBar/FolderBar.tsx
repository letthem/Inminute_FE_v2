import { useState, useEffect } from 'react';
import { Logo } from '@/components/FolderBar/Logo/Logo';
import { Logout } from '@/components/FolderBar/Logout/Logout';
import { UnassignedNotes } from '@/components/FolderBar/UnassignedNotes/UnassignedNotes';
import { NewFolderInput } from '@/components/FolderBar/NewFolderInput/NewFolderInput';
import { FolderItem } from '@/components/FolderBar/FolderItem/FolderItem';

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

  // 폴더 이름 변경 함수
  const handleRenameFolder = (index: number, newName: string) => {
    setFolders((prevFolders) =>
      prevFolders.map((folder, i) => (i === index ? { ...folder, name: newName } : folder))
    );
  };

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

        <section className="flex-1 overflow-y-auto mt-3 scrollbar-hide">
          {folders.map((folderItem, index) => (
            <FolderItem
              key={index}
              index={index}
              folderItem={folderItem}
              expanded={expandedFolders[index]}
              hoveredFolderName={hoveredFolderName}
              selectedFolderName={selectedFolderName}
              toggleFolder={toggleFolder}
              setHoveredFolderName={setHoveredFolderName}
              setSelectedFolderName={setSelectedFolderName}
              onFolderSelect={onFolderSelect}
              onRenameFolder={handleRenameFolder}
            />
          ))}
          <UnassignedNotes notes={unassignedNotes} />
          <NewFolderInput
            newFolderName={newFolderName}
            setNewFolderName={setNewFolderName}
            handleKeyDown={handleKeyDown}
          />
        </section>

        <Logout />
      </div>
    </aside>
  );
};
