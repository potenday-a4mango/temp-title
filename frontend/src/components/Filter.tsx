import React from 'react';
import { useRecoilState } from 'recoil';
import { FILTER } from '../constants/category';
import resultFilterListState from '../recoil/resultList/atom';
import { ACTIVE_BTN_STYLES, UNACTIVE_BTN_STYLES } from '../constants/styles';

export default function Filter(): JSX.Element {
  const [selectedFilter, setSelectedFilter] = useRecoilState(
    resultFilterListState,
  ); // 결과 필터 상태관리

  const selectWorkCategory = (filter: number) => {
    setSelectedFilter(filter);
  };

  return (
    <>
      <ul className="bg-custom-semi-black h-custom-height-58 flex items-center gap-2 overflow-x-auto whitespace-nowrap border-b-2 border-black px-5 py-1.5">
        {FILTER.map((item) => (
          <li
            key={item.id}
            onClick={() => selectWorkCategory(item.id)}
            className={
              selectedFilter === item.id
                ? ACTIVE_BTN_STYLES
                : UNACTIVE_BTN_STYLES
            }
          >
            {item.content}
          </li>
        ))}
      </ul>
    </>
  );
}
