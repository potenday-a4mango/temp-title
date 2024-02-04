import React, { useCallback, useEffect, useState } from 'react';
import MainHeader from '../layouts/MainHeader';
import Card from '../components/Card';
import { CardItem } from '../types/home';
import { allProductGetApi } from '../api/maincard';
import { useRecoilState } from 'recoil';
import workCategoryListState from '../recoil/cardList/atom';

export default function Home(): JSX.Element {
  const [allWorkCardLists, setAllWorkCardLists] = useState<CardItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useRecoilState(
    workCategoryListState,
  );
  const [page, setPage] = useState(0);
  const [isLastPage, setIsLastPage] = useState(false);
  const pageSize = 6;
  const [animate, setAnimate] = useState(false);

  // API 호출
  const fetchData = useCallback(
    (page: number, size: number): Promise<void> => {
      return allProductGetApi(page, size)
        .then((res) => {
          let filteredItems = res.data.content;
          if (selectedCategory !== '' && selectedCategory !== '전체') {
            filteredItems = res.data.content.filter((item: CardItem) =>
              item.workCategoryList.includes(selectedCategory),
            );
          }
          setAllWorkCardLists((prevItems) => {
            // 중복되지 않는 아이템만 필터링
            const nonDuplicateItems = filteredItems.filter(
              (filteredItem: CardItem) =>
                !prevItems.some((prevItem) => prevItem.id === filteredItem.id),
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
            fetchData(nextPage, pageSize);
          }
        })
        .catch((error) => {
          console.error('Error fetching data:', error);
        });
    },
    [selectedCategory],
  );

  // 스크롤
  const handleScroll = useCallback((): void => {
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (!isLastPage && windowHeight + scrollTop >= documentHeight - 1) {
      const nextPage = page + 1;
      setPage(nextPage);
      fetchData(nextPage, pageSize);
    }
  }, [fetchData, pageSize, page, isLastPage]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);

  // 카테고리 선택 시, API 호출 (카테고리가 바뀌면 상태 초기화)
  useEffect(() => {
    setPage(0);
    setIsLastPage(false);
    window.scrollTo(0, 0);
    setAllWorkCardLists([]);
    fetchData(0, pageSize).then(() => {
      setAnimate(true);
      setTimeout(() => setAnimate(false), 500);
    });
  }, [selectedCategory, fetchData]);

  return (
    <div>
      <MainHeader />
      <div
        className={`grid grid-cols-custom-grid-2 justify-items-center gap-custom-gap-20 overflow-hidden p-5 ${animate ? 'fade-in' : ''}`}
      >
        {allWorkCardLists.map((item: CardItem) => (
          <div className="w-custom-card-image" key={item.id}>
            <Card cardItem={item} />
          </div>
        ))}
      </div>
      {isLastPage && <div className="h-[70px] w-full"></div>}
    </div>
  );
}
