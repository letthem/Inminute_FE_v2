import userMint from '@/assets/svgs/Note/userMint.svg';

const participants = ['심수연', '박상욱', '노태일', '유재인', '곽민우'];

export const ParticipantList = () => {
  return (
    <section className="mt-3 ml-12 mr-[120px]">
      <div className="inline-flex gap-y-[12px] flex-wrap whitespace-nowrap bg-gray02 rounded-[26px] px-[10px] py-[5px]">
        {participants.map((name, index) => (
          <div
            key={name}
            className={`flex items-center ${index !== participants.length - 1 ? 'mr-4' : ''}`}
          >
            <img src={userMint} alt="user icon" className="w-[20px] h-[20px] mr-[6px]" />
            <span className="text-[10px] font-bold leading-[20px]">{name}</span>
          </div>
        ))}
      </div>
    </section>
  );
};
