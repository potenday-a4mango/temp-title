import React from 'react';
import { useRecoilValue } from 'recoil';
import loadingState from '../recoil/loading/atom';

export default function LoadingScreen(): JSX.Element | null {
  const isLoading = useRecoilValue(loadingState);

  if (!isLoading) {
    return null;
  }

  return (
    // TODO: style, img 수정하기
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        zIndex: 9999,
      }}
    >
      {/* <img src="/path/to/loading-image.png" alt="Loading" /> */}
    </div>
  );
}
