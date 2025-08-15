import type { ResumeData } from '@/lib/types';
import { Mail, Phone, Globe, MapPin, Linkedin, Github } from 'lucide-react';

interface TemplateProps {
  resumeData: ResumeData;
}

const SectionTitle = ({ title }: { title: string }) => (
  <h2 className="text-sm font-bold uppercase tracking-wider text-primary border-b-2 border-primary/40 pb-1 mb-2">
    {title}
  </h2>
);

const formatDate = (dateString: string) => {
    if (!dateString) return 'Present';
    try {
      const date = new Date(dateString);
      date.setDate(date.getDate() + 1);
      return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
    } catch {
      return dateString;
    }
};

export default function ProfessionalTemplate({ resumeData }: TemplateProps) {
  const { personalInfo, experience, education, skills, certifications, projects, achievements, areasOfInterest } = resumeData;

  return (
    <div id="resume-preview-content" className="bg-white text-gray-800 font-sans text-[9pt] leading-normal w-full max-w-4xl mx-auto print:p-0">
      {/* Header */}
      <header className="text-center py-4 border-b-2 border-gray-200">
        <h1 className="text-3xl font-bold tracking-wider uppercase text-gray-800">{personalInfo.name || 'Your Name'}</h1>
        <p className="text-base text-gray-600 tracking-widest mt-1">Professional Summary</p>
      </header>

      <div className="flex flex-row mt-4">

        {/* Left Column */}
        <aside className="w-1/3 pr-6">
          <section className="mb-4">
            <SectionTitle title="Contact" />
            <div className="space-y-1.5 text-xs">
              {personalInfo.email && <a href={`mailto:${personalInfo.email}`} className="flex items-center gap-2"><Mail className="h-3 w-3 text-primary" />{personalInfo.email}</a>}
              {personalInfo.phone && <a href={`tel:${personalInfo.phone}`} className="flex items-center gap-2"><Phone className="h-3 w-3 text-primary" />{personalInfo.phone}</a>}
              {personalInfo.website && <a href={`https://${personalInfo.website}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2"><Globe className="h-3 w-3 text-primary" />{personalInfo.website}</a>}
              {personalInfo.address && <p className="flex items-center gap-2"><MapPin className="h-3 w-3 text-primary" />{personalInfo.address}</p>}
            </div>
          </section>
          
          {education?.length > 0 && <section className="mb-4">
            <SectionTitle title="Education" />
            <div className="space-y-2">
              {education.map((edu) => (
                <div key={edu.id} className="text-xs">
                  <h3 className="font-bold text-sm text-gray-800">{edu.degree || 'Degree'}</h3>
                  <p className="text-gray-700">{edu.school || 'School/University'}</p>
                  <p className="text-gray-600">{formatDate(edu.startDate)} - {formatDate(edu.endDate)}</p>
                </div>
              ))}
            </div>
          </section>}

          {skills?.length > 0 && <section className="mb-4">
            <SectionTitle title="Skills" />
            <ul className="list-disc list-inside text-xs space-y-1">
              {skills.map((skill) => (
                <li key={skill.id} className="text-gray-700">{skill.name}</li>
              ))}
            </ul>
          </section>}
          
          {achievements?.length > 0 && <section className="mb-4">
            <SectionTitle title="Achievements" />
            <ul className="list-disc list-inside text-xs space-y-1">
              {achievements.map((ach) => (
                <li key={ach.id} className="text-gray-700">{ach.description}</li>
              ))}
            </ul>
          </section>}
        </aside>

        {/* Right Column */}
        <main className="w-2/3 pl-6 border-l border-gray-200">
           <section className="mb-4">
            <SectionTitle title="About Me" />
            <p className="text-xs text-gray-700 leading-relaxed">{personalInfo.summary || 'Professional summary...'}</p>
          </section>

          {experience?.length > 0 && <section className="mb-4">
            <SectionTitle title="Work Experience" />
            <div className="space-y-3">
              {experience.map((exp) => (
                <div key={exp.id}>
                  <div className="flex justify-between items-baseline mb-1">
                     <div>
                        <h3 className="font-bold text-sm text-gray-800">{exp.jobTitle || 'Job Title'}</h3>
                        <p className="text-xs text-gray-600">{exp.company || 'Company'}, {exp.location || 'Location'}</p>
                     </div>
                    <p className="text-xs text-gray-600 font-medium text-right whitespace-nowrap">{formatDate(exp.startDate)} - {formatDate(exp.endDate)}</p>
                  </div>
                  <ul className="mt-1 list-disc list-inside text-xs text-gray-700 space-y-1 marker:text-gray-400">
                    {exp.description.split('\\n').filter(line => line.trim()).map((line, i) => <li key={i}>{line.replace(/^- /, '')}</li>)}
                  </ul>
                </div>
              ))}
            </div>
          </section>}
          
          {projects?.length > 0 && <section className="mb-4">
            <SectionTitle title="Projects" />
             <ul className="list-disc list-inside text-xs text-gray-700 space-y-1 marker:text-gray-400">
              {projects.map((proj) => (
                <li key={proj.id}>
                    <span className="font-semibold">{proj.name}</span>
                    {proj.description && <span className="text-gray-600"> - {proj.description}</span>}
                    {proj.url && <a href={`https://${proj.url}`} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline ml-2">[Link]</a>}
                </li>
              ))}
            </ul>
          </section>}
          
          {certifications?.length > 0 && <section className="mb-4">
            <SectionTitle title="Certifications" />
            <ul className="list-disc list-inside text-xs space-y-1">
              {certifications.map((cert) => (
                <li key={cert.id} className="text-gray-700">{cert.name}, <span className="text-gray-600">{cert.issuer} ({formatDate(cert.date)})</span></li>
              ))}
            </ul>
          </section>}
          
          {areasOfInterest?.length > 0 && <section className="mb-4">
            <SectionTitle title="Areas of Interest" />
            <ul className="list-disc list-inside text-xs space-y-1">
              {areasOfInterest.map((interest) => (
                <li key={interest.id} className="text-gray-700">{interest.name}</li>
              ))}
            </ul>
          </section>}

        </main>
      </div>
    </div>
  );
}
