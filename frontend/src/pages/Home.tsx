import React, { useEffect, useState } from 'react';
import { allProductGetApi } from '../api/maincard';
import { useRecoilValue } from 'recoil';
import workCategoryListState from '../recoil/cardList/atom';
import Card from '../components/Card';
import { CardItem } from '../types/home';

export default function Home(): JSX.Element {
  const [allWorkCardLists, setAllWorkCardLists] = useState<CardItem[]>([]);
  const [displayedCardLists, setDisplayedCardLists] = useState<CardItem[]>([]);
  const selectedCategory = useRecoilValue(workCategoryListState);
  const [page, setPage] = useState(1);
  const pageSize = 2;

  // API 호출
  const fetchData = () => {
    allProductGetApi()
      .then((res) => {
        if (res.status === 200) {
          const newContent = res.data;
          let filteredItems = newContent.content;
          if (selectedCategory !== '' && selectedCategory !== '전체') {
            filteredItems = newContent.content.filter((item: CardItem) =>
              item.workCategoryList.includes(selectedCategory),
            );
          }
          setAllWorkCardLists(filteredItems);
        } else {
          console.error('API 응답이 실패했습니다.');
        }
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  };

  // 스크롤
  const handleScroll = () => {
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

  // 카테고리 선택 시, API 호출
  useEffect(() => {
    fetchData();
  }, [selectedCategory]);

  // pageSize씩 Card 렌더링
  useEffect(() => {
    const nextItems = allWorkCardLists.slice(0, page * pageSize);
    setDisplayedCardLists(nextItems);
  }, [allWorkCardLists, page]);

  return (
    <div>
      <h1>MAIN</h1>
      <ul>
        {displayedCardLists.map((item: CardItem) => (
          <Card key={item.id} cardItem={item} />
        ))}
      </ul>
    </div>
  );
}
