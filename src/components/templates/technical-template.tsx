
import type { ResumeData } from '@/lib/types';
import { Mail, Phone, Globe, Github, Linkedin } from 'lucide-react';

interface TemplateProps {
  resumeData: ResumeData;
}

export default function TechnicalTemplate({ resumeData }: TemplateProps) {
  const { personalInfo, experience, education, skills, projects, certifications, achievements, areasOfInterest } = resumeData;

  const formatDate = (dateString: string, format: 'month-year' | 'year' = 'month-year') => {
    if (!dateString || dateString.toLowerCase() === 'present') return 'Present';
    try {
      const date = new Date(dateString);
      const adjustedDate = new Date(date.getTime() + date.getTimezoneOffset() * 60000);
      if (format === 'year') return adjustedDate.getFullYear().toString();
      return adjustedDate.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
    } catch {
      return dateString;
    }
  };

  const formatDescription = (desc: string) => {
    return desc.split(/\\n|\n/).filter(line => line.trim()).map((line, i) => (
        <li key={i} className="text-gray-300 leading-relaxed">{line.replace(/^- /, '')}</li>
    ));
  };
  
  const Section = ({ title, children }: { title: string, children: React.ReactNode }) => (
    <section className="mb-4">
      <h2 className="font-mono text-lg font-semibold text-green-400">
        &gt; {title}
      </h2>
      <div className="border-l-2 border-green-400/30 pl-4 mt-2">
        {children}
      </div>
    </section>
  );

  return (
    <div className="bg-[#1e1e1e] text-gray-200 font-['Fira_Code',_monospace] text-[10pt] w-full max-w-4xl mx-auto p-8 print:p-0">
      <header className="mb-6">
        <h1 className="text-3xl font-bold text-green-400">{personalInfo.name || 'Your Name'}</h1>
        <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-gray-400 mt-3">
            {personalInfo.email && <div className="flex items-center gap-1.5"><Mail size={14} /> <a href={`mailto:${personalInfo.email}`} className="text-green-400 hover:underline">{personalInfo.email}</a></div>}
            {personalInfo.phone && <div className="flex items-center gap-1.5"><Phone size={14} /> {personalInfo.phone}</div>}
            {personalInfo.website && <div className="flex items-center gap-1.5"><Globe size={14} /> <a href={`https://${personalInfo.website}`} target="_blank" rel="noreferrer noopener" className="text-green-400 hover:underline">{personalInfo.website}</a></div>}
        </div>
      </header>

      {personalInfo.summary && <Section title="Summary">
        <p className="text-gray-300 leading-relaxed">{personalInfo.summary}</p>
      </Section>}
      
      {skills?.length > 0 && <Section title="Skills">
        {skills.map(s => (
          <p key={s.id}><span className="text-green-400 mr-2">//</span>{s.name}</p>
        ))}
      </Section>}

      {experience?.length > 0 && <Section title="Experience">
        <div className="space-y-4">
          {experience.map(exp => (
            <div key={exp.id}>
              <h3 className="text-lg font-semibold text-green-400">{exp.jobTitle} @ {exp.company}</h3>
              <p className="text-sm text-gray-500 mb-1">{formatDate(exp.startDate)} - {formatDate(exp.endDate)} | {exp.location}</p>
              <ul className="list-['>'] list-outside ml-5 space-y-1">
                {formatDescription(exp.description)}
              </ul>
            </div>
          ))}
        </div>
      </Section>}

      {projects?.length > 0 && <Section title="Projects">
        <div className="space-y-4">
          {projects.map(proj => (
            <div key={proj.id}>
              <h3 className="text-lg font-semibold text-green-400">{proj.name}
                {proj.url && <a href={`https://${proj.url}`} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline ml-2 text-sm">[link]</a>}
              </h3>
              <ul className="list-['>'] list-outside ml-5 space-y-1">
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
              <h3 className="text-lg font-semibold text-green-400">{edu.degree}</h3>
              <p className="text-gray-400">{edu.school} ({formatDate(edu.endDate, 'year')})</p>
            </div>
          ))}
        </div>
      </Section>}
      
      {certifications?.length > 0 && <Section title="Certifications">
        <ul className="list-['>'] list-outside ml-5 space-y-1">
            {certifications.map(cert => (
                 <li key={cert.id}>{cert.name} - {cert.issuer} ({formatDate(cert.date)})</li>
            ))}
        </ul>
      </Section>}

      {achievements?.length > 0 && <Section title="Achievements">
        <ul className="list-['>'] list-outside ml-5 space-y-1">
          {achievements.map(ach => (
            <li key={ach.id}>{ach.description}</li>
          ))}
        </ul>
      </Section>}

      {areasOfInterest?.length > 0 && <Section title="Areas of Interest">
         <p className="text-gray-300">{areasOfInterest.map(interest => interest.name).join(', ')}</p>
      </Section>}
    </div>
  );
}
