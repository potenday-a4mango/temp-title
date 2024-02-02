// NotFound.tsx
import React from 'react';
import MainHeader from '../layouts/MainHeader';
import notFoundimage from '../assets/images/not-found-image.svg';

export default function NotFound() {
  return (
    <div>
      <MainHeader />
      <div className="mt-40 flex flex-col items-center justify-center gap-3">
        <h1 className="text-7xl font-bold">404</h1>
        <p className="text-lg">요청하신 페이지를 찾을 수 없습니다.</p>
      </div>
    </div>
  );
}
