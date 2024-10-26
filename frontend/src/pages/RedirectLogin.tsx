import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Login } from '../api/login';
import { LoginResponse } from '../types/api';

const RedirectLogin = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const code = new URLSearchParams(location.search).get('code');
    console.log('인가 코드:', code); // 인가 코드가 제대로 오는지 확인

    if (code) {
      Login(code)
        .then((data: LoginResponse) => {
          const { accessToken } = data;
          localStorage.setItem('accessToken', accessToken); // 엑세스 토큰 받으면 저장
          navigate('/'); // 로그인 후 메인 페이지로 이동
        })
        .catch((error) => {
          console.error('로그인 실패:', error);
        });
    }
  }, [location, navigate]);

  return <div>로그인 중입니다. 잠시만 기다려 주세요...</div>;
};

export default RedirectLogin;
