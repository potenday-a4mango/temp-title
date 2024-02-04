import React from 'react';
import Filter from '../components/Filter';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import BackArrow from '../components/BackArrow';

export default function SearchHeader({
  keyword,
}: {
  keyword: string;
}): JSX.Element {
  const navigate = useNavigate();
  const handleMoveSearch = (): void => {
    navigate('/search', { state: { resultSearchKeyword: keyword } });
  };
  return (
    <div className="sticky top-0">
      <div className="border-b-2 border-black">
        <BackArrow />
        <div
          onClick={handleMoveSearch}
          className="flex flex-row items-center justify-between px-5 pb-4 h-custom-height-82 bg-custom-green"
        >
          <div className="relative w-full">
            <input
              type="text"
              value={keyword}
              className="w-full pl-4 pr-10 text-xl font-bold border-2 border-black h-custom-height-60 rounded-custom-m-radius"
            />
            <button className="absolute text-xl transform -translate-y-1/2 right-4 top-1/2">
              <FontAwesomeIcon icon={faMagnifyingGlass as IconProp} />
            </button>
          </div>
        </div>
      </div>
      <Filter />
    </div>
  );
}
