import React from 'react';
import { CardItem, HashTagItem } from '../types/home';
import HashTag from './HashTag';
import { countPostApi } from '../api/maincard';
import { ReactComponent as CountImage } from '../assets/images/count-image.svg';

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
      <div
        onClick={() => handleMoveInsta(cardItem.workUrl, cardItem.id)}
        className="flex flex-col gap-custom-gap-7"
      >
        <div>
          <img
            src={cardItem.imageUrl}
            onContextMenu={preventImgClick}
            onDragStart={preventImgClick}
            className="size-custom-card-image rounded-custom-m-radius border-2 border-black object-cover"
          />
        </div>
        <div>
          <div className="flex flex-row items-center justify-between ">
            <p className="text-base font-bold ">{cardItem.authorName}</p>
            <p className="flex gap-1 pt-px">
              <CountImage />
              <span className="text-sm text-custom-middle-gray">{`${cardItem.count}`}</span>
            </p>
          </div>
          <p className="text-sm text-custom-semi-black">{`@${cardItem.instargramId}`}</p>
          <ul className="flex flex-row items-center justify-start gap-1 pt-custom-gap-5">
            {cardItem.workSubjectList.map((item: HashTagItem, idx: number) => (
              <HashTag key={idx} hashTagItem={item} />
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}
