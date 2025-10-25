import React, { useState } from 'react';
import { User } from '../../types';
import { PencilIcon } from '../../components/icons';

interface EducationSkillsTabProps {
  user: User;
  onUpdateUser: (user: User) => void;
}

// Fix: Make children prop optional to resolve TypeScript errors.
const Section = ({ title, onEdit, isEditing, onSave, onCancel, children }: { title: string; onEdit: () => void; isEditing: boolean; onSave: () => void; onCancel: () => void; children?: React.ReactNode }) => (
  <div className="mb-8">
    <div className="flex justify-between items-center mb-6">
      <h2 className="text-lg font-semibold">{title}</h2>
      {!isEditing ? (
        <button onClick={onEdit} className="p-2 rounded-full bg-light-purple hover:bg-indigo-200">
          <PencilIcon className="w-5 h-5 text-primary" />
        </button>
      ) : (
        <div className="flex space-x-2">
          <button onClick={onCancel} className="px-4 py-2 text-sm rounded-md border">Cancel</button>
          <button onClick={onSave} className="px-4 py-2 text-sm rounded-md bg-primary text-white">Save</button>
        </div>
      )}
    </div>
    {children}
  </div>
);

// Fix: Make children prop optional to resolve TypeScript errors.
const FormField = ({ label, children }: { label: string; children?: React.ReactNode }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
    {children}
  </div>
);

const TextInput = (props: React.InputHTMLAttributes<HTMLInputElement>) => (
  <input {...props} className="w-full bg-light-bg px-3 py-2 border border-transparent rounded-md focus:ring-primary focus:border-primary focus:bg-white disabled:bg-light-bg disabled:cursor-not-allowed" />
);

const TextAreaInput = (props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) => (
    <textarea {...props} rows={4} className="w-full bg-light-bg px-3 py-2 border border-transparent rounded-md focus:ring-primary focus:border-primary focus:bg-white disabled:bg-light-bg disabled:cursor-not-allowed resize-none" />
);

const SelectInput = (props: React.SelectHTMLAttributes<HTMLSelectElement>) => (
    <select {...props} className="w-full bg-light-bg px-3 py-2 border border-transparent rounded-md focus:ring-primary focus:border-primary focus:bg-white disabled:bg-light-bg disabled:cursor-not-allowed" />
);

const EducationSkillsTab: React.FC<EducationSkillsTabProps> = ({ user, onUpdateUser }) => {
  const [isEditingEducation, setIsEditingEducation] = useState(false);
  const [isEditingSkills, setIsEditingSkills] = useState(false);
  
  const [educationData, setEducationData] = useState(user.education);
  const [skillsData, setSkillsData] = useState(user.skillsProjects);

  const handleEducationChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setEducationData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSkillsChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setSkillsData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSaveEducation = () => {
    onUpdateUser({ ...user, education: educationData });
    setIsEditingEducation(false);
  };

  const handleSaveSkills = () => {
    onUpdateUser({ ...user, skillsProjects: skillsData });
    setIsEditingSkills(false);
  };


  return (
    <div>
      <Section
        title="Education Details"
        isEditing={isEditingEducation}
        onEdit={() => setIsEditingEducation(true)}
        onSave={handleSaveEducation}
        onCancel={() => setIsEditingEducation(false)}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
            <div className="space-y-6">
                <FormField label="School / College">
                    <TextInput name="school" value={educationData.school || ''} onChange={handleEducationChange} disabled={!isEditingEducation} placeholder="e.g. Lincoln College" />
                </FormField>
                <FormField label="Course">
                    <TextInput name="course" value={educationData.course || ''} onChange={handleEducationChange} disabled={!isEditingEducation} placeholder="e.g. Computer science engineering" />
                </FormField>
            </div>
            <div className="space-y-6">
                <FormField label="Highest degree or equivalent">
                    <TextInput name="degree" value={educationData.degree || ''} onChange={handleEducationChange} disabled={!isEditingEducation} placeholder="e.g. Bachelors in Technology" />
                </FormField>
                <div className="grid grid-cols-2 gap-4">
                    <FormField label="Year of completion">
                        <SelectInput name="yearOfCompletion" value={educationData.yearOfCompletion || ''} onChange={handleEducationChange} disabled={!isEditingEducation}>
                            <option>YYYY</option>
                             {[...Array(20)].map((_, i) => <option key={i} value={2024-i}>{2024-i}</option>)}
                        </SelectInput>
                    </FormField>
                    <FormField label="Grade">
                        <TextInput name="grade" value={educationData.grade || ''} onChange={handleEducationChange} disabled={!isEditingEducation} placeholder="Enter here" />
                    </FormField>
                </div>
            </div>
        </div>
      </Section>

      <Section
        title="Skills & Projects"
        isEditing={isEditingSkills}
        onEdit={() => setIsEditingSkills(true)}
        onSave={handleSaveSkills}
        onCancel={() => setIsEditingSkills(false)}
      >
         <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
            <FormField label="Skills">
                <TextAreaInput name="skills" value={skillsData.skills || ''} onChange={handleSkillsChange} disabled={!isEditingSkills} placeholder="Enter here" />
            </FormField>
             <FormField label="Projects">
                <TextAreaInput name="projects" value={skillsData.projects || ''} onChange={handleSkillsChange} disabled={!isEditingSkills} placeholder="Enter here" />
            </FormField>
        </div>
      </Section>
    </div>
  );
};

export default EducationSkillsTab;