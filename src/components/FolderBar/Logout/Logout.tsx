import { useNavigate } from 'react-router-dom';
import { logout } from '@/apis/Member/logout';
import logoutIcon from '@/assets/webps/FolderBar/logout.webp';

export const Logout = () => {
  const nav = useNavigate();

  const handleLogout = async () => {
    await logout(); // 여기서는 에러 처리를 하지 않음
    nav('/'); // about 페이지로 이동
  };

  return (
    <section className="flex-none pt-[120px] pb-9">
      <div
        onClick={handleLogout}
        className="inline-flex h-[38px] ml-6 px-4 py-2 items-center cursor-pointer rounded-[10px] hover:bg-mainBlack"
      >
        <img className="w-5 h-5 mr-[8px]" src={logoutIcon} alt="logout" />
        <span className="font-light text-[14px] w-[54px] text-white active:scale-95">로그아웃</span>
      </div>
    </section>
  );
};
