import React from 'react';
import { CATEGORY } from '../constants/category';
import { useRecoilState } from 'recoil';
import workCategoryListState from '../recoil/cardList/atom';
import { ACTIVE_BTN_STYLES, UNACTIVE_BTN_STYLES } from '../constants/styles';

export default function Category(): JSX.Element {
  const [selectedCategory, setSelectedCategory] = useRecoilState(
    workCategoryListState,
  ); // 작품카테고리 상태관리

  const selectWorkCategory = (category: string) => {
    setSelectedCategory(category);
  };

  return (
    <>
      <ul className="flex h-16 flex-row items-center justify-start gap-x-2 bg-white px-5 py-1.5">
        {CATEGORY.map((item: string) => (
          <li
            key={item}
            onClick={() => selectWorkCategory(item)}
            className={
              selectedCategory === item
                ? ACTIVE_BTN_STYLES
                : UNACTIVE_BTN_STYLES
            }
          >
            {item}
          </li>
        ))}
      </ul>
    </>
  );
}
