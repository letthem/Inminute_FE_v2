import calendarBlack from '@/assets/webps/Note/calendarBlack.webp';
import timeBlack from '@/assets/webps/Note/timeBlack.webp';
import link from '@/assets/svgs/Note/link.svg';
import mic from '@/assets/svgs/Note/mic.svg';
import headphones from '@/assets/svgs/Note/headphones.svg';
import { useEffect, useState } from 'react';
import { NoteDetail } from '@/pages/Note/dto';
import { PlatformModal } from '@/components/Note/NoteMain/NoteTitle/PlatformModal/PlatformModal';

interface NoteTitleProps {
  noteData: NoteDetail | null;
}

export const NoteTitle: React.FC<NoteTitleProps> = ({ noteData }) => {
  const [isCopied, setIsCopied] = useState(false);
  const [isPlatformModalOpen, setIsPlatformModalOpen] = useState(false);

  // 링크 복사 함수
  const handleCopyLink = async () => {
    try {
      const currentUrl = window.location.href;
      await navigator.clipboard.writeText(currentUrl); // ClipBoard API 사용 - 현재 페이지 URL 복사
      setIsCopied(true); // 복사 성공 상태 업데이트
    } catch (error) {
      console.error('링크 복사 실패:', error);
    }
  };

  // isCopied 상태 변경 감지
  useEffect(() => {
    if (isCopied) {
      alert('링크가 복사되었습니다!');
      setTimeout(() => setIsCopied(false), 2000); // 2초 후 상태 초기화
    }
  }, [isCopied]);

  if (!noteData) {
    return <p>노트 정보를 불러오는 중입니다...</p>;
  }

  const date = new Date(noteData.createdAt);
  const formattedDate = `${date.getFullYear().toString().slice(-2)}.${(date.getMonth() + 1).toString().padStart(2, '0')}.${date.getDate().toString().padStart(2, '0')}`;

  return (
    <>
      <section className="flex flex-col">
        <div className="flex justify-between items-center mt-[30px]">
          <p className="text-[26px] font-bold ml-12 mr-[120px] leading-[30px]">{noteData.name}</p>
          <div className="flex text-white text-[10.5px] leading-[18px]">
            <div
              onClick={handleCopyLink}
              className="flex items-center w-[88px] h-[30px] mr-3 bg-mainBlack rounded-[3.2px] cursor-pointer"
            >
              <img className="w-[15px] h-[15px] ml-3 mr-[6px]" src={link} alt="link" />
              <span className="font-[500]">링크 복사</span>
            </div>
            <div
              onClick={() => {
                setIsPlatformModalOpen(true);
              }}
              className="flex justify-center items-center w-[42px] h-[30px] mr-3 bg-main06 rounded-[3.2px] cursor-pointer"
            >
              <img src={headphones} alt="headphones" />
            </div>
            <div className="flex items-center w-[88px] h-[30px] mr-[27px] bg-mainBlack rounded-[3.2px] cursor-pointer">
              <img className="w-[15px] h-[15px] ml-[12.3px] mr-[6.3px]" src={mic} alt="mic" />
              <span className="font-[500]">회의 시작</span>
            </div>
          </div>
        </div>

        <div className="flex ml-[49px] mt-[13px] items-center mb-2">
          <div className="flex items-center">
            <img src={calendarBlack} alt="calendarBlack" className="w-[14px] h-[14px]" />
            <span className="h-4 ml-[6px] text-[10px] font-medium leading-4">{formattedDate}</span>
          </div>
          <div className="ml-5 flex items-center">
            <img src={timeBlack} alt="timeBlack" className="w-[14px] h-[14px]" />
            <span className="h-4 ml-[6px] text-[10px] font-medium leading-4">1:19:05</span>
          </div>
        </div>
      </section>
      {isPlatformModalOpen && <PlatformModal onClose={() => setIsPlatformModalOpen(false)} />}
    </>
  );
};
