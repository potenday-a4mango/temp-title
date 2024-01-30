import React, { useState } from 'react';
import { CATEGORY } from '../constants/category';
import { useRecoilState } from 'recoil';
import workCategoryListState from '../recoil/cardList/atom';

export default function Category(): JSX.Element {
  const [selectedCategory, setSelectedCategory] = useRecoilState(
    workCategoryListState,
  ); // 작품카테고리 상태관리

  const selectWorkCategory = (category: string) => {
    setSelectedCategory(category);
  };

  return (
    <>
      <h1>Category</h1>
      <ul>
        {CATEGORY.map((item: string) => (
          <li key={item} onClick={() => selectWorkCategory(item)}>
            {item}
          </li>
        ))}
      </ul>
    </>
  );
}
