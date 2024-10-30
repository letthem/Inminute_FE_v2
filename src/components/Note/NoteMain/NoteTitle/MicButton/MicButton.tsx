import micWhite from '@/assets/webps/Note/micWhite.webp';

export const MicButton = () => {
  return (
    <div className="absolute cursor-pointer w-[100px] h-[84px] bg-gray02 hover:bg-main02 group rounded-[50px] flex justify-center items-center top-[-39px] left-1/2 transform -translate-x-1/2">
      <div className="cursor-pointer w-[76px] h-[64px] rounded-[50px] bg-gray05 group-hover:bg-main06 flex justify-center items-center">
        <img className="w-[32px] h-[32px]" src={micWhite} alt="mic white" />
      </div>
    </div>
  );
};
