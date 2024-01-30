import React from 'react';
import { Link } from 'react-router-dom';
import Category from '../components/Category';

export default function MainHeader() {
  return (
    <>
      <h1>Header 입니다.</h1>
      <ul className="headerList">
        <li>
          <Link to="/">메인</Link>
        </li>
        <li>
          <Link to="/search">검색 화면</Link>
        </li>
        <li>
          <Link to="/result">검색결과 화면</Link>
        </li>
      </ul>
      <Category />
    </>
  );
}
