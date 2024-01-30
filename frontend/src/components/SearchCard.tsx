import React from 'react';
import { SearchCardItem, HashTagItem } from '../types/home';
import HashTag from './HashTag';

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

  return (
    <>
      <a href={searchCardItem.url}>
        <div>
          <div>
            {/* TODO: style 차후 수정*/}
            <img
              src={searchCardItem.imageUrl}
              onContextMenu={preventImgClick}
              onDragStart={preventImgClick}
              width="250px"
            />
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
      </a>
      {/* TODO: style 차후 수정 */}
      <br />
      <hr />
    </>
  );
}
