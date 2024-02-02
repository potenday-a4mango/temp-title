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
          className="bg-custom-green h-custom-height-82 flex flex-row items-center justify-between px-5 pb-4"
        >
          <div className="relative w-full">
            <input
              type="text"
              value={keyword}
              className="h-custom-height-60 rounded-custom-m-radius w-full border-2 border-black pl-4 pr-10 text-xl font-bold"
            />
            <button className="absolute right-4 top-1/2 -translate-y-1/2 transform text-xl">
              <FontAwesomeIcon icon={faMagnifyingGlass as IconProp} />
            </button>
          </div>
        </div>
      </div>
      <Filter />
    </div>
  );
}
