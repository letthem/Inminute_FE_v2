import { useState } from 'react';
import { motion, useMotionValue, useTransform, PanInfo } from 'framer-motion';
import loupe from '@/assets/webps/About/loupe.webp';
import bulb from '@/assets/webps/About/bulb.webp';

interface CardData {
  question: string;
  answer: string;
}

const cardData: CardData[] = [
  {
    question: 'Q.  인미닛은 어떤 서비스인가요?',
    answer:
      '인미닛은 AI 기술을 활용한 음성 기록 관리 서비스입니다. 회의, 강의, 상담, 인터뷰 등 녹음이 필요한 모든 상황에 편리하게 이용할 수 있어요. 특히 대화 내용을 집중해서 듣거나 직접 참여해야 할 때 유용합니다. 녹음한 내용이 텍스트로 변환되고 AI 기술이 핵심 내용만 요약해 주기 때문에 요점을 한눈에 파악하기 쉽고 필요한 구간만 찾아서 바로 들어볼 수도 있어요.',
  },
  {
    question: 'Q.  인미닛의 주요 기능은?',
    answer: '인미닛에서는 회의록 작성과 공유, AI 요약 기능을 제공합니다. ...',
  },
  {
    question: 'Q.  인미닛을 어떻게 사용할 수 있나요?',
    answer: '앱이나 웹을 통해 회의록을 작성하고 요약할 수 있어요...',
  },
];

export const Cards = () => {
  const [index, setIndex] = useState(0);
  const y = useMotionValue(0); // Y 축 드래그 값
  const opacity = useTransform(y, [0, 0, 300], [1, 1, 1]); // 드래그에 따라 투명도 변화
  const scale = useTransform(y, [-300, 0, 300], [0.9, 1, 1.1]); // 드래그에 따라 커짐

  const handleDragEnd = (_event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (info.offset.y > 100) {
      setIndex((prev) => (prev - 1 + cardData.length) % cardData.length);
    }
    y.set(0); // Y값을 원래 위치로 초기화
  };

  const bgColors = ['#818181', '#535353', '#2B2B2B']; // 배경색 로테이션
  const getBgColor = (i: number) => bgColors[i % bgColors.length];

  return (
    <div className="relative h-screen flex items-center justify-center mt-[201px] mb-[91px]">
      <div
        className="w-[764px] h-[512px] absolute top-0 rounded-[36px]"
        style={{ backgroundColor: getBgColor(index) }}
      >
        <img
          src={loupe}
          alt="loupe"
          className="w-[282px] h-[281px] absolute z-20 top-[-128px] left-[-325px]"
        />
        <img
          src={bulb}
          alt="bulb"
          className="w-[422px] h-[422.45px] absolute z-20 left-[641px] top-[442px]"
        />
      </div>
      <motion.div
        className="w-[804px] h-[512px] absolute top-[42px] rounded-[36px]"
        style={{ backgroundColor: getBgColor(index + 1), scale }} // 드래그에 따른 scale 적용
        drag="y" // 드래그 방향 설정
        dragConstraints={{ top: 0, bottom: 0 }} // 드래그 제한
        onDragEnd={() => y.set(0)} // 드래그 끝나면 Y값 리셋
      />

      {cardData.map((card, i) => {
        const cardIndex = (i - index + cardData.length) % cardData.length;

        return (
          <motion.div
            key={i}
            drag="y"
            style={{
              y, // Y 값 전달
              opacity: cardIndex === 0 ? opacity : 0, // 현재 카드만 보이도록 투명도 적용
              zIndex: cardData.length - cardIndex, // zIndex를 통해 카드 순서 제어
              backgroundColor: getBgColor(i + 2), // 배경 색상 설정
            }}
            dragConstraints={{ top: 0, bottom: 0 }}
            onDragEnd={handleDragEnd}
            className="absolute flex flex-col justify-between top-[84px] w-[844px] h-[512px] bg-mainBlack text-white rounded-[36px] px-[90px] shadow-lg"
          >
            <h2 className="text-[31px] font-[700] leading-[170%] mt-[62px]">{card.question}</h2>
            <p className="text-[19px] font-[500] leading-[240%] mb-[60px]">{card.answer}</p>
          </motion.div>
        );
      })}
    </div>
  );
};
