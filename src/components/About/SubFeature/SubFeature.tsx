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
      'w-[100px] h-[26px] mt-[40px] mb-[27px] s960:w-[285px] s960:h-[74px] s960:mt-[110px] s960:mb-[98px] s1400:w-[230px] s1400:h-[60px] s1400:mt-[90px] s1400:mb-[81px] s1600:w-[285px] s1600:h-[74px] s1600:mt-[110px] s1600:mb-[98px] mx-auto',
  },
  {
    logo: webex,
    name: 'WEBEX',
    color: 'text-[#22CDE4]',
    className:
      'w-[134px] h-[51px] mt-[26px] ml-[-2px] mb-4 s960:w-[364px] s960:h-[138px] s960:mt-[77px] s960:ml-1 s960:mb-[67px] s1400:w-[299px] s1400:h-[114px] s1400:mt-[64px] s1400:ml-0 s1400:mb-[53px] s1600:w-[364px] s1600:h-[138px] s1600:mt-[77px] s1600:ml-1 s1600:mb-[67px]',
  },
  {
    logo: googleMeet,
    name: 'MEET',
    color: 'text-[#4CBA6E]',
    className:
      'w-[133px] h-[25px] mt-10 mb-7 s960:w-[360px] s960:h-[70px] s960:mt-[114px] s960:mb-[98px] s1400:w-[290px] s1400:h-[56px] s1400:mt-[100px] s1400:mb-[75px] s1600:w-[360px] s1600:h-[70px] s1600:mt-[114px] s1600:mb-[98px] mx-auto',
  },
  {
    logo: microsoftTeams,
    name: 'TEAMS',
    color: 'text-[#6B73DE]',
    className:
      'w-[133px] h-[32.4px] mt-[38px] ml-1 mb-[22.8px] s960:w-[366px] s960:h-[89px] s960:mt-[104px] s960:ml-[10px] s960:mb-[89px] s1400:w-[300px] s1400:h-[73px] s1400:mt-[90px] s1400:ml-[9px] s1400:mb-[68px] s1600:w-[366px] s1600:h-[89px] s1600:mt-[104px] s1600:ml-[10px] s1600:mb-[89px]',
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
      <div className="flex justify-center mt-[112px] s960:mt-[285px] s1400:mt-[350px] s1600:mt-[246px] text-mainBlack text-[20px] s960:text-[52px] s1400:text-[42px] s1600:text-[52px] font-[800] leading-[170%]">
        <div className="flex flex-col w-[298px] s510:w-[453px] s960:w-[856px] s1400:w-[1046px] s1600:w-[1292px] z-10">
          <p>인미닛에서는,</p>
          <p>이런 것도 할 수 있어요!</p>
        </div>
      </div>
      <img
        src={helix}
        alt="helix"
        className="hidden s960:block s960:w-[371px] s960:h-[371px] s1400:w-[341px] s1400:h-[341px] s1600:w-[424px] s1600:h-[424px] s960:top-[245px] s960:right-[180px] s1400:top-[284px] s1400:right-[160px] s1600:top-[167px] s1600:right-[74px] absolute z-0"
      />
      <img
        src={spheres}
        alt="spheres"
        className="hidden s1600:block s1600:w-[380px] s1600:h-[380px] s1600:top-[1729px] s1600:left-[24px] absolute z-0"
      />
      <section className="flex justify-center mt-6 mb-[120px] s960:mt-[72px] s960:mb-[336px] s1400:mt-[58px] s1600:mt-[72px] s1600:mb-[384px]">
        {/* s510, s1400, s1600 */}
        <div className="hidden s510:flex s960:hidden s1400:flex flex-col gap-3 s1400:gap-[30px] s1600:gap-9">
          <div className="flex gap-3 s1400:gap-7 s1600:gap-9">
            {/* Q&A */}
            <div
              data-aos="fade-up"
              className="flex col-span-2 w-[298px] h-[154px] s1400:w-[694px] s1400:h-[356px] s1600:w-[856px] s1600:h-[440px] bg-white rounded-[8px] s1400:rounded-[20px] shadow-subFeature z-10"
            >
              <div className="ml-[14px] mt-[12px] s1400:ml-[34px] s1400:mt-[30px] s1600:ml-[42px] s1600:mt-[38px]">
                <p className="text-mainBlack font-[800] leading-[170%] text-[12px] s1400:text-[26px] s1600:text-[32px]">
                  Q&A
                </p>
                <div className="w-[116px] s1400:w-[203px] s1600:w-[232px] text-gray05 text-[8px] s1400:text-[14px] s1600:text-[16px] font-[400] leading-[170%] mt-[3px] s1400:mt-[6px] s1600:mt-3">
                  <p>회의록에 대해 궁금한 점이 있다면</p>
                  <p>질문해보세요.</p>
                </div>
              </div>
              <div className="relative ml-[-14px] s1400:ml-[41px] s1600:ml-[69px] mr-5 s1400:mr-10 s1600:mr-12 mt-[18px] s1400:mt-10 s1600:mt-12 mb-[15px] s1400:mb-[34px] s1600:mb-11 w-[162px] h-[121px] s1400:w-[376px] s1400:h-[282px] s1600:w-[465px] s1600:h-[348px] font-pretendard text-[8.5px] s1400:text-[19px] s1600:text-[24px] font-[500] leading-[170%]">
                <div className="absolute right-0 w-[58px] h-[25px] s1400:w-[135px] s1400:h-[58px] s1600:w-[167px] s1600:h-[72px] bg-[#E1FF4D] rounded-t-[10px] s1400:rounded-t-[24px] s1600:rounded-t-[30px] rounded-bl-[10px] s1400:rounded-bl-[24px] s1600:rounded-bl-[30px] pt-[5.5px] pl-[8.4px] s1400:pt-[13px] s1400:pl-[20px] s1600:pt-4 s1600:pl-6">
                  <span>OO에 대해서</span>
                </div>
                <div className="absolute top-[30px] s1400:top-[71px] s1600:top-[88px] right-0 w-[103px] h-[25px] s1400:w-[238px] s1400:h-[58px] s1600:w-[294px] s1600:h-[72px] bg-[#E1FF4D] rounded-t-[10px] s1400:rounded-t-[24px] s1600:rounded-t-[30px] rounded-bl-[10px] s1400:rounded-bl-[24px] s1600:rounded-bl-[30px] pt-[5.5px] pl-[8.7px] s1400:pt-[13px] s1400:pl-[20px] s1600:pt-4 s1600:pl-6">
                  <span>어떤 이야기들을 나눴었지?</span>
                </div>
                <div className="absolute top-[65.4px] s1400:top-[152px] s1600:top-[188px] left-0 w-[108px] h-[25px] s1400:w-[250px] s1400:h-[58px] s1600:w-[309px] s1600:h-[72px] bg-[#9DFF4D] rounded-b-[10px] s1400:rounded-b-[24px] s1600:rounded-b-[30px] rounded-tr-[10px] s1400:rounded-tr-[24px] s1600:rounded-tr-[30px] pt-[5.5px] pl-2 s1400:pt-[13px] s1400:pl-[20px] s1600:pt-4 s1600:pl-6">
                  <span>OO에 대해서 알려드릴게요!</span>
                </div>
                <div className="absolute bottom-0 left-0 w-[31.5px] h-[25px] s1400:w-[73px] s1400:h-[58px] s1600:w-[90px] s1600:h-[72px] bg-[#9DFF4D] rounded-b-[10px] s1400:rounded-b-[24px] s1600:rounded-b-[30px] rounded-tr-[10px] s1400:rounded-tr-[24px] s1600:rounded-tr-[30px] flex justify-center items-center">
                  <div className="flex gap-[2px] s1400:gap-[5px] s1600:gap-[6px]">
                    <div className="rounded-full w-[2px] h-[2px] s1400:w-[5px] s1400:h-[5px] s1600:w-[6px] s1600:h-[6px] bg-[#2B2B2B]" />
                    <div className="rounded-full w-[2px] h-[2px] s1400:w-[5px] s1400:h-[5px] s1600:w-[6px] s1600:h-[6px] bg-[#2B2B2B]" />
                    <div className="rounded-full w-[2px] h-[2px] s1400:w-[5px] s1400:h-[5px] s1600:w-[6px] s1600:h-[6px] bg-[#2B2B2B]" />
                  </div>
                </div>
              </div>
            </div>

            {/* 다른 플랫폼 */}
            <div
              data-aos="fade-up"
              data-aos-delay="200"
              className="w-[143px] h-[154px] s1400:w-[324px] s1400:h-[356px] s1600:w-[400px] s1600:h-[440px] bg-white rounded-[8px] s1400:rounded-[20px] shadow-subFeature z-10"
            >
              <div className={`transition-opacity duration-300 ${fadeClass}`}>
                <img
                  src={platforms[currentPlatformIndex].logo}
                  alt={`${platforms[currentPlatformIndex].name} logo`}
                  className={`${platforms[currentPlatformIndex].className}`}
                />
              </div>
              <div className="ml-[14px] s1400:ml-[34px] s1600:ml-[42px]">
                <p className="text-mainBlack font-[800] leading-[170%] text-[12px] s1400:text-[26px] s1600:text-[32px]">
                  with{' '}
                  <span className={`${platforms[currentPlatformIndex].color} ${textFadeClass}`}>
                    {platforms[currentPlatformIndex].name}
                  </span>
                </p>
                <div className="text-gray05 text-[8px] s1400:text-[14px] s1600:text-[16px] font-[400] leading-[170%] mt-[3px] s1400:mt-[6px] s1600:mt-3">
                  <p>회의 서비스와 함께 더욱 편하게</p>
                  <p>비대면 회의를 진행하세요.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex gap-3 s1400:gap-7 s1600:gap-9">
            {/* 캘린더 */}
            <div
              data-aos="fade-up"
              data-aos-delay="400"
              className="w-[143px] h-[154px] s1400:w-[324px] s1400:h-[356px] s1600:w-[400px] s1600:h-[440px] bg-white rounded-[8px] s1400:rounded-[20px] shadow-subFeature z-10"
            >
              <img
                src={calendar}
                alt="calendar"
                className="w-[80px] s1400:w-[192px] s1600:w-[238px] mt-[10px] s1400:mt-6 s1600:mt-[28px] mx-auto"
              />
              <div className="ml-[14px] s1400:ml-[34px] s1600:ml-[42px] mt-[7px] s1400:mt-6 s1600:mt-[27.7px]">
                <p className="text-mainBlack font-[800] leading-[170%] text-[12px] s1400:text-[26px] s1600:text-[32px]">
                  캘린더
                </p>
                <div className="text-gray05 text-[8px] s1400:text-[14px] s1600:text-[16px] font-[400] leading-[170%] s1400:mt-[6px] s1600:mt-3">
                  <p>정기적인 회의 일정을 등록하고</p>
                  <p>편리하게 관리하세요.</p>
                </div>
              </div>
            </div>

            {/* 회의록 공유 */}
            <div
              data-aos="fade-up"
              data-aos-delay="600"
              className="col-span-2 w-[298px] h-[154px] s1400:w-[694px] s1400:h-[356px] s1600:w-[856px] s1600:h-[440px] bg-white rounded-[8px] s1400:rounded-[20px] shadow-subFeature relative z-10"
            >
              <div className="ml-[14px] mt-3 s1400:ml-[36px] s1400:mt-[30px] s1600:ml-[42px] s1600:mt-[38px]">
                <p className="text-mainBlack font-[800] leading-[170%] text-[12px] s1400:text-[26px] s1600:text-[32px]">
                  회의록 공유
                </p>
                <div className="text-gray05 text-[8px] s1400:text-[14px] s1600:text-[16px] font-[400] leading-[170%] mt-[3px] s1400:mt-[6px] s1600:mt-3">
                  <p>링크를 공유해서 사용자를 초대하고 회의를 진행하세요!</p>
                  <p>하나의 회의록을 함께 공유할 수 있어요.</p>
                </div>
              </div>
              <div className="bg-[#ECECEC] w-[155px] h-[56px] s1400:w-[359px] s1400:h-[131px] rounded-tl-[8px] rounded-br-[8px] s1400:rounded-tl-[16px] s1400:rounded-br-[16px] s1600:w-[444px] s1600:h-[162px] s1600:rounded-tl-[20px] s1600:rounded-br-[20px] absolute bottom-0 right-0">
                <img
                  src={plane}
                  alt="plane"
                  className="w-7 h-7 s1400:w-[70px] s1400:h-[68px] s1600:w-[88px] s1600:h-[86px] absolute top-[-26px] left-[-30px] s1400:top-[-80px] s1400:left-[-68px] s1600:top-[-104px] s1600:left-[-83px]"
                />
                <div className="w-[61px] h-[21px] px-2 py-1 gap-1 s1400:w-[143px] s1400:h-[50px] s1400:px-5 s1400:py-[10px] s1400:gap-[10px] s1600:w-[175px] s1600:h-[60px] s1600:px-6 s1600:py-3 s1600:gap-3 flex items-center bg-mainBlack rounded-[2px] s1400:rounded-[4px] s1600:rounded-[6px] mt-[10px] s1400:mt-[24px] s1600:mt-[32px] ml-3 s1400:ml-[26px] s1600:ml-9">
                  <img
                    src={link}
                    alt="link"
                    className="w-[10px] h-[10px] s1400:w-[24px] s1400:h-[24px] s1600:w-[30px] s1600:h-[30px]"
                  />
                  <span className="text-white text-[7px] s1400:text-[17px] s1600:text-[21px] font-[500] leading-[12.5px] s1400:leading-[30px] s1600:leading-[36px]">
                    링크 복사
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex gap-3 s1400:gap-7 s1600:gap-9">
            {/* 회의록 수정 기능 */}
            <div
              data-aos="fade-up"
              data-aos-delay="800"
              className="col-span-2 w-[298px] h-[154px] s1400:w-[694px] s1400:h-[356px] s1600:w-[856px] s1600:h-[440px] bg-white rounded-[8px] s1400:rounded-[20px] shadow-subFeature relative z-10"
            >
              <div className="ml-[14px] mt-[93px] s1400:ml-[34px] s1400:mt-[30px] s1600:ml-[42px] s1600:mt-[38px]">
                <p className="text-mainBlack font-[800] leading-[170%] text-[12px] s1400:text-[26px] s1600:text-[32px]">
                  회의록 수정 기능
                </p>
                <div className="text-gray05 hidden s1400:block s1400:w-[235px] s1600:w-[232px] text-[8px] s1400:text-[14px] s1600:text-[16px] font-[400] leading-[170%] s1400:mt-[6px] s1600:mt-3">
                  <p>스크립트부터 한 줄 요약, TO DO</p>
                  <p>까지 원하는대로 수정 가능해요!</p>
                </div>
                <div className="text-gray05 block s1400:hidden text-[8px] font-[400] leading-[170%] mt-[3px]">
                  <p>스크립트부터 한 줄 요약,</p>
                  <p>TO DO까지 수정 가능해요!</p>
                </div>
              </div>
              <div>
                <div className="w-[128px] h-[24px] s1400:w-[280px] s1400:h-[56px] s1600:w-[346px] s1600:h-[70px] bg-[#FFF2B5] rounded-[14px] s1400:rounded-[30px] s1600:rounded-[40px] py-[5px] s1400:py-[13px] s1600:py-4 flex absolute top-4 right-4 s1400:top-[54px] s1400:right-[38px] s1600:top-[58px] s1600:right-[42px]">
                  <span className="mx-auto text-[#AB942C] font-pretendard text-[7px] s1400:text-[15.5px] s1600:text-[19px] font-[600] leading-[200%]">
                    다음 회의까지 해야 할 일이 변경되었어!
                  </span>
                </div>
                <div className="absolute top-[35px] right-[28px] s1400:top-[100px] s1400:right-[72px] s1600:top-[126px] s1600:right-[82px] w-0 h-0 border border-t-[8px] s1400:border-t-[14px] border-t-[#FFF2B5] border-r-[4px] s1400:border-r-[16px] border-r-[#FFF2B5] border-l-[8px] s1400:border-l-[16px] border-l-transparent border-b-[4px] s1400:border-b-[14px] border-b-transparent" />
              </div>
              <div className="absolute top-[53px] right-[68px] s1400:top-[146px] s1400:right-[137px] s1600:top-[194px] s1600:right-[171px]">
                <ul className="list-inside list-disc text-[#666666] font-pretendard font-[700] text-[11px] s1400:text-[27px] s1600:text-[33px] leading-[200%]">
                  <li>
                    <span className="ml-[-5px]">회의 장소 예약</span>
                  </li>
                  <li>
                    <span className="ml-[-5px]">카드뉴스 제작</span>
                  </li>
                  <li>
                    <span className="ml-[-5px]">레퍼런</span>
                  </li>
                </ul>
              </div>
              <div className="absolute top-[64px] right-[66px] s1400:top-[173px] s1400:right-[136px] w-[66px] h-[1px] s1400:w-[156px] s1400:h-[3px] s1600:top-[225px] s1600:right-[165px] s1600:w-[197px] bg-[#666666] rounded-lg" />
              <div className="absolute top-[103px] right-[100px] s1400:top-[268px] s1400:right-[214px] w-[1px] h-[10px] s1400:w-[2px] s1400:h-[26px] s1600:top-[343px] s1600:right-[266px] s1600:w-[3px] s1600:h-[32px] bg-[#666666] rounded-lg" />
            </div>

            {/* 폴더로 정리 */}
            <div
              data-aos="fade-up"
              data-aos-delay="1000"
              className="w-[143px] h-[154px] s1400:w-[324px] s1400:h-[356px] s1600:w-[400px] s1600:h-[440px] bg-white rounded-[8px] s1400:rounded-[20px] shadow-subFeature z-10"
            >
              <img
                src={folder}
                alt="folder"
                className="w-[77px] h-[71px] mt-[14px] s1400:w-[180px] s1400:h-[165px] s1400:mt-[36px] s1600:w-[221px] s1600:h-[202px] s1600:mt-[44px] mx-auto"
              />
              <div className="ml-[14px] mt-2 s1400:ml-[34px] s1400:mt-[30px] s1600:ml-[42px] s1600:mt-[36px]">
                <p className="text-mainBlack font-[800] leading-[170%] text-[12px] s1400:text-[26px] s1600:text-[32px]">
                  폴더로 정리
                </p>
                <div className="text-gray05 text-[8px] s1400:text-[14px] s1600:text-[16px] font-[400] leading-[170%] mt-[3px] s1400:mt-[6px] s1600:mt-3">
                  <p>수많은 회의록을</p>
                  <p>폴더로 보기 좋게 정리해요.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* -------------------------------------------------- */}
        {/* ph, s960 */}
        <div className="s510:hidden s960:flex s1400:hidden flex flex-col gap-3 s960:gap-9">
          <div className="flex gap-3 s960:gap-[37px]">
            {/* Q&A */}
            <div
              data-aos="fade-up"
              className="flex col-span-2 w-[298px] h-[154px] s960:w-[856px] s960:h-[440px] bg-white rounded-[8px] s960:rounded-[20px] shadow-subFeature z-10"
            >
              <div className="ml-[14px] mt-[12px] s960:ml-[42px] s960:mt-[38px]">
                <p className="text-mainBlack font-[800] leading-[170%] text-[12px] s960:text-[32px]">
                  Q&A
                </p>
                <div className="w-[116px] s960:w-[232px] text-gray05 text-[8px] s960:text-[16px] font-[400] leading-[170%] mt-[3px] s960:mt-3">
                  <p>회의록에 대해 궁금한 점이 있다면</p>
                  <p>질문해보세요.</p>
                </div>
              </div>
              <div className="relative ml-[-14px] mr-5 mt-[18px] mb-[15px] w-[162px] h-[121px] font-pretendard text-[8.5px] font-[500] leading-[170%] s960:w-[465px] s960:h-[348px] s960:mt-[48px] s960:mr-[48px] s960:ml-[69px] s960:mb-[44px] s960:text-[24px]">
                <div className="absolute right-0 w-[58px] h-[25px] s960:w-[167px] s960:h-[72px] bg-[#E1FF4D] rounded-t-[10px] rounded-bl-[10px] pt-[5.5px] pl-[8.4px] s960:rounded-t-[30px] s960:rounded-bl-[30px] s960:pt-4 s960:pl-6 ">
                  <span>OO에 대해서</span>
                </div>
                <div className="absolute top-[30px] s960:top-[88px] right-0 w-[103px] h-[25px] s960:w-[294px] s960:h-[72px] bg-[#E1FF4D] rounded-t-[10px] rounded-bl-[10px] pt-[5.5px] pl-[8.7px] s960:rounded-t-[30px] s960:rounded-bl-[30px] s960:pt-4 s960:pl-6 ">
                  <span>어떤 이야기들을 나눴었지?</span>
                </div>
                <div className="absolute top-[65.4px] left-0 w-[108px] h-[25px] s960:top-[188px] s960:w-[309px] s960:h-[72px] bg-[#9DFF4D] rounded-b-[10px] rounded-tr-[10px] pt-[5.5px] pl-2 s960:rounded-b-[30px] s960:rounded-tr-[30px] s960:pt-4 s960:pl-6">
                  <span>OO에 대해서 알려드릴게요!</span>
                </div>
                <div className="absolute bottom-0 left-0 w-[31.5px] h-[25px] s960:w-[90px] s960:h-[72px] bg-[#9DFF4D] rounded-b-[10px] rounded-tr-[10px] s960:rounded-b-[30px] s960:rounded-tr-[30px] flex justify-center items-center">
                  <div className="flex gap-[2px] s960:gap-[6px]">
                    <div className="rounded-full w-[2px] h-[2px] s960:w-[6px] s960:h-[6px] bg-[#2B2B2B]" />
                    <div className="rounded-full w-[2px] h-[2px] s960:w-[6px] s960:h-[6px] bg-[#2B2B2B]" />
                    <div className="rounded-full w-[2px] h-[2px] s960:w-[6px] s960:h-[6px] bg-[#2B2B2B]" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex gap-3 s960:gap-[37px]">
            {/* 다른 플랫폼 */}
            <div
              data-aos="fade-up"
              data-aos-delay="200"
              className="w-[143px] h-[154px] s960:w-[410px] s960:h-[440px] bg-white rounded-[8px] s960:rounded-[20px] shadow-subFeature z-10"
            >
              <div className={`transition-opacity duration-300 ${fadeClass}`}>
                <img
                  src={platforms[currentPlatformIndex].logo}
                  alt={`${platforms[currentPlatformIndex].name} logo`}
                  className={`${platforms[currentPlatformIndex].className}`}
                />
              </div>
              <div className="ml-[14px] s960:ml-[42px]">
                <p className="text-mainBlack font-[800] leading-[170%] text-[12px] s960:text-[32px]">
                  with{' '}
                  <span className={`${platforms[currentPlatformIndex].color} ${textFadeClass}`}>
                    {platforms[currentPlatformIndex].name}
                  </span>
                </p>
                <div className="text-gray05 text-[8px] font-[400] leading-[170%] mt-[3px] s960:text-[16px] s960:mt-3">
                  <p>회의 서비스와 함께 더욱 편하게</p>
                  <p>비대면 회의를 진행하세요.</p>
                </div>
              </div>
            </div>

            {/* 캘린더 */}
            <div
              data-aos="fade-up"
              data-aos-delay="400"
              className="w-[143px] h-[154px] s960:w-[410px] s960:h-[440px] bg-white rounded-[8px] s960:rounded-[20px] shadow-subFeature z-10"
            >
              <img
                src={calendar}
                alt="calendar"
                className="w-[80px] mt-[10px] s960:w-[238px] s960:mt-[28px] mx-auto"
              />
              <div className="ml-[14px] mt-[7px] s960:ml-[42px] s960:mt-[28px]">
                <p className="text-mainBlack font-[800] leading-[170%] text-[12px] s960:text-[32px]">
                  캘린더
                </p>
                <div className="text-gray05 text-[8px] font-[400] leading-[170%] s960:text-[16px] mt-[2px] s960:mt-3">
                  <p>정기적인 회의 일정을 등록하고</p>
                  <p>편리하게 관리하세요.</p>
                </div>
              </div>
            </div>
          </div>

          {/* 회의록 공유 */}
          <div
            data-aos="fade-up"
            data-aos-delay="600"
            className="col-span-2 w-[298px] h-[154px] s960:w-[856px] s960:h-[440px] bg-white rounded-[8px] s960:rounded-[20px] shadow-subFeature relative z-10"
          >
            <div className="ml-[14px] mt-3 s960:ml-[42px] s960:mt-[38px]">
              <p className="text-mainBlack font-[800] leading-[170%] text-[12px] s960:text-[32px]">
                회의록 공유
              </p>
              <div className="text-gray05 text-[8px] font-[400] leading-[170%] mt-[3px] s960:text-[16px] s960:mt-3">
                <p>링크를 공유해서 사용자를 초대하고 회의를 진행하세요!</p>
                <p>하나의 회의록을 함께 공유할 수 있어요.</p>
              </div>
            </div>
            <div className="bg-[#ECECEC] w-[155px] h-[56px] s960:w-[444px] s960:h-[162px] rounded-tl-[8px] rounded-br-[8px] s960:rounded-tl-[20px] s960:rounded-br-[20px] absolute bottom-0 right-0">
              <img
                src={plane}
                alt="plane"
                className="w-7 h-7 absolute top-[-26px] left-[-30px] s960:w-[88px] s960:h-[86px] s960:top-[-104px] s960:left-[-83px]"
              />
              <div className="w-[61px] h-[21px] px-2 py-1 gap-1 flex items-center bg-mainBlack rounded-[2px] mt-[10px] ml-3 s960:w-[175px] s960:h-[60px] s960:px-6 s960:py-3 s960:gap-3 s960:rounded-[6px] s960:mt-8 s960:ml-9">
                <img src={link} alt="link" className="w-[10px] h-[10px] s960:w-7 s960:h-7" />
                <span className="text-white text-[7px] s960:text-[21px] font-[500] leading-[12.5px] s960:leading-[36px]">
                  링크 복사
                </span>
              </div>
            </div>
          </div>
          <div className="flex gap-3 s960:gap-[37px]">
            {/* 회의록 수정 기능 */}
            <div
              data-aos="fade-up"
              data-aos-delay="800"
              className="col-span-2 w-[143px] h-[154px] s960:w-[410px] s960:h-[440px] bg-white rounded-[8px] s960:rounded-[20px] shadow-subFeature relative z-10"
            >
              <div className="ml-[14px] mt-[93px] s960:ml-[42px] s960:mt-[282px]">
                <p className="text-mainBlack font-[800] leading-[170%] text-[12px] s960:text-[32px]">
                  회의록 수정 기능
                </p>
                <div className="text-gray05 hidden s960:block text-[8px] font-[400] leading-[170%] s960:text-[16px] s960:mt-3">
                  <p>스크립트부터 한 줄 요약, TO DO</p>
                  <p>까지 원하는대로 수정 가능해요!</p>
                </div>
                <div className="text-gray05 block s960:hidden text-[8px] font-[400] leading-[170%] mt-[3px]">
                  <p>스크립트부터 한 줄 요약,</p>
                  <p>TO DO까지 수정 가능해요!</p>
                </div>
              </div>
              <div className="absolute top-[15px] right-[36.5px] s960:top-[46px] s960:right-[100px]">
                <ul className="list-inside list-disc text-[#666666] font-pretendard font-[700] text-[11px] s960:text-[33px] leading-[200%]">
                  <li>
                    <span className="ml-[-5px]">회의 장소 예약</span>
                  </li>
                  <li>
                    <span className="ml-[-5px]">카드뉴스 제작</span>
                  </li>
                  <li>
                    <span className="ml-[-5px]">레퍼런</span>
                  </li>
                </ul>
              </div>
              <div className="absolute top-[26px] right-[35px] s960:top-[78px] s960:right-[94px] w-[66px] h-[1px] s960:w-[197px] s960:h-[3px] bg-[#666666] rounded-lg" />
              <div className="absolute top-[65px] right-[68px] s960:top-[195px] s960:right-[196px] w-[1px] h-[10px] s960:w-[3px] s960:h-[32px] bg-[#666666] rounded-lg" />
            </div>

            {/* 폴더로 정리 */}
            <div
              data-aos="fade-up"
              data-aos-delay="1000"
              className="w-[143px] h-[154px] s960:w-[410px] s960:h-[440px] bg-white rounded-[8px] s960:rounded-[20px] shadow-subFeature z-10"
            >
              <img
                src={folder}
                alt="folder"
                className="w-[77px] h-[71px] mt-[14px] s960:w-[221px] s960:h-[203px] s960:mt-[44px] mx-auto"
              />
              <div className="ml-[14px] mt-2 s960:ml-[42px] s960:mt-[35px]">
                <p className="text-mainBlack font-[800] leading-[170%] text-[12px] s960:text-[32px]">
                  폴더로 정리
                </p>
                <div className="text-gray05 text-[8px] s960:text-[16px] font-[400] leading-[170%] mt-[3px] s960:mt-3">
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
