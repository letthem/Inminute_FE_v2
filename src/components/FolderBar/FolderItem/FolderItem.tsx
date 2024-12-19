import React, { useEffect, useRef, useState } from 'react';
import { NoteItem } from '@/components/FolderBar/FolderItem/NoteItem/NoteItem';
import { Menu } from '@/components/Common/Menu/Menu';
import folder from '@/assets/webps/FolderBar/folder.webp';
import folderMint from '@/assets/webps/FolderBar/folderMint.webp';
import down from '@/assets/webps/FolderBar/downGray.webp';
import up from '@/assets/webps/FolderBar/upGray.webp';
import kebabWhite from '@/assets/webps/FolderBar/kebabWhite.webp';
import dragGray from '@/assets/webps/FolderBar/dragGray.webp';
import { Folder } from '@/components/FolderBar/dto';
import { useNavigate } from 'react-router-dom';
import { patchFolder } from '@/apis/Folder/patchFolder';
import { deleteFolder } from '@/apis/Folder/deleteFolder';

interface FolderItemProps {
  index: number;
  folderItem: Folder;
  expanded: boolean;
  hoveredFolderName: number | null;
  toggleFolder: (index: number) => void;
  setHoveredFolderName: (index: number | null) => void;
  onRenameFolder: (index: number, newName: string) => void;
  onDeleteFolder: (index: number) => void;
  onDragStart: (index: number) => void;
  onDrop: (index: number) => void;
  onDragOver: (e: React.DragEvent<HTMLDivElement>) => void;
  isActive: boolean;
  setActiveFolder: (index: number | null) => void;
}

export const FolderItem: React.FC<FolderItemProps> = ({
  index,
  folderItem,
  expanded,
  hoveredFolderName,
  toggleFolder,
  setHoveredFolderName,
  onRenameFolder,
  onDeleteFolder,
  onDragStart,
  onDrop,
  onDragOver,
  isActive,
  setActiveFolder,
}) => {
  const [isMenuVisible, setIsMenuVisible] = useState(false); // 메뉴 표시 여부 상태 관리
  const [menuPosition, setMenuPosition] = useState({ top: 0, left: 0 }); // 메뉴 위치 상태 관리
  const [isEditing, setIsEditing] = useState(false); // 이름 변경 모드 상태 관리
  const [folderName, setFolderName] = useState(folderItem.name); // 현재 폴더 이름 상태 관리
  const menuRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null); // 인풋 필드에 접근하기 위한 ref
  const folderRef = useRef<HTMLDivElement | null>(null);
  const nav = useNavigate();

  // 드래그 영역
  const handleDragStart = (e: React.DragEvent) => {
    // 커스텀 드래그 이미지 설정
    if (folderRef.current) {
      e.dataTransfer.setDragImage(folderRef.current, 0, 0); // div 전체를 드래그 이미지로 설정
    }
    onDragStart(index); // 드래그 시작 처리
  };

  // 메뉴 토글 및 위치 설정
  const handleToggleMenu = (event: React.MouseEvent) => {
    event.stopPropagation(); // 이벤트 버블링 방지
    const buttonRect = (event.target as HTMLElement).getBoundingClientRect(); // 케밥 버튼의 위치 가져오기
    setMenuPosition({
      top: buttonRect.bottom + window.scrollY, // 케밥 버튼 아래에 메뉴 위치
      left: buttonRect.left + window.scrollX, // 케밥 버튼의 왼쪽에 맞춰 메뉴 위치
    });
    setIsMenuVisible((prev) => !prev); // 메뉴 토글
  };

  // 메뉴 또는 폴더 밖으로 마우스가 나갈 때 메뉴 닫기
  const handleMouseLeave = () => {
    setIsMenuVisible(false);
  };

  // 메뉴 바깥 클릭 시 메뉴 닫기
  const handleClickOutside = (event: MouseEvent) => {
    // 메뉴 외부 클릭 감지
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
      setIsMenuVisible(false); // 메뉴 닫기
    }
  };

  // 이름 수정 기능
  const handleRename = () => {
    setIsEditing(true); // 이름 변경 모드 활성화
    setIsMenuVisible(false); // 메뉴 닫기
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length <= 9) {
      setFolderName(e.target.value); // 폴더 이름 9자 이하일 때만 변경
    }
  };

  const handleNameSubmit = () => {
    if (folderName.trim().length >= 1 && folderName.trim().length <= 9) {
      patchFolder(folderItem.id, folderName);
      setIsEditing(false); // 이름 변경 모드 종료
      onRenameFolder(index, folderName.trim()); // 변경된 이름 저장
    } else {
      // 이름이 조건을 만족하지 않으면 저장을 하지 않음
      // isEditing을 그대로 유지해서 입력 상태를 유지함
      inputRef.current?.focus(); // 조건이 맞지 않으면 포커스 유지
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleNameSubmit(); // 엔터 키를 누르면 이름 저장
    }
  };

  // 폴더 삭제 기능
  const handleDeleteFolder = async () => {
    try {
      // API 호출
      await deleteFolder(folderItem.id);

      // UI 업데이트
      onDeleteFolder(index);
      setIsMenuVisible(false); // 메뉴 닫기
    } catch (error) {
      console.error('폴더 삭제 중 에러 발생:', error);
    }
  };

  useEffect(() => {
    if (isMenuVisible) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMenuVisible]);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus(); // 이름 변경 모드에서 인풋 필드에 포커스
    }
  }, [isEditing]);

  return (
    <div>
      <div
        ref={folderRef}
        onMouseLeave={handleMouseLeave}
        onDrop={() => onDrop(index)} // 드랍 시 호출
        onDragOver={onDragOver} // 드래그 오버 이벤트
        className={`${isEditing ? 'bg-mainBlack ml-6 mr-6' : 'ml-[10px] mr-6'} group mb-1 flex hover:bg-mainBlack py-2 rounded-[10px] justify-between cursor-pointer items-center`}
      >
        <div className="flex items-center">
          {!isEditing && (
            <img
              draggable // 폴더를 드래그 가능하도록 설정
              onDragStart={handleDragStart} // 드래그 시작 시 호출
              src={dragGray}
              alt="drag"
              className="w-2 h-[15px] ml-2 hidden group-hover:block cursor-pointer"
            />
          )}
          <img
            className={`w-5 h-5 ${isEditing ? 'mx-2' : 'group-hover:ml-[6px] ml-[22px] mr-2'}`}
            src={hoveredFolderName === index || isActive ? folderMint : folder}
            alt="folder"
          />
          {isEditing ? (
            <input
              ref={inputRef}
              type="text"
              value={folderName}
              onChange={handleNameChange}
              onBlur={handleNameSubmit} // 포커스가 사라질 때 이름 저장
              onKeyDown={handleKeyDown} // 엔터 키 입력 시 저장
              className="focus:border-none focus:outline-none mr-[0px] font-bold bg-transparent border-b border-main04 text-[14px] text-white"
            />
          ) : (
            <span
              onMouseEnter={() => setHoveredFolderName(index)}
              onMouseLeave={() => setHoveredFolderName(null)}
              className={`mr-[10px] font-bold text-[14px] cursor-pointer active:scale-95 ${
                hoveredFolderName === index || isActive ? 'text-main04' : 'text-white'
              }`}
              onClick={() => {
                setActiveFolder(isActive ? null : index); // 클릭 시 활성화 상태 토글
                nav(isActive ? '/home' : `/home/?folderId=${folderItem.id}`); // 경로 설정
              }}
            >
              {folderItem.name}
            </span>
          )}
          {!isEditing && (
            <img
              className="w-5 h-5 mr-6 cursor-pointer transition-transform duration-300 ease-in-out"
              src={expanded ? up : down}
              alt={expanded ? 'up' : 'down'}
              onClick={() => toggleFolder(index)}
            />
          )}
        </div>
        <div className="mr-[7.5px]">
          {!isEditing && (
            <img
              src={kebabWhite}
              alt="kebab menu"
              className="w-[10.5px] h-[13.5px] px-1 hidden group-hover:block"
              onClick={handleToggleMenu}
            />
          )}
          {isMenuVisible && (
            <div
              ref={menuRef}
              onMouseLeave={handleMouseLeave}
              style={{ position: 'absolute', top: menuPosition.top, left: menuPosition.left }}
            >
              <Menu
                editLabel="이름 변경"
                deleteLabel="삭제하기"
                onEdit={handleRename}
                onDelete={handleDeleteFolder}
              />
            </div>
          )}
        </div>
      </div>
      <div
        className={`ml-[30px] overflow-hidden transition-all duration-300 ease-in-out ${
          expanded ? 'max-h-[300px]' : 'max-h-0'
        }`}
        style={{
          maxHeight: expanded ? `${folderItem.notes.length * 100}px` : '0',
        }}
      >
        <div className="mb-2">
          {folderItem.notes.map((noteItem, noteIndex) => (
            <NoteItem key={noteIndex} noteItem={noteItem} />
          ))}
        </div>
      </div>
    </div>
  );
};
