import type { ResumeData } from '@/lib/types';

interface TemplateProps {
  resumeData: ResumeData;
  handleContentChange?: (e: React.FocusEvent<HTMLElement>, section: keyof ResumeData, id: string, field: string) => void;
}

export default function ClassicTemplate({ resumeData, handleContentChange }: TemplateProps) {
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

  const Section = ({ title, children }: { title: string, children: React.ReactNode }) => (
    <section className="mb-4">
      <h2 className="text-center text-sm font-bold text-gray-800 uppercase tracking-widest border-t-2 border-b-2 border-gray-800 py-1 mb-3">
        {title}
      </h2>
      {children}
    </section>
  );

  return (
    <div className="bg-white text-gray-800 font-['Georgia',_serif] text-[11pt] w-full max-w-4xl mx-auto p-8 md:p-10 print:p-0">
      <header className="text-center mb-6">
        <h1 className="text-4xl font-bold tracking-wider" contentEditable onBlur={(e) => handleContentChange?.(e, 'personalInfo', '', 'name')} dangerouslySetInnerHTML={{ __html: personalInfo.name || 'velumuthu' }}></h1>
        <p className="text-sm mt-2" contentEditable onBlur={(e) => handleContentChange?.(e, 'personalInfo', '', 'address')} dangerouslySetInnerHTML={{ __html: personalInfo.address }}></p>
        <p className="text-sm mt-2" contentEditable onBlur={(e) => handleContentChange?.(e, 'personalInfo', '', 'phone')} dangerouslySetInnerHTML={{ __html: personalInfo.phone }}></p>
        <a href={`mailto:${personalInfo.email || 'velumuthu.cse@gmail.com'}`} className="text-blue-700 hover:underline" contentEditable onBlur={(e) => handleContentChange?.(e, 'personalInfo', '', 'email')} dangerouslySetInnerHTML={{ __html: personalInfo.email || 'velumuthu.cse@gmail.com' }}></a>
        {personalInfo.website && <> | <a href={`https://${personalInfo.website}`} target="_blank" rel="noreferrer noopener" className="text-blue-700 hover:underline" dangerouslySetInnerHTML={{ __html: personalInfo.website || 'velumuthu.netlify.app' }}></a></>}
      </header>

      {personalInfo.summary && <Section title="Summary">
        <p className="text-center text-gray-700 leading-relaxed" contentEditable onBlur={(e) => handleContentChange?.(e, 'personalInfo', '', 'summary')} dangerouslySetInnerHTML={{ __html: personalInfo.summary }}></p>
      </Section>}

      {skills?.length > 0 && <Section title="Skills">
        <p className="text-center text-gray-700">{skills.map(s => <span key={s.id} contentEditable onBlur={(e) => handleContentChange?.(e, 'skills', s.id, 'name')} dangerouslySetInnerHTML={{ __html: s.name }}></span>).reduce((prev, curr) => <>{prev} • {curr}</>)}</p>
      </Section>}

      {experience?.length > 0 && <Section title="Experience">
        <div className="space-y-4">
          {experience.map(exp => (
            <div key={exp.id}>
              <div className="flex justify-between items-baseline">
                <h3 className="text-lg font-semibold" contentEditable onBlur={(e) => handleContentChange?.(e, 'experience', exp.id, 'jobTitle')} dangerouslySetInnerHTML={{ __html: exp.jobTitle }}></h3>
                <p className="text-sm font-medium"><span contentEditable onBlur={(e) => handleContentChange?.(e, 'experience', exp.id, 'startDate')} dangerouslySetInnerHTML={{ __html: formatDate(exp.startDate) }}></span> - <span contentEditable onBlur={(e) => handleContentChange?.(e, 'experience', exp.id, 'endDate')} dangerouslySetInnerHTML={{ __html: formatDate(exp.endDate) }}></span></p>
              </div>
              <div className="flex justify-between items-baseline mb-1">
                <p className="italic" contentEditable onBlur={(e) => handleContentChange?.(e, 'experience', exp.id, 'company')} dangerouslySetInnerHTML={{ __html: exp.company }}></p>
                <p className="text-sm italic" contentEditable onBlur={(e) => handleContentChange?.(e, 'experience', exp.id, 'location')} dangerouslySetInnerHTML={{ __html: exp.location }}></p>
              </div>
              <div contentEditable onBlur={(e) => handleContentChange?.(e, 'experience', exp.id, 'description')} dangerouslySetInnerHTML={{ __html: exp.description }}></div>
            </div>
          ))}
        </div>
      </Section>}

      {projects?.length > 0 && <Section title="Projects">
        <div className="space-y-3">
          {projects.map(proj => (
            <div key={proj.id}>
              <h3 className="font-semibold" contentEditable onBlur={(e) => handleContentChange?.(e, 'projects', proj.id, 'name')} dangerouslySetInnerHTML={{ __html: proj.name }}></h3>
              {proj.url && <a href={`https://${proj.url}`} target="_blank" rel="noopener noreferrer" className="text-blue-700 hover:underline ml-2 text-sm">[Link]</a>}
              <div contentEditable onBlur={(e) => handleContentChange?.(e, 'projects', proj.id, 'description')} dangerouslySetInnerHTML={{ __html: proj.description }}></div>
            </div>
          ))}
        </div>
      </Section>}

      {education?.length > 0 && <Section title="Education">
        <div className="space-y-2">
          {education.map(edu => (
            <div key={edu.id}>
              <div className="flex justify-between items-baseline">
                <h3 className="text-lg font-semibold" contentEditable onBlur={(e) => handleContentChange?.(e, 'education', edu.id, 'school')} dangerouslySetInnerHTML={{ __html: edu.school }}></h3>
                <p className="text-sm font-medium" contentEditable onBlur={(e) => handleContentChange?.(e, 'education', edu.id, 'endDate')} dangerouslySetInnerHTML={{ __html: formatDate(edu.endDate) }}></p>
              </div>
              <p className="italic" contentEditable onBlur={(e) => handleContentChange?.(e, 'education', edu.id, 'degree')} dangerouslySetInnerHTML={{ __html: edu.degree }}></p>
            </div>
          ))}
        </div>
      </Section>}

      {certifications?.length > 0 && <Section title="Certifications">
        <div className="space-y-1">
            {certifications.map(cert => (
                 <p key={cert.id} className="text-center" contentEditable onBlur={(e) => handleContentChange?.(e, 'certifications', cert.id, 'name')} dangerouslySetInnerHTML={{ __html: cert.name + ' - ' + cert.issuer + ' (' + formatDate(cert.date) + ')' }}></p>
            ))}
        </div>
      </Section>}

      {achievements?.length > 0 && <Section title="Achievements">
        <ul className="list-disc list-outside ml-5 space-y-1">
          {achievements.map(ach => (
            <li key={ach.id} contentEditable onBlur={(e) => handleContentChange?.(e, 'achievements', ach.id, 'description')} dangerouslySetInnerHTML={{ __html: ach.description }}></li>
          ))}
        </ul>
      </Section>}

      {areasOfInterest?.length > 0 && <Section title="Areas of Interest">
        <p className="text-center text-gray-700">{areasOfInterest.map(interest => <span key={interest.id} contentEditable onBlur={(e) => handleContentChange?.(e, 'areasOfInterest', interest.id, 'name')} dangerouslySetInnerHTML={{ __html: interest.name }}></span>).reduce((prev, curr) => <>{prev} • {curr}</>)}</p>
      </Section>}
    </div>
  );
}
