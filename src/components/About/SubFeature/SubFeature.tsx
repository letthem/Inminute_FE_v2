import zoom from '@/assets/webps/About/zoom.webp';
import calendar from '@/assets/webps/About/calendar.webp';

export const SubFeature = () => {
  return (
    <article className="bg-bg leading-[170%]">
      <div className="flex justify-center mt-[262px] text-mainBlack text-[52px] font-[800] leading-[170%]">
        <div className="flex flex-col w-[1292px]">
          <p>인미닛에서는,</p>
          <p>이런 것도 할 수 있어요!</p>
        </div>
      </div>
      <section className="flex justify-center mt-[72px] mb-[384px]">
        <div className="flex flex-col gap-9">
          <div className="flex gap-9">
            <div className="flex col-span-2 w-[856px] h-[440px] bg-white rounded-[20px] shadow-subFeature">
              <div className="ml-[42px] mt-[38px]">
                <p className="text-mainBlack font-[800] leading-[170%] text-[32px]">Q&A</p>
                <div className="text-gray05 text-[16px] font-[400] leading-[170%] mt-3">
                  <p>회의록에 대해 궁금한 점이 있다면</p>
                  <p>질문해보세요.</p>
                </div>
              </div>
              <div className="ml-[69px] mr-12 mt-12 mb-11 w-[465px] h-[348px] relative font-pretendard text-[24px] font-[500] leading-[170%]">
                <div className="absolute right-0 w-[167px] h-[72px] bg-[#E1FF4D] rounded-t-[30px] rounded-bl-[30px] pt-4 pl-6">
                  <span>OO에 대해서</span>
                </div>
                <div className="absolute top-[88px] right-0 w-[294px] h-[72px] bg-[#E1FF4D] rounded-t-[30px] rounded-bl-[30px] pt-4 pl-6">
                  <span>어떤 이야기들을 나눴었지?</span>
                </div>
                <div className="absolute top-[188px] left-0 w-[309px] h-[72px] bg-[#9DFF4D] rounded-t-[30px] rounded-bl-[30px] pt-4 pl-6">
                  <span>OO에 대해서 알려드릴게요!</span>
                </div>
                <div className="absolute bottom-0 left-0 w-[90px] h-[72px] bg-[#9DFF4D] rounded-t-[30px] rounded-bl-[30px] pt-[33px] pl-[30px]">
                  <div className="flex gap-[6px]">
                    <div className="rounded-full w-[6px] h-[6px] bg-[#2B2B2B]" />
                    <div className="rounded-full w-[6px] h-[6px] bg-[#2B2B2B]" />
                    <div className="rounded-full w-[6px] h-[6px] bg-[#2B2B2B]" />
                  </div>
                </div>
              </div>
            </div>
            <div className="w-[400px] h-[440px] bg-white rounded-[20px] shadow-subFeature">
              <img src={zoom} alt="zoom logo" className="w-[285px] h-[74px] mt-[110px] mx-auto" />
              <div className="ml-[42px] mt-[98px]">
                <p className="text-mainBlack font-[800] leading-[170%] text-[32px]">ZOOM과 연동</p>
                <div className="text-gray05 text-[16px] font-[400] leading-[170%] mt-3">
                  <p>zoom과 함께 더욱 편하게</p>
                  <p>비대면 회의를 진행하세요.</p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex gap-9">
            <div className="w-[400px] h-[440px] bg-white rounded-[20px] shadow-subFeature">
              <img src={calendar} alt="calendar" className="w-[238px] mt-[28px] mx-auto" />
              <div className="ml-[42px] mt-[27.7px]">
                <p className="text-mainBlack font-[800] leading-[170%] text-[32px]">캘린더</p>
                <div className="text-gray05 text-[16px] font-[400] leading-[170%] mt-3">
                  <p>정기적인 회의 일정을 등록하고</p>
                  <p>편리하게 관리하세요.</p>
                </div>
              </div>
            </div>
            <div className="col-span-2 w-[856px] h-[440px] bg-white rounded-[20px] shadow-subFeature">
              카드4
            </div>
          </div>
          <div className="flex gap-9">
            <div className="col-span-2 w-[856px] h-[440px] bg-white rounded-[20px] shadow-subFeature">
              카드5
            </div>
            <div className="w-[400px] h-[440px] bg-white rounded-[20px] shadow-subFeature">
              카드6
            </div>
          </div>
        </div>
      </section>
    </article>
  );
};
