import React from 'react';
import { User } from '../types';
import { EyeIcon, TrashIcon, PlusIcon } from '../components/icons';

interface UserListPageProps {
  users: User[];
  onViewUser: (id: number) => void;
  onDeleteUser: (id: number) => void;
  onAddUser: () => void;
}

const UserListPage: React.FC<UserListPageProps> = ({ users, onViewUser, onDeleteUser, onAddUser }) => {
  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="flex justify-between items-center p-4 sm:p-6 border-b">
        <h1 className="text-xl font-semibold">Users</h1>
        <button
          onClick={onAddUser}
          className="flex items-center space-x-2 bg-primary text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary-hover"
        >
          <PlusIcon className="w-5 h-5" />
          <span>Add user</span>
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sr. No</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User name</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">E-mail</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {users.map((user, index) => (
              <tr key={user.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{index + 1}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{user.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.email}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex items-center space-x-4">
                    <button onClick={() => onViewUser(user.id)} className="text-gray-400 hover:text-primary">
                      <EyeIcon className="w-5 h-5" />
                    </button>
                    <button onClick={() => onDeleteUser(user.id)} className="text-gray-400 hover:text-red-600">
                      <TrashIcon className="w-5 h-5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserListPage;