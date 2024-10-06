






import React from 'react';
import { NavLink } from 'react-router-dom';

const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 bg-gray-800 text-white py-1 z-10">
      <div className="container mx-auto px-4 flex items-center justify-between">
        <NavLink to="/" className="text-xl font-serif" activeClassName="text-gray-300">
          Rio
        </NavLink>
        <nav>
          <ul className="flex space-x-4">
            <li><NavLink to="/" exact className="hover:text-gray-300" activeClassName="text-gray-300">Home</NavLink></li>
            <li><NavLink to="/about" className="hover:text-gray-300" activeClassName="text-gray-300">About</NavLink></li>
            <li><NavLink to="/login" className="hover:text-gray-300" activeClassName="text-gray-300">Logout</NavLink></li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
