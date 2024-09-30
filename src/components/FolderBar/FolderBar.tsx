import logo from '@/assets/webps/Layout/logo.webp';
import folder from '@/assets/webps/FolderBar/folder.webp';
import down from '@/assets/webps/FolderBar/down.webp';
import note from '@/assets/webps/FolderBar/note.webp';
import logout from '@/assets/webps/FolderBar/logout.webp';

export const FolderBar = () => {
  return (
    <aside>
      <div className="w-[280px] h-full bg-subBlack flex flex-col justify-between font-nanum leading-[22px]">
        <section>
          <img className="w-[214px] mt-[47px] ml-[36px]" src={logo} alt="logo" />
          <p className="ml-9 mt-7 font-medium text-[17px] text-white">
            <span className="font-extrabold text-main04">
              수연<span className="font-normal"> </span>
            </span>
            님의 회의공간
          </p>
          <div className="w-[216px] h-[1.5px] ml-8 mt-6 bg-gray07" />
          <div className="mt-6 flex items-center">
            <img className="w-5 h-5 ml-8 mr-2" src={folder} alt="folder" />
            <span className="mr-[10px] font-bold text-[14px] text-white cursor-pointer">학교</span>
            <img className="w-5 h-5 cursor-pointer" src={down} alt="down" />
          </div>
          <div className="mt-5 ml-[52px] flex items-center">
            <img className="w-5 h-5 mr-[10px]" src={note} alt="note" />
            <span className="font-[350] text-[14px] text-white cursor-pointer">해커톤 정기회의 2차</span>
          </div>
          <div className="mt-5 ml-[52px] flex items-center">
            <img className="w-5 h-5 mr-[10px]" src={note} alt="note" />
            <span className="font-[350] text-[14px] text-white cursor-pointer">플로우 회의</span>
          </div>
          <div className="mt-6 flex items-center">
            <img className="w-5 h-5 ml-8 mr-2" src={folder} alt="folder" />
            <span className="mr-[10px] font-bold text-[14px] text-white cursor-pointer">직장</span>
            <img className="w-5 h-5 cursor-pointer" src={down} alt="down" />
          </div>
          <div className="mt-5 ml-[52px] flex items-center">
            <img className="w-5 h-5 mr-[10px]" src={note} alt="note" />
            <span className="font-[350] text-[14px] text-white cursor-pointer">브랜드 아이덴티티 전략 회의</span>
          </div>
          <div className="mt-6 ml-8 flex items-center">
            <img className="w-5 h-5 mr-[10px]" src={note} alt="note" />
            <span className="font-[350] text-[14px] text-white cursor-pointer">TF팀 회의</span>
          </div>
          <div className="mt-6 ml-8 flex items-center">
            <img className="w-5 h-5 mr-[10px]" src={note} alt="note" />
            <span className="font-[350] text-[14px] text-white cursor-pointer">해커톤 정기회의 3차</span>
          </div>
          <div className="mt-6 ml-8 flex items-center">
            <img className="w-5 h-5 mr-[10px]" src={note} alt="note" />
            <span className="font-[350] text-[14px] text-white cursor-pointer">업무 역할 분배</span>
          </div>
          <div className="mt-6 ml-8 flex items-center">
            <img className="w-5 h-5 mr-[10px]" src={folder} alt="new folder" />
            <span className="font-[350] text-[14px] text-black01">새 폴더</span>
          </div>
        </section>
        <section>
          <div className="mb-9 ml-8 flex items-center">
            <img className="w-5 h-5 mr-[10px]" src={logout} alt="logout" />
            <span className="font-light text-[14px] text-white cursor-pointer">로그아웃</span>
          </div>
        </section>
      </div>
    </aside>
  );
};
