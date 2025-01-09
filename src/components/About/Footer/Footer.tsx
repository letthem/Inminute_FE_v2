import insta from '@/assets/svgs/About/insta.svg';
import github from '@/assets/svgs/About/github.svg';
import youtube from '@/assets/svgs/About/youtube.svg';
import { Link } from 'react-router-dom';

export const Footer = () => {
  return (
    // 링크들 추후 수정
    <article className="h-[204px] bg-sub2Black">
      <div className="flex mt-[61px] ml-[50px] items-center gap-[18px]">
        <Link to="https://www.instagram.com/inminute_official/" target="_blank">
          <img src={insta} alt="insta" className="w-[44px] h-[44px]" />
        </Link>
        <Link to="https://github.com/orgs/letthemon8on/repositories" target="_blank">
          <img src={github} alt="github" className="w-[44px] h-[44px]" />
        </Link>
        <Link to="https://www.youtube.com/watch?v=O1uQjc3hda8" target="_blank">
          <img src={youtube} alt="youtube" className="w-[44px] h-[44px]" />
        </Link>
      </div>
      <div className="ml-[50px] mt-[33px] flex text-gray05 font-pretendard text-[15px] font-[300] leading-[170%] gap-[18px]">
        <Link to="" target="_blank">
          <span>개인정보 처리방침</span>
        </Link>
        <span>|</span>
        <Link to="" target="_blank">
          <span>이용약관</span>
        </Link>
      </div>
    </article>
  );
};
