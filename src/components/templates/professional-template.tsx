import type { ResumeData } from '@/lib/types';
import { Mail, Phone, Globe, MapPin } from 'lucide-react';

interface TemplateProps {
  resumeData: ResumeData;
  handleContentChange?: (e: React.FocusEvent<HTMLElement>, section: keyof ResumeData, id: string, field: string) => void;
}

export default function ProfessionalTemplate({ resumeData, handleContentChange }: TemplateProps) {
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
  
  const Section = ({ title, children }: { title: string, children: React.ReactNode }) => (
    <section className="mb-5">
      <h2 className="text-sm font-bold uppercase tracking-wider text-gray-800 border-b-2 border-gray-300 pb-1 mb-3">
        {title}
      </h2>
      {children}
    </section>
  );

  return (
    <div className="bg-white text-gray-800 font-['Times_New_Roman',_serif] text-[11pt] w-full max-w-4xl mx-auto p-8 md:p-10 print:p-0">
      <header className="text-center mb-6">
        <h1 className="text-3xl font-bold tracking-wider" contentEditable onBlur={(e) => handleContentChange?.(e, 'personalInfo', '', 'name')} dangerouslySetInnerHTML={{ __html: personalInfo.name || 'Your Name' }}></h1>
        <div className="flex justify-center items-center flex-wrap gap-x-4 text-sm text-gray-600 mt-2">
            {personalInfo.address && <div className="flex items-center gap-1.5"><MapPin size={12} /> <span contentEditable onBlur={(e) => handleContentChange?.(e, 'personalInfo', '', 'address')} dangerouslySetInnerHTML={{ __html: personalInfo.address }}></span></div>}
            {personalInfo.phone && <div className="flex items-center gap-1.5"><Phone size={12} /> <span contentEditable onBlur={(e) => handleContentChange?.(e, 'personalInfo', '', 'phone')} dangerouslySetInnerHTML={{ __html: personalInfo.phone }}></span></div>}
            {personalInfo.email && <div className="flex items-center gap-1.5"><Mail size={12} /> <a href={`mailto:${personalInfo.email}`} className="text-blue-700 hover:underline" contentEditable onBlur={(e) => handleContentChange?.(e, 'personalInfo', '', 'email')} dangerouslySetInnerHTML={{ __html: personalInfo.email }}></a></div>}
            {personalInfo.website && <div className="flex items-center gap-1.5"><Globe size={12} /> <a href={`https://${personalInfo.website}`} target="_blank" rel="noreferrer noopener" className="text-blue-700 hover:underline" contentEditable onBlur={(e) => handleContentChange?.(e, 'personalInfo', '', 'website')} dangerouslySetInnerHTML={{ __html: personalInfo.website }}></a></div>}
        </div>
      </header>

      {personalInfo.summary && <p className="text-center text-base mb-6 leading-relaxed" contentEditable onBlur={(e) => handleContentChange?.(e, 'personalInfo', '', 'summary')} dangerouslySetInnerHTML={{ __html: personalInfo.summary }}></p>}

      {experience?.length > 0 && <Section title="Professional Experience">
        <div className="space-y-4">
          {experience.map(exp => (
            <div key={exp.id}>
              <div className="flex justify-between items-baseline mb-1">
                <h3 className="text-lg font-semibold" contentEditable onBlur={(e) => handleContentChange?.(e, 'experience', exp.id, 'jobTitle')} dangerouslySetInnerHTML={{ __html: exp.jobTitle }}></h3>
                <p className="text-sm font-medium"><span contentEditable onBlur={(e) => handleContentChange?.(e, 'experience', exp.id, 'startDate')} dangerouslySetInnerHTML={{ __html: formatDate(exp.startDate) }}></span> - <span contentEditable onBlur={(e) => handleContentChange?.(e, 'experience', exp.id, 'endDate')} dangerouslySetInnerHTML={{ __html: formatDate(exp.endDate) }}></span></p>
              </div>
              <div className="flex justify-between items-baseline mb-1">
                <p className="font-medium text-gray-700" contentEditable onBlur={(e) => handleContentChange?.(e, 'experience', exp.id, 'company')} dangerouslySetInnerHTML={{ __html: exp.company }}></p>
                <p className="text-sm italic text-gray-600" contentEditable onBlur={(e) => handleContentChange?.(e, 'experience', exp.id, 'location')} dangerouslySetInnerHTML={{ __html: exp.location }}></p>
              </div>
              <div className="list-disc list-outside ml-5 space-y-1" contentEditable onBlur={(e) => handleContentChange?.(e, 'experience', exp.id, 'description')} dangerouslySetInnerHTML={{ __html: exp.description }}></div>
            </div>
          ))}
        </div>
      </Section>}
      
      {education?.length > 0 && <Section title="Education">
        <div className="space-y-3">
          {education.map(edu => (
            <div key={edu.id}>
              <div className="flex justify-between items-baseline">
                <h3 className="text-lg font-semibold" contentEditable onBlur={(e) => handleContentChange?.(e, 'education', edu.id, 'school')} dangerouslySetInnerHTML={{ __html: edu.school }}></h3>
                 <p className="text-sm font-medium"><span contentEditable onBlur={(e) => handleContentChange?.(e, 'education', edu.id, 'startDate')} dangerouslySetInnerHTML={{ __html: formatDate(edu.startDate) }}></span> - <span contentEditable onBlur={(e) => handleContentChange?.(e, 'education', edu.id, 'endDate')} dangerouslySetInnerHTML={{ __html: formatDate(edu.endDate) }}></span></p>
              </div>
              <p className="font-medium text-gray-700" contentEditable onBlur={(e) => handleContentChange?.(e, 'education', edu.id, 'degree')} dangerouslySetInnerHTML={{ __html: edu.degree }}></p>
            </div>
          ))}
        </div>
      </Section>}

      {skills?.length > 0 && <Section title="Skills">
         <div className="columns-2 md:columns-3">
            {skills.map(s => <p key={s.id} className="text-gray-700" contentEditable onBlur={(e) => handleContentChange?.(e, 'skills', s.id, 'name')} dangerouslySetInnerHTML={{ __html: s.name }}></p>)}
        </div>
      </Section>}

      {projects?.length > 0 && <Section title="Projects">
        <div className="space-y-4">
          {projects.map(proj => (
            <div key={proj.id}>
              <h3 className="font-semibold text-lg">
                <span contentEditable onBlur={(e) => handleContentChange?.(e, 'projects', proj.id, 'name')} dangerouslySetInnerHTML={{ __html: proj.name }}></span>
                {proj.url && <a href={`https://${proj.url}`} target="_blank" rel="noopener noreferrer" className="text-blue-700 hover:underline ml-2 text-sm">[Link]</a>}
              </h3>
              <div className="list-disc list-outside ml-5 space-y-1" contentEditable onBlur={(e) => handleContentChange?.(e, 'projects', proj.id, 'description')} dangerouslySetInnerHTML={{ __html: proj.description }}></div>
            </div>
          ))}
        </div>
      </Section>}

      {certifications?.length > 0 && <Section title="Certifications">
        <ul className="list-disc list-outside ml-5 space-y-1">
            {certifications.map(cert => (
                 <li key={cert.id} contentEditable onBlur={(e) => handleContentChange?.(e, 'certifications', cert.id, 'name')} dangerouslySetInnerHTML={{ __html: `${cert.name} - ${cert.issuer} (${formatDate(cert.date)})`}}></li>
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

      {areasOfInterest?.length > 0 && <Section title="Areas of Interest">
        <p className="text-gray-700">{areasOfInterest.map((interest, index) => (<span key={interest.id} contentEditable onBlur={(e) => handleContentChange?.(e, 'areasOfInterest', interest.id, 'name')} dangerouslySetInnerHTML={{ __html: interest.name + (index < areasOfInterest.length - 1 ? ' | ' : '') }}></span>))}</p>
      </Section>}
    </div>
  );
}
