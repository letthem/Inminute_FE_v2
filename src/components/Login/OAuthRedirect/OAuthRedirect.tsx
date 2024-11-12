import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { instance } from '@/apis/Instance';
import note from '@/assets/webps/Main/noteMint.webp';

export const OAuthRedirect: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
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
        return;
      }

      if (code) {
        try {
          const response = await instance.post(`/auth/${provider}/sign-in?code=${code}`);
          console.log('good login:', response.data);

          navigate('/home');
        } catch (error) {
          console.error('Failed to exchange code for token', error);
        }
      }
    };

    fetchToken();
  }, [navigate]);

  return (
    <div className="bg-bg w-full h-[100vh] font-nanum text-[18px] text-subBlack flex flex-col gap-8 justify-center items-center">
      인미닛으로 들어가는 중 !
      <img src={note} alt="note" className="w-[147px] h-[154px]" />
    </div>
  );
};
