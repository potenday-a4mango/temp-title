import React from 'react';

export default function NoResult(): JSX.Element {
  return (
    <div className="text-xl font-bold">
      <span>{`검색 결과가 없습니다.`}</span>
    </div>
  );
}
