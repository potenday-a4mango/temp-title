import React from 'react';
import { Link } from 'react-router-dom';
import Category from '../components/Category';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

export default function MainHeader() {
  return (
    <>
      <ul className="headerList">
        <li>
          <Link to="/">메인</Link>
        </li>
        <li>
          <Link to="/search">
            <FontAwesomeIcon icon={faMagnifyingGlass as IconProp} />
          </Link>
        </li>
        <li>
          <Link to="/result">검색결과 화면</Link>
        </li>
      </ul>
      <Category />
    </>
  );
}
