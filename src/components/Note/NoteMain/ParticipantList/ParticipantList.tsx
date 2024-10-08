import userMint from '@/assets/svgs/Note/userMint.svg';

const participants = ['심수연', '박상욱', '노태일', '유재인', '곽민우'];

export const ParticipantList = () => {
  return (
    <section className="mt-[28px] ml-12 mr-[120px] flex whitespace-nowrap">
      <span className="font-bold text-[15px] mr-6">참여자</span>

      <div className="flex flex-wrap whitespace-nowrap">
        {participants.map((name) => (
          <div key={name} className="mr-4 flex items-center mb-3">
            <img src={userMint} alt="user icon" className="w-[21px] h-[21px] mr-[6px]" />
            <span className="text-[12px] font-bold">{name}</span>
          </div>
        ))}
      </div>
    </section>
  );
};
