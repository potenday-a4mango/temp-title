import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Category from '../components/Category';
import { ReactComponent as LogoImg } from '../assets/images/logo.svg';
import { ReactComponent as SearchGlassesImg } from '../assets/images/search-glasses.svg';
import useResetCategory from '../hooks/useResetCategory';

export default function MainHeader(): JSX.Element {
  const location = useLocation();
  const isHomePage = location.pathname
    .split('/')
    .every((segment) => segment === '');
  const resetCategory = useResetCategory();

  return (
    <div className="sticky top-0 border-b-2 border-black">
      <ul className="flex h-16 flex-row items-center justify-between bg-custom-green px-5 py-4">
        <li>
          <Link to="/" onClick={() => resetCategory()}>
            <LogoImg />
          </Link>
        </li>
        <li>
          <Link to="/search" className="cursor-pointer">
            <SearchGlassesImg />
          </Link>
        </li>
      </ul>
      {isHomePage ? <Category /> : null}
    </div>
  );
}
