import React from 'react';
import { useRecoilState } from 'recoil';
import SearchHistoryListState from '../recoil/searchHistory/atom';
import { SearchHistoryProps } from '../types/search';
import deleteImage from '../assets/images/delete-image.svg';

export default function SearchHistory({
  onHistoryKeywordClick,
}: SearchHistoryProps): JSX.Element {
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
      <div className="flex flex-col gap-6">
        <h3 className="text-xl font-bold">최근 검색어</h3>
        {searchHistoryList.length > 0 ? (
          <ul className="flex flex-col gap-5">
            {searchHistoryList
              .slice()
              .reverse() // 최근 순 정렬
              .slice(0, 5) // 최근 5개의 검색어 보여주기
              .map((item) => (
                <li key={item.id} className="flex justify-between">
                  <span
                    onClick={() => onHistoryKeywordClick(item.content)}
                    className="text-lg"
                  >
                    {item.content}
                  </span>
                  <button onClick={() => handleDelete(item.id)}>
                    <img src={deleteImage} alt="delete-image" />
                  </button>
                </li>
              ))}
          </ul>
        ) : (
          <div className="p-5">
            <span>{`검색 내역이 없습니다.`}</span>
          </div>
        )}
      </div>
    </>
  );
}
