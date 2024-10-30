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
    question: 'Q.  인미닛은 무슨 서비스인가요?',
    answer: `인미닛은 음성 인식 기술을 활용하여 회의록 작성을 자동화하는 웹 서비스입니다.
    ✨ 회의 내용의 핵심, 혹은 팀원 개개인의 의견을 기록하고 싶으신 분
    ✨ 비대면 회의 중 회의록을 직접 따로 작성해야 하는 점이 불편하셨던 분
    ✨ 회의가 끝난 이후 화자별로 해야할 일을 다같이 공유하고 체크하고 싶으신 분
    ✨ 회의 일정 관리, 진행, 회의록 작성 모든 것을 한 번에 하고 싶으신 분께 추천드려요`,
  },
  {
    question: 'Q.  회의록 내용 수정이 가능한가요?',
    answer: `회의 노트를 만들 때 지었던 회의 제목,
    음성 기록을 텍스트로 변환하여 만들어진 회의 스크립트, 
    KOBART 모델을 fine tuning해 만든 AI로 요약한 한 줄 요약과 화자별 요약, 
    그리고 GPT API로 만들어진 TO DO까지 모두 편집이 가능하답니다 !
    또한 폴더도 이름 변경과 삭제가 가능해요.`,
  },
  {
    question: 'Q.  회의록은 어떻게 만드나요?',
    answer: `1. 소셜 로그인 이후 이름을 입력합니다.
    2. 폴더를 생성하고 '새 노트 생성' 을 클릭하여 회의록 이름과 폴더를 지정합니다.
    3. '링크 복사' 를 클릭하여 회의에 함께할 사용자들을 초대합니다.
    4. '헤드셋' 을 클릭해 다양한 회의 플랫폼으로 인미닛과 함께 회의를 진행합니다.
    5. '회의 시작' 을 누르고 '마이크' 를 클릭하며 스크립트가 생성되는 것을 확인합니다.
    6. '회의 종료' 를 누르면 자동으로 AI가 회의록을 완성해줍니다 !`,
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
    <div className="relative h-screen flex items-center justify-center mt-[201px] mb-[50px]">
      <div
        className="w-[688px] h-[460px] absolute top-0 rounded-[36px]"
        style={{ backgroundColor: getBgColor(index) }}
      >
        <img
          src={loupe}
          alt="loupe"
          className="w-[270px] h-[269px] absolute z-20 top-[-118px] left-[-303px]"
        />
        <img
          src={bulb}
          alt="bulb"
          className="w-[421.7px] h-[421.3px] absolute z-20 left-[552.6px] top-[382px]"
        />
      </div>
      <motion.div
        className="w-[724px] h-[460px] absolute top-[38px] rounded-[36px]"
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
            className="absolute flex flex-col justify-between top-[76px] w-[760px] h-[460px] bg-mainBlack text-white rounded-[36px] px-[80px] shadow-lg"
          >
            <h2 className="text-[28px] font-[700] leading-[170%] mt-[56px]">{card.question}</h2>
            <p className="text-[17px] font-[500] leading-[240%] mb-[56px]">
              {card.answer.split('\n').map((line, index) => (
                <span key={index}>
                  {line}
                  <br /> {/* 줄바꿈 추가 */}
                </span>
              ))}
            </p>
          </motion.div>
        );
      })}
    </div>
  );
};
