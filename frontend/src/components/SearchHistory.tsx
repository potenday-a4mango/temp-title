import React from 'react';
import { useRecoilState } from 'recoil';
import SearchHistoryListState from '../recoil/searchHistory/atom';
import { SearchHistoryProps } from '../types/search';

export default function SearchHistory({
  onHistoryKeywordClick,
}: SearchHistoryProps) {
  // Recoil 상태 읽어오기
  const [searchHistoryList, setSearchHistoryList] = useRecoilState(
    SearchHistoryListState,
  );

  // 검색 내역 삭제 함수
  const handleDelete = (id: number) => {
    setSearchHistoryList((prevHistoryList) =>
      prevHistoryList.filter((item) => item.id !== id),
    );
  };

  return (
    <>
      <div>
        <h3>검색 내역</h3>
        {searchHistoryList.length > 0 ? (
          <ul>
            {searchHistoryList
              .slice()
              .reverse() // 최근 순 정렬
              .slice(0, 5) // 최근 5개의 검색어 보여주기
              .map((item) => (
                <li key={item.id}>
                  <span onClick={() => onHistoryKeywordClick(item.content)}>
                    {item.content}
                  </span>
                  <button onClick={() => handleDelete(item.id)}>삭제</button>
                </li>
              ))}
          </ul>
        ) : (
          <div>{`검색 내역이 없습니다.`}</div>
        )}
      </div>
    </>
  );
}
