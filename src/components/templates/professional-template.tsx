import type { ResumeData } from '@/lib/types';
import { Mail, Phone, Globe, MapPin } from 'lucide-react';
import Image from 'next/image';

interface TemplateProps {
  resumeData: ResumeData;
}

const SectionTitle = ({ title }: { title: string }) => (
    <div className="flex items-center mb-2">
        <h2 className="text-[11pt] font-bold tracking-widest text-gray-700 bg-gray-200 px-3 py-1 rounded-sm uppercase">{title}</h2>
        <div className="flex-grow border-t-2 border-gray-200 ml-4"></div>
    </div>
);


export default function ProfessionalTemplate({ resumeData }: TemplateProps) {
  const { personalInfo, experience, education, skills, certifications, projects, achievements, areasOfInterest } = resumeData;

  const formatDate = (dateString: string) => {
    if (!dateString) return 'Present';
    try {
      const date = new Date(dateString);
      // Add a day to the date to avoid timezone issues where it might be off by one day.
      date.setDate(date.getDate() + 1);
      return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
    } catch {
      return dateString;
    }
  };

  const formatYear = (dateString: string) => {
    if (!dateString) return '';
    try {
        const date = new Date(dateString);
        date.setDate(date.getDate() + 1);
        return date.getFullYear().toString();
    } catch {
        return '';
    }
  }

  return (
    <div id="resume-preview-content" className="bg-white text-gray-800 font-sans p-8 print:p-0 w-full max-w-4xl mx-auto text-[10pt] leading-snug">

      <header className="text-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800 tracking-wider uppercase">{personalInfo.name || 'Your Name'}</h1>
        <div className="flex justify-center items-center gap-x-3 text-xs text-gray-600 mt-2 flex-wrap">
          {personalInfo.phone && <a href={`tel:${personalInfo.phone}`} className="flex items-center gap-1.5"><Phone className="h-3 w-3" />{personalInfo.phone}</a>}
          {personalInfo.address && <>
            <span className="text-gray-400">&bull;</span>
            <p className="flex items-center gap-1.5"><MapPin className="h-3 w-3" />{personalInfo.address}</p>
          </>}
          {personalInfo.website && <>
           <span className="text-gray-400">&bull;</span>
           <a href={`https://${personalInfo.website}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5"><Globe className="h-3 w-3" />{personalInfo.website}</a>
          </>}
          {personalInfo.email && <>
            <span className="text-gray-400">&bull;</span>
            <a href={`mailto:${personalInfo.email}`} className="flex items-center gap-1.5"><Mail className="h-3 w-3" />{personalInfo.email}</a>
          </>}
        </div>
      </header>

      <section className="mb-4">
        <SectionTitle title="About Me" />
        <p className="text-sm text-gray-700 leading-relaxed">{personalInfo.summary || 'Professional summary...'}</p>
      </section>

      {education?.length > 0 && <section className="mb-4">
        <SectionTitle title="Education" />
        <div className="space-y-2">
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
      
       {skills?.length > 0 && <section className="mb-4">
        <SectionTitle title="Skills" />
        <ul className="grid grid-cols-3 gap-x-6 gap-y-1 text-sm list-disc list-inside">
          {skills.map((skill) => (
            <li key={skill.id} className="text-gray-700">{skill.name}</li>
          ))}
        </ul>
      </section>}

      {experience?.length > 0 && <section className="mb-4">
        <SectionTitle title="Work Experience" />
        <div className="space-y-3">
          {experience.map((exp) => (
            <div key={exp.id}>
              <div className="flex justify-between items-start">
                 <div>
                    <h3 className="font-bold text-sm text-gray-800">{exp.jobTitle || 'Job Title'}</h3>
                    <p className="text-xs text-gray-600">{exp.company || 'Company'}, {exp.location || 'Location'}</p>
                 </div>
                <p className="text-xs text-gray-600 font-medium text-right">{formatDate(exp.startDate)} - {formatDate(exp.endDate)}</p>
              </div>
              <ul className="mt-1 list-disc list-inside text-sm text-gray-700 space-y-1 marker:text-gray-400">
                {exp.description.split('\\n').filter(line => line.trim()).map((line, i) => <li key={i}>{line.replace(/^- /, '')}</li>)}
              </ul>
            </div>
          ))}
        </div>
      </section>}


      {certifications?.length > 0 && <section className="mb-4">
        <SectionTitle title="Certifications" />
        <ul className="grid grid-cols-2 gap-x-6 gap-y-1 text-sm list-disc list-inside">
          {certifications.map((cert) => (
            <li key={cert.id} className="text-gray-700">{cert.name}, <span className="text-gray-600">{cert.issuer} ({formatYear(cert.date)})</span></li>
          ))}
        </ul>
      </section>}
      
      {achievements?.length > 0 && <section className="mb-4">
        <SectionTitle title="Achievements" />
        <ul className="grid grid-cols-2 gap-x-6 gap-y-1 text-sm list-disc list-inside">
          {achievements.map((ach) => (
             <li key={ach.id} className="text-gray-700">{ach.description}</li>
          ))}
        </ul>
      </section>}

      {projects?.length > 0 && <section className="mb-4">
        <SectionTitle title="Projects" />
         <ul className="list-disc list-inside text-sm text-gray-700 space-y-1 marker:text-gray-400">
          {projects.map((proj) => (
            <li key={proj.id}>
                <span className="font-semibold">{proj.name}</span>
                {proj.description && <span className="text-gray-600"> - {proj.description}</span>}
                {proj.url && <a href={`https://${proj.url}`} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline ml-2">[Link]</a>}
            </li>
          ))}
        </ul>
      </section>}

      {areasOfInterest?.length > 0 && <section className="mb-4">
        <SectionTitle title="Areas of Interest" />
        <ul className="grid grid-cols-3 gap-x-6 gap-y-1 text-sm list-disc list-inside">
          {areasOfInterest.map((interest) => (
            <li key={interest.id} className="text-gray-700">{interest.name}</li>
          ))}
        </ul>
      </section>}

    </div>
  );
}
