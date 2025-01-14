import { getMemberInfo } from '@/apis/Member/getMemberInfo';
import logo from '@/assets/webps/Layout/logo.webp';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const Logo = () => {
  const [username, setUsername] = useState('');
  const nav = useNavigate();
  const fetchMemberInfo = async () => {
    const data = await getMemberInfo(); // 에러 처리 필요 없음
    setUsername(data.result.nickname); // 에러 발생 시 이 줄은 실행되지 않음
  };

  useEffect(() => {
    fetchMemberInfo();
  }, []);

  return (
    <section className="flex-none">
      <img
        onClick={() => nav('/home')}
        className="w-[208px] mt-[47px] ml-[36px] cursor-pointer"
        src={logo}
        alt="logo"
      />
      <p className="ml-9 mt-6 font-medium text-[16px] text-white">
        <span className="font-extrabold text-main04">
          {username}
          <span className="font-normal"> </span>
        </span>
        님의 회의공간
      </p>
      <div className="w-[216px] h-[1px] ml-8 mt-5 bg-gray06" />
    </section>
  );
};
