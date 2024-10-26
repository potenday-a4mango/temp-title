import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ReactComponent as BackArrowImg } from '../assets/images/back-arrow.svg';

export default function BackArrow(): JSX.Element {
  const location = useLocation();
  const navigate = useNavigate();
  const goBack = () => {
    if (location.pathname === '/result') {
      navigate('/search');
    } else {
      navigate('/');
    }
  };

  return (
    <div className="h-custom-height-60 items-center bg-transparent px-5 py-4">
      <button onClick={goBack}>
        <BackArrowImg />
      </button>
    </div>
  );
}
