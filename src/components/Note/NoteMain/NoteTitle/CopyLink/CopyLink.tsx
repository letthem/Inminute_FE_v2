import React, { useState, useEffect } from 'react';
import link from '@/assets/svgs/Note/link.svg';

interface CopyLinkProps {
  url: string; // 복사할 URL
}

const CopyLink: React.FC<CopyLinkProps> = ({ url }) => {
  const [isCopied, setIsCopied] = useState(false);

  // 링크 복사 함수
  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(url); // ClipBoard API 사용 - URL 복사
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

  return (
    <div
      onClick={handleCopyLink}
      className="flex items-center w-[88px] h-[30px] mr-3 bg-mainBlack rounded-[3.2px] cursor-pointer"
    >
      <img className="w-[15px] h-[15px] ml-3 mr-[6px]" src={link} alt="link" />
      <span className="font-[500]">링크 복사</span>
    </div>
  );
};

export default CopyLink;
