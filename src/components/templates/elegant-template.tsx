import type { ResumeData } from '@/lib/types';

interface TemplateProps {
  resumeData: ResumeData;
  handleContentChange?: (e: React.FocusEvent<HTMLElement>, section: keyof ResumeData, id: string, field: string) => void;
}

export default function ElegantTemplate({ resumeData, handleContentChange }: TemplateProps) {
  const { personalInfo, experience, education, skills, projects, certifications, achievements, areasOfInterest } = resumeData;

  const formatDate = (dateString: string) => {
    if (!dateString || dateString.toLowerCase() === 'present') return 'Present';
    try {
      const date = new Date(dateString);
      return new Date(date.getTime() + date.getTimezoneOffset() * 60000).toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
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
      <h2 className="text-sm font-light uppercase tracking-[0.2em] text-gray-500 mb-4 text-center">
        {title}
      </h2>
      {children}
    </section>
  );

  return (
    <div className="bg-white text-gray-800 font-['Lato',_sans-serif] text-[11pt] w-full max-w-4xl mx-auto p-12 print:p-0">
      <header className="text-center mb-10">
        <h1 className="text-5xl font-thin tracking-wider" contentEditable onBlur={(e) => handleContentChange?.(e, 'personalInfo', '', 'name')} dangerouslySetInnerHTML={{ __html: personalInfo.name || 'Your Name' }}></h1>
        <div className="border-b border-gray-200 my-6 w-1/4 mx-auto"></div>
        <p className="text-sm text-gray-600">
          <span contentEditable onBlur={(e) => handleContentChange?.(e, 'personalInfo', '', 'address')} dangerouslySetInnerHTML={{ __html: personalInfo.address }}></span> | <span contentEditable onBlur={(e) => handleContentChange?.(e, 'personalInfo', '', 'phone')} dangerouslySetInnerHTML={{ __html: personalInfo.phone }}></span> | <a href={`mailto:${personalInfo.email}`} className="text-cyan-700 hover:underline" contentEditable onBlur={(e) => handleContentChange?.(e, 'personalInfo', '', 'email')} dangerouslySetInnerHTML={{ __html: personalInfo.email }}></a>
          {personalInfo.website && <> | <a href={formatUrl(personalInfo.website)} target="_blank" rel="noreferrer noopener" className="text-cyan-700 hover:underline" contentEditable onBlur={(e) => handleContentChange?.(e, 'personalInfo', '', 'website')} dangerouslySetInnerHTML={{ __html: personalInfo.website }}></a></>}
        </p>
      </header>
      
      {personalInfo.summary && <p className="text-center text-gray-700 leading-relaxed mb-10 italic" contentEditable onBlur={(e) => handleContentChange?.(e, 'personalInfo', '', 'summary')} dangerouslySetInnerHTML={{ __html: personalInfo.summary }}></p>}

      {experience?.length > 0 && <Section title="Experience">
        <div className="space-y-6">
          {experience.map(exp => (
            <div key={exp.id}>
              <div className="flex justify-between items-baseline">
                <h3 className="text-xl font-semibold text-gray-800" contentEditable onBlur={(e) => handleContentChange?.(e, 'experience', exp.id, 'jobTitle')} dangerouslySetInnerHTML={{ __html: exp.jobTitle }}></h3>
                <p className="text-sm text-gray-500"><span contentEditable onBlur={(e) => handleContentChange?.(e, 'experience', exp.id, 'startDate')} dangerouslySetInnerHTML={{ __html: formatDate(exp.startDate) }}></span> - <span contentEditable onBlur={(e) => handleContentChange?.(e, 'experience', exp.id, 'endDate')} dangerouslySetInnerHTML={{ __html: formatDate(exp.endDate) }}></span></p>
              </div>
              <p className="text-md text-gray-600" contentEditable onBlur={(e) => handleContentChange?.(e, 'experience', exp.id, 'company')} dangerouslySetInnerHTML={{ __html: `${exp.company}, ${exp.location}` }}></p>
              <div className="list-disc list-outside ml-5 mt-2 space-y-1" contentEditable onBlur={(e) => handleContentChange?.(e, 'experience', exp.id, 'description')} dangerouslySetInnerHTML={{ __html: exp.description }}></div>
            </div>
          ))}
        </div>
      </Section>}
      
      {education?.length > 0 && <Section title="Education">
        <div className="space-y-4">
          {education.map(edu => (
            <div key={edu.id} className="text-center">
              <h3 className="text-xl font-semibold" contentEditable onBlur={(e) => handleContentChange?.(e, 'education', edu.id, 'degree')} dangerouslySetInnerHTML={{ __html: edu.degree }}></h3>
              <p className="text-md text-gray-600"><span contentEditable onBlur={(e) => handleContentChange?.(e, 'education', edu.id, 'school')} dangerouslySetInnerHTML={{ __html: edu.school }}></span> (<span contentEditable onBlur={(e) => handleContentChange?.(e, 'education', edu.id, 'endDate')} dangerouslySetInnerHTML={{ __html: formatDate(edu.endDate) }}></span>)</p>
            </div>
          ))}
        </div>
      </Section>}
      
      <div className="grid grid-cols-2 gap-x-12">
        {skills?.length > 0 && <Section title="Skills">
          <div className="flex flex-wrap justify-center gap-2">
            {skills.map(s => <span key={s.id} className="bg-gray-100 text-gray-700 text-sm px-3 py-1 rounded-full" contentEditable onBlur={(e) => handleContentChange?.(e, 'skills', s.id, 'name')} dangerouslySetInnerHTML={{ __html: s.name }}></span>)}
          </div>
        </Section>}
        
        {areasOfInterest?.length > 0 && <Section title="Interests">
          <div className="flex flex-wrap justify-center gap-2">
            {areasOfInterest.map(s => <span key={s.id} className="bg-cyan-50 text-cyan-800 text-sm px-3 py-1 rounded-full" contentEditable onBlur={(e) => handleContentChange?.(e, 'areasOfInterest', s.id, 'name')} dangerouslySetInnerHTML={{ __html: s.name }}></span>)}
          </div>
        </Section>}
      </div>

      {projects?.length > 0 && <Section title="Projects">
        <div className="space-y-5">
          {projects.map(proj => (
            <div key={proj.id}>
              <h3 className="text-xl font-semibold">
                <span contentEditable onBlur={(e) => handleContentChange?.(e, 'projects', proj.id, 'name')} dangerouslySetInnerHTML={{ __html: proj.name }}></span>
                {proj.url && <a href={formatUrl(proj.url)} target="_blank" rel="noopener noreferrer" className="text-cyan-700 hover:underline ml-2 text-sm">[Link]</a>}
              </h3>
              <div className="list-disc list-outside ml-5 mt-2 space-y-1" contentEditable onBlur={(e) => handleContentChange?.(e, 'projects', proj.id, 'description')} dangerouslySetInnerHTML={{ __html: proj.description }}></div>
            </div>
          ))}
        </div>
      </Section>}
      
      {certifications?.length > 0 && <Section title="Certifications">
        <ul className="list-disc list-outside ml-5 space-y-1">
            {certifications.map(cert => (
                 <li key={cert.id}><span className="font-semibold" contentEditable onBlur={(e) => handleContentChange?.(e, 'certifications', cert.id, 'name')} dangerouslySetInnerHTML={{ __html: cert.name }}></span>, <span contentEditable onBlur={(e) => handleContentChange?.(e, 'certifications', cert.id, 'issuer')} dangerouslySetInnerHTML={{ __html: cert.issuer }}></span> (<span contentEditable onBlur={(e) => handleContentChange?.(e, 'certifications', cert.id, 'date')} dangerouslySetInnerHTML={{ __html: formatDate(cert.date) }}></span>)</li>
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
    </div>
  );
}
