import demo from '@/assets/webps/About/demo.webp';

export const MainFeature = () => {
  return (
    <article className="flex relative bg-sub2Black">
      <img
        src={demo}
        alt="demo animation"
        className="max-w-[859.5px] max-h-[572.4px] ml-[129px] sticky top-[17%] transform translate-y-[0%]"
      />
      <section className="ml-[188.5px]">
        <div className="mt-[72px] mb-[484px]">
          <p className="leading-[76px] text-[40px] font-bold font-nanumv text-white">
            실시간 스크립트 작성
          </p>
          <div className="text-gray05 leading-[170%] text-[18px] font-[400] mt-[6px]">
            <p>모든 회의 내용을 실시간으로 기록해줘요.</p>
            <p>내가 한 말과 다르다면 수정할 수 있어요.</p>
          </div>
        </div>
        <div className="mt-[72px] mb-[484px]">
          <p className="leading-[76px] text-[40px] font-bold font-nanumv text-white">
            회의 한 줄 요약
          </p>
          <div className="text-gray05 leading-[170%] text-[18px] font-[400] mt-[6px]">
            <p>회의 전체 내용을 한 줄로 깔끔하게 정리해드려요.</p>
            <p>수정하고 싶다면 자유롭게 편집할 수 있어요.</p>
          </div>
        </div>
        <div className="mt-[72px] mb-[484px]">
          <p className="leading-[76px] text-[40px] font-bold font-nanumv text-white">화자별 요약</p>
          <div className="text-gray05 leading-[170%] text-[18px] font-[400] mt-[6px]">
            <p>AI가 발언 내용을 화자별로 요약해줘요.</p>
            <p>팀원의 의견이 어땠는지 확인해보세요.</p>
          </div>
        </div>
        <div className="mt-[72px] mb-[616px]">
          <p className="leading-[76px] text-[40px] font-bold font-nanumv text-white">TO DO</p>
          <div className="text-gray05 leading-[170%] text-[18px] font-[400] mt-[6px]">
            <p>회의 참여자별 해야 할 일을 </p>
            <p>메모지로 간편하게 확인하고 체크해요 !</p>
          </div>
        </div>
      </section>
    </article>
  );
};
