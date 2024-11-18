interface SummaryBySpeakerItemProps {
  name: string;
  summary: string;
}

export const SummaryBySpeakerItem: React.FC<SummaryBySpeakerItemProps> = ({ name, summary }) => {
  return (
    <div className="mt-3 flex">
      <span className="break-keep font-extrabold text-[13.5px] mr-6 leading-[23px]">{name}</span>
      <span className="font-pretendard font-[350] text-[13.5px] leading-[23px] mr-[120px]">
        {summary}
      </span>
    </div>
  );
};
