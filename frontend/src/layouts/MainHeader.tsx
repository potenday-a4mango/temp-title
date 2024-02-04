import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Category from '../components/Category';
import logo from '../assets/images/logo.svg';
import searchGlasses from '../assets/images/search-glasses.svg';
import useResetCategory from '../hooks/useResetCategory';

export default function MainHeader(): JSX.Element {
  const location = useLocation();
  const isHomePage = location.pathname
    .split('/')
    .every((segment) => segment === '');
  const resetCategory = useResetCategory();

  return (
    <div className="sticky top-0 border-b-2 border-black">
      <ul className="flex flex-row items-center justify-between h-16 px-5 py-4 bg-custom-green">
        <li>
          <Link to="/" onClick={() => resetCategory()}>
            <img
              src={logo}
              alt="loading-image"
              className="h-[29px] w-[100px] object-fill"
            />
          </Link>
        </li>
        <li>
          <Link to="/search" className="cursor-pointer">
            <img src={searchGlasses} alt="search-glasses" />
          </Link>
        </li>
      </ul>
      {isHomePage ? <Category /> : null}
    </div>
  );
}
