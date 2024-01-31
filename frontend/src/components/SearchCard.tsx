import React from 'react';
import { HashTagItem } from '../types/home';
import { SearchCardItem } from '../types/search';
import HashTag from './HashTag';
import { InstagramEmbed } from 'react-social-media-embed';

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
            {/* TODO: 인스타 임베드 or 이미지 사진 보여주기 논의 */}
            {/* 
            <img
              src={searchCardItem.imageUrl}
              onContextMenu={preventImgClick}
              onDragStart={preventImgClick}
              width="250px"
            />
             */}
            <div>
              <InstagramEmbed url={searchCardItem.url} width="350px" />
            </div>
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
