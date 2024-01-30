import React, { useState, useEffect, useCallback } from 'react';
import { keywordSearchGetApi } from '../api/search';
import SearchCard from './SearchCard';
import SearchHistory from './SearchHistory';
import NoResult from './NoResult';
import _ from 'lodash';
import { SearchCardItem } from '../types/home';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

export default function SearchBar(): JSX.Element {
  const [keyword, setKeyword] = useState('');
  const [searchedCardLists, setSearchedCardLists] = useState<SearchCardItem[]>(
    [],
  );

  // TODO: 검색 결과가 존재할 경우에만, 검색 제출 후 검색 결과 화면 이동
  const handleSerach = (e: React.FormEvent) => {
    e.preventDefault();
  };

  // debounce 적용 - keyword 변경 시, 500ms 이후 API 호출
  const debouncedSave = useCallback(
    _.debounce((nextKeyword) => {
      keywordSearchGetApi(nextKeyword)
        .then((res) => {
          if (res.status === 200) {
            const newContent = res.data.content;
            setSearchedCardLists(newContent);
          } else {
            console.error('API 응답이 실패했습니다.');
          }
        })
        .catch((error) => {
          console.error('Error fetching data:', error);
        });
    }, 500),
    [],
  );

  useEffect(() => {
    if (keyword.trim().length > 0) {
      // keyword가 변경될 때마다 debouncedSave 함수를 호출
      debouncedSave(keyword);
    }
  }, [keyword, debouncedSave]);

  // input value 값 변경
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
  };

  return (
    <>
      <form onSubmit={handleSerach}>
        <input
          type="text"
          placeholder="검색어를 입력해주세요."
          value={keyword}
          onChange={handleInputChange}
        />
        <button>
          <FontAwesomeIcon icon={faMagnifyingGlass as IconProp} />
        </button>
      </form>
      <section>
        <h3>실시간 검색 결과</h3>
        {keyword.trim().length > 0 ? (
          searchedCardLists.length > 0 ? (
            <ul>
              {searchedCardLists?.map((item: SearchCardItem) => (
                <SearchCard key={item.id} searchCardItem={item} />
              ))}
            </ul>
          ) : (
            <NoResult />
          )
        ) : (
          <SearchHistory />
        )}
      </section>
    </>
  );
}
