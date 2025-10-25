import React from 'react';
import { MenuIcon, BellIcon, QuestionMarkCircleIcon, UserCircleIcon } from './icons';

const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-sm">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-4">
            <div className="font-bold text-xl border-2 border-black px-2 py-1">LOGO</div>
            <button className="text-gray-500 hover:text-gray-700">
              <MenuIcon className="h-6 w-6" />
            </button>
          </div>
          <div className="flex items-center space-x-4">
            <button className="text-gray-500 hover:text-gray-700">
              <QuestionMarkCircleIcon className="h-6 w-6" />
            </button>
            <button className="text-gray-500 hover:text-gray-700">
              <BellIcon className="h-6 w-6" />
            </button>
            <div className="p-1.5 bg-primary-light rounded-full">
                <UserCircleIcon className="h-6 w-6 text-white" />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;