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
import useResetFiltering from '../hooks/useResetFiltering';

export default function Search(): JSX.Element {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state as { resultSearchKeyword: string };
  const [keyword, setKeyword] = useState(state?.resultSearchKeyword || '');
  const [searchedCardLists, setSearchedCardLists] = useState<SearchCardItem[]>(
    [],
  );
  const [searchHistoryList, setSearchHistoryList] = useRecoilState(
    SearchHistoryListState,
  );
  const [page, setPage] = useState(0);
  const pageSize = 6;
  const [isLastPage, setIsLastPage] = useState(false);
  const disableSubmit =
    keyword.trim().length === 0 ||
    (keyword.trim().length > 0 && searchedCardLists.length === 0);

  const resetFiltering = useResetFiltering();

  const debouncedSearch = useCallback(
    _.debounce((nextKeyword, page: number, size: number) => {
      keywordSearchGetApi(nextKeyword, page, size)
        .then((res) => {
          if (res.status === 200) {
            const newContent = res.data.content;
            setSearchedCardLists((prevItems) => [...prevItems, ...newContent]);

            if (res.data.last) {
              setIsLastPage(true);
              return;
            }
          } else {
            console.error('API 응답이 실패했습니다.');
          }
        })
        .catch((error) => {
          console.error('Error fetching data:', error);
        });
    }, 1000),
    [],
  );

  const onKeywordChange = (nextKeyword: string) => {
    setKeyword(nextKeyword);
    setPage(0);
    setIsLastPage(false);
    setSearchedCardLists([]);
    if (nextKeyword.trim().length > 0) {
      debouncedSearch(nextKeyword.trim(), 0, pageSize);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();

    if (keyword.trim().length === 0) return;

    setSearchHistoryList((prevHistoryList) => {
      const newHistoryList = [
        ...prevHistoryList,
        { id: Date.now(), content: keyword },
      ];

      if (newHistoryList.length > 20) {
        newHistoryList.shift();
      }

      return newHistoryList;
    });

    resetFiltering();

    navigate('/result', { state: { keyword } });
  };

  const handleKeywordClick = (keyword: string) => {
    resetFiltering();
    navigate('/result', { state: { keyword } });
  };

  const handleScroll = useCallback((): void => {
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (!isLastPage && windowHeight + scrollTop >= documentHeight - 1) {
      const nextPage = page + 1;
      setPage(nextPage);
      debouncedSearch(keyword, nextPage, pageSize);
    }
  }, [debouncedSearch, pageSize, page, isLastPage, keyword]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);

  useEffect(() => {
    if (state?.resultSearchKeyword) {
      onKeywordChange(state.resultSearchKeyword);
    }
  }, [state]);

  return (
    <>
      <SearchBar
        onSubmit={handleSearch}
        onKeywordChange={onKeywordChange}
        disableSubmit={disableSubmit}
        currentKeyword={keyword}
      />
      <section className="p-5">
        {keyword.trim().length > 0 ? (
          searchedCardLists.length > 0 ? (
            <ul className="flex flex-col gap-4">
              {searchedCardLists.map((item: SearchCardItem) => (
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
