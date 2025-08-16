import type { ResumeData } from '@/lib/types';

interface TemplateProps {
  resumeData: ResumeData;
}

export default function MinimalistTemplate({ resumeData }: TemplateProps) {
  const { personalInfo, experience, education, skills, projects, certifications, achievements, areasOfInterest } = resumeData;

  const formatDate = (dateString: string) => {
    if (!dateString || dateString.toLowerCase() === 'present') return 'Present';
    try {
      const date = new Date(dateString);
      const adjustedDate = new Date(date.getTime() + date.getTimezoneOffset() * 60000);
      return adjustedDate.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
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
        <h1 className="text-4xl font-bold tracking-tight">{personalInfo.name || 'Your Name'}</h1>
        <p className="text-md text-gray-500 mt-2">
          {personalInfo.email} &bull; {personalInfo.phone} &bull; {personalInfo.website}
        </p>
      </header>
      
      {personalInfo.summary && <Section title="Profile">
        <p className="text-gray-700 leading-relaxed">{personalInfo.summary}</p>
      </Section>}

      {experience?.length > 0 && <Section title="Experience">
        <div className="space-y-5">
          {experience.map(exp => (
            <div key={exp.id}>
              <div className="flex justify-between items-baseline">
                <h3 className="font-semibold text-lg">{exp.company}</h3>
                <p className="text-sm text-gray-500">{formatDate(exp.startDate)} &mdash; {formatDate(exp.endDate)}</p>
              </div>
              <p className="text-md text-gray-700">{exp.jobTitle}</p>
              <ul className="list-disc list-outside ml-4 mt-1 space-y-1">
                {formatDescription(exp.description)}
              </ul>
            </div>
          ))}
        </div>
      </Section>}
      
      {education?.length > 0 && <Section title="Education">
        <div className="space-y-4">
          {education.map(edu => (
            <div key={edu.id}>
                <div className="flex justify-between items-baseline">
                    <h3 className="font-semibold text-lg">{edu.school}</h3>
                    <p className="text-sm text-gray-500">{formatDate(edu.endDate)}</p>
                </div>
                <p className="text-md text-gray-700">{edu.degree}</p>
            </div>
          ))}
        </div>
      </Section>}
      
      {skills?.length > 0 && <Section title="Skills">
        <p className="text-gray-700 leading-relaxed">{skills.map(s => s.name).join(', ')}</p>
      </Section>}

      {projects?.length > 0 && <Section title="Projects">
        <div className="space-y-5">
          {projects.map(proj => (
            <div key={proj.id}>
              <h3 className="font-semibold text-lg">{proj.name}
                {proj.url && <a href={`https://${proj.url}`} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline ml-2 text-sm">[link]</a>}
              </h3>
              <ul className="list-disc list-outside ml-4 mt-1 space-y-1">
                {formatDescription(proj.description)}
              </ul>
            </div>
          ))}
        </div>
      </Section>}

      {certifications?.length > 0 && <Section title="Certifications">
        <ul className="list-disc list-outside ml-4 mt-1 space-y-1">
            {certifications.map(cert => (
                 <li key={cert.id}>{cert.name} - {cert.issuer} ({formatDate(cert.date)})</li>
            ))}
        </ul>
      </Section>}

      {achievements?.length > 0 && <Section title="Achievements">
        <ul className="list-disc list-outside ml-4 space-y-1">
          {achievements.map(ach => (
            <li key={ach.id}>{ach.description}</li>
          ))}
        </ul>
      </Section>}

      {areasOfInterest?.length > 0 && <Section title="Interests">
        <p className="text-gray-700 leading-relaxed">{areasOfInterest.map(interest => interest.name).join(', ')}</p>
      </Section>}
    </div>
  );
}
