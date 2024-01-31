import React from 'react';

export default function Onboarding(): JSX.Element {
  return (
    // TODO: style 변경, 효과 추가
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        // backgroundImage: `url(${onboardingImage})`,
        backgroundColor: '#D0E933',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    ></div>
  );
}
