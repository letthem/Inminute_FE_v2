import zoom from '@/assets/webps/Note/zoom.webp';
import webex from '@/assets/webps/Note/webex.webp';
import googleMeet from '@/assets/webps/Note/googleMeet.webp';
import microsoftTeams from '@/assets/webps/Note/microsoftTeams.webp';

interface PlatformModalProps {
  onClose: () => void;
}

export const PlatformModal: React.FC<PlatformModalProps> = ({ onClose }) => {
  // 모달 배경을 클릭하면 닫힘
  const handleBackgroundClick = () => {
    onClose();
  };

  // 모달 내부를 클릭하면 이벤트가 전파되지 않도록 함
  const handleModalClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  const platforms = [
    { src: zoom, alt: 'zoom', label: 'zoom' },
    { src: webex, alt: 'webex', label: 'webex' },
    { src: googleMeet, alt: 'google meet', label: 'google meet' },
    { src: microsoftTeams, alt: 'microsoft teams', label: 'microsoft teams' },
  ];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-mainBlack bg-opacity-40 font-nanum"
      onClick={handleBackgroundClick}
    >
      <div className="bg-white rounded-[40px] fixed flex justify-center items-center top-[32px] w-[418px] h-[38px]">
        <span className="text-mainBlack text-[12px] font-[700] leading-[22px]">
          플랫폼을 선택하여 회의를 생성하고, 링크 공유로 참여자를 초대하세요!
        </span>
      </div>
      <div
        className="bg-white w-[692px] h-[366px] rounded-[20px] relative flex flex-col"
        onClick={handleModalClick}
      >
        <h2 className="text-[#444] text-[18px] font-[700] leading-[24px] mx-auto mt-[40px]">
          회의를 진행할 플랫폼을 선택하세요
        </h2>
        <ul className="mt-9 mx-auto gap-3 flex">
          {platforms.map((platform, index) => (
            <li
              key={index}
              className="w-[140px] h-[150px] rounded-[20px] flex flex-col justify-center items-center cursor-pointer
              hover:bg-gray02"
              style={{ boxShadow: '0 0 0 1px #ECECEC inset' }}
            >
              <img className="w-[72px] h-[72px] mx-auto" src={platform.src} alt={platform.alt} />
              <span className="mt-4 text-[12px] font-[600] leading-[22px] text-mainBlack">
                {platform.label}
              </span>
            </li>
          ))}
        </ul>
        <div className="mt-[38px] mx-auto w-[59px] h-[46px] bg-gray03 rounded-[4px] flex justify-center items-center">
          <span className="text-white text-[14px] font-[500] leading-[22px]">확인</span>
        </div>
      </div>
    </div>
  );
};
