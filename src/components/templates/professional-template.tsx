import type { ResumeData } from '@/lib/types';
import { Mail, Phone, Globe, MapPin } from 'lucide-react';

interface TemplateProps {
  resumeData: ResumeData;
}

export default function ProfessionalTemplate({ resumeData }: TemplateProps) {
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
      <li key={i} className="text-gray-700 leading-relaxed">{line.replace(/^- /, '')}</li>
    ));
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
        <h1 className="text-3xl font-bold tracking-wider">{personalInfo.name || 'Your Name'}</h1>
        <div className="flex justify-center items-center flex-wrap gap-x-4 text-sm text-gray-600 mt-2">
            {personalInfo.address && <div className="flex items-center gap-1.5"><MapPin size={12} /> {personalInfo.address}</div>}
            {personalInfo.phone && <div className="flex items-center gap-1.5"><Phone size={12} /> {personalInfo.phone}</div>}
            {personalInfo.email && <div className="flex items-center gap-1.5"><Mail size={12} /> <a href={`mailto:${personalInfo.email}`} className="text-blue-700 hover:underline">{personalInfo.email}</a></div>}
            {personalInfo.website && <div className="flex items-center gap-1.5"><Globe size={12} /> <a href={`https://${personalInfo.website}`} target="_blank" rel="noreferrer noopener" className="text-blue-700 hover:underline">{personalInfo.website}</a></div>}
        </div>
      </header>

      {personalInfo.summary && <p className="text-center text-base mb-6 leading-relaxed">{personalInfo.summary}</p>}

      {experience?.length > 0 && <Section title="Professional Experience">
        <div className="space-y-4">
          {experience.map(exp => (
            <div key={exp.id}>
              <div className="flex justify-between items-baseline mb-1">
                <h3 className="text-lg font-semibold">{exp.jobTitle}</h3>
                <p className="text-sm font-medium">{formatDate(exp.startDate)} - {formatDate(exp.endDate)}</p>
              </div>
              <div className="flex justify-between items-baseline mb-1">
                <p className="font-medium text-gray-700">{exp.company}</p>
                <p className="text-sm italic text-gray-600">{exp.location}</p>
              </div>
              <ul className="list-disc list-outside ml-5 space-y-1">
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
                <h3 className="text-lg font-semibold">{edu.school}</h3>
                 <p className="text-sm font-medium">{formatDate(edu.startDate)} - {formatDate(edu.endDate)}</p>
              </div>
              <p className="font-medium text-gray-700">{edu.degree}</p>
            </div>
          ))}
        </div>
      </Section>}

      {skills?.length > 0 && <Section title="Skills">
         <div className="columns-2 md:columns-3">
            {skills.map(s => <p key={s.id} className="text-gray-700">{s.name}</p>)}
        </div>
      </Section>}

      {projects?.length > 0 && <Section title="Projects">
        <div className="space-y-4">
          {projects.map(proj => (
            <div key={proj.id}>
              <h3 className="font-semibold text-lg">{proj.name}
                {proj.url && <a href={`https://${proj.url}`} target="_blank" rel="noopener noreferrer" className="text-blue-700 hover:underline ml-2 text-sm">[Link]</a>}
              </h3>
              <ul className="list-disc list-outside ml-5 space-y-1">
                {formatDescription(proj.description)}
              </ul>
            </div>
          ))}
        </div>
      </Section>}

      {certifications?.length > 0 && <Section title="Certifications">
        <ul className="list-disc list-outside ml-5 space-y-1">
            {certifications.map(cert => (
                 <li key={cert.id}>{cert.name} - {cert.issuer} ({formatDate(cert.date)})</li>
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

      {areasOfInterest?.length > 0 && <Section title="Areas of Interest">
        <p className="text-gray-700">{areasOfInterest.map(interest => interest.name).join(' | ')}</p>
      </Section>}
    </div>
  );
}
