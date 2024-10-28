import { useEffect, useState } from 'react';
import Lottie from 'lottie-react';
import { TextItem } from '@/components/About/MainFeature/TextItem/TextItem';
import mainFeature1 from '@/assets/lotties/mainFeature1.json';
import mainFeature2 from '@/assets/lotties/mainFeature2.json';
import mainFeature3 from '@/assets/lotties/mainFeature3.json';
import mainFeature4 from '@/assets/lotties/mainFeature4.json';

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

const animations = [mainFeature1, mainFeature2, mainFeature3, mainFeature4];

export const MainFeature = () => {
  const [currentAnimationIndex, setCurrentAnimationIndex] = useState(0);
  const [animationStyles, setAnimationStyles] = useState({
    width: '1000px',
    marginLeft: '20px',
  });
  const [fadeClass, setFadeClass] = useState('fade-in');

  const handleScroll = () => {
    const scrollY = window.scrollY; // 현재 스크롤 위치

    let index = 0;
    let width = '1000px';
    let marginLeft = '40px';

    if (scrollY < 1600) {
      index = 0;
      width = '1000px';
      marginLeft = '74px';
    } else if (scrollY >= 1600 && scrollY < 2750) {
      index = 1;
      width = '1070px';
      marginLeft = '39px';
    } else if (scrollY >= 2750 && scrollY < 4000) {
      index = 2;
      width = '1000px';
      marginLeft = '74px';
    } else if (scrollY >= 4000) {
      index = 3;
      width = '1060px';
      marginLeft = '74px';
    }

    if (index !== currentAnimationIndex) {
      setFadeClass('fade-out');
      setTimeout(() => {
        setCurrentAnimationIndex(index);
        setAnimationStyles({
          width: width,
          marginLeft: marginLeft,
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
      <div className="flex justify-between">
        <div>
          <div className="sticky top-[17%] transform translate-y-[0%]">
            <div
              style={{ width: animationStyles.width, marginLeft: animationStyles.marginLeft }}
              className={`transition-opacity duration-300 ${fadeClass}`}
            >
              <Lottie animationData={animations[currentAnimationIndex]} />
            </div>
          </div>
        </div>
        <section className="mr-[110px] w-[383px] h-auto mt-[400px]">
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
