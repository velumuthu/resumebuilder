
import type { ResumeData } from '@/lib/types';
import { Mail, Phone, Globe, MapPin } from 'lucide-react';

interface TemplateProps {
  resumeData: ResumeData;
  handleContentChange?: (e: React.FocusEvent<HTMLElement>, section: keyof ResumeData, id: string, field: string) => void;
}

export default function ModernTemplate({ resumeData, handleContentChange }: TemplateProps) {
  const { personalInfo, experience, education, skills, projects, achievements, certifications, areasOfInterest } = resumeData;

  const formatDate = (dateString: string, format: 'month-year' | 'year' = 'month-year') => {
    if (!dateString || dateString.toLowerCase() === 'present') return 'Present';
    try {
      const date = new Date(dateString);
      const adjustedDate = new Date(date.getTime() + date.getTimezoneOffset() * 60000);
      if (format === 'year') return adjustedDate.getFullYear().toString();
      return adjustedDate.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
    } catch {
      return dateString;
    }
  };

  const formatUrl = (url: string) => {
    if (!url) return '#';
    if (url.startsWith('http://') || url.startsWith('https://')) {
      return url;
    }
    return `https://${url}`;
  };

  return (
    <div className="bg-white text-gray-800 font-['Inter'] text-[10pt] leading-snug w-full max-w-4xl mx-auto p-6 md:p-8 print:p-0">
      <div className="grid grid-cols-12 gap-x-8">
        {/* Left Column */}
        <div className="col-span-4 pr-6 border-r border-gray-200">
          <header className="text-left mb-8">
            <h1 className="text-3xl font-bold text-gray-800 tracking-tight" contentEditable onBlur={(e) => handleContentChange?.(e, 'personalInfo', '', 'name')} dangerouslySetInnerHTML={{ __html: personalInfo.name || 'Your Name' }}></h1>
          </header>

          <section className="mb-6">
            <h2 className="text-sm font-bold uppercase tracking-wider text-blue-600 mb-3">Contact</h2>
            <div className="space-y-2 text-sm text-gray-600">
              {personalInfo.email && <div className="flex items-center gap-2"><Mail size={14} /><a href={`mailto:${personalInfo.email}`} className="hover:underline" contentEditable onBlur={(e) => handleContentChange?.(e, 'personalInfo', '', 'email')} dangerouslySetInnerHTML={{ __html: personalInfo.email }}></a></div>}
              {personalInfo.phone && <div className="flex items-center gap-2"><Phone size={14} /><span contentEditable onBlur={(e) => handleContentChange?.(e, 'personalInfo', '', 'phone')} dangerouslySetInnerHTML={{ __html: personalInfo.phone }}></span></div>}
              {personalInfo.website && <div className="flex items-center gap-2"><Globe size={14} /><a href={formatUrl(personalInfo.website)} target="_blank" rel="noopener noreferrer" className="hover:underline" contentEditable onBlur={(e) => handleContentChange?.(e, 'personalInfo', '', 'website')} dangerouslySetInnerHTML={{ __html: personalInfo.website }}></a></div>}
              {personalInfo.address && <div className="flex items-center gap-2"><MapPin size={14} /><span contentEditable onBlur={(e) => handleContentChange?.(e, 'personalInfo', '', 'address')} dangerouslySetInnerHTML={{ __html: personalInfo.address }}></span></div>}
            </div>
          </section>

          {education?.length > 0 && <section className="mb-6">
            <h2 className="text-sm font-bold uppercase tracking-wider text-blue-600 mb-3">Education</h2>
            {education.map(edu => (
              <div key={edu.id} className="mb-3">
                <h3 className="font-semibold text-gray-800" contentEditable onBlur={(e) => handleContentChange?.(e, 'education', edu.id, 'degree')} dangerouslySetInnerHTML={{ __html: edu.degree }}></h3>
                <p className="text-sm text-gray-600" contentEditable onBlur={(e) => handleContentChange?.(e, 'education', edu.id, 'school')} dangerouslySetInnerHTML={{ __html: edu.school }}></p>
                <p className="text-xs text-gray-500"><span contentEditable onBlur={(e) => handleContentChange?.(e, 'education', edu.id, 'startDate')} dangerouslySetInnerHTML={{ __html: formatDate(edu.startDate, 'year') }}></span> - <span contentEditable onBlur={(e) => handleContentChange?.(e, 'education', edu.id, 'endDate')} dangerouslySetInnerHTML={{ __html: formatDate(edu.endDate, 'year') }}></span></p>
              </div>
            ))}
          </section>}

          {skills?.length > 0 && <section className="mb-6">
            <h2 className="text-sm font-bold uppercase tracking-wider text-blue-600 mb-3">Skills</h2>
            <div className="flex flex-wrap gap-2">
              {skills.map(skill => (
                <span key={skill.id} className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-1 rounded-full" contentEditable onBlur={(e) => handleContentChange?.(e, 'skills', skill.id, 'name')} dangerouslySetInnerHTML={{ __html: skill.name }}></span>
              ))}
            </div>
          </section>}
          
          {areasOfInterest?.length > 0 && <section>
            <h2 className="text-sm font-bold uppercase tracking-wider text-blue-600 mb-3">Interests</h2>
            <div className="flex flex-wrap gap-2">
              {areasOfInterest.map(item => (
                <span key={item.id} className="bg-gray-100 text-gray-800 text-xs font-medium px-2.5 py-1 rounded-full" contentEditable onBlur={(e) => handleContentChange?.(e, 'areasOfInterest', item.id, 'name')} dangerouslySetInnerHTML={{ __html: item.name }}></span>
              ))}
            </div>
          </section>}
        </div>

        {/* Right Column */}
        <div className="col-span-8">
          {personalInfo.summary && <section className="mb-6">
            <h2 className="text-lg font-bold text-gray-800 border-b-2 border-gray-200 pb-1 mb-3">Profile</h2>
            <p className="text-gray-600" contentEditable onBlur={(e) => handleContentChange?.(e, 'personalInfo', '', 'summary')} dangerouslySetInnerHTML={{ __html: personalInfo.summary }}></p>
          </section>}

          {experience?.length > 0 && <section className="mb-6">
            <h2 className="text-lg font-bold text-gray-800 border-b-2 border-gray-200 pb-1 mb-3">Experience</h2>
            <div className="space-y-4">
              {experience.map(exp => (
                <div key={exp.id}>
                  <div className="flex justify-between items-baseline">
                    <h3 className="font-semibold text-gray-800" contentEditable onBlur={(e) => handleContentChange?.(e, 'experience', exp.id, 'jobTitle')} dangerouslySetInnerHTML={{ __html: exp.jobTitle }}></h3>
                    <p className="text-sm text-gray-500 font-medium"><span contentEditable onBlur={(e) => handleContentChange?.(e, 'experience', exp.id, 'startDate')} dangerouslySetInnerHTML={{ __html: formatDate(exp.startDate) }}></span> - <span contentEditable onBlur={(e) => handleContentChange?.(e, 'experience', exp.id, 'endDate')} dangerouslySetInnerHTML={{ __html: formatDate(exp.endDate) }}></span></p>
                  </div>
                  <p className="text-sm text-gray-600"><span contentEditable onBlur={(e) => handleContentChange?.(e, 'experience', exp.id, 'company')} dangerouslySetInnerHTML={{ __html: exp.company }}></span> | <span contentEditable onBlur={(e) => handleContentChange?.(e, 'experience', exp.id, 'location')} dangerouslySetInnerHTML={{ __html: exp.location }}></span></p>
                  <div className="mt-2 list-disc list-outside ml-4 space-y-1" contentEditable onBlur={(e) => handleContentChange?.(e, 'experience', exp.id, 'description')} dangerouslySetInnerHTML={{ __html: exp.description }}></div>
                </div>
              ))}
            </div>
          </section>}
          
          {projects?.length > 0 && <section className="mb-6">
            <h2 className="text-lg font-bold text-gray-800 border-b-2 border-gray-200 pb-1 mb-3">Projects</h2>
            <div className="space-y-4">
              {projects.map(proj => (
                <div key={proj.id}>
                  <h3 className="font-semibold text-gray-800">
                    <span contentEditable onBlur={(e) => handleContentChange?.(e, 'projects', proj.id, 'name')} dangerouslySetInnerHTML={{ __html: proj.name }}></span>
                    {proj.url && <a href={formatUrl(proj.url)} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline ml-2 text-sm">[Link]</a>}
                  </h3>
                   <div className="mt-1 list-disc list-outside ml-4 space-y-1" contentEditable onBlur={(e) => handleContentChange?.(e, 'projects', proj.id, 'description')} dangerouslySetInnerHTML={{ __html: proj.description }}></div>
                </div>
              ))}
            </div>
          </section>}
          
          {certifications?.length > 0 && <section className="mb-6">
            <h2 className="text-lg font-bold text-gray-800 border-b-2 border-gray-200 pb-1 mb-3">Certifications</h2>
            <div className="space-y-2">
              {certifications.map(cert => (
                <div key={cert.id}>
                  <h3 className="font-semibold text-gray-800" contentEditable onBlur={(e) => handleContentChange?.(e, 'certifications', cert.id, 'name')} dangerouslySetInnerHTML={{ __html: cert.name }}></h3>
                  <p className="text-sm text-gray-600"><span contentEditable onBlur={(e) => handleContentChange?.(e, 'certifications', cert.id, 'issuer')} dangerouslySetInnerHTML={{ __html: cert.issuer }}></span> - <span contentEditable onBlur={(e) => handleContentChange?.(e, 'certifications', cert.id, 'date')} dangerouslySetInnerHTML={{ __html: formatDate(cert.date) }}></span></p>
                </div>
              ))}
            </div>
          </section>}

          {achievements?.length > 0 && <section>
             <h2 className="text-lg font-bold text-gray-800 border-b-2 border-gray-200 pb-1 mb-3">Achievements</h2>
             <ul className="list-disc list-outside ml-4 space-y-1 text-gray-600">
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
