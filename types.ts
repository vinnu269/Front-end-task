export interface BasicInfo {
  firstName: string;
  lastName: string;
  email: string;
  yearOfBirth: string;
  gender: string;
  phone: string;
  phoneCountryCode: string;
  altPhone: string;
  address: string;
  pincode: string;
  domicileState: string;
  domicileCountry: string;
}

export interface EducationDetails {
  school: string;
  degree: string;
  course: string;
  yearOfCompletion: string;
  grade: string;
}

export interface SkillsProjects {
  skills: string;
  projects: string;
}

export interface SubDomain {
  id: number;
  name: string;
  experience: string;
}

export interface WorkExperienceItem {
  id: number;
  domain: string;
  subDomains: SubDomain[];
}

export interface User {
  id: number;
  name: string;
  email: string;
  contact: string;
  basicInfo: BasicInfo;
  education: EducationDetails;
  skillsProjects: SkillsProjects;
  workExperience: WorkExperienceItem[];
  linkedIn: string;
  resume: string;
}

export const initialUsers: User[] = [
  { id: 1, name: 'Dave Richards', email: 'dev@mail.com', contact: '+91 9966776655' /* other fields with default/empty values */, basicInfo: {} as BasicInfo, education: {} as EducationDetails, skillsProjects: {} as SkillsProjects, workExperience: [], linkedIn: '', resume: '' },
  { id: 2, name: 'Abhishek Hari', email: 'hari@mail.com', contact: '+91 9988776655' /* other fields with default/empty values */, basicInfo: {} as BasicInfo, education: {} as EducationDetails, skillsProjects: {} as SkillsProjects, workExperience: [], linkedIn: '', resume: '' },
  { id: 3, name: 'Nishta Gupta', email: 'nishta@mail.com', contact: '+91 8877665544' /* other fields with default/empty values */, basicInfo: {} as BasicInfo, education: {} as EducationDetails, skillsProjects: {} as SkillsProjects, workExperience: [], linkedIn: '', resume: '' },
];
