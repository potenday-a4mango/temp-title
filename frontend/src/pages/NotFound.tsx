// NotFound.tsx
import React from 'react';
import MainHeader from '../layouts/MainHeader';

export default function NotFound() {
  return (
    <div>
      <MainHeader />
      <div className="flex flex-col items-center justify-center gap-3 mt-40">
        <h1 className="font-bold text-7xl">404</h1>
        <p className="text-lg">요청하신 페이지를 찾을 수 없습니다.</p>
      </div>
    </div>
  );
}
