import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Category from '../components/Category';
import logo from '../assets/images/logo.svg';
import searchGlasses from '../assets/images/search-glasses.svg';

export default function MainHeader(): JSX.Element {
  const location = useLocation();
  const isHomePage = location.pathname
    .split('/')
    .every((segment) => segment === '');

  return (
    <div className="sticky top-0 border-b-2 border-black">
      <ul className="bg-custom-green flex h-16 flex-row items-center justify-between px-5 py-4">
        <li>
          <Link to="/">
            <img src={logo} alt="loading-image" />
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
