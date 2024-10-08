import { useNavigate } from 'react-router-dom';
import { FolderBar } from '@/components/FolderBar/FolderBar';
import leftBlack from '@/assets/webps/Note/leftBlack.webp';
import calendarBlack from '@/assets/webps/Note/calendarBlack.webp';
import timeBlack from '@/assets/webps/Note/timeBlack.webp';
import userMint from '@/assets/svgs/Note/userMint.svg';
import kebab from '@/assets/webps/Note/kebab.webp';
import chat from '@/assets/webps/Note/chat.webp';
import todo from '@/assets/webps/Note/todo.webp';
import todoMint from '@/assets/webps/Note/todoMint.webp';

export const NotePage = () => {
  const nav = useNavigate();

  return (
    <>
      <div className="w-screen h-screen flex flex-row bg-bg font-nanum leading-[22px]">
        <FolderBar />
        <main className="flex w-[calc(100vw-280px)] h-full">
          <div className="flex flex-1 flex-col">
            <section className="flex justify-between mt-10">
              <img
                src={leftBlack}
                alt="back button"
                className="w-[18px] h-[18px] cursor-pointer ml-9"
                onClick={() => nav(-1)}
              />
              <img
                src={kebab}
                alt="kebab menu"
                className="w-[18px] h-[18px] mr-[26px] px-2 cursor-pointer"
              />
            </section>

            <section className="flex flex-col">
              <p className="text-[26px] font-bold mt-[30px] ml-12 mr-[120px] leading-[30px]">
                브랜드 아이덴티티 전략 회의
              </p>

              <div className="flex ml-[49px] mt-2 items-center">
                <div className="flex items-center">
                  <img src={calendarBlack} alt="calendarBlack" className="w-[14px] h-[14px]" />
                  <span className="h-4 ml-[6px] text-[11px] font-medium leading-4">24.05.07</span>
                </div>
                <div className="ml-5 flex items-center">
                  <img src={timeBlack} alt="timeBlack" className="w-[14px] h-[14px]" />
                  <span className="h-4 ml-[6px] text-[11px] font-medium leading-4">1:19:05</span>
                </div>
              </div>
            </section>
            <div className="overflow-y-auto scrollbar-hide">
              <section className="mt-9 ml-12 mr-[120px] flex whitespace-nowrap">
                <span className="font-bold text-[15px] mr-6">참여자</span>
                <div className="flex flex-wrap whitespace-nowrap">
                  <div className="mr-4 flex items-center">
                    <img src={userMint} alt="user icon" className="w-[21px] h-[21px] mr-[6px]" />
                    <span className="text-[12px] font-bold">심수연</span>
                  </div>
                  <div className="mr-4 flex items-center">
                    <img src={userMint} alt="user icon" className="w-[21px] h-[21px] mr-[6px]" />
                    <span className="text-[12px] font-bold">박상욱</span>
                  </div>
                  <div className="mr-4 flex items-center">
                    <img src={userMint} alt="user icon" className="w-[21px] h-[21px] mr-[6px]" />
                    <span className="text-[12px] font-bold">노태일</span>
                  </div>
                  <div className="mr-4 flex items-center">
                    <img src={userMint} alt="user icon" className="w-[21px] h-[21px] mr-[6px]" />
                    <span className="text-[12px] font-bold">유재인</span>
                  </div>
                  <div className="mr-4 flex items-center">
                    <img src={userMint} alt="user icon" className="w-[21px] h-[21px] mr-[6px]" />
                    <span className="text-[12px] font-bold">곽민우</span>
                  </div>
                </div>
              </section>

              <section className="mt-8 ml-12">
                <span className="font-bold text-[15px] mr-6">회의 한 줄 요약</span>
                <div className="mt-3 mr-[120px] max-w-[760px] rounded-[10px] bg-[#ECECEC]">
                  <p className="font-normal text-[14px] font-pretendard leading-[25.2px] py-[15px] px-[18px]">
                    오프라인 마케팅 쪽은 이벤트와 프로모션에 집중하고 있는데 이번 주에 교체한
                    제품체험 이벤트는 생각보다 많은 고객이 참여하여 성공적으로 마무리 되었고 다음
                    달에 대형 쇼핑몰에서 팝업스토어를 운영할 예정이다
                  </p>
                </div>
              </section>

              <section className="ml-12 mt-[74px]">
                <div className="flex mb-5 items-center">
                  <img src={chat} alt="chat icon" className="w-5 h-5 mr-[6px]" />
                  <span className="font-bold">화자별 요약</span>
                </div>

                <div className="mt-5 flex">
                  <span className="min-w-10 font-extrabold text-[13px] mr-6">심수연</span>
                  <span className="font-pretendard font-normal text-[13px] leading-[23px] mr-[120px]">
                    브랜드 아이덴티티는 명확한 비전과 일관된 메시지가 중요하며, 고객 경험과
                    직접적으로 연결되어야 한다고 강조
                  </span>
                </div>
                <div className="mt-5 flex">
                  <span className="min-w-10 font-extrabold text-[13px] mr-6">박상욱</span>
                  <span className="font-pretendard font-normal text-[13px] leading-[23px] mr-[120px]">
                    고객 세분화를 기반으로 한 맞춤형 마케팅이 타겟 고객의 욕구에 부합하는 브랜드
                    메시지 전달에 필수적이라고 언급
                  </span>
                </div>
                <div className="mt-5 flex">
                  <span className="min-w-10 font-extrabold text-[13px] mr-6">노태일</span>
                  <span className="font-pretendard font-normal text-[13px] leading-[23px] mr-[120px]">
                    브랜드 인지도를 높이기 위해 간결하면서도 강렬한 비주얼 아이덴티티가 중요하다고
                    주장
                  </span>
                </div>
                <div className="mt-5 flex">
                  <span className="min-w-10 font-extrabold text-[13px] mr-6">유재인</span>
                  <span className="font-pretendard font-normal text-[13px] leading-[23px] mr-[120px]">
                    브랜드 철학이 제품에 일관되게 반영되어, 고객이 제품을 통해 브랜드 경험을
                    직관적으로 느껴야 한다고 강조
                  </span>
                </div>
                <div className="mt-5 flex">
                  <span className="min-w-10 font-extrabold text-[13px] mr-6">곽민우</span>
                  <span className="font-pretendard font-normal text-[13px] leading-[23px] mr-[120px]">
                    브랜드 가치를 소셜 미디어 등 디지털 채널을 통해 꾸준히 전달하는 것이 고객
                    접점에서의 브랜드 인식에 중요하다고 설명
                  </span>
                </div>
              </section>

              <section className="mt-[92px] ml-12">
                <div className="flex items-center">
                  <img src={todo} alt="todo icon" className="w-5 h-5 mr-[6px]" />
                  <span className="font-extrabold text-[15px]">TO DO</span>
                </div>

                <div className="flex flex-wrap mt-[28px] mb-[46px] mr-[120px]">
                  <div className="w-[200px] relative mr-[48px] mb-[40px]">
                    <img
                      src={todoMint}
                      alt="todo mint"
                      className="absolute top-[-12px] left-[92.5px] w-[15.5px] h-[22px] z-10"
                    />
                    <div className="bg-mainBlack rounded-[10px] flex flex-col">
                      <p className="font-bold text-white text-[13px] leading-[14px] mt-6 mb-6 mx-auto">
                        심수연
                      </p>
                      <ul className="text-white font-normal font-pretendard text-[12px] list-outside list-disc ml-8 mr-5 mb-[18px]">
                        <li>브랜딩 레퍼런스 찾기</li>
                        <li>카드뉴스 만들기</li>
                        <li>추후 프로젝트 이름 고민해오기</li>
                      </ul>
                    </div>
                  </div>

                  <div className="w-[200px] relative mr-[48px] mb-[40px]">
                    <img
                      src={todoMint}
                      alt="todo mint"
                      className="absolute top-[-12px] left-[92.5px] w-[15.5px] h-[22px] z-10"
                    />
                    <div className="bg-mainBlack rounded-[10px] flex flex-col">
                      <p className="font-bold text-white text-[13px] leading-[14px] mt-6 mb-6 mx-auto">
                        박상욱
                      </p>
                      <ul className="text-white font-normal font-pretendard text-[12px] list-outside list-disc ml-8 mr-5 mb-[18px]">
                        <li>브랜딩 레퍼런스 찾기</li>
                      </ul>
                    </div>
                  </div>
                  <div className="w-[200px] relative mr-[48px] mb-[40px]">
                    <img
                      src={todoMint}
                      alt="todo mint"
                      className="absolute top-[-12px] left-[92.5px] w-[15.5px] h-[22px] z-10"
                    />
                    <div className="bg-mainBlack rounded-[10px] flex flex-col">
                      <p className="font-bold text-white text-[13px] leading-[14px] mt-6 mb-6 mx-auto">
                        노태일
                      </p>
                      <ul className="text-white font-normal font-pretendard text-[12px] list-outside list-disc ml-8 mr-5 mb-[18px]">
                        <li>브랜딩 레퍼런스 찾기</li>
                        <li>카드뉴스 만들기</li>
                      </ul>
                    </div>
                  </div>
                  <div className="w-[200px] relative mr-[48px] mb-[40px]">
                    <img
                      src={todoMint}
                      alt="todo mint"
                      className="absolute top-[-12px] left-[92.5px] w-[15.5px] h-[22px] z-10"
                    />
                    <div className="bg-mainBlack rounded-[10px] flex flex-col">
                      <p className="font-bold text-white text-[13px] leading-[14px] mt-6 mb-6 mx-auto">
                        심수연
                      </p>
                      <ul className="text-white font-normal font-pretendard text-[12px] list-outside list-disc ml-8 mr-5 mb-[18px]">
                        <li>브랜딩 레퍼런스 찾기</li>
                        <li>카드뉴스 만들기</li>
                        <li>추후 프로젝트 이름 고민해오기</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </div>

          <aside className="w-[385px] border-l border-gray03">회의 스크립트</aside>
        </main>
      </div>
    </>
  );
};
