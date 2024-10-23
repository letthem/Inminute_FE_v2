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
    question: '인미닛의 주요 기능은?',
    answer: '인미닛에서는 회의록 작성과 공유, AI 요약 기능을 제공합니다. ...',
  },
];

export const Cards = () => {
  const [index, setIndex] = useState(0);
  const y = useMotionValue(0); // Y 축 드래그 값
  const opacity = useTransform(y, [-300, 0, 0], [0.9, 1, 1]); // 드래그에 따라 투명도 변화
  const rotate = useTransform(y, [-200, 0, 0], [8, 0, 0]); // Y값에 따라 카드 회전

  const handleDragEnd = (_event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (info.offset.y < -100) {
      // 드래그가 충분히 이루어졌다면 다음 카드로 전환
      setIndex((prev) => (prev + 1) % cardData.length);
    }
    y.set(0); // 드래그 끝나면 Y값을 원래 위치로
  };

  return (
    <div className="relative h-screen flex items-center justify-center mt-[201px] mb-[91px]">
      <div className="w-[764px] h-[512px] bg-[#BBB] absolute top-0 rounded-[36px]">
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
      <div className="w-[804px] h-[512px] bg-[#666] absolute top-[42px] rounded-[36px]" />

      {cardData.map((card, i) => (
        <motion.div
          key={i}
          drag="y"
          style={{
            y, // Y값을 style로 전달
            opacity: i === index ? opacity : 0, // opacity 값 전달
            rotate: i === index ? rotate : 0, // 회전 값 전달
            zIndex: cardData.length - i, // 카드가 겹쳐지는 순서를 위한 zIndex
          }}
          dragConstraints={{ top: 0, bottom: 0 }}
          onDragEnd={handleDragEnd}
          className="absolute flex flex-col justify-between top-[84px] w-[844px] h-[512px] bg-mainBlack text-white rounded-[36px] px-[90px] shadow-lg"
        >
          <h2 className="text-[31px] font-[700] leading-[170%] mt-[62px]">{card.question}</h2>
          <p className="text-[19px] font-[500] leading-[240%] mb-[60px]">{card.answer}</p>
        </motion.div>
      ))}
    </div>
  );
};
