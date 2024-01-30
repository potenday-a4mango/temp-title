import React from 'react';
import { CardItem, HashTagItem } from '../types/home';
import HashTag from './HashTag';

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

  return (
    <>
      <div>
        <div>
          {/* TODO: style 차후 수정 / loading 화면 넣기 */}
          <a href={cardItem.workUrl}>
            <img
              src={cardItem.imageUrl}
              onContextMenu={preventImgClick}
              onDragStart={preventImgClick}
              width="250px"
            />
          </a>
        </div>
        <h5>작품명 {cardItem.workName}</h5>
        <h5>작가명 {cardItem.authorName}</h5>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href={`https://www.instagram.com/${cardItem.instargramId}`}
        >
          <h5>작가계정 {`@${cardItem.instargramId}`}</h5>
        </a>
        <ul>
          해시태그
          {cardItem.workSubjectList.map((item: HashTagItem, idx: number) => (
            <HashTag key={idx} hashTagItem={item} />
          ))}
        </ul>
        <h5>조회수 {`${cardItem.count}회`}</h5>
      </div>
      {/* TODO: style 차후 수정 */}
      <br />
      <hr />
    </>
  );
}
