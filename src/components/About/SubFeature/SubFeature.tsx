import { useEffect, useState } from 'react';
import AOS from 'aos';
import zoom from '@/assets/webps/About/zoom.webp';
import webex from '@/assets/webps/About/webex.webp';
import googleMeet from '@/assets/webps/About/googleMeet.webp';
import microsoftTeams from '@/assets/webps/About/microsoftTeams.webp';
import calendar from '@/assets/webps/About/calendar.webp';
import link from '@/assets/svgs/About/link.svg';
import plane from '@/assets/webps/About/plane.webp';
import folder from '@/assets/webps/About/folder.webp';
import helix from '@/assets/webps/About/helix.webp';
import spheres from '@/assets/webps/About/spheres.webp';
import 'aos/dist/aos.css';

const platforms = [
  {
    logo: zoom,
    name: 'ZOOM',
    color: 'text-[#0B5CFF]',
    className:
      's1400:w-[230px] s1400:h-[60px] s1400:mt-[90px] s1400:mb-[81px] s1600:w-[285px] s1600:h-[74px] s1600:mt-[110px] s1600:mb-[98px] mx-auto',
  },
  {
    logo: webex,
    name: 'WEBEX',
    color: 'text-[#22CDE4]',
    className:
      's1400:w-[299px] s1400:h-[114px] s1400:mt-[64px] s1400:ml-0 s1400:mb-[53px] s1600:w-[364px] s1600:h-[138px] s1600:mt-[77px] s1600:ml-1 s1600:mb-[67px]',
  },
  {
    logo: googleMeet,
    name: 'MEET',
    color: 'text-[#4CBA6E]',
    className:
      's1400:w-[290px] s1400:h-[56px] s1400:mt-[100px] s1400:mb-[75px] s1600:w-[360px] s1600:h-[70px] s1600:mt-[114px] s1600:mb-[98px] mx-auto',
  },
  {
    logo: microsoftTeams,
    name: 'TEAMS',
    color: 'text-[#6B73DE]',
    className:
      's1400:w-[300px] s1400:h-[73px] s1400:mt-[90px] s1400:ml-[9px] s1400:mb-[68px] s1600:w-[366px] s1600:h-[89px] s1600:mt-[104px] s1600:ml-[10px] s1600:mb-[89px]',
  },
];

export const SubFeature = () => {
  const [currentPlatformIndex, setCurrentPlatformIndex] = useState(0);
  const [fadeClass, setFadeClass] = useState('fade-in');
  const [textFadeClass, setTextFadeClass] = useState('text-fade-in');
  const changePlatform = () => {
    setFadeClass('fade-out'); // 페이드 아웃 시작
    setTextFadeClass('text-fade-out'); // 텍스트 페이드 아웃 시작

    setTimeout(() => {
      setCurrentPlatformIndex((prevIndex) => (prevIndex + 1) % platforms.length);
      setFadeClass('fade-in'); // 페이드 인 시작
      setTextFadeClass('text-fade-in'); // 텍스트 페이드 인 시작
    }, 300); // 페이드 아웃 시간이 지난 후에 실행
  };

  // 플랫폼 변경
  useEffect(() => {
    const interval = setInterval(changePlatform, 3000); // 3초마다 변경
    return () => clearInterval(interval); // 컴포넌트 언마운트 시 클리어
  }, []);

  useEffect(() => {
    AOS.init({
      duration: 700,
      once: false,
    });
  }, []);

  return (
    <article className="bg-bg leading-[170%] relative">
      <div className="flex justify-center mt-[262px] text-mainBlack text-[20px] s960:text-[52px] s1400:text-[42px] s1600:text-[52px] font-[800] leading-[170%]">
        <div className="flex flex-col w-[298px] s510:w-[453px] s960:w-[856px] s1400:w-[1046px] s1600:w-[1292px] z-10">
          <p>인미닛에서는,</p>
          <p>이런 것도 할 수 있어요!</p>
        </div>
      </div>
      <img
        src={helix}
        alt="helix"
        className="s960:w-[371px] s960:h-[371px] s1400:w-[341px] s1400:h-[341px] s1600:w-[424px] s1600:h-[424px] s1400:top-[204px] s1400:right-[160px] s1600:top-[167px] s1600:right-[74px] absolute z-0"
      />
      <img
        src={spheres}
        alt="spheres"
        className="hidden s1600:block s1600:w-[380px] s1600:h-[380px] s1600:top-[1729px] s1600:left-[24px] absolute z-0"
      />
      <section className="flex justify-center s1400:mt-[58px] s1600:mt-[72px] s1400:mb-[336px] s1600:mb-[384px]">
        <div className="flex flex-col gap-9">
          <div className="flex gap-9">
            {/* Q&A */}
            <div
              data-aos="fade-up"
              className="flex col-span-2 s1400:w-[694px] s1400:h-[356px] s1600:w-[856px] s1600:h-[440px] bg-white s1400:rounded-[20px] shadow-subFeature z-10"
            >
              <div className="s1400:ml-[34px] s1400:mt-[30px] s1600:ml-[42px] s1600:mt-[38px]">
                <p className="text-mainBlack font-[800] leading-[170%] s1400:text-[26px] s1600:text-[32px]">
                  Q&A
                </p>
                <div className="s1400:w-[203px] s1600:w-[232px] text-gray05 s1400:text-[14px] s1600:text-[16px] font-[400] leading-[170%] s1400:mt-[6px] s1600:mt-3">
                  <p>회의록에 대해 궁금한 점이 있다면</p>
                  <p>질문해보세요.</p>
                </div>
              </div>
              <div className="relative s1400:ml-[41px] s1600:ml-[69px] s1400:mr-10 s1600:mr-12 s1400:mt-10 s1600:mt-12 s1400:mb-[34px] s1600:mb-11 s1400:w-[376px] s1400:h-[282px] s1600:w-[465px] s1600:h-[348px] font-pretendard s1400:text-[19px] s1600:text-[24px] font-[500] leading-[170%]">
                <div className="absolute right-0 s1400:w-[135px] s1400:h-[58px] s1600:w-[167px] s1600:h-[72px] bg-[#E1FF4D] s1400:rounded-t-[24px] s1600:rounded-t-[30px] s1400:rounded-bl-[24px] s1600:rounded-bl-[30px] s1400:pt-[13px] s1400:pl-[20px] s1600:pt-4 s1600:pl-6">
                  <span>OO에 대해서</span>
                </div>
                <div className="absolute s1400:top-[71px] s1600:top-[88px] right-0 s1400:w-[238px] s1400:h-[58px] s1600:w-[294px] s1600:h-[72px] bg-[#E1FF4D] s1400:rounded-t-[24px] s1600:rounded-t-[30px] s1400:rounded-bl-[24px] s1600:rounded-bl-[30px] s1400:pt-[13px] s1400:pl-[20px] s1600:pt-4 s1600:pl-6">
                  <span>어떤 이야기들을 나눴었지?</span>
                </div>
                <div className="absolute s1400:top-[152px] s1600:top-[188px] left-0 s1400:w-[250px] s1400:h-[58px] s1600:w-[309px] s1600:h-[72px] bg-[#9DFF4D] s1400:rounded-b-[24px] s1600:rounded-b-[30px] s1400:rounded-tr-[24px] s1600:rounded-tr-[30px] s1400:pt-[13px] s1400:pl-[20px] s1600:pt-4 s1600:pl-6">
                  <span>OO에 대해서 알려드릴게요!</span>
                </div>
                <div className="absolute bottom-0 left-0 s1400:w-[73px] s1400:h-[58px] s1600:w-[90px] s1600:h-[72px] bg-[#9DFF4D] s1400:rounded-b-[24px] s1600:rounded-b-[30px] s1400:rounded-tr-[24px] s1600:rounded-tr-[30px] flex justify-center items-center">
                  <div className="flex gap-[6px]">
                    <div className="rounded-full s1400:w-[5px] s1400:h-[5px] s1600:w-[6px] s1600:h-[6px] bg-[#2B2B2B]" />
                    <div className="rounded-full s1400:w-[5px] s1400:h-[5px] s1600:w-[6px] s1600:h-[6px] bg-[#2B2B2B]" />
                    <div className="rounded-full s1400:w-[5px] s1400:h-[5px] s1600:w-[6px] s1600:h-[6px] bg-[#2B2B2B]" />
                  </div>
                </div>
              </div>
            </div>

            {/* 다른 플랫폼 */}
            <div
              data-aos="fade-up"
              data-aos-delay="200"
              className="s1400:w-[324px] s1400:h-[356px] s1600:w-[400px] s1600:h-[440px] bg-white s1400:rounded-[20px] shadow-subFeature z-10"
            >
              <div className={`transition-opacity duration-300 ${fadeClass}`}>
                <img
                  src={platforms[currentPlatformIndex].logo}
                  alt={`${platforms[currentPlatformIndex].name} logo`}
                  className={`${platforms[currentPlatformIndex].className}`}
                />
              </div>
              <div className="s1400:ml-[34px] s1600:ml-[42px]">
                <p className="text-mainBlack font-[800] leading-[170%] s1400:text-[26px] s1600:text-[32px]">
                  with{' '}
                  <span className={`${platforms[currentPlatformIndex].color} ${textFadeClass}`}>
                    {platforms[currentPlatformIndex].name}
                  </span>
                </p>
                <div className="text-gray05 s1400:text-[14px] s1600:text-[16px] font-[400] leading-[170%] s1400:mt-[6px] s1600:mt-3">
                  <p>회의 서비스와 함께 더욱 편하게</p>
                  <p>비대면 회의를 진행하세요.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex gap-9">
            {/* 캘린더 */}
            <div
              data-aos="fade-up"
              data-aos-delay="400"
              className="s1400:w-[324px] s1400:h-[356px] s1600:w-[400px] s1600:h-[440px] bg-white rounded-[20px] shadow-subFeature z-10"
            >
              <img
                src={calendar}
                alt="calendar"
                className="s1400:w-[192px] s1600:w-[238px] s1400:mt-6 s1600:mt-[28px] mx-auto"
              />
              <div className="s1400:ml-[34px] s1600:ml-[42px] s1400:mt-6 s1600:mt-[27.7px]">
                <p className="text-mainBlack font-[800] leading-[170%] s1400:text-[26px] s1600:text-[32px]">
                  캘린더
                </p>
                <div className="text-gray05 s1400:text-[14px] s1600:text-[16px] font-[400] leading-[170%] s1400:mt-[6px] s1600:mt-3">
                  <p>정기적인 회의 일정을 등록하고</p>
                  <p>편리하게 관리하세요.</p>
                </div>
              </div>
            </div>

            {/* 회의록 공유 */}
            <div
              data-aos="fade-up"
              data-aos-delay="600"
              className="col-span-2 s1400:w-[694px] s1400:h-[356px] s1600:w-[856px] s1600:h-[440px] bg-white rounded-[20px] shadow-subFeature relative z-10"
            >
              <div className="s1400:ml-[36px] s1400:mt-[30px] s1600:ml-[42px] s1600:mt-[38px]">
                <p className="text-mainBlack font-[800] leading-[170%] s1400:text-[26px] s1600:text-[32px]">
                  회의록 공유
                </p>
                <div className="text-gray05 s1400:text-[14px] s1600:text-[16px] font-[400] leading-[170%] s1400:mt-[6px] s1600:mt-3">
                  <p>링크를 공유해서 사용자를 초대하고 회의를 진행하세요!</p>
                  <p>하나의 회의록을 함께 공유할 수 있어요.</p>
                </div>
              </div>
              <div className="bg-[#ECECEC] s1400:w-[359px] s1400:h-[131px] s1400:rounded-tl-[16px] s1400:rounded-br-[16px] s1600:w-[444px] s1600:h-[162px] s1600:rounded-tl-[20px] s1600:rounded-br-[20px] absolute bottom-0 right-0">
                <img
                  src={plane}
                  alt="plane"
                  className="s1400:w-[70px] s1400:h-[68px] s1600:w-[88px] s1600:h-[86px] absolute s1400:top-[-80px] s1600:top-[-104px] s1400:left-[-68px] s1600:left-[-83px]"
                />
                <div className="s1400:w-[143px] s1400:h-[50px] s1400:px-5 s1400:py-[10px] s1400:gap-[10px] s1600:w-[175px] s1600:h-[60px] s1600:px-6 s1600:py-3 s1600:gap-3 flex items-center bg-mainBlack s1400:rounded-[4px] s1600:rounded-[6px] s1400:mt-[24px] s1600:mt-[32px] s1400:ml-[26px] s1600:ml-9">
                  <img
                    src={link}
                    alt="link"
                    className="s1400:w-[24px] s1400:h-[24px] s1600:w-[30px] s1600:h-[30px]"
                  />
                  <span className="text-white s1400:text-[17px] s1600:text-[21px] font-[500] s1400:leading-[30px] s1600:leading-[36px]">
                    링크 복사
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="flex gap-9">
            {/* 회의록 수정 기능 */}
            <div
              data-aos="fade-up"
              data-aos-delay="800"
              className="col-span-2 s1400:w-[694px] s1400:h-[356px] s1600:w-[856px] s1600:h-[440px] bg-white rounded-[20px] shadow-subFeature relative z-10"
            >
              <div className="ml-[42px] mt-[38px]">
                <p className="text-mainBlack font-[800] leading-[170%] s1400:text-[26px] s1600:text-[32px]">
                  회의록 수정 기능
                </p>
                <div className="text-gray05 s1400:w-[235px] s1600:w-[232px] s1400:text-[14px] s1600:text-[16px] font-[400] leading-[170%] s1400:mt-[6px] s1600:mt-3">
                  <p>스크립트부터 한 줄 요약, TO DO</p>
                  <p>까지 원하는대로 수정 가능해요!</p>
                </div>
              </div>
              <div>
                <div className="s1400:w-[280px] s1400:h-[56px] s1600:w-[346px] s1600:h-[70px] bg-[#FFF2B5] s1400:rounded-[30px] s1600:rounded-[40px] s1400:py-[13px] s1600:py-4 flex absolute s1400:top-[54px] s1400:right-[38px] s1600:top-[58px] s1600:right-[42px]">
                  <span className="mx-auto text-[#AB942C] font-pretendard s1400:text-[15.5px] s1600:text-[19px] font-[600] leading-[200%]">
                    다음 회의까지 해야 할 일이 변경되었어!
                  </span>
                </div>
                <div className="absolute s1400:top-[100px] s1400:right-[72px] s1600:top-[126px] s1600:right-[82px] w-0 h-0 border border-t-[14px] border-t-[#FFF2B5] border-r-[16px] border-r-[#FFF2B5] border-l-[16px] border-l-transparent border-b-[14px] border-b-transparent" />
              </div>
              <div className="absolute s1400:top-[146px] s1400:right-[137px] s1600:top-[194px] s1600:right-[171px]">
                <ul className="list-inside list-disc text-[#666666] font-pretendard font-[700] s1400:text-[27px] s1600:text-[33px] leading-[200%]">
                  <li>
                    <span className="ml-[-16px]">회의 장소 예약</span>
                  </li>
                  <li>
                    <span className="ml-[-16px]">카드뉴스 제작</span>
                  </li>
                  <li>
                    <span className="ml-[-16px]">레퍼런</span>
                  </li>
                </ul>
              </div>
              <div className="absolute s1400:top-[173px] s1400:right-[136px] s1400:w-[156px] s1400:h-[3px] s1600:top-[225px] s1600:right-[165px] s1600:w-[197px] bg-[#666666] rounded-lg" />
              <div className="absolute s1400:top-[268px] s1400:right-[214px] s1400:w-[2px] s1400:h-[26px] s1600:top-[343px] s1600:right-[266px] s1600:w-[3px] s1600:h-[32px] bg-[#666666] rounded-lg" />
            </div>

            {/* 폴더로 정리 */}
            <div
              data-aos="fade-up"
              data-aos-delay="1000"
              className="s1400:w-[324px] s1400:h-[356px] s1600:w-[400px] s1600:h-[440px] bg-white rounded-[20px] shadow-subFeature z-10"
            >
              <img
                src={folder}
                alt="folder"
                className="s1400:w-[180px] s1400:h-[165px] s1400:mt-[36px] s1600:w-[221px] s1600:h-[202px] s1600:mt-[44px] mx-auto"
              />
              <div className="s1400:ml-[34px] s1400:mt-[30px] s1600:ml-[42px] s1600:mt-[36px]">
                <p className="text-mainBlack font-[800] leading-[170%] s1400:text-[26px] s1600:text-[32px]">
                  폴더로 정리
                </p>
                <div className="text-gray05 s1400:text-[14px] s1600:text-[16px] font-[400] leading-[170%] s1400:mt-[6px] s1600:mt-3">
                  <p>수많은 회의록을</p>
                  <p>폴더로 보기 좋게 정리해요.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </article>
  );
};
