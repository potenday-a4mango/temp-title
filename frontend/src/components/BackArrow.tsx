import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import backArrow from '../assets/images/back-arrow.svg';

export default function BackArrow(): JSX.Element {
  const location = useLocation();
  const navigate = useNavigate();
  const goBack = () => {
    if (location.pathname === '/result') {
      navigate('/search');
    } else if (location.pathname === '/search') {
      navigate('/');
    }
  };

  return (
    <div className="bg-custom-green h-custom-height-60 items-center px-5 py-4">
      <button onClick={goBack}>
        <img src={backArrow} alt="back-arrow" />
      </button>
    </div>
  );
}