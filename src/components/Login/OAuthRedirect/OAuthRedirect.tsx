import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { instance } from '@/apis/Instance';
import note from '@/assets/webps/Main/noteMint.webp';
import { getMemberInfo } from '@/apis/Member/getMemberInfo';

export const OAuthRedirect: React.FC = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const fetchToken = async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');

    let provider = '';
    if (window.location.pathname.includes('google')) {
      provider = 'google';
    } else if (window.location.pathname.includes('kakao')) {
      provider = 'kakao';
    } else if (window.location.pathname.includes('naver')) {
      provider = 'naver';
    } else {
      console.error('Unsupported provider');
      setIsLoading(false);
      return;
    }

    if (code) {
      try {
        await instance.post(`/auth/${provider}/sign-in?code=${code}`);

        // GET 요청으로 회원 정보 확인
        const memberInfo = await getMemberInfo();
        const redirectUuid = localStorage.getItem('redirectUuid');
        if (redirectUuid) {
          localStorage.setItem('redirectUuid', redirectUuid);
        }

        if (memberInfo?.result.isFirst) {
          localStorage.setItem('isFirst', 'true');
          navigate('/join');
        } else {
          localStorage.removeItem('isFirst');
          // 기존 유저인 경우 원래 가려고 했던 페이지로 이동
          if (redirectUuid) {
            navigate(`/note/${redirectUuid}`);
            localStorage.removeItem('redirectUuid');
          } else {
            navigate('/home');
          }
        }
      } catch (error) {
        console.error('Failed to exchange code for token', error);
        navigate('/');
      } finally {
        setIsLoading(false); // 로딩 종료
      }
    }
  };

  useEffect(() => {
    fetchToken();
  }, [navigate]);

  if (isLoading) {
    // 로딩 중에는 인미닛 로딩 화면 표시
    return (
      <div className="bg-sub2Black w-full h-[100vh] font-nanum text-[18px] text-gray04 flex flex-col gap-8 justify-center items-center">
        인미닛으로 들어가는 중 !
        <img src={note} alt="note" className="w-[147px] h-[154px]" />
      </div>
    );
  }

  // 로딩이 끝나면 화면 전환
  return null;
};
