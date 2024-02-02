import React from 'react';
import { SearchCardItem } from '../types/search';
import { countPostApi } from '../api/maincard';
import countImage from '../assets/images/count-image.svg';
import { HashTagItem } from '../types/home';
import HashTag from './HashTag';

export default function SearchResultCard({
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
        className="gap-custom-gap-7 flex flex-col"
      >
        <div>
          <img
            src={searchCardItem.imageUrl}
            onContextMenu={preventImgClick}
            onDragStart={preventImgClick}
            className="size-custom-card-image rounded-custom-m-radius border-2 border-black object-cover"
          />
        </div>
        <div>
          <div className="flex flex-row items-center justify-between ">
            <p className="text-base font-bold	">{searchCardItem.authorName}</p>
            <p className="flex gap-1 pt-px">
              <img src={countImage} alt="count-image" />
              <span className="text-custom-middle-gray text-sm">{`${searchCardItem.count}`}</span>
            </p>
          </div>
          <p className="text-custom-semi-black text-sm">{`@${searchCardItem.authorInstargramId}`}</p>
          <ul className="pt-custom-gap-5 flex flex-row items-center justify-start gap-1">
            {searchCardItem.subjectList.map(
              (item: HashTagItem, idx: number) => (
                <HashTag key={idx} hashTagItem={item} />
              ),
            )}
          </ul>
        </div>
      </div>
    </>
  );
}
