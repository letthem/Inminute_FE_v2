import logout from '@/assets/webps/FolderBar/logout.webp';

export const Logout = () => {
  return (
    <section className="flex-none pt-[120px] pb-9">
      <div className="inline-flex h-[38px] ml-6 px-4 py-2 items-center cursor-pointer rounded-[10px] hover:bg-mainBlack">
        <img className="w-5 h-5 mr-[8px]" src={logout} alt="logout" />
        <span className="font-light text-[14px] w-[54px] text-white active:scale-95">로그아웃</span>
      </div>
    </section>
  );
};
