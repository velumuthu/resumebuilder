import type { ResumeData } from '@/lib/types';

interface TemplateProps {
  resumeData: ResumeData;
}

export default function ElegantTemplate({ resumeData }: TemplateProps) {
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

  const formatDescription = (desc: string) => {
    return desc.split(/\\n|\n/).filter(line => line.trim()).map((line, i) => (
      <li key={i} className="text-gray-600">{line.replace(/^- /, '')}</li>
    ));
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
        <h1 className="text-5xl font-thin tracking-wider">{personalInfo.name || 'Your Name'}</h1>
        <p className="text-lg text-gray-500 mt-2 tracking-widest">{experience[0]?.jobTitle || 'Professional Title'}</p>
        <div className="border-b border-gray-200 my-6 w-1/4 mx-auto"></div>
        <p className="text-sm text-gray-600">
          {personalInfo.address} | {personalInfo.phone} | <a href={`mailto:${personalInfo.email}`} className="text-cyan-700 hover:underline">{personalInfo.email}</a>
          {personalInfo.website && <> | <a href={`https://${personalInfo.website}`} target="_blank" rel="noreferrer noopener" className="text-cyan-700 hover:underline">Portfolio</a></>}
        </p>
      </header>
      
      {personalInfo.summary && <p className="text-center text-gray-700 leading-relaxed mb-10 italic">{personalInfo.summary}</p>}

      {experience?.length > 0 && <Section title="Experience">
        <div className="space-y-6">
          {experience.map(exp => (
            <div key={exp.id}>
              <div className="flex justify-between items-baseline">
                <h3 className="text-xl font-semibold text-gray-800">{exp.jobTitle}</h3>
                <p className="text-sm text-gray-500">{formatDate(exp.startDate)} - {formatDate(exp.endDate)}</p>
              </div>
              <p className="text-md text-gray-600">{exp.company}, {exp.location}</p>
              <ul className="list-disc list-outside ml-5 mt-2 space-y-1">
                {formatDescription(exp.description)}
              </ul>
            </div>
          ))}
        </div>
      </Section>}
      
      {education?.length > 0 && <Section title="Education">
        <div className="space-y-4">
          {education.map(edu => (
            <div key={edu.id} className="text-center">
              <h3 className="text-xl font-semibold">{edu.degree}</h3>
              <p className="text-md text-gray-600">{edu.school} ({formatDate(edu.endDate)})</p>
            </div>
          ))}
        </div>
      </Section>}
      
      <div className="grid grid-cols-2 gap-x-12">
        {skills?.length > 0 && <Section title="Skills">
          <div className="flex flex-wrap justify-center gap-2">
            {skills.map(s => <span key={s.id} className="bg-gray-100 text-gray-700 text-sm px-3 py-1 rounded-full">{s.name}</span>)}
          </div>
        </Section>}
        
        {areasOfInterest?.length > 0 && <Section title="Interests">
          <div className="flex flex-wrap justify-center gap-2">
            {areasOfInterest.map(s => <span key={s.id} className="bg-cyan-50 text-cyan-800 text-sm px-3 py-1 rounded-full">{s.name}</span>)}
          </div>
        </Section>}
      </div>

      {projects?.length > 0 && <Section title="Projects">
        <div className="space-y-5">
          {projects.map(proj => (
            <div key={proj.id}>
              <h3 className="text-xl font-semibold">{proj.name}
                {proj.url && <a href={`https://${proj.url}`} target="_blank" rel="noopener noreferrer" className="text-cyan-700 hover:underline ml-2 text-sm">[Link]</a>}
              </h3>
              <ul className="list-disc list-outside ml-5 mt-2 space-y-1">
                {formatDescription(proj.description)}
              </ul>
            </div>
          ))}
        </div>
      </Section>}
      
      {certifications?.length > 0 && <Section title="Certifications">
        <ul className="list-disc list-outside ml-5 space-y-1">
            {certifications.map(cert => (
                 <li key={cert.id}><span className="font-semibold">{cert.name}</span>, {cert.issuer} ({formatDate(cert.date)})</li>
            ))}
        </ul>
      </Section>}
      
      {achievements?.length > 0 && <Section title="Achievements">
        <ul className="list-disc list-outside ml-5 space-y-1">
          {achievements.map(ach => (
            <li key={ach.id}>{ach.description}</li>
          ))}
        </ul>
      </Section>}
    </div>
  );
}
