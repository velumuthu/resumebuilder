import type { ResumeData } from '@/lib/types';
import { Mail, Phone, Globe, MapPin } from 'lucide-react';

interface TemplateProps {
  resumeData: ResumeData;
}

const SectionTitle = ({ title }: { title: string }) => (
    <div className="flex items-center mb-4">
        <h2 className="text-sm font-bold tracking-widest text-gray-700 bg-gray-200 px-3 py-1 rounded-sm uppercase">{title}</h2>
        <div className="flex-grow border-t border-gray-300 ml-4"></div>
    </div>
);


export default function ProfessionalTemplate({ resumeData }: TemplateProps) {
  const { personalInfo, experience, education, skills, certifications, projects, achievements, areasOfInterest } = resumeData;

  const formatDate = (dateString: string) => {
    if (!dateString) return 'Present';
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
    } catch {
      return dateString;
    }
  };

  const formatYear = (dateString: string) => {
    if (!dateString) return '';
    try {
        return new Date(dateString).getFullYear().toString();
    } catch {
        return '';
    }
  }

  return (
    <div id="resume-preview-content" className="bg-white text-gray-800 font-sans p-8 w-full max-w-4xl mx-auto rounded-md text-[10pt] leading-snug">
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800 tracking-wider">{personalInfo.name || 'VELU M'}</h1>
        <div className="flex justify-center items-center gap-x-3 text-xs text-gray-600 mt-3 flex-wrap">
          {personalInfo.phone && <a href={`tel:${personalInfo.phone}`} className="flex items-center gap-1.5"><Phone className="h-3 w-3" />{personalInfo.phone}</a>}
          <span className="text-gray-400">&bull;</span>
          {personalInfo.address && <p className="flex items-center gap-1.5"><MapPin className="h-3 w-3" />{personalInfo.address}</p>}
          <span className="text-gray-400">&bull;</span>
          {personalInfo.website && <a href={`https://${personalInfo.website}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5"><Globe className="h-3 w-3" />{personalInfo.website}</a>}
          <span className="text-gray-400">&bull;</span>
          {personalInfo.email && <a href={`mailto:${personalInfo.email}`} className="flex items-center gap-1.5"><Mail className="h-3 w-3" />{personalInfo.email}</a>}
        </div>
      </header>

      <section className="mb-6">
        <SectionTitle title="About Me" />
        <p className="text-sm text-gray-700 leading-relaxed">{personalInfo.summary || 'Professional summary...'}</p>
      </section>

      {education?.length > 0 && <section className="mb-6">
        <SectionTitle title="Education" />
        <div className="space-y-3">
          {education.map((edu) => (
            <div key={edu.id}>
              <div className="flex justify-between items-start">
                <div>
                    <h3 className="font-bold text-sm text-gray-800">{edu.school || 'School/University'}</h3>
                    <p className="text-xs text-gray-600">{edu.degree || 'Degree'}</p>
                </div>
                <p className="text-xs text-gray-600 font-medium text-right">{formatYear(edu.startDate)} - {formatYear(edu.endDate) || 'Current'}</p>
              </div>
            </div>
          ))}
        </div>
      </section>}
      
       {skills?.length > 0 && <section className="mb-6">
        <SectionTitle title="Skills" />
        <ul className="grid grid-cols-3 gap-x-8 gap-y-1 text-sm list-disc list-inside">
          {skills.map((skill) => (
            <li key={skill.id}>{skill.name}</li>
          ))}
        </ul>
      </section>}

      {experience?.length > 0 && <section className="mb-6">
        <SectionTitle title="Work Experience" />
        <div className="space-y-4">
          {experience.map((exp) => (
            <div key={exp.id}>
              <div className="flex justify-between items-start">
                 <div>
                    <h3 className="font-bold text-sm text-gray-800">{exp.jobTitle || 'Job Title'}</h3>
                    <p className="text-xs text-gray-600">{exp.company || 'Company'}, {exp.location || 'Location'}</p>
                 </div>
                <p className="text-xs text-gray-600 font-medium text-right">{formatDate(exp.startDate)} - {formatDate(exp.endDate)}</p>
              </div>
              <ul className="mt-1.5 list-disc list-inside text-sm text-gray-700 space-y-1 marker:text-gray-400">
                {exp.description.split('\n').filter(line => line.trim()).map((line, i) => <li key={i}>{line.replace(/^- /, '')}</li>)}
              </ul>
            </div>
          ))}
        </div>
      </section>}


      {certifications?.length > 0 && <section className="mb-6">
        <SectionTitle title="Certifications" />
        <ul className="grid grid-cols-2 gap-x-8 gap-y-1 text-sm list-disc list-inside">
          {certifications.map((cert) => (
            <li key={cert.id}>{cert.name}, <span className="text-gray-600">{cert.issuer}</span></li>
          ))}
        </ul>
      </section>}
      
      {achievements?.length > 0 && <section className="mb-6">
        <SectionTitle title="Achievements" />
        <ul className="grid grid-cols-2 gap-x-8 gap-y-1 text-sm list-disc list-inside">
          {achievements.map((ach) => (
             <li key={ach.id}>{ach.description}</li>
          ))}
        </ul>
      </section>}

      {projects?.length > 0 && <section className="mb-6">
        <SectionTitle title="Projects" />
         <ul className="list-disc list-inside text-sm text-gray-700 space-y-1 marker:text-gray-400">
          {projects.map((proj) => (
            <li key={proj.id}>
                {proj.name}
                {proj.description && <span className="text-gray-600"> - {proj.description}</span>}
                {proj.url && <a href={`https://${proj.url}`} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline ml-2">[Link]</a>}
            </li>
          ))}
        </ul>
      </section>}

      {areasOfInterest?.length > 0 && <section className="mb-6">
        <SectionTitle title="Areas of Interest" />
        <ul className="grid grid-cols-3 gap-x-8 gap-y-1 text-sm list-disc list-inside">
          {areasOfInterest.map((interest) => (
            <li key={interest.id}>{interest.name}</li>
          ))}
        </ul>
      </section>}

    </div>
  );
}
