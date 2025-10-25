
import React, { useState } from 'react';
import Header from './components/Header';
import UserListPage from './pages/UserListPage';
import UserProfilePage from './pages/UserProfilePage';
import { useLocalStorage } from './hooks/useLocalStorage';
import { User, initialUsers } from './types';
import AddUserPanel from './components/AddUserPanel';

const App: React.FC = () => {
  const [users, setUsers] = useLocalStorage<User[]>('users', initialUsers);
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const [isAddingUser, setIsAddingUser] = useState(false);

  const handleViewUser = (id: number) => {
    setSelectedUserId(id);
  };

  const handleDeleteUser = (id: number) => {
    setUsers(users.filter(user => user.id !== id));
  };

  const handleAddUser = (newUser: Omit<User, 'id'>) => {
    const userWithId = { ...newUser, id: Date.now() };
    setUsers([...users, userWithId]);
    setIsAddingUser(false);
  };
  
  const handleUpdateUser = (updatedUser: User) => {
    setUsers(users.map(user => user.id === updatedUser.id ? updatedUser : user));
  };

  const selectedUser = users.find(user => user.id === selectedUserId);

  return (
    <div className="bg-light-bg min-h-screen font-sans text-gray-800">
      <Header />
      <main className="p-4 sm:p-6 lg:p-8">
        {selectedUser ? (
          <UserProfilePage 
            user={selectedUser} 
            onBack={() => setSelectedUserId(null)}
            onUpdateUser={handleUpdateUser}
          />
        ) : (
          <UserListPage
            users={users}
            onViewUser={handleViewUser}
            onDeleteUser={handleDeleteUser}
            onAddUser={() => setIsAddingUser(true)}
          />
        )}
      </main>
      <AddUserPanel 
        isOpen={isAddingUser}
        onClose={() => setIsAddingUser(false)}
        onAddUser={handleAddUser}
      />
    </div>
  );
};

export default App;
