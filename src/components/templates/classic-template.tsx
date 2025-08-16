import type { ResumeData } from '@/lib/types';

interface TemplateProps {
  resumeData: ResumeData;
}

export default function ClassicTemplate({ resumeData }: TemplateProps) {
  const { personalInfo, experience, education, skills, projects, certifications } = resumeData;

  const formatDate = (dateString: string) => {
    if (!dateString || dateString.toLowerCase() === 'present') return 'Present';
    try {
      const date = new Date(dateString);
      const adjustedDate = new Date(date.getTime() + date.getTimezoneOffset() * 60000);
      return adjustedDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
    } catch {
      return dateString;
    }
  };

  const formatDescription = (desc: string) => {
    return desc.split(/\\n|\n/).filter(line => line.trim()).map((line, i) => (
        <li key={i} className="text-gray-700 leading-relaxed">{line.replace(/^- /, '')}</li>
    ));
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
        <h1 className="text-4xl font-bold tracking-wider">{personalInfo.name || 'Your Name'}</h1>
        <p className="text-sm mt-2">
          {personalInfo.address} | {personalInfo.phone} | <a href={`mailto:${personalInfo.email}`} className="text-blue-700 hover:underline">{personalInfo.email}</a>
          {personalInfo.website && <> | <a href={`https://${personalInfo.website}`} className="text-blue-700 hover:underline">Portfolio</a></>}
        </p>
      </header>

      {personalInfo.summary && <Section title="Summary">
        <p className="text-center text-gray-700 leading-relaxed">{personalInfo.summary}</p>
      </Section>}

      {skills?.length > 0 && <Section title="Skills">
        <p className="text-center text-gray-700">{skills.map(s => s.name).join(' • ')}</p>
      </Section>}

      {experience?.length > 0 && <Section title="Experience">
        <div className="space-y-4">
          {experience.map(exp => (
            <div key={exp.id}>
              <div className="flex justify-between items-baseline">
                <h3 className="text-lg font-semibold">{exp.jobTitle}</h3>
                <p className="text-sm font-medium">{formatDate(exp.startDate)} - {formatDate(exp.endDate)}</p>
              </div>
              <div className="flex justify-between items-baseline mb-1">
                <p className="italic">{exp.company}</p>
                <p className="text-sm italic">{exp.location}</p>
              </div>
              <ul className="list-disc list-outside ml-5 space-y-1">
                {formatDescription(exp.description)}
              </ul>
            </div>
          ))}
        </div>
      </Section>}

      {projects?.length > 0 && <Section title="Projects">
        <div className="space-y-3">
          {projects.map(proj => (
            <div key={proj.id}>
              <h3 className="font-semibold">{proj.name}
                {proj.url && <a href={`https://${proj.url}`} target="_blank" rel="noopener noreferrer" className="text-blue-700 hover:underline ml-2 text-sm">[Link]</a>}
              </h3>
              <ul className="list-disc list-outside ml-5 space-y-1">
                {formatDescription(proj.description)}
              </ul>
            </div>
          ))}
        </div>
      </Section>}

      {education?.length > 0 && <Section title="Education">
        <div className="space-y-2">
          {education.map(edu => (
            <div key={edu.id}>
              <div className="flex justify-between items-baseline">
                <h3 className="text-lg font-semibold">{edu.school}</h3>
                <p className="text-sm font-medium">{formatDate(edu.endDate)}</p>
              </div>
              <p className="italic">{edu.degree}</p>
            </div>
          ))}
        </div>
      </Section>}

      {certifications?.length > 0 && <Section title="Certifications">
        <div className="space-y-1">
            {certifications.map(cert => (
                 <p key={cert.id} className="text-center">{cert.name} - {cert.issuer} ({formatDate(cert.date)})</p>
            ))}
        </div>
      </Section>}
    </div>
  );
}
