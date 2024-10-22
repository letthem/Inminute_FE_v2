export const SubFeature = () => {
  return (
    <article className="bg-bg">
      <div className="mx-[204px] mt-[262px] text-mainBlack text-[52px] font-[800] leading-[170%]">
        <p>인미닛에서는,</p>
        <p>이런 것도 할 수 있어요!</p>
      </div>
      <section className="mx-[204px] mt-[72px] mb-[384px]">
        <div className="flex flex-col gap-9">
          <div className="flex gap-9">
            <div className="col-span-2 w-[856px] h-[440px] bg-white rounded-[20px] shadow-subFeature">카드1</div>
            <div className="w-[400px] h-[440px] bg-white rounded-[20px] shadow-subFeature">카드2</div>
          </div>
          <div className="flex gap-9">
            <div className="w-[400px] h-[440px] bg-white rounded-[20px] shadow-subFeature">카드3</div>
            <div className="col-span-2 w-[856px] h-[440px] bg-white rounded-[20px] shadow-subFeature">카드4</div>
          </div>
          <div className="flex gap-9">
            <div className="col-span-2 w-[856px] h-[440px] bg-white rounded-[20px] shadow-subFeature">카드5</div>
            <div className="w-[400px] h-[440px] bg-white rounded-[20px] shadow-subFeature">카드6</div>
          </div>
        </div>
      </section>
    </article>
  );
};
