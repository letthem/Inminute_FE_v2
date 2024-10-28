import { TextItem } from '@/components/About/MainFeature/TextItem/TextItem';
import mainFeature1 from '@/assets/lotties/mainFeature1.json';
import mainFeature2 from '@/assets/lotties/mainFeature2.json';
import Lottie from 'lottie-react';
import { useEffect, useState } from 'react';

const textItems = [
  {
    feature: '실시간 스크립트 작성',
    desc1: '모든 회의 내용을 실시간으로 기록해줘요.',
    desc2: '내가 한 말과 다르다면 수정할 수 있어요.',
  },
  {
    feature: '회의 한 줄 요약',
    desc1: '회의 전체 내용을 한 줄로 깔끔하게 정리해드려요.',
    desc2: '수정하고 싶다면 자유롭게 편집할 수 있어요.',
  },
  {
    feature: '화자별 요약',
    desc1: 'AI가 발언 내용을 화자별로 요약해줘요.',
    desc2: '팀원의 의견이 어땠는지 확인해보세요.',
  },
  {
    feature: 'TO DO',
    desc1: '회의 참여자별 해야 할 일을',
    desc2: '메모지로 간편하게 확인하고 체크해요 !',
  },
];

const animations = [mainFeature1, mainFeature2];

export const MainFeature = () => {
  const [currentAnimationIndex, setCurrentAnimationIndex] = useState(0);
  const [animationStyles, setAnimationStyles] = useState({
    width: '1000px',
    marginLeft: '20px',
  });
  const [fadeClass, setFadeClass] = useState('fade-in');

  const handleScroll = () => {
    const scrollY = window.scrollY; // 현재 스크롤 위치

    // Lottie 애니메이션 및 스타일 변경 조건
    const index = Math.min(Math.floor(scrollY / 1200), animations.length - 1);
    if (index !== currentAnimationIndex) {
      setFadeClass('fade-out');
      setTimeout(() => {
        setCurrentAnimationIndex(index);
        setAnimationStyles({
          width: index === 0 ? '1000px' : '1100px',
          marginLeft: index === 0 ? '80px' : '40px',
        });
        setFadeClass('fade-in');
      }, 300);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [currentAnimationIndex]);

  return (
    <article className="flex flex-col bg-sub2Black">
      <div className="flex">
        <div>
          <div className="sticky top-[20%] transform translate-y-[0%]">
            <div
              style={{ width: animationStyles.width, marginLeft: animationStyles.marginLeft }}
              className={`transition-opacity duration-300 ${fadeClass}`}
            >
              <Lottie animationData={animations[currentAnimationIndex]} />
            </div>
          </div>
        </div>
        <section className="mx-auto w-[383px] h-auto">
          {textItems.map((textItem, index) => (
            <TextItem
              key={index}
              feature={textItem.feature}
              desc1={textItem.desc1}
              desc2={textItem.desc2}
            />
          ))}
        </section>
      </div>
      <div className="h-[262px]" />
    </article>
  );
};
