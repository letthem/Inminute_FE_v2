import micWhite from '@/assets/webps/Note/micWhite.webp';

interface MicButtonProps {
  isRecording: boolean; // 녹음 상태
  onToggleRecording: () => void; // 녹음 시작/종료 핸들러
}

export const MicButton: React.FC<MicButtonProps> = ({ isRecording, onToggleRecording }) => {
  return (
    <div
      onClick={onToggleRecording}
      className="absolute flex justify-center items-center group w-[110px] h-[95px] top-[-50px] left-1/2 transform -translate-x-[50%]"
    >
      <div
        className={`absolute cursor-pointer w-[100px] h-[84px] rounded-[50px] flex justify-center items-center 
          ${isRecording ? 'bg-main02' : 'bg-gray02 group-hover:bg-main02'}`}
        style={{
          animation: isRecording ? 'pulse 1s infinite' : 'none',
          zIndex: 1,
          transformOrigin: 'center',
        }}
      ></div>
      <div
        className={`absolute cursor-pointer w-[76px] h-[64px] rounded-[50px] flex justify-center items-center
          ${isRecording ? 'bg-main06' : 'bg-gray05 group-hover:bg-main06'}`}
        style={{ zIndex: 2 }}
      >
        <img className="w-[32px] h-[32px]" src={micWhite} alt="mic white" />
      </div>
    </div>
  );
};
