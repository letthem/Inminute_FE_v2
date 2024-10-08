interface SummaryBySpeakerItemProps {
  name: string;
  summary: string;
}

export const SummaryBySpeakerItem: React.FC<SummaryBySpeakerItemProps> = ({ name, summary }) => {
  return (
    <div className="mt-3 flex">
      <span className="min-w-10 font-extrabold text-[13px] mr-6">{name}</span>
      <span className="font-pretendard font-normal text-[13px] leading-[23px] mr-[120px]">
        {summary}
      </span>
    </div>
  );
};
