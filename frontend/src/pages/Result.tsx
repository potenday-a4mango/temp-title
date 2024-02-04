import React, { useCallback, useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { keywordSearchGetApi } from '../api/search';
import loadingState from '../recoil/loading/atom';
import { useLocation, useNavigate } from 'react-router-dom';
import { SearchCardItem } from '../types/search';
import resultFilterListState from '../recoil/resultList/atom';
import SearchHeader from '../layouts/SearchHeader';
import NoResult from '../components/NoResult';
import SearchResultCard from '../components/SearchResultCard';

export default function Result(): JSX.Element {
  const [resultCardLists, setResultCardLists] = useState<SearchCardItem[]>([]);
  const [selectedFilter, setSelectedFilter] = useRecoilState(
    resultFilterListState,
  );
  const setLoading = useSetRecoilState(loadingState);
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state as { keyword: string };
  const [page, setPage] = useState(0);
  const [isLastPage, setIsLastPage] = useState(false);
  const pageSize = 6;
  const [animate, setAnimate] = useState(false);

  // API 호출
  const fetchData = (
    keyword: string,
    page: number,
    size: number,
  ): Promise<void> => {
    setLoading(true);
    if (state && keyword.trim().length > 0) {
      return keywordSearchGetApi(keyword, page, size)
        .then((res) => {
          if (res.status === 200) {
            let filteredItems = res.data.content;
            if (selectedFilter !== 4) {
              filteredItems = filteredItems.filter((item: SearchCardItem) =>
                item.searchTypeList.includes(selectedFilter),
              );
            }

            setResultCardLists((prevItems) => {
              // 중복되지 않는 아이템만 필터링
              const nonDuplicateItems = filteredItems.filter(
                (filteredItem: SearchCardItem) =>
                  !prevItems.some(
                    (prevItem) => prevItem.id === filteredItem.id,
                  ),
              );

              // 중복되지 않는 아이템을 prevItems에 추가
              return [...prevItems, ...nonDuplicateItems];
            });

            // 마지막 페이지라면 상태 업데이트(API 호출 멈춰!)
            if (res.data.last) {
              setIsLastPage(true);
              return;
            }

            // 만약 필터된 아이템의 개수가 6개 이하 & 마지막 데이터가 X 경우
            if (filteredItems.length < 6 && !res.data.last) {
              const nextPage = page + 1;
              fetchData(keyword, nextPage, pageSize);
            }
          } else {
            console.error('API 응답이 실패했습니다.');
          }
        })
        .catch((error) => {
          console.error('Error fetching data:', error);
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      return Promise.resolve();
    }
  };

  // 스크롤
  const handleScroll = useCallback((): void => {
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (!isLastPage && windowHeight + scrollTop >= documentHeight - 1) {
      const nextPage = page + 1;
      setPage(nextPage);
      fetchData(state.keyword, nextPage, pageSize);
    }
  }, [fetchData, pageSize, page, isLastPage]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);

  // 필터 선택 시 & 로딩 상태값 변경 시, API 호출
  useEffect(() => {
    if (!state) {
      navigate('/wrong'); // state가 없는 경우 404 페이지로 리다이렉트
    } else {
      setPage(0);
      setIsLastPage(false); // 카테고리가 바뀌면 상태 초기화
      window.scrollTo(0, 0);
      setResultCardLists([]);
      fetchData(state.keyword, 0, pageSize).then(() => {
        setAnimate(true);
        setTimeout(() => setAnimate(false), 500);
      });
    }
  }, [selectedFilter, setLoading, selectedFilter]);

  return (
    <>
      {state && <SearchHeader keyword={state.keyword} />}{' '}
      <section className="p-5">
        {resultCardLists.length > 0 ? (
          <div>
            <ul
              className={`grid grid-cols-custom-grid-2 justify-items-center gap-custom-gap-20 ${animate ? 'fade-in' : ''}`}
            >
              {resultCardLists.map((item: SearchCardItem) => (
                <SearchResultCard key={item.id} searchCardItem={item} />
              ))}
            </ul>
            {isLastPage && <div className="h-[70px] w-full"></div>}
          </div>
        ) : (
          <NoResult />
        )}
      </section>
    </>
  );
}
