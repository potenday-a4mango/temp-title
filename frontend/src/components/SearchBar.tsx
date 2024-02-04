import React, { useEffect, useRef, useState } from 'react';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { SearchBarProps } from '../types/search';
import BackArrow from './BackArrow';

export default function SearchBar({
  onSubmit,
  onKeywordChange,
  disableSubmit,
  currentKeyword,
}: SearchBarProps): JSX.Element {
  const [keyword, setKeyword] = useState(currentKeyword);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setKeyword(currentKeyword);
  }, [currentKeyword]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

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
    <div className="sticky top-0 border-b-2 border-black">
      <BackArrow />
      <form
        onSubmit={handleSubmit}
        className="flex h-custom-height-82 flex-row items-center justify-between bg-custom-green px-5 pb-4"
      >
        <div className="relative w-full">
          <input
            ref={inputRef}
            type="text"
            value={keyword}
            onChange={handleInputChange}
            className="h-custom-height-60 w-full rounded-custom-m-radius border-2 border-black pl-4 pr-10 text-xl font-bold"
          />

          <button
            disabled={disableSubmit}
            className="absolute right-4 top-1/2 -translate-y-1/2 transform text-xl"
          >
            <FontAwesomeIcon
              icon={faMagnifyingGlass as IconProp}
              color={disableSubmit ? 'gray' : 'black'}
            />
          </button>
        </div>
      </form>
    </div>
  );
}
