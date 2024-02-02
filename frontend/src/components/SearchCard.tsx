import React from 'react';
import { HashTagItem } from '../types/home';
import { SearchCardItem } from '../types/search';
import HashTag from './HashTag';
import { countPostApi } from '../api/maincard';

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
        className="flex gap-4"
      >
        <div>
          <img
            src={searchCardItem.imageUrl}
            onContextMenu={preventImgClick}
            onDragStart={preventImgClick}
            className="size-custom-minicard-image	rounded-custom-m-radius border-2 border-black object-cover"
          />
        </div>
        <div className="flex flex-col justify-center">
          <div className="flex flex-col gap-1">
            <h5 className="text-lg font-bold">{searchCardItem.authorName}</h5>
            <h5 className="text-custom-semi-black text-sm">{`@${searchCardItem.authorInstargramId}`}</h5>
          </div>
          <ul className="pt-custom-gap-5 gap-custom-gap-5 flex">
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
