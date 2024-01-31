import React, { useEffect, useState } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { keywordSearchGetApi } from '../api/search';
import loadingState from '../recoil/loading/atom';
import { useLocation } from 'react-router-dom';
import { SearchCardItem } from '../types/search';
import SearchCard from '../components/SearchCard';
import resultFilterListState from '../recoil/resultList/atom';
import SearchHeader from '../layouts/SearchHeader';
import NoResult from '../components/NoResult';

export default function Result() {
  const [resultCardLists, setResultCardLists] = useState([]);
  const [displayedresultCardLists, setDisplayedresultCardLists] = useState<
    SearchCardItem[]
  >([]);

  const setLoading = useSetRecoilState(loadingState);
  const location = useLocation();
  const state = location.state as { keyword: string };
  const [page, setPage] = useState(1);
  const pageSize = 1;
  const selectedFilter = useRecoilValue(resultFilterListState);

  const fetchData = (): void => {
    // API 호출 전에 로딩 상태 true
    setLoading(true);

    if (state) {
      keywordSearchGetApi(state.keyword)
        .then((res) => {
          if (res.status === 200) {
            let filteredItems = res.data.content;
            if (selectedFilter !== 4) {
              filteredItems = filteredItems.filter((item: SearchCardItem) =>
                item.searchTypeList.includes(selectedFilter),
              );
            }
            setResultCardLists(filteredItems);
          } else {
            console.error('API 응답이 실패했습니다.');
          }
        })
        .catch((error) => {
          console.error('Error fetching data:', error);
        })
        .finally(() => {
          setLoading(false); // API 호출이 끝나면 로딩 상태를 false로 설정
        });
    }
  };

  // 스크롤
  const handleScroll = (): void => {
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (windowHeight + scrollTop >= documentHeight - 1) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // 카테고리 선택 시 & 로딩 상태값 변경 시, API 호출
  useEffect(() => {
    fetchData();
  }, [selectedFilter, setLoading]);

  // pageSize씩 Card 렌더링
  useEffect(() => {
    const nextItems = resultCardLists.slice(0, page * pageSize);
    setDisplayedresultCardLists(nextItems);
  }, [resultCardLists, page]);

  return (
    <>
      <SearchHeader keyword={state.keyword} />
      <div>
        {displayedresultCardLists.length > 0 ? (
          <ul>
            {displayedresultCardLists.map((item: SearchCardItem) => (
              <SearchCard key={item.id} searchCardItem={item} />
            ))}
          </ul>
        ) : (
          <NoResult />
        )}
      </div>
    </>
  );
}
