
import React, { useState } from 'react';
import { User } from '../types';
import UserProfileHeader from '../components/UserProfileHeader';
import BasicInfoTab from './profileTabs/BasicInfoTab';
import EducationSkillsTab from './profileTabs/EducationSkillsTab';
import ExperienceTab from './profileTabs/ExperienceTab';
import { ArrowLeftIcon } from '../components/icons';

interface UserProfilePageProps {
  user: User;
  onBack: () => void;
  onUpdateUser: (user: User) => void;
}

type Tab = 'Basic info' | 'Education & skills' | 'Experience';

const UserProfilePage: React.FC<UserProfilePageProps> = ({ user, onBack, onUpdateUser }) => {
  const [activeTab, setActiveTab] = useState<Tab>('Basic info');

  const tabs: Tab[] = ['Basic info', 'Education & skills', 'Experience'];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'Basic info':
        return <BasicInfoTab user={user} onUpdateUser={onUpdateUser} />;
      case 'Education & skills':
        return <EducationSkillsTab user={user} onUpdateUser={onUpdateUser} />;
      case 'Experience':
        return <ExperienceTab user={user} onUpdateUser={onUpdateUser} />;
      default:
        return null;
    }
  };

  return (
    <div>
      <button onClick={onBack} className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 mb-6 font-medium text-sm">
        <ArrowLeftIcon className="w-4 h-4" />
        <span>Back to users</span>
      </button>
      <UserProfileHeader user={user} />
      <div className="bg-white rounded-lg shadow">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-6 px-6" aria-label="Tabs">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`${
                  activeTab === tab
                    ? 'border-primary text-primary'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm relative`}
              >
                {tab}
              </button>
            ))}
          </nav>
        </div>
        <div className="p-6">
          {renderTabContent()}
        </div>
      </div>
    </div>
  );
};

export default UserProfilePage;