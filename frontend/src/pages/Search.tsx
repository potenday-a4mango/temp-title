import React, { useState, useEffect, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import SearchBar from '../components/SearchBar';
import SearchCard from '../components/SearchCard';
import SearchHistory from '../components/SearchHistory';
import NoResult from '../components/NoResult';
import { keywordSearchGetApi } from '../api/search';
import _ from 'lodash';
import { SearchCardItem } from '../types/search';
import { useRecoilState } from 'recoil';
import SearchHistoryListState from '../recoil/searchHistory/atom';

export default function Search(): JSX.Element {
  const location = useLocation();
  const state = location.state as { resultSearchKeyword: string };
  const [keyword, setKeyword] = useState(state?.resultSearchKeyword || '');
  const [searchedCardLists, setSearchedCardLists] = useState<SearchCardItem[]>(
    [],
  );
  const [searchHistoryList, setSearchHistoryList] = useRecoilState(
    SearchHistoryListState,
  );
  const [renderedItemsCount, setRenderedItemsCount] = useState(6);
  const disableSubmit =
    keyword.trim().length === 0 ||
    (keyword.trim().length > 0 && searchedCardLists.length === 0);

  const navigate = useNavigate();

  // 검색 내역 클릭 시, 해당 키워드로 검색
  const handleKeywordClick = (content: string) => {
    setKeyword(content);
  };

  const debouncedSearch = useCallback(
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

  // 검색어 제출 시, debouncedSearch 호출 & 검색 내역 저장
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (keyword.trim().length === 0) return;
    debouncedSearch(keyword);

    // 검색어를 localStorage에 저장
    setSearchHistoryList((prevHistoryList) => {
      const newHistoryList = [
        ...prevHistoryList,
        { id: Date.now(), content: keyword },
      ];

      // 검색어가 20개를 초과 시 - 가장 오래된 검색어부터 삭제
      if (newHistoryList.length > 20) {
        newHistoryList.shift();
      }

      return newHistoryList;
    });

    // state로 keyword 검색어 전달
    navigate('/result', { state: { keyword } });
  };

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop >=
      document.documentElement.offsetHeight - 50
    ) {
      setRenderedItemsCount((prevCount) => prevCount + 5);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    if (keyword.trim().length > 0) {
      debouncedSearch(keyword);
    }
  }, [keyword, debouncedSearch]);

  return (
    <>
      <SearchBar
        onSubmit={handleSearch}
        onKeywordChange={setKeyword}
        disableSubmit={disableSubmit}
        currentKeyword={keyword}
      />
      <section className="p-5">
        {keyword.trim().length > 0 ? (
          searchedCardLists.length > 0 ? (
            <ul className="flex flex-col gap-4">
              {searchedCardLists
                ?.slice(0, renderedItemsCount)
                .map((item: SearchCardItem) => (
                  <SearchCard key={item.id} searchCardItem={item} />
                ))}
            </ul>
          ) : (
            <NoResult />
          )
        ) : (
          <SearchHistory onHistoryKeywordClick={handleKeywordClick} />
        )}
      </section>
    </>
  );
}
