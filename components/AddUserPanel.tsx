import React, { useState, useEffect } from 'react';
import { User, BasicInfo, EducationDetails, SkillsProjects } from '../types';
import { XMarkIcon } from './icons';

interface AddUserPanelProps {
  isOpen: boolean;
  onClose: () => void;
  onAddUser: (user: Omit<User, 'id'>) => void;
}

const AddUserPanel: React.FC<AddUserPanelProps> = ({ isOpen, onClose, onAddUser }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [contact, setContact] = useState('');

  useEffect(() => {
    if (!isOpen) {
      setName('');
      setEmail('');
      setContact('');
    }
  }, [isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !contact) return;

    const newUser: Omit<User, 'id'> = {
      name,
      email,
      contact,
      basicInfo: { firstName: name.split(' ')[0] || '', lastName: name.split(' ')[1] || '', email: email, phone: contact } as BasicInfo,
      education: {} as EducationDetails,
      skillsProjects: {} as SkillsProjects,
      workExperience: [],
      linkedIn: '',
      resume: '',
    };
    
    onAddUser(newUser);
  };

  return (
    <div className={`fixed inset-0 z-50 transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
      <div className="absolute inset-0 bg-black bg-opacity-50" onClick={onClose}></div>
      <div className="fixed top-0 right-0 h-full w-full max-w-2xl bg-white shadow-lg flex flex-col">
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-xl font-semibold">Add User</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-800">
            <XMarkIcon className="h-6 w-6" />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="flex-grow p-6 space-y-6 overflow-y-auto">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name of the user</label>
            <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Type here" className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary bg-white" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">E-mail</label>
              <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Type here" className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary bg-white" />
            </div>
            <div>
              <label htmlFor="contact" className="block text-sm font-medium text-gray-700 mb-1">Contact</label>
              <input type="text" id="contact" value={contact} onChange={(e) => setContact(e.target.value)} placeholder="Type here" className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary bg-white" />
            </div>
          </div>
        </form>
        <div className="p-6 border-t flex justify-end space-x-4">
          <button type="button" onClick={onClose} className="px-6 py-2 border border-transparent rounded-md text-sm font-medium text-primary bg-light-purple hover:bg-indigo-200">Cancel</button>
          <button type="submit" onClick={handleSubmit} className="px-8 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-hover">Add</button>
        </div>
      </div>
    </div>
  );
};

export default AddUserPanel;