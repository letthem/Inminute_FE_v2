import { patchSummaryBySpeaker } from '@/apis/Note/patchNote';
import { useState, useEffect, useRef } from 'react';

interface SummaryBySpeakerItemProps {
  noteJoinMemberId: number;
  name: string;
  initialSummary: string;
  isEditing: boolean;
  setIsEditing: (editing: boolean) => void;
}

export const SummaryBySpeakerItem: React.FC<SummaryBySpeakerItemProps> = ({
  noteJoinMemberId,
  name,
  initialSummary,
  isEditing,
  setIsEditing,
}) => {
  const [summary, setSummary] = useState(initialSummary);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleBlur = async () => {
    if (summary.trim() !== initialSummary) {
      await patchSummaryBySpeaker(noteJoinMemberId, summary.trim());
    }
    setIsEditing(false);
  };

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setSummary(event.target.value);
    adjustTextareaHeight(); // 높이 조정
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault(); // 줄바꿈 방지
      event.currentTarget.blur(); // 포커스 해제
      setIsEditing(false);
    }
  };

  const adjustTextareaHeight = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'; // 높이를 초기화
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`; // 스크롤 높이에 맞춰 조정
    }
  };

  useEffect(() => {
    if (isEditing) {
      adjustTextareaHeight(); // 초기 높이 설정
    }
  }, [isEditing]);

  return (
    <div className="mt-3 flex">
      <span className="break-keep font-extrabold text-[13.5px] mr-6 leading-[23px]">{name}</span>
      {isEditing ? (
        <textarea
          ref={textareaRef} // ref 설정
          value={summary}
          onChange={handleChange}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          rows={1}
          className="w-full mr-[120px] font-pretendard font-[350] text-[13.5px] leading-[23px] bg-transparent resize-none outline-none"
        />
      ) : (
        <span className="font-pretendard font-[350] text-[13.5px] leading-[23px] mr-[120px]">
          {summary}
        </span>
      )}
    </div>
  );
};
