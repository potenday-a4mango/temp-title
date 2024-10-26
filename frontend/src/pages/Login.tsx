import { useNavigate } from 'react-router-dom';
import { ReactComponent as MainCharacter } from '../assets/images/main-character.svg';
import { ReactComponent as KakaoLogin } from '../assets/images/kakao-login.svg';
import BackHeader from '../layouts/BackHeader';

const Login: React.FC = () => {
  const navigate = useNavigate();

  const handleKakaoLogin = (): void => {
    const REST_API_KEY: string | undefined =
      process.env.REACT_APP_KAKAO_REST_API_KEY;
    const REDIRECT_URI: string | undefined =
      process.env.REACT_APP_KAKAO_REDIRECT_URI;

    if (!REST_API_KEY || !REDIRECT_URI) {
      console.error('Kakao REST_API_KEY or REDIRECT_URI 가 정의되어있지 않음!');
      return;
    }

    const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}`;

    window.location.href = KAKAO_AUTH_URL;
  };

  return (
    <div className="flex min-h-screen flex-col">
      <BackHeader />
      <div className="flex flex-grow flex-col">
        {/* 이미지 & 메세지 부분 */}
        <div className="flex flex-grow flex-col items-center justify-center gap-3">
          <MainCharacter />
          <h2 className="mb-6 text-center text-lg font-bold">
            간편하게 로그인하고
            <br />
            다양한 서비스를 이용해보세요
          </h2>
        </div>

        {/* 하단 약관 부분 */}
        <div className="mb-16 flex flex-col items-center">
          <KakaoLogin
            onClick={handleKakaoLogin}
            className="mb-4 h-16 w-64 cursor-pointer"
          />
          <div className="flex flex-col text-center text-sm text-custom-text-middle-gray">
            <div>로그인함으로써 인툰포켓 정책 및 약관에 동의합니다.</div>
            <div className="mt-2 flex justify-center gap-5 text-center">
              <a href="/terms" className="hover:text-gray-800 hover:underline">
                이용약관
              </a>
              <div className="h-4 border-l border-gray-400"></div>
              <a
                href="/privacy"
                className="hover:text-gray-800 hover:underline"
              >
                개인정보 수집 및 이용 동의서
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
