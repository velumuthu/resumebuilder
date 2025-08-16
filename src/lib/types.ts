export interface PersonalInfo {
  name: string;
  email: string;
  phone: string;
  address: string;
  website: string;
  summary: string;
}

export interface Experience {
  id: string;
  jobTitle: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string;
  description: string;
}

export interface Education {
  id: string;
  school: string;
  degree: string;
  location: string;
  startDate: string;
  endDate: string;
}

export interface Skill {
  id: string;
  name: string;
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  date: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  url: string;
}

export interface Achievement {
  id: string;
  description: string;
}

export interface AreaOfInterest {
  id: string;
  name: string;
}

export interface ResumeData {
  personalInfo: PersonalInfo;
  experience: Experience[];
  education: Education[];
  skills: Skill[];
  certifications: Certification[];
  projects: Project[];
  achievements: Achievement[];
  areasOfInterest: AreaOfInterest[];
  template: 'creative' | 'modern' | 'classic';
}
