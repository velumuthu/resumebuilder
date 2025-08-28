import type { ResumeData } from '@/lib/types';

interface TemplateProps {
  resumeData: ResumeData;
}

export default function AcademicTemplate({ resumeData }: TemplateProps) {
  const { personalInfo, experience, education, skills, projects, certifications, achievements, areasOfInterest } = resumeData;

  const formatDate = (dateString: string) => {
    if (!dateString || dateString.toLowerCase() === 'present') return 'Present';
    try {
      const date = new Date(dateString);
      return new Date(date.getTime() + date.getTimezoneOffset() * 60000).toLocaleDateString('en-US', { year: 'numeric' });
    } catch {
      return dateString;
    }
  };

  const formatDescription = (desc: string) => {
    return desc.split(/\\n|\n/).filter(line => line.trim()).map((line, i) => (
      <li key={i} className="text-gray-700">{line.replace(/^- /, '')}</li>
    ));
  };

  const Section = ({ title, children }: { title: string, children: React.ReactNode }) => (
    <section className="mb-4">
      <h2 className="text-xl font-semibold border-b-2 border-gray-700 pb-1 mb-3">
        {title}
      </h2>
      {children}
    </section>
  );

  return (
    <div className="bg-white text-gray-800 font-['Garamond',_serif] text-[12pt] w-full max-w-4xl mx-auto p-10 print:p-0">
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold tracking-wider">{personalInfo.name || 'Your Name'}</h1>
        <p className="text-lg text-gray-600 mt-2">Curriculum Vitae</p>
        <p className="text-sm text-gray-600 mt-4">
          {personalInfo.address} &bull; {personalInfo.email} &bull; {personalInfo.phone}
        </p>
      </header>

      {education?.length > 0 && <Section title="Education">
        {education.map(edu => (
          <div key={edu.id} className="mb-2">
            <p><span className="font-bold">{edu.degree}</span>, {formatDate(edu.endDate)}</p>
            <p>{edu.school}, {edu.location}</p>
          </div>
        ))}
      </Section>}
      
      {/* Assuming projects can be publications for a CV */}
      {projects?.length > 0 && <Section title="Publications">
        <ul className="list-decimal list-outside ml-5 space-y-2">
          {projects.map(proj => (
            <li key={proj.id}>
                <span className="font-semibold">{proj.name}.</span> {proj.description} {proj.url && <a href={`https://${proj.url}`} target="_blank" rel="noopener noreferrer" className="text-blue-700 hover:underline">[Link]</a>}
            </li>
          ))}
        </ul>
      </Section>}
      
      {experience?.length > 0 && <Section title="Research Experience">
        <div className="space-y-4">
          {experience.map(exp => (
            <div key={exp.id}>
              <h3 className="text-lg font-bold">{exp.jobTitle}</h3>
              <p className="font-semibold">{exp.company}, {exp.location} <span className="font-normal text-gray-600">({formatDate(exp.startDate)} - {formatDate(exp.endDate)})</span></p>
              <ul className="list-disc list-outside ml-5 mt-1 space-y-1">
                {formatDescription(exp.description)}
              </ul>
            </div>
          ))}
        </div>
      </Section>}

      {achievements?.length > 0 && <Section title="Honors and Awards">
        <ul className="list-disc list-outside ml-5 space-y-1">
          {achievements.map(ach => (
            <li key={ach.id}>{ach.description}</li>
          ))}
        </ul>
      </Section>}
      
      {skills?.length > 0 && <Section title="Skills">
         <p className="text-gray-700">{skills.map(s => s.name).join('; ')}</p>
      </Section>}

      {certifications?.length > 0 && <Section title="Certifications">
        <ul className="list-disc list-outside ml-5 space-y-1">
            {certifications.map(cert => (
                 <li key={cert.id}>{cert.name} - {cert.issuer}</li>
            ))}
        </ul>
      </Section>}

      {areasOfInterest?.length > 0 && <Section title="Areas of Interest">
        <p className="text-gray-700">{areasOfInterest.map(interest => interest.name).join(', ')}</p>
      </Section>}
    </div>
  );
}
