import React from 'react';
import { User } from '../types';
import { PencilIcon, CopyIcon, UserCircleIcon } from './icons';

interface UserProfileHeaderProps {
  user: User;
}

const UserProfileHeader: React.FC<UserProfileHeaderProps> = ({ user }) => {
  return (
    <div className="bg-white rounded-lg shadow p-6 mb-6">
      <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6">
        <div className="relative">
          <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center">
            <UserCircleIcon className="w-12 h-12 text-gray-600" />
          </div>
          <button className="absolute bottom-0 right-0 bg-white p-1.5 rounded-full shadow-md border border-gray-200 hover:bg-gray-100">
            <PencilIcon className="w-4 h-4 text-primary" />
          </button>
        </div>
        <div className="text-center sm:text-left">
          <h1 className="text-2xl font-bold">{user.name}</h1>
          <div className="flex items-center justify-center sm:justify-start space-x-2 text-gray-500 mt-1">
            <span>{user.email}</span>
            <button onClick={() => navigator.clipboard.writeText(user.email)} className="text-gray-400 hover:text-gray-600">
              <CopyIcon className="w-4 h-4" />
            </button>
          </div>
          <p className="text-gray-500 mt-1">{user.contact}</p>
        </div>
      </div>
    </div>
  );
};

export default UserProfileHeader;