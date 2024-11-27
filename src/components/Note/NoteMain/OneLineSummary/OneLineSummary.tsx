import React, { useEffect, useState, useRef } from 'react';
import { NoteDetail } from '@/pages/Note/dto';
import { patchOneLineSummary } from '@/apis/Note/patchNote';

interface OneLineSummaryProps {
  noteData: NoteDetail | null;
}

export const OneLineSummary: React.FC<OneLineSummaryProps> = ({ noteData }) => {
  const [summary, setSummary] = useState(noteData?.summary || '');
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const adjustHeights = () => {
    if (textareaRef.current && wrapperRef.current) {
      textareaRef.current.style.height = 'auto'; // textarea 높이를 초기화
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`; // 내용에 맞게 높이 조정
      wrapperRef.current.style.height = `${textareaRef.current.scrollHeight}px`; // wrapper 높이도 동일하게 조정
    }
  };

  const handleBlur = async () => {
    if (noteData?.id && noteData.summary !== summary) {
      await patchOneLineSummary(noteData.id, summary.trim()); // 앞 뒤 공백 제거 후 저장
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setSummary(event.target.value);
    adjustHeights(); // 입력 시마다 높이 조정
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter' && event.nativeEvent.isComposing === false) {
      event.preventDefault(); // 줄바꿈 방지
      event.currentTarget.blur(); // 포커스 해제
    }
  };

  useEffect(() => {
    const handleResize = () => {
      adjustHeights();
    };

    adjustHeights(); // 초기 렌더링 시 높이 조정
    window.addEventListener('resize', handleResize); // 리사이즈 이벤트 추가

    return () => {
      window.removeEventListener('resize', handleResize); // 이벤트 클린업
    };
  }, []);

  return (
    <section className="mt-5 ml-12">
      <div
        ref={wrapperRef}
        className="mr-[120px] max-w-[865px] rounded-[10px] bg-[#ECECEC]"
        style={{ overflow: 'hidden' }} // 스크롤 방지
      >
        <textarea
          ref={textareaRef}
          value={summary}
          onChange={handleChange}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          rows={1}
          className="w-full font-[350] text-[13.5px] font-pretendard leading-[24px] py-[14px] px-[20px] resize-none bg-transparent outline-none scrollbar-hide"
        />
      </div>
    </section>
  );
};
