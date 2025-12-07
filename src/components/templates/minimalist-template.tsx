import type { ResumeData } from '@/lib/types';

interface TemplateProps {
  resumeData: ResumeData;
  handleContentChange?: (e: React.FocusEvent<HTMLElement>, section: keyof ResumeData, id: string, field: string) => void;
}

export default function MinimalistTemplate({ resumeData, handleContentChange }: TemplateProps) {
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
    <section className="mb-6 grid grid-cols-12">
      <h2 className="col-span-3 text-sm font-semibold uppercase tracking-widest text-gray-500 pt-1">
        {title}
      </h2>
      <div className="col-span-9">
        {children}
      </div>
    </section>
  );

  return (
    <div className="bg-white text-gray-800 font-['Inter',_sans-serif] text-[10pt] w-full max-w-4xl mx-auto p-12 print:p-0">
      <header className="text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight" contentEditable onBlur={(e) => handleContentChange?.(e, 'personalInfo', '', 'name')} dangerouslySetInnerHTML={{ __html: personalInfo.name || 'Your Name' }}></h1>
        <p className="text-md text-gray-500 mt-2">
          <span contentEditable onBlur={(e) => handleContentChange?.(e, 'personalInfo', '', 'email')} dangerouslySetInnerHTML={{ __html: personalInfo.email }}></span> &bull; <span contentEditable onBlur={(e) => handleContentChange?.(e, 'personalInfo', '', 'phone')} dangerouslySetInnerHTML={{ __html: personalInfo.phone }}></span> &bull; <span contentEditable onBlur={(e) => handleContentChange?.(e, 'personalInfo', '', 'website')} dangerouslySetInnerHTML={{ __html: personalInfo.website }}></span>
        </p>
      </header>
      
      {personalInfo.summary && <Section title="Profile">
        <p className="text-gray-700 leading-relaxed" contentEditable onBlur={(e) => handleContentChange?.(e, 'personalInfo', '', 'summary')} dangerouslySetInnerHTML={{ __html: personalInfo.summary }}></p>
      </Section>}

      {experience?.length > 0 && <Section title="Experience">
        <div className="space-y-5">
          {experience.map(exp => (
            <div key={exp.id}>
              <div className="flex justify-between items-baseline">
                <h3 className="font-semibold text-lg" contentEditable onBlur={(e) => handleContentChange?.(e, 'experience', exp.id, 'company')} dangerouslySetInnerHTML={{ __html: exp.company }}></h3>
                <p className="text-sm text-gray-500"><span contentEditable onBlur={(e) => handleContentChange?.(e, 'experience', exp.id, 'startDate')} dangerouslySetInnerHTML={{ __html: formatDate(exp.startDate) }}></span> &mdash; <span contentEditable onBlur={(e) => handleContentChange?.(e, 'experience', exp.id, 'endDate')} dangerouslySetInnerHTML={{ __html: formatDate(exp.endDate) }}></span></p>
              </div>
              <p className="text-md text-gray-700" contentEditable onBlur={(e) => handleContentChange?.(e, 'experience', exp.id, 'jobTitle')} dangerouslySetInnerHTML={{ __html: exp.jobTitle }}></p>
              <div className="list-disc list-outside ml-4 mt-1 space-y-1" contentEditable onBlur={(e) => handleContentChange?.(e, 'experience', exp.id, 'description')} dangerouslySetInnerHTML={{ __html: exp.description }}></div>
            </div>
          ))}
        </div>
      </Section>}
      
      {education?.length > 0 && <Section title="Education">
        <div className="space-y-4">
          {education.map(edu => (
            <div key={edu.id}>
                <div className="flex justify-between items-baseline">
                    <h3 className="font-semibold text-lg" contentEditable onBlur={(e) => handleContentChange?.(e, 'education', edu.id, 'school')} dangerouslySetInnerHTML={{ __html: edu.school }}></h3>
                    <p className="text-sm text-gray-500" contentEditable onBlur={(e) => handleContentChange?.(e, 'education', edu.id, 'endDate')} dangerouslySetInnerHTML={{ __html: formatDate(edu.endDate) }}></p>
                </div>
                <p className="text-md text-gray-700" contentEditable onBlur={(e) => handleContentChange?.(e, 'education', edu.id, 'degree')} dangerouslySetInnerHTML={{ __html: edu.degree }}></p>
            </div>
          ))}
        </div>
      </Section>}
      
      {skills?.length > 0 && <Section title="Skills">
        <p className="text-gray-700 leading-relaxed">{skills.map((s, i) => <span key={s.id} contentEditable onBlur={(e) => handleContentChange?.(e, 'skills', s.id, 'name')} dangerouslySetInnerHTML={{ __html: s.name + (i < skills.length - 1 ? ', ' : '') }}></span>)}</p>
      </Section>}

      {projects?.length > 0 && <Section title="Projects">
        <div className="space-y-5">
          {projects.map(proj => (
            <div key={proj.id}>
              <h3 className="font-semibold text-lg">
                <span contentEditable onBlur={(e) => handleContentChange?.(e, 'projects', proj.id, 'name')} dangerouslySetInnerHTML={{ __html: proj.name }}></span>
                {proj.url && <a href={`https://${proj.url}`} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline ml-2 text-sm">[link]</a>}
              </h3>
              <div className="list-disc list-outside ml-4 mt-1 space-y-1" contentEditable onBlur={(e) => handleContentChange?.(e, 'projects', proj.id, 'description')} dangerouslySetInnerHTML={{ __html: proj.description }}></div>
            </div>
          ))}
        </div>
      </Section>}

      {certifications?.length > 0 && <Section title="Certifications">
        <ul className="list-disc list-outside ml-4 mt-1 space-y-1">
            {certifications.map(cert => (
                 <li key={cert.id} contentEditable onBlur={(e) => handleContentChange?.(e, 'certifications', cert.id, 'name')} dangerouslySetInnerHTML={{ __html: `${cert.name} - ${cert.issuer} (${formatDate(cert.date)})`}}></li>
            ))}
        </ul>
      </Section>}

      {achievements?.length > 0 && <Section title="Achievements">
        <ul className="list-disc list-outside ml-4 space-y-1">
          {achievements.map(ach => (
            <li key={ach.id} contentEditable onBlur={(e) => handleContentChange?.(e, 'achievements', ach.id, 'description')} dangerouslySetInnerHTML={{ __html: ach.description }}></li>
          ))}
        </ul>
      </Section>}

      {areasOfInterest?.length > 0 && <Section title="Interests">
        <p className="text-gray-700 leading-relaxed">{areasOfInterest.map((interest, i) => <span key={interest.id} contentEditable onBlur={(e) => handleContentChange?.(e, 'areasOfInterest', interest.id, 'name')} dangerouslySetInnerHTML={{ __html: interest.name + (i < areasOfInterest.length - 1 ? ', ' : '') }}></span>)}</p>
      </Section>}
    </div>
  );
}
