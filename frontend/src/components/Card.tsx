import React from 'react';
import { CardItem, HashTagItem } from '../types/home';
import HashTag from './HashTag';
// import { InstagramEmbed } from 'react-social-media-embed';
import { countPostApi } from '../api/maincard';

export default function Card({
  cardItem,
}: {
  cardItem: CardItem;
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
      {/* TODO: style 차후 수정 / loading 화면 넣기 */}
      <div onClick={() => handleMoveInsta(cardItem.workUrl, cardItem.id)}>
        <div>
          <div>
            {/* TODO: 인스타 임베드 or 이미지 사진 보여주기 논의 */}
            <img
              src={cardItem.imageUrl}
              onContextMenu={preventImgClick}
              onDragStart={preventImgClick}
              width="250px"
            />
            {/* <div>
              <InstagramEmbed url={cardItem.workUrl} width="350px" />
            </div> */}
          </div>
          <div>
            <h5>{cardItem.authorName}</h5>
            <h5>{`${cardItem.count}회`}</h5>
          </div>
          <h5>{`@${cardItem.instargramId}`}</h5>
          <ul>
            {cardItem.workSubjectList.map((item: HashTagItem, idx: number) => (
              <HashTag key={idx} hashTagItem={item} />
            ))}
          </ul>
        </div>
      </div>
      {/* TODO: style 차후 수정 */}
      <br />
      <hr />
    </>
  );
}
