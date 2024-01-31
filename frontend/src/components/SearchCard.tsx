import React from 'react';
import { HashTagItem } from '../types/home';
import { SearchCardItem } from '../types/search';
import HashTag from './HashTag';
import { countPostApi } from '../api/maincard';
// import { InstagramEmbed } from 'react-social-media-embed';

export default function SearchCard({
  searchCardItem,
}: {
  searchCardItem: SearchCardItem;
}): JSX.Element {
  // img 복사 방지
  const preventImgClick = (
    e: React.MouseEvent<HTMLImageElement, MouseEvent> &
      React.DragEvent<HTMLImageElement>,
  ) => {
    e.preventDefault();
  };

  // TODO: 논의) 인스타그램 이동 함수
  const handleMoveInsta = async (
    url: string,
    workId: number,
  ): Promise<void> => {
    // countPostApi 에 요청이 성공한 후 링크 이동
    try {
      const response = await countPostApi(workId);
      if (response.status === 200) {
        window.location.href = url;
      } else {
        console.error('API 응답이 실패했습니다.');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <>
      <div
        onClick={() => handleMoveInsta(searchCardItem.url, searchCardItem.id)}
      >
        <div>
          <div>
            {/* TODO: style 차후 수정*/}
            {/* TODO: 인스타 임베드 or 이미지 사진 보여주기 논의 */}

            <img
              src={searchCardItem.imageUrl}
              onContextMenu={preventImgClick}
              onDragStart={preventImgClick}
              width="250px"
            />

            {/* <div>
              <InstagramEmbed url={searchCardItem.url} width="350px" />
            </div> */}
          </div>
          <div>
            <h5>{searchCardItem.authorName}</h5>
            <h5>{`@${searchCardItem.authorInstargramId}`}</h5>
            <ul>
              {searchCardItem.subjectList.map(
                (item: HashTagItem, idx: number) => (
                  <HashTag key={idx} hashTagItem={item} />
                ),
              )}
            </ul>
          </div>
        </div>
      </div>
      {/* TODO: style 차후 수정 */}
      <br />
      <hr />
    </>
  );
}
