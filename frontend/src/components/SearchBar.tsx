import React, { useEffect, useState } from 'react';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { SearchBarProps } from '../types/search';

export default function SearchBar({
  onSubmit,
  onKeywordChange,
  disableSubmit,
  currentKeyword,
}: SearchBarProps): JSX.Element {
  const [keyword, setKeyword] = useState(currentKeyword);

  useEffect(() => {
    setKeyword(currentKeyword);
  }, [currentKeyword]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
    onKeywordChange(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    if (disableSubmit) {
      e.preventDefault();
    } else {
      onSubmit(e);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="검색어를 입력해주세요."
          value={keyword}
          onChange={handleInputChange}
        />
        <button disabled={disableSubmit}>
          <FontAwesomeIcon icon={faMagnifyingGlass as IconProp} />
        </button>
      </form>
    </>
  );
}
