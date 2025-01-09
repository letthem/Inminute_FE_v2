import { useEffect, useState } from 'react';
import { throttle } from 'lodash';
import Lottie from 'lottie-react';
import { TextItem } from '@/components/About/MainFeature/TextItem/TextItem';
import mainFeature0 from '@/assets/lotties/mainFeature0.json';
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

const animations = [mainFeature0, mainFeature1, mainFeature2, mainFeature3, mainFeature4];

export const MainFeature = () => {
  const [currentAnimationIndex, setCurrentAnimationIndex] = useState(0);
  const [animationStyles, setAnimationStyles] = useState({
    width: '1000px',
    marginLeft: '74px',
  });
  const [fadeClass, setFadeClass] = useState('fade-in');
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 1000);

  const getResponsiveStyles = (index: number) => {
    const screenWidth = window.innerWidth;
    let width = '1000px';
    let marginLeft = '74px';

    if (screenWidth < 1024) {
      if (index === 2) {
        width = '94%';
        marginLeft = '0';
      } else if (index === 4) {
        width = '93%';
        marginLeft = '3%';
      } else {
        width = '90%';
        marginLeft = '3%';
      }
    } else if (screenWidth < 1200) {
      if (index === 2) {
        width = '728px';
        marginLeft = '0px';
      } else if (index === 4) {
        width = '721px';
        marginLeft = '24px';
      } else {
        width = '680px';
        marginLeft = '24px';
      }
    } else if (screenWidth < 1440) {
      if (index === 2) {
        width = '850px';
        marginLeft = '12px';
      } else if (index === 4) {
        width = '842px';
        marginLeft = '40px';
      } else {
        width = '794px';
        marginLeft = '40px';
      }
    } else {
      if (index === 2) {
        width = '1070px';
        marginLeft = '39px';
      } else if (index === 4) {
        width = '1060px';
        marginLeft = '74px';
      } else {
        width = '1000px';
        marginLeft = '74px';
      }
    }
    return { width, marginLeft };
  };

  const handleScroll = throttle(() => {
    const scrollY = window.scrollY;

    let index = 0;
    if (scrollY < 500) {
      index = 0;
    } else if (scrollY >= 500 && scrollY < 1600) {
      index = 1;
    } else if (scrollY >= 1600 && scrollY < 2750) {
      index = 2;
    } else if (scrollY >= 2750 && scrollY < 4000) {
      index = 3;
    } else if (scrollY >= 4000) {
      index = 4;
    }

    if (index !== currentAnimationIndex) {
      setFadeClass('fade-out');
      setTimeout(() => {
        setCurrentAnimationIndex(index);
        setAnimationStyles(getResponsiveStyles(index));
        setFadeClass('fade-in');
      }, 300);
    }
  }, 100);

  useEffect(() => {
    setAnimationStyles(getResponsiveStyles(currentAnimationIndex));

    window.addEventListener('scroll', handleScroll);
    const handleResize = throttle(() => {
      setAnimationStyles(getResponsiveStyles(currentAnimationIndex));
      setIsSmallScreen(window.innerWidth < 1000);
    }, 200); // 200ms 단위로 리사이즈 이벤트 핸들링
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, [currentAnimationIndex]);

  return (
    <article className="flex flex-col bg-sub2Black">
      <div className="flex flex-col s960:flex-row s960:justify-between">
        {isSmallScreen ? (
          animations.slice(1).map((animation, index) => (
            <div key={index + 1} className="flex flex-col items-center gap-5 my-5">
              <div className="w-full text-center" style={{ width: animationStyles.width }}>
                <Lottie animationData={animation} />
              </div>
              <TextItem
                feature={textItems[index].feature}
                desc1={textItems[index].desc1}
                desc2={textItems[index].desc2}
              />
            </div>
          ))
        ) : (
          <>
            <div>
              <div className="s960:sticky top-[17%] transform translate-y-[0%]">
                <div
                  style={{ width: animationStyles.width, marginLeft: animationStyles.marginLeft }}
                  className={`transition-opacity duration-300 ${fadeClass}`}
                >
                  <Lottie animationData={animations[currentAnimationIndex]} />
                </div>
              </div>
            </div>
            <section className="s16:mr-[110px] mx-auto h-auto mt-[400px]">
              {textItems.map((textItem, index) => (
                <TextItem
                  key={index}
                  feature={textItem.feature}
                  desc1={textItem.desc1}
                  desc2={textItem.desc2}
                />
              ))}
            </section>
          </>
        )}
      </div>
      <div className="h-0 s960:h-[262px]" />
    </article>
  );
};
