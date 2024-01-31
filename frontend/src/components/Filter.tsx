import React from 'react';
import { useRecoilState } from 'recoil';
import { FILTER } from '../constants/category';
import resultFilterListState from '../recoil/resultList/atom';

export default function Filter(): JSX.Element {
  const [selectedFilter, setSelectedFilter] = useRecoilState(
    resultFilterListState,
  ); // 결과 필터 상태관리

  const selectWorkCategory = (filter: number) => {
    setSelectedFilter(filter);
  };

  return (
    <>
      <h1>Category</h1>
      <ul>
        {FILTER.map((item) => (
          <li key={item.id} onClick={() => selectWorkCategory(item.id)}>
            {item.content}
          </li>
        ))}
      </ul>
    </>
  );
}
