import React, { useEffect, useState } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { keywordSearchGetApi } from '../api/search';
import loadingState from '../recoil/loading/atom';
import { useLocation, useNavigate } from 'react-router-dom';
import { SearchCardItem } from '../types/search';
import SearchCard from '../components/SearchCard';
import resultFilterListState from '../recoil/resultList/atom';
import SearchHeader from '../layouts/SearchHeader';
import NoResult from '../components/NoResult';
import SearchResultCard from '../components/SearchResultCard';

export default function Result() {
  const [resultCardLists, setResultCardLists] = useState([]);
  const [displayedresultCardLists, setDisplayedresultCardLists] = useState<
    SearchCardItem[]
  >([]);

  const setLoading = useSetRecoilState(loadingState);
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state as { keyword: string };
  const [page, setPage] = useState(6);
  const pageSize = 1;
  const selectedFilter = useRecoilValue(resultFilterListState);
  const [animate, setAnimate] = useState(false);

  const fetchData = (): Promise<void> => {
    setLoading(true);
    if (state) {
      return keywordSearchGetApi(state.keyword)
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
          setLoading(false);
        });
    } else {
      return Promise.resolve();
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
    if (!state) {
      navigate('/wrong'); // state가 없는 경우 404 페이지로 리다이렉트
    } else {
      // 데이터를 가져온 후 애니메이션 실행
      fetchData().then(() => {
        setAnimate(true);
        setTimeout(() => setAnimate(false), 1000);
      });
    }
  }, [selectedFilter, setLoading, selectedFilter]);

  // pageSize씩 Card 렌더링
  useEffect(() => {
    const nextItems = resultCardLists.slice(0, page * pageSize);
    setDisplayedresultCardLists(nextItems);
  }, [resultCardLists, page]);

  return (
    <>
      {state && <SearchHeader keyword={state.keyword} />}{' '}
      <section className="p-5">
        {displayedresultCardLists.length > 0 ? (
          <ul
            className={`gap-custom-gap-20 grid-cols-custom-grid-2 grid justify-items-center ${animate ? 'fade-in' : ''}`}
          >
            {displayedresultCardLists.map((item: SearchCardItem) => (
              <SearchResultCard key={item.id} searchCardItem={item} />
            ))}
          </ul>
        ) : (
          <NoResult />
        )}
      </section>
    </>
  );
}
