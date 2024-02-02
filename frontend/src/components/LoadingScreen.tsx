import React, { useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import loadingState from '../recoil/loading/atom';
import loadingGif from '../assets/images/loading-image.gif';

export default function LoadingScreen(): JSX.Element | null {
  const isLoading = useRecoilValue(loadingState);

  useEffect(() => {
    if (isLoading) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isLoading]);

  if (!isLoading) {
    return null;
  }

  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center bg-gray-700 bg-opacity-50">
      <img className="size-32" src={loadingGif} alt="loading-image" />
    </div>
  );
}
