interface SocialLoginButtonProps {
  imgSrc: string;
  altText: string;
  text: string;
  marginLeft: string;
}

export const SocialLoginButton: React.FC<SocialLoginButtonProps> = ({
  imgSrc,
  altText,
  text,
  marginLeft,
}) => {
  return (
    <div className="flex bg-gray01 rounded-[40px] w-[409px] h-[64px] mt-[16px] items-center cursor-pointer">
      <img src={imgSrc} alt={altText} className="w-9 h-9 ml-6" />
      <span style={{ marginLeft }} className={`text-[16px] leading-[22px] font-[500]`}>
        {text}
      </span>
    </div>
  );
};
