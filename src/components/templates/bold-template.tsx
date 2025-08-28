
import type { ResumeData } from '@/lib/types';
import { Mail, Phone, Globe, MapPin } from 'lucide-react';

interface TemplateProps {
  resumeData: ResumeData;
}

export default function BoldTemplate({ resumeData }: TemplateProps) {
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

  const formatDescription = (desc: string) => {
    return desc.split(/\\n|\n/).filter(line => line.trim()).map((line, i) => (
      <li key={i}>{line.replace(/^- /, '')}</li>
    ));
  };

  const Section = ({ title, children }: { title: string, children: React.ReactNode }) => (
    <section className="mb-6">
      <h2 className="text-2xl font-extrabold text-gray-800 tracking-tight pb-1 mb-4" style={{borderBottom: '3px solid black'}}>
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
        <h1 className="text-6xl font-extrabold tracking-tighter">{personalInfo.name || 'Your Name'}</h1>
        <div className="flex flex-wrap gap-x-6 gap-y-1 text-sm text-gray-500 mt-4">
          <span>{personalInfo.address}</span>
          <span>{personalInfo.phone}</span>
          <span><a href={`mailto:${personalInfo.email}`} className="text-blue-600 hover:underline">{personalInfo.email}</a></span>
          <span><a href={`https://${personalInfo.website}`} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">{personalInfo.website}</a></span>
        </div>
      </header>

      {personalInfo.summary && <Section title="Summary">
        <p className="leading-relaxed">{personalInfo.summary}</p>
      </Section>}

      {experience?.length > 0 && <Section title="Experience">
        <div className="space-y-6">
          {experience.map(exp => (
            <div key={exp.id}>
              <div className="flex justify-between items-baseline">
                <h3 className="text-xl font-bold">{exp.jobTitle}</h3>
                <p className="text-sm font-semibold">{formatDate(exp.startDate)} - {formatDate(exp.endDate)}</p>
              </div>
              <p className="text-lg text-gray-700 font-semibold">{exp.company} <span className="font-normal text-gray-500">| {exp.location}</span></p>
              <ul className="list-disc list-outside ml-5 mt-2 space-y-1">
                {formatDescription(exp.description)}
              </ul>
            </div>
          ))}
        </div>
      </Section>}
      
      {education?.length > 0 && <Section title="Education">
        <div className="space-y-3">
          {education.map(edu => (
            <div key={edu.id}>
              <div className="flex justify-between items-baseline">
                <h3 className="text-xl font-bold">{edu.degree}</h3>
                <p className="text-sm font-semibold">{formatDate(edu.endDate)}</p>
              </div>
              <p className="text-lg text-gray-700 font-semibold">{edu.school}</p>
            </div>
          ))}
        </div>
      </Section>}

      {skills?.length > 0 && <Section title="Skills">
        <div className="flex flex-wrap gap-3">
            {skills.map(s => <span key={s.id} className="bg-gray-800 text-white font-semibold text-sm px-4 py-2 rounded">{s.name}</span>)}
        </div>
      </Section>}
      
      {projects?.length > 0 && <Section title="Projects">
        <div className="space-y-5">
          {projects.map(proj => (
            <div key={proj.id}>
              <h3 className="text-xl font-bold">{proj.name}
                {proj.url && <a href={`https://${proj.url}`} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline ml-2 text-sm">[VIEW]</a>}
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
                 <li key={cert.id}><span className="font-semibold">{cert.name}</span> from {cert.issuer} ({formatDate(cert.date)})</li>
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
      
      {areasOfInterest?.length > 0 && <Section title="Interests">
        <p>{areasOfInterest.map(interest => interest.name).join(', ')}</p>
      </Section>}
    </div>
  );
}
