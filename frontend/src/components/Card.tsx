import React from 'react';
import { CardItem, HashTagItem } from '../types/home';
import HashTag from './HashTag';
import { InstagramEmbed } from 'react-social-media-embed';

// TODO: 논의) 인스타그램 이동 함수
function openInstagram(url: string, username: string) {
  // 앱으로 이동 ? or iframe으로 인스타 웹에 보여주기
  window.location.href = `instagram://user?username=${username}`;

  // 만약 앱 이동이 작동하지 않으면 2초 후에 웹 URL로 변경
  setTimeout(function () {
    window.location.href = url;
  }, 2000);
}

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
      <div
        onClick={() => openInstagram(cardItem.workUrl, cardItem.instargramId)}
      >
        <div>
          <div>
            {/* TODO: 인스타 임베드 or 이미지 사진 보여주기 논의 */}
            {/* <img
              src={cardItem.imageUrl}
              onContextMenu={preventImgClick}
              onDragStart={preventImgClick}
              width="250px"
            /> */}
            <div>
              <InstagramEmbed url={cardItem.workUrl} width="350px" />
            </div>
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
