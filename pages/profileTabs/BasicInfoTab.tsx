import React, { useState } from 'react';
import { User } from '../../types';
import { PencilIcon } from '../../components/icons';

interface BasicInfoTabProps {
  user: User;
  onUpdateUser: (user: User) => void;
}

// Fix: Make children prop optional to resolve TypeScript errors.
const FormField = ({ label, children }: { label: string; children?: React.ReactNode }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
    {children}
  </div>
);

const TextInput = (props: React.InputHTMLAttributes<HTMLInputElement>) => (
  <input {...props} className={`w-full bg-light-bg px-3 py-2 border border-transparent rounded-md focus:ring-primary focus:border-primary focus:bg-white disabled:bg-light-bg disabled:cursor-not-allowed ${props.className || ''}`} />
);

const SelectInput = (props: React.SelectHTMLAttributes<HTMLSelectElement>) => (
    <select {...props} className={`w-full bg-light-bg px-3 py-2 border border-transparent rounded-md focus:ring-primary focus:border-primary focus:bg-white disabled:bg-light-bg disabled:cursor-not-allowed ${props.className || ''}`} />
);

const indianStates = [
  'Andaman and Nicobar Islands', 'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chandigarh',
  'Chhattisgarh', 'Dadra and Nagar Haveli and Daman and Diu', 'Delhi', 'Goa', 'Gujarat', 'Haryana',
  'Himachal Pradesh', 'Jammu and Kashmir', 'Jharkhand', 'Karnataka', 'Kerala', 'Ladakh', 'Lakshadweep',
  'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Puducherry',
  'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal'
].sort();

const BasicInfoTab: React.FC<BasicInfoTabProps> = ({ user, onUpdateUser }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(user.basicInfo);

  const countries = [
    { name: 'USA', code: '+1', flag: '🇺🇸' },
    { name: 'India', code: '+91', flag: '🇮🇳' },
    { name: 'Canada', code: '+1', flag: '🇨🇦' },
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    onUpdateUser({ ...user, basicInfo: formData });
    setIsEditing(false);
  };
  
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-semibold">Basic Details</h2>
        {!isEditing ? (
            <button onClick={() => setIsEditing(true)} className="p-2 rounded-full bg-light-purple hover:bg-indigo-200">
                <PencilIcon className="w-5 h-5 text-primary" />
            </button>
        ) : (
             <div className="flex space-x-2">
                <button onClick={() => setIsEditing(false)} className="px-4 py-2 text-sm rounded-md border">Cancel</button>
                <button onClick={handleSave} className="px-4 py-2 text-sm rounded-md bg-primary text-white">Save</button>
            </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-6">
        {/* Column 1 */}
        <div className="space-y-6">
          <FormField label="First name">
            <TextInput name="firstName" value={formData.firstName || ''} onChange={handleChange} placeholder="e.g. John" disabled={!isEditing} />
          </FormField>
          <div className="grid grid-cols-2 gap-4">
             <FormField label="Year of birth">
                <SelectInput name="yearOfBirth" value={formData.yearOfBirth || ''} onChange={handleChange} disabled={!isEditing}>
                    <option>YYYY</option>
                    {[...Array(50)].map((_, i) => <option key={i} value={2024-i}>{2024-i}</option>)}
                </SelectInput>
            </FormField>
            <FormField label="Gender">
                <SelectInput name="gender" value={formData.gender || ''} onChange={handleChange} disabled={!isEditing}>
                    <option>Select an option</option>
                    <option>Male</option>
                    <option>Female</option>
                    <option>Other</option>
                </SelectInput>
            </FormField>
          </div>
          <FormField label="Address">
            <textarea name="address" value={formData.address || ''} onChange={handleChange} placeholder="Enter here" rows={5} className="w-full bg-light-bg px-3 py-2 border border-transparent rounded-md focus:ring-primary focus:border-primary focus:bg-white disabled:bg-light-bg disabled:cursor-not-allowed resize-none" disabled={!isEditing}></textarea>
          </FormField>
        </div>

        {/* Column 2 */}
        <div className="space-y-6">
            <FormField label="Last name">
                <TextInput name="lastName" value={formData.lastName || ''} onChange={handleChange} placeholder="e.g. Doe" disabled={!isEditing} />
            </FormField>
            <FormField label="Phone number">
                <div className="flex">
                    <SelectInput 
                        name="phoneCountryCode" 
                        value={formData.phoneCountryCode || ''} 
                        onChange={handleChange} 
                        disabled={!isEditing}
                        className="w-1/5 rounded-r-none"
                    >
                        <option value="" disabled>Select</option>
                        {countries.map((c, i) => <option key={`${c.name}-${i}`} value={c.code}>{c.code}</option>)}
                    </SelectInput>
                    <TextInput name="phone" value={formData.phone || ''} onChange={handleChange} disabled={!isEditing} className="w-4/5 rounded-l-none" />
                </div>
            </FormField>
            <FormField label="Pincode">
                <TextInput name="pincode" value={formData.pincode || ''} onChange={handleChange} placeholder="Enter here" disabled={!isEditing} />
            </FormField>
            <FormField label="Domicile country">
                <SelectInput name="domicileCountry" value={formData.domicileCountry || ''} onChange={handleChange} disabled={!isEditing}>
                    <option>Select an option</option>
                    <option>USA</option>
                    <option>India</option>
                    <option>Canada</option>
                </SelectInput>
            </FormField>
        </div>

        {/* Column 3 */}
        <div className="space-y-6">
            <FormField label="Email ID">
                <TextInput name="email" value={formData.email || ''} onChange={handleChange} placeholder="e.g. mrnobody@mail.com" disabled={!isEditing} />
            </FormField>
            <FormField label="Alternate Phone no">
                <TextInput name="altPhone" value={formData.altPhone || ''} onChange={handleChange} placeholder="e.g. 9876543210" disabled={!isEditing} />
            </FormField>
            <FormField label="Domicile state">
                <SelectInput name="domicileState" value={formData.domicileState || ''} onChange={handleChange} disabled={!isEditing}>
                    <option>Select an option</option>
                    <option>California</option>
                    <option>Ontario</option>
                    {indianStates.map(state => <option key={state} value={state}>{state}</option>)}
                </SelectInput>
            </FormField>
        </div>
      </div>
    </div>
  );
};

export default BasicInfoTab;