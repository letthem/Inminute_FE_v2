import { SocialLoginButton } from '@/components/Login/SocialLoginButton/SocialLoginButton';
import note from '@/assets/webps/Login/note.webp';
import logoBlack from '@/assets/webps/Login/logoBlack.webp';
import google from '@/assets/webps/Login/google.webp';
import kakao from '@/assets/webps/Login/kakao.webp';
import naver from '@/assets/webps/Login/naver.webp';

export const LoginPage = () => {
  const handleSocialLogin = (provider: string) => {
    if (provider === 'google') {
      const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
      const redirectUri = encodeURIComponent(import.meta.env.VITE_GOOGLE_REDIRECT_URI);
      const googleLoginUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&scope=email profile`;
      window.location.href = googleLoginUrl;
    } else if (provider === 'kakao') {
      const clientId = import.meta.env.VITE_KAKAO_CLIENT_ID;
      const redirectUri = encodeURIComponent(import.meta.env.VITE_KAKAO_REDIRECT_URI);
      const kakaoLoginUrl = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}`;
      window.location.href = kakaoLoginUrl;
    } else return;
  };

  return (
    <div className="w-full h-screen bg-sub2Black flex justify-center items-center">
      <div className="bg-white w-[522px] h-[442px] rounded-[20px] relative flex flex-col items-center">
        <img src={note} alt="note" className="w-[108.6px] absolute top-[-78px] left-[210px]" />
        <img src={logoBlack} alt="logo" className="w-[240px] h-[45.52px] mt-[72px]" />

        <div className="mt-12 font-pretendard">
          <SocialLoginButton
            imgSrc={google}
            altText="google login"
            text="구글로 시작하기"
            marginLeft="93px"
            onClick={() => handleSocialLogin('google')}
          />
          <SocialLoginButton
            imgSrc={kakao}
            altText="kakao login"
            text="카카오로 시작하기"
            marginLeft="86px"
            onClick={() => handleSocialLogin('kakao')}
          />
          <SocialLoginButton
            imgSrc={naver}
            altText="naver login"
            text="네이버로 시작하기"
            marginLeft="86px"
            onClick={() => handleSocialLogin('naver')}
          />
        </div>
      </div>
    </div>
  );
};
