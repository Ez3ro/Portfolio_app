import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="text-white p-4 pb-12">
      <nav className="container mx-auto flex justify-start items-center pl-4">
        <ul className="flex space-x-4 text-lg uppercase tracking-wider">
          <li>
            <a href="#about" className="hover:text-gray-400">About Me</a>
          </li>
          <li>
            <a href="#projects" className="hover:text-gray-400">Projects</a>
          </li>
          <li>
            <a href="#contact" className="hover:text-gray-400">Contact</a>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;