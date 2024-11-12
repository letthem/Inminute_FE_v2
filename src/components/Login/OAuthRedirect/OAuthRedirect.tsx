import { instance } from '@/apis/Instance';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

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

  return <div>로그인 처리 중...</div>;
};
