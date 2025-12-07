
import type { ResumeData } from '@/lib/types';
import { Mail, Phone, Globe, MapPin } from 'lucide-react';

interface TemplateProps {
  resumeData: ResumeData;
  handleContentChange?: (e: React.FocusEvent<HTMLElement>, section: keyof ResumeData, id: string, field: string) => void;
}

export default function CorporateTemplate({ resumeData, handleContentChange }: TemplateProps) {
  const { personalInfo, experience, education, skills, projects, certifications, achievements, areasOfInterest } = resumeData;

  const formatDate = (dateString: string) => {
    if (!dateString || dateString.toLowerCase() === 'present') return 'PRESENT';
    try {
      const date = new Date(dateString);
      return new Date(date.getTime() + date.getTimezoneOffset() * 60000).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }).toUpperCase();
    } catch {
      return dateString;
    }
  };

  return (
    <div className="bg-white text-gray-800 font-['Helvetica',_'Arial',_sans-serif] text-[10pt] w-full max-w-4xl mx-auto print:p-0">
      <div className="flex">
        {/* Left Sidebar */}
        <div className="w-1/3 bg-gray-800 text-white p-8">
          <h1 className="text-3xl font-bold tracking-tight text-white" contentEditable onBlur={(e) => handleContentChange?.(e, 'personalInfo', '', 'name')} dangerouslySetInnerHTML={{ __html: personalInfo.name || 'Your Name' }}></h1>
          
          <div className="mt-8 space-y-4 text-sm">
            <h2 className="text-sm font-bold uppercase tracking-wider text-gray-400 border-b border-gray-600 pb-1">Contact</h2>
            {personalInfo.phone && <div className="flex items-center gap-2"><Phone size={14} /><span contentEditable onBlur={(e) => handleContentChange?.(e, 'personalInfo', '', 'phone')} dangerouslySetInnerHTML={{ __html: personalInfo.phone }}></span></div>}
            {personalInfo.email && <div className="flex items-center gap-2"><Mail size={14} /><a href={`mailto:${personalInfo.email}`} className="hover:underline break-all" contentEditable onBlur={(e) => handleContentChange?.(e, 'personalInfo', '', 'email')} dangerouslySetInnerHTML={{ __html: personalInfo.email }}></a></div>}
            {personalInfo.website && <div className="flex items-center gap-2"><Globe size={14} /><a href={`https://${personalInfo.website}`} target="_blank" rel="noopener noreferrer" className="hover:underline" contentEditable onBlur={(e) => handleContentChange?.(e, 'personalInfo', '', 'website')} dangerouslySetInnerHTML={{ __html: personalInfo.website }}></a></div>}
            {personalInfo.address && <div className="flex items-center gap-2"><MapPin size={14} /><span contentEditable onBlur={(e) => handleContentChange?.(e, 'personalInfo', '', 'address')} dangerouslySetInnerHTML={{ __html: personalInfo.address }}></span></div>}
          </div>
          
          {skills?.length > 0 && <div className="mt-6 space-y-2">
            <h2 className="text-sm font-bold uppercase tracking-wider text-gray-400 border-b border-gray-600 pb-1">Skills</h2>
            <ul className="list-disc list-outside ml-4 text-sm">
              {skills.map(skill => (
                <li key={skill.id} contentEditable onBlur={(e) => handleContentChange?.(e, 'skills', skill.id, 'name')} dangerouslySetInnerHTML={{ __html: skill.name }}></li>
              ))}
            </ul>
          </div>}

          {education?.length > 0 && <div className="mt-6 space-y-2">
            <h2 className="text-sm font-bold uppercase tracking-wider text-gray-400 border-b border-gray-600 pb-1">Education</h2>
            {education.map(edu => (
              <div key={edu.id} className="text-sm">
                <h3 className="font-semibold" contentEditable onBlur={(e) => handleContentChange?.(e, 'education', edu.id, 'degree')} dangerouslySetInnerHTML={{ __html: edu.degree }}></h3>
                <p className="text-gray-300" contentEditable onBlur={(e) => handleContentChange?.(e, 'education', edu.id, 'school')} dangerouslySetInnerHTML={{ __html: edu.school }}></p>
                <p className="text-xs text-gray-400" contentEditable onBlur={(e) => handleContentChange?.(e, 'education', edu.id, 'endDate')} dangerouslySetInnerHTML={{ __html: formatDate(edu.endDate) }}></p>
              </div>
            ))}
          </div>}
          
          {areasOfInterest?.length > 0 && <div className="mt-6 space-y-2">
            <h2 className="text-sm font-bold uppercase tracking-wider text-gray-400 border-b border-gray-600 pb-1">Interests</h2>
            <ul className="list-disc list-outside ml-4 text-sm">
              {areasOfInterest.map(item => (
                <li key={item.id} contentEditable onBlur={(e) => handleContentChange?.(e, 'areasOfInterest', item.id, 'name')} dangerouslySetInnerHTML={{ __html: item.name }}></li>
              ))}
            </ul>
          </div>}
        </div>

        {/* Main Content */}
        <div className="w-2/3 p-8">
          {personalInfo.summary && <section className="mb-6">
            <h2 className="text-lg font-bold uppercase tracking-wider border-b-2 border-gray-300 pb-1 mb-3">Profile</h2>
            <p className="text-gray-700 leading-relaxed" contentEditable onBlur={(e) => handleContentChange?.(e, 'personalInfo', '', 'summary')} dangerouslySetInnerHTML={{ __html: personalInfo.summary }}></p>
          </section>}
          
          {experience?.length > 0 && <section className="mb-6">
            <h2 className="text-lg font-bold uppercase tracking-wider border-b-2 border-gray-300 pb-1 mb-3">Experience</h2>
            <div className="space-y-5">
              {experience.map(exp => (
                <div key={exp.id}>
                  <div className="flex justify-between items-baseline">
                    <h3 className="font-semibold text-gray-800 text-lg" contentEditable onBlur={(e) => handleContentChange?.(e, 'experience', exp.id, 'jobTitle')} dangerouslySetInnerHTML={{ __html: exp.jobTitle }}></h3>
                    <p className="text-xs text-gray-500 font-medium"><span contentEditable onBlur={(e) => handleContentChange?.(e, 'experience', exp.id, 'startDate')} dangerouslySetInnerHTML={{ __html: formatDate(exp.startDate) }}></span> - <span contentEditable onBlur={(e) => handleContentChange?.(e, 'experience', exp.id, 'endDate')} dangerouslySetInnerHTML={{ __html: formatDate(exp.endDate) }}></span></p>
                  </div>
                  <p className="text-md text-gray-600 font-semibold" contentEditable onBlur={(e) => handleContentChange?.(e, 'experience', exp.id, 'company')} dangerouslySetInnerHTML={{ __html: `${exp.company} | ${exp.location}` }}></p>
                  <div className="mt-2 list-disc list-outside ml-4 space-y-1" contentEditable onBlur={(e) => handleContentChange?.(e, 'experience', exp.id, 'description')} dangerouslySetInnerHTML={{ __html: exp.description }}></div>
                </div>
              ))}
            </div>
          </section>}
          
          {projects?.length > 0 && <section className="mb-6">
            <h2 className="text-lg font-bold uppercase tracking-wider border-b-2 border-gray-300 pb-1 mb-3">Projects</h2>
            <div className="space-y-4">
              {projects.map(proj => (
                <div key={proj.id}>
                  <h3 className="font-semibold text-lg">
                    <span contentEditable onBlur={(e) => handleContentChange?.(e, 'projects', proj.id, 'name')} dangerouslySetInnerHTML={{ __html: proj.name }}></span>
                    {proj.url && <a href={`https://${proj.url}`} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline ml-2 text-sm">[LINK]</a>}
                  </h3>
                   <div className="mt-1 list-disc list-outside ml-4 space-y-1" contentEditable onBlur={(e) => handleContentChange?.(e, 'projects', proj.id, 'description')} dangerouslySetInnerHTML={{ __html: proj.description }}></div>
                </div>
              ))}
            </div>
          </section>}
          
          {certifications?.length > 0 && <section className="mb-6">
            <h2 className="text-lg font-bold uppercase tracking-wider border-b-2 border-gray-300 pb-1 mb-3">Certifications</h2>
             <ul className="list-disc list-outside ml-4 space-y-1">
              {certifications.map(cert => (
                <li key={cert.id}><span className="font-semibold" contentEditable onBlur={(e) => handleContentChange?.(e, 'certifications', cert.id, 'name')} dangerouslySetInnerHTML={{ __html: cert.name }}></span>, <span contentEditable onBlur={(e) => handleContentChange?.(e, 'certifications', cert.id, 'issuer')} dangerouslySetInnerHTML={{ __html: cert.issuer }}></span> (<span contentEditable onBlur={(e) => handleContentChange?.(e, 'certifications', cert.id, 'date')} dangerouslySetInnerHTML={{ __html: formatDate(cert.date) }}></span>)</li>
              ))}
            </ul>
          </section>}

          {achievements?.length > 0 && <section>
             <h2 className="text-lg font-bold uppercase tracking-wider border-b-2 border-gray-300 pb-1 mb-3">Achievements</h2>
             <ul className="list-disc list-outside ml-4 space-y-1 text-gray-700">
                {achievements.map(ach => (
                    <li key={ach.id} contentEditable onBlur={(e) => handleContentChange?.(e, 'achievements', ach.id, 'description')} dangerouslySetInnerHTML={{ __html: ach.description }}></li>
                ))}
            </ul>
          </section>}
        </div>
      </div>
    </div>
  );
}
