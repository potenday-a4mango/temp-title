import { useEffect } from 'react';
import { allProductGetApi } from '../api/maincard';

export default function Home() {
  // TODO: 무한스크롤 넣기
  useEffect(() => {
    allProductGetApi(0, 8)
      .then((res) => {
        if (res.status === 200) {
          const newContent = res.data;
          console.log('API 호출 성공');
          console.log(newContent);
          console.log(newContent.content);
        } else {
          // API 응답이 성공하지 않은 경우에 대한 처리를 추가
          console.error('API 응답이 실패했습니다.');
        }
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <div>
      <h1>MAIN</h1>
    </div>
  );
}
