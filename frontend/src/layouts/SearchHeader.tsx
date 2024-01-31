import React from 'react';
import Filter from '../components/Filter';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

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
    <div>
      <div>
        <div onClick={handleMoveSearch}>
          <input type="text" value={keyword} />
          <FontAwesomeIcon icon={faMagnifyingGlass as IconProp} />
        </div>
      </div>
      <Filter />
    </div>
  );
}
