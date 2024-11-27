import React, { useState, ReactNode, useRef, useEffect } from 'react';
import userMint from '@/assets/svgs/Note/userMint.svg';
import kebab from '@/assets/svgs/Note/kebab.svg';
import { Menu } from '@/components/Common/Menu/Menu';

interface ScriptItemProps {
  name: string;
  script: ReactNode;
  onUpdateScript?: (newScript: string) => void;
  onDeleteScript?: () => void;
}

export const ScriptItem: React.FC<ScriptItemProps> = ({
  name,
  script,
  onUpdateScript,
  onDeleteScript,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedScript, setEditedScript] = useState<string>(
    typeof script === 'string' ? script : ''
  ); // string으로 초기화
  const menuRef = useRef<HTMLDivElement | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const scriptRef = useRef<HTMLDivElement | null>(null);

  // 스크립트 수정
  const handleEdit = () => {
    if (typeof script === 'string') {
      setIsEditing(true);
      setIsMenuVisible(false);
      setTimeout(() => {
        resizeTextarea();
        if (textareaRef.current) {
          textareaRef.current.focus();
          textareaRef.current.selectionStart = textareaRef.current.value.length;
          textareaRef.current.selectionEnd = textareaRef.current.value.length;
        }
      }, 0);
    }
  };

  // 스크립트 수정 완료
  const handleSaveEdit = () => {
    if (onUpdateScript && typeof editedScript === 'string') {
      onUpdateScript(editedScript);
    }
    setIsEditing(false);
    setIsMenuVisible(false);
  };

  // 스크립트 삭제
  const handleDelete = () => {
    if (onDeleteScript) {
      onDeleteScript();
    }
    setIsMenuVisible(false);
  };

  // textarea 쓰는 글 길이에 맞춰 높이 조절
  const resizeTextarea = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  };

  // 메뉴 또는 script 밖으로 마우스가 나갈 때 메뉴 닫기
  const handleMouseLeave = () => {
    setIsMenuVisible(false);
  };

  // 바깥 클릭 시 메뉴 닫기
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuRef.current &&
        scriptRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        !scriptRef.current.contains(event.target as Node)
      ) {
        setIsMenuVisible(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div
      ref={scriptRef}
      className={`pb-4 pt-4 pl-[15px] pr-3 hover:bg-gray02 rounded-[10px] ${isEditing && 'bg-gray02 pb-[9.5px]'}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex justify-between items-center relative">
        <div className="flex items-center">
          <img src={userMint} alt="user icon" className="w-[28px] h-[28px] mr-[10px]" />
          <span className="font-bold text-[14px] text-main07">{name}</span>
        </div>
        {isHovered && (
          <img
            src={kebab}
            alt="kebab icon"
            className="w-[10.5px] h-[13.5px] mr-[4.5px] px-[4px] cursor-pointer"
            onClick={() => setIsMenuVisible((prev) => !prev)}
          />
        )}
        {isEditing && (
          <button
            onClick={handleSaveEdit}
            className="absolute top-[4px] right-[30px] text-[13px] text-gray05 cursor-pointer"
          >
            완료
          </button>
        )}
        {isMenuVisible && (
          <div
            ref={menuRef}
            onMouseLeave={handleMouseLeave}
            className="absolute top-[20px] right-[86px]"
          >
            <Menu
              editLabel="텍스트 수정"
              deleteLabel="삭제하기"
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          </div>
        )}
      </div>
      <div className="mt-3">
        {typeof script === 'string' && isEditing ? (
          <textarea
            ref={textareaRef}
            value={editedScript}
            rows={1}
            onChange={(e) => {
              setEditedScript(e.target.value);
              resizeTextarea();
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault(); // 기본 Enter 키 동작 방지
                handleSaveEdit();
              }
            }}
            className="font-pretendard font-[350] text-[13px] leading-[24px] bg-transparent w-full outline-none resize-none overflow-hidden"
          />
        ) : (
          <span className="font-pretendard font-[350] text-[13px] leading-[24px]">{script}</span>
        )}
      </div>
    </div>
  );
};
