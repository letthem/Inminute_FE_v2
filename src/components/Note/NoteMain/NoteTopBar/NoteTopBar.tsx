import { useNavigate } from 'react-router-dom';
import leftBlack from '@/assets/webps/Note/leftBlack.webp';
import kebab from '@/assets/webps/Note/kebab.webp';
import { NoteDetail } from '@/pages/Note/dto';
import { useEffect, useRef, useState } from 'react';
import { Menu } from '@/components/Common/Menu/Menu';

interface NoteTopBarProps {
  noteData: NoteDetail | null;
}

export const NoteTopBar: React.FC<NoteTopBarProps> = ({ noteData }) => {
  const nav = useNavigate();
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

  // 회의 노트 제목 수정
  const handleEdit = () => {
    console.log(noteData?.name);
  };

  // 회의 노트 삭제
  const handleDelete = () => {
    const confirmDelete = window.confirm('Are you sure you want to delete this note?');
    if (confirmDelete) {
      // 여기에 회의록 삭제 API 요청을 추가할 수 있습니다.
      nav('/home'); // 삭제 후 홈으로 이동
    }
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
      setIsMenuVisible(false); // 메뉴 외부 클릭 시 닫기
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <section className="flex justify-between mt-10">
      <img
        src={leftBlack}
        alt="back button"
        className="w-[18px] h-[18px] cursor-pointer ml-9"
        onClick={() => nav(-1)}
      />
      <div className="px-4 mr-[10px] cursor-pointer relative">
        <img
          onClick={() => setIsMenuVisible((prev) => !prev)}
          src={kebab}
          alt="kebab menu"
          className="h-[18.2px]"
        />
        {isMenuVisible && (
          <div ref={menuRef} className="absolute top-[20px] right-[118px]">
            <Menu
              width="116px"
              height="72px"
              menuGap="4px"
              imgGap="9px"
              padding="7px 8px"
              font="11px"
              lineHeight="12px"
              editLabel="이름 수정"
              deleteLabel="회의록 삭제"
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          </div>
        )}
      </div>
    </section>
  );
};
