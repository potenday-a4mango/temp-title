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
      {/* TODO: style 차후 수정 / loading 화면 넣기 */}
      <a href={cardItem.workUrl} target="_blank" rel="noopener noreferrer">
        <div>
          <div>
            <img
              src={cardItem.imageUrl}
              onContextMenu={preventImgClick}
              onDragStart={preventImgClick}
              width="250px"
            />
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
      </a>
      {/* TODO: style 차후 수정 */}
      <br />
      <hr />
    </>
  );
}
