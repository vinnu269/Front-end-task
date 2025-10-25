import React, { useState } from 'react';
import { User, WorkExperienceItem, SubDomain } from '../../types';
import { PencilIcon, PlusIcon } from '../../components/icons';

const MinusIcon = ({className}: {className?: string}) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12h-15" />
    </svg>
);

const FormField = ({ label, children }: { label: string; children?: React.ReactNode }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
    {children}
  </div>
);

const TextInput = (props: React.InputHTMLAttributes<HTMLInputElement>) => (
  <input {...props} className={`w-full px-3 py-2 border rounded-md shadow-sm focus:ring-primary focus:border-primary ${props.disabled ? 'bg-gray-100 border-gray-200 cursor-not-allowed' : 'bg-white border-gray-300'}`} />
);

const SelectInput = (props: React.SelectHTMLAttributes<HTMLSelectElement>) => (
  <select {...props} className={`w-full px-3 py-2 border rounded-md shadow-sm focus:ring-primary focus:border-primary ${props.disabled ? 'bg-gray-100 border-gray-200 cursor-not-allowed' : 'bg-white border-gray-300'}`} />
);

const ExperienceTab: React.FC<{ user: User; onUpdateUser: (user: User) => void; }> = ({ user, onUpdateUser }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [workData, setWorkData] = useState<WorkExperienceItem[]>(user.workExperience);

  const handleDomainChange = (domainIndex: number, value: string) => {
    const newWorkData = [...workData];
    newWorkData[domainIndex].domain = value;
    setWorkData(newWorkData);
  };

  const handleSubDomainChange = (domainIndex: number, subDomainIndex: number, field: keyof SubDomain, value: string) => {
    setWorkData(prev => {
        const newWorkData = JSON.parse(JSON.stringify(prev)); // Deep copy
        newWorkData[domainIndex].subDomains[subDomainIndex][field] = value;
        return newWorkData;
    });
  };

  const addDomain = () => {
    setWorkData([
      ...workData,
      {
        id: Date.now(),
        domain: '',
        subDomains: [{ id: Date.now(), name: '', experience: '' }],
      },
    ]);
  };

  const removeDomain = (domainIndex: number) => {
    setWorkData(workData.filter((_, index) => index !== domainIndex));
  };

  const addSubDomain = (domainIndex: number) => {
    const newWorkData = [...workData];
    newWorkData[domainIndex].subDomains.push({
      id: Date.now(),
      name: '',
      experience: '',
    });
    setWorkData(newWorkData);
  };

  const removeSubDomain = (domainIndex: number, subDomainIndex: number) => {
    const newWorkData = [...workData];
    newWorkData[domainIndex].subDomains = newWorkData[domainIndex].subDomains.filter(
      (_, index) => index !== subDomainIndex
    );
    setWorkData(newWorkData);
  };
  
  const handleSave = () => {
    onUpdateUser({ ...user, workExperience: workData });
    setIsEditing(false);
  };
  
  const handleCancel = () => {
      setWorkData(user.workExperience);
      setIsEditing(false);
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-semibold">Work Experience</h2>
        {!isEditing ? (
          <button onClick={() => setIsEditing(true)} className="p-2 rounded-md bg-light-purple hover:bg-indigo-200">
            <PencilIcon className="w-5 h-5 text-primary" />
          </button>
        ) : (
          <div className="flex items-center space-x-2">
            <button onClick={handleCancel} className="px-4 py-2 text-sm font-semibold rounded-md border hover:bg-gray-50">Cancel</button>
            <button onClick={handleSave} className="px-4 py-2 text-sm font-semibold rounded-md bg-primary text-white hover:bg-primary-hover">
              Save changes
            </button>
          </div>
        )}
      </div>

      <div className="space-y-6">
        {workData.map((domainItem, domainIndex) => (
          <div key={domainItem.id} className="space-y-4">
            <div className="flex items-end space-x-2">
              <div className="flex-grow">
                <FormField label="Domain">
                  <TextInput 
                    placeholder="e.g. Technology" 
                    value={domainItem.domain} 
                    onChange={e => handleDomainChange(domainIndex, e.target.value)} 
                    disabled={!isEditing}
                  />
                </FormField>
              </div>
              {isEditing && (
                <button onClick={() => removeDomain(domainIndex)} className="p-2 rounded-md bg-red-100 text-red-600 hover:bg-red-200 mb-1">
                  <MinusIcon className="w-5 h-5" />
                </button>
              )}
            </div>

            <div className="ml-8 space-y-4">
                {domainItem.subDomains.map((subDomainItem, subDomainIndex) => (
                    <div key={subDomainItem.id} className="flex items-end space-x-2">
                        <div className="flex-grow">
                            <FormField label="Sub-domain">
                                <TextInput 
                                    placeholder="e.g. MERN Stack" 
                                    value={subDomainItem.name}
                                    onChange={e => handleSubDomainChange(domainIndex, subDomainIndex, 'name', e.target.value)}
                                    disabled={!isEditing}
                                />
                            </FormField>
                        </div>
                        <div style={{flexBasis: '250px'}}>
                            <FormField label="Experience">
                                <SelectInput 
                                    value={subDomainItem.experience} 
                                    onChange={e => handleSubDomainChange(domainIndex, subDomainIndex, 'experience', e.target.value)} 
                                    disabled={!isEditing}
                                >
                                    <option value="">Select an option</option>
                                    {[...Array(10)].map((_, i) => <option key={i} value={`${i+1} year${i > 0 ? 's' : ''}`}>{i+1} year{i > 0 ? 's' : ''}</option>)}
                                    <option value="10+ years">10+ years</option>
                                </SelectInput>
                            </FormField>
                        </div>
                        {isEditing && domainItem.subDomains.length > 1 && (
                            <button onClick={() => removeSubDomain(domainIndex, subDomainIndex)} className="p-2 rounded-md bg-red-100 text-red-600 hover:bg-red-200 mb-1">
                                <MinusIcon className="w-5 h-5" />
                            </button>
                        )}
                    </div>
                ))}
            </div>

            {isEditing && (
              <button onClick={() => addSubDomain(domainIndex)} className="ml-8 flex items-center space-x-2 text-primary font-semibold text-sm px-3 py-1.5 bg-light-purple rounded-md hover:bg-indigo-200">
                <PlusIcon className="w-4 h-4" />
                <span>Add</span>
              </button>
            )}
          </div>
        ))}
        
        {isEditing && (
          <button onClick={addDomain} className="flex items-center space-x-2 text-primary font-semibold text-sm px-3 py-1.5 bg-light-purple rounded-md hover:bg-indigo-200">
            <PlusIcon className="w-4 h-4" />
            <span>Add Domain</span>
          </button>
        )}
      </div>
    </div>
  );
};

export default ExperienceTab;