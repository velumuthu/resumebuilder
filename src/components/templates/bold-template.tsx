
import type { ResumeData } from '@/lib/types';
import { Mail, Phone, Globe, MapPin } from 'lucide-react';

interface TemplateProps {
  resumeData: ResumeData;
  handleContentChange?: (e: React.FocusEvent<HTMLElement>, section: keyof ResumeData, id: string, field: string) => void;
}

export default function BoldTemplate({ resumeData, handleContentChange }: TemplateProps) {
  const { personalInfo, experience, education, skills, projects, certifications, achievements, areasOfInterest } = resumeData;

  const formatDate = (dateString: string) => {
    if (!dateString || dateString.toLowerCase() === 'present') return 'Present';
    try {
      const date = new Date(dateString);
      return new Date(date.getTime() + date.getTimezoneOffset() * 60000).toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
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

  const Section = ({ title, children }: { title: string, children: React.ReactNode }) => (
    <section className="mb-6">
      <h2 className="text-2xl font-extrabold text-gray-800 tracking-tight pb-1 mb-4 border-b-4 border-black">
        {title}
      </h2>
      <div className="text-gray-700">
        {children}
      </div>
    </section>
  );

  return (
    <div className="bg-white text-gray-800 font-['Montserrat',_sans-serif] text-[10pt] w-full max-w-4xl mx-auto p-10 print:p-0">
      <header className="mb-8">
        <h1 className="text-6xl font-extrabold tracking-tighter" contentEditable onBlur={(e) => handleContentChange?.(e, 'personalInfo', '', 'name')} dangerouslySetInnerHTML={{ __html: personalInfo.name || 'Your Name' }}></h1>
        <div className="flex flex-wrap gap-x-6 gap-y-1 text-sm text-gray-500 mt-4">
          {personalInfo.address && <span contentEditable onBlur={(e) => handleContentChange?.(e, 'personalInfo', '', 'address')} dangerouslySetInnerHTML={{ __html: personalInfo.address }}></span>}
          {personalInfo.phone && <span contentEditable onBlur={(e) => handleContentChange?.(e, 'personalInfo', '', 'phone')} dangerouslySetInnerHTML={{ __html: personalInfo.phone }}></span>}
          {personalInfo.email && <span><a href={`mailto:${personalInfo.email}`} className="text-blue-600 hover:underline" contentEditable onBlur={(e) => handleContentChange?.(e, 'personalInfo', '', 'email')} dangerouslySetInnerHTML={{ __html: personalInfo.email }}></a></span>}
          {personalInfo.website && <span><a href={formatUrl(personalInfo.website)} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline" contentEditable onBlur={(e) => handleContentChange?.(e, 'personalInfo', '', 'website')} dangerouslySetInnerHTML={{ __html: personalInfo.website }}></a></span>}
        </div>
      </header>

      {personalInfo.summary && <Section title="Summary">
        <p className="leading-relaxed" contentEditable onBlur={(e) => handleContentChange?.(e, 'personalInfo', '', 'summary')} dangerouslySetInnerHTML={{ __html: personalInfo.summary }}></p>
      </Section>}

      {experience?.length > 0 && <Section title="Experience">
        <div className="space-y-6">
          {experience.map(exp => (
            <div key={exp.id}>
              <div className="flex justify-between items-baseline">
                <h3 className="text-xl font-bold" contentEditable onBlur={(e) => handleContentChange?.(e, 'experience', exp.id, 'jobTitle')} dangerouslySetInnerHTML={{ __html: exp.jobTitle }}></h3>
                <p className="text-sm font-semibold"><span contentEditable onBlur={(e) => handleContentChange?.(e, 'experience', exp.id, 'startDate')} dangerouslySetInnerHTML={{ __html: formatDate(exp.startDate) }}></span> - <span contentEditable onBlur={(e) => handleContentChange?.(e, 'experience', exp.id, 'endDate')} dangerouslySetInnerHTML={{ __html: formatDate(exp.endDate) }}></span></p>
              </div>
              <p className="text-lg text-gray-700 font-semibold"><span contentEditable onBlur={(e) => handleContentChange?.(e, 'experience', exp.id, 'company')} dangerouslySetInnerHTML={{ __html: exp.company }}></span> <span className="font-normal text-gray-500">| <span contentEditable onBlur={(e) => handleContentChange?.(e, 'experience', exp.id, 'location')} dangerouslySetInnerHTML={{ __html: exp.location }}></span></span></p>
              <div className="list-disc list-outside ml-5 mt-2 space-y-1" contentEditable onBlur={(e) => handleContentChange?.(e, 'experience', exp.id, 'description')} dangerouslySetInnerHTML={{ __html: exp.description }}></div>
            </div>
          ))}
        </div>
      </Section>}
      
      {education?.length > 0 && <Section title="Education">
        <div className="space-y-3">
          {education.map(edu => (
            <div key={edu.id}>
              <div className="flex justify-between items-baseline">
                <h3 className="text-xl font-bold" contentEditable onBlur={(e) => handleContentChange?.(e, 'education', edu.id, 'degree')} dangerouslySetInnerHTML={{ __html: edu.degree }}></h3>
                <p className="text-sm font-semibold" contentEditable onBlur={(e) => handleContentChange?.(e, 'education', edu.id, 'endDate')} dangerouslySetInnerHTML={{ __html: formatDate(edu.endDate) }}></p>
              </div>
              <p className="text-lg text-gray-700 font-semibold" contentEditable onBlur={(e) => handleContentChange?.(e, 'education', edu.id, 'school')} dangerouslySetInnerHTML={{ __html: edu.school }}></p>
            </div>
          ))}
        </div>
      </Section>}

      {skills?.length > 0 && <Section title="Skills">
        <div className="flex flex-wrap gap-3">
            {skills.map(s => <span key={s.id} className="bg-gray-800 text-white font-semibold text-sm px-4 py-2 rounded" contentEditable onBlur={(e) => handleContentChange?.(e, 'skills', s.id, 'name')} dangerouslySetInnerHTML={{ __html: s.name }}></span>)}
        </div>
      </Section>}
      
      {projects?.length > 0 && <Section title="Projects">
        <div className="space-y-5">
          {projects.map(proj => (
            <div key={proj.id}>
              <h3 className="text-xl font-bold"><span contentEditable onBlur={(e) => handleContentChange?.(e, 'projects', proj.id, 'name')} dangerouslySetInnerHTML={{ __html: proj.name }}></span>
                {proj.url && <a href={formatUrl(proj.url)} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline ml-2 text-sm">[VIEW]</a>}
              </h3>
               <div className="list-disc list-outside ml-5 mt-2 space-y-1" contentEditable onBlur={(e) => handleContentChange?.(e, 'projects', proj.id, 'description')} dangerouslySetInnerHTML={{ __html: proj.description }}></div>
            </div>
          ))}
        </div>
      </Section>}
      
      {certifications?.length > 0 && <Section title="Certifications">
         <ul className="list-disc list-outside ml-5 space-y-1">
            {certifications.map(cert => (
                 <li key={cert.id}><span className="font-semibold" contentEditable onBlur={(e) => handleContentChange?.(e, 'certifications', cert.id, 'name')} dangerouslySetInnerHTML={{ __html: cert.name }}></span> from <span contentEditable onBlur={(e) => handleContentChange?.(e, 'certifications', cert.id, 'issuer')} dangerouslySetInnerHTML={{ __html: cert.issuer }}></span> (<span contentEditable onBlur={(e) => handleContentChange?.(e, 'certifications', cert.id, 'date')} dangerouslySetInnerHTML={{ __html: formatDate(cert.date) }}></span>)</li>
            ))}
        </ul>
      </Section>}
      
      {achievements?.length > 0 && <Section title="Achievements">
        <ul className="list-disc list-outside ml-5 space-y-1">
          {achievements.map(ach => (
            <li key={ach.id} contentEditable onBlur={(e) => handleContentChange?.(e, 'achievements', ach.id, 'description')} dangerouslySetInnerHTML={{ __html: ach.description }}></li>
          ))}
        </ul>
      </Section>}
      
      {areasOfInterest?.length > 0 && <Section title="Interests">
        <p>{areasOfInterest.map((interest, i) => <span key={interest.id} contentEditable onBlur={(e) => handleContentChange?.(e, 'areasOfInterest', interest.id, 'name')} dangerouslySetInnerHTML={{ __html: interest.name + (i < areasOfInterest.length - 1 ? ', ' : '') }}></span>)}</p>
      </Section>}
    </div>
  );
}
