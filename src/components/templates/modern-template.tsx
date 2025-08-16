import type { ResumeData } from '@/lib/types';
import { Mail, Phone, Globe, MapPin } from 'lucide-react';

interface TemplateProps {
  resumeData: ResumeData;
}

export default function ModernTemplate({ resumeData }: TemplateProps) {
  const { personalInfo, experience, education, skills, projects, achievements } = resumeData;

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
      <li key={i} className="text-gray-600">{line.replace(/^- /, '')}</li>
    ));
  };

  return (
    <div className="bg-white text-gray-800 font-['Inter'] text-[10pt] leading-snug w-full max-w-4xl mx-auto p-6 md:p-8 print:p-0">
      <div className="grid grid-cols-12 gap-x-8">
        {/* Left Column */}
        <div className="col-span-4 pr-6 border-r border-gray-200">
          <header className="text-left mb-8">
            <h1 className="text-3xl font-bold text-gray-800 tracking-tight">{personalInfo.name || 'Your Name'}</h1>
            {experience.length > 0 && <p className="text-lg text-blue-600 font-medium mt-1">{experience[0].jobTitle}</p>}
          </header>

          <section className="mb-6">
            <h2 className="text-sm font-bold uppercase tracking-wider text-blue-600 mb-3">Contact</h2>
            <div className="space-y-2 text-sm text-gray-600">
              {personalInfo.email && <div className="flex items-center gap-2"><Mail size={14} /><a href={`mailto:${personalInfo.email}`} className="hover:underline">{personalInfo.email}</a></div>}
              {personalInfo.phone && <div className="flex items-center gap-2"><Phone size={14} /><span>{personalInfo.phone}</span></div>}
              {personalInfo.website && <div className="flex items-center gap-2"><Globe size={14} /><a href={`https://${personalInfo.website}`} target="_blank" rel="noopener noreferrer" className="hover:underline">{personalInfo.website}</a></div>}
              {personalInfo.address && <div className="flex items-center gap-2"><MapPin size={14} /><span>{personalInfo.address}</span></div>}
            </div>
          </section>

          {education?.length > 0 && <section className="mb-6">
            <h2 className="text-sm font-bold uppercase tracking-wider text-blue-600 mb-3">Education</h2>
            {education.map(edu => (
              <div key={edu.id} className="mb-3">
                <h3 className="font-semibold text-gray-800">{edu.degree}</h3>
                <p className="text-sm text-gray-600">{edu.school}</p>
                <p className="text-xs text-gray-500">{formatDate(edu.startDate, 'year')} - {formatDate(edu.endDate, 'year')}</p>
              </div>
            ))}
          </section>}

          {skills?.length > 0 && <section>
            <h2 className="text-sm font-bold uppercase tracking-wider text-blue-600 mb-3">Skills</h2>
            <div className="flex flex-wrap gap-2">
              {skills.map(skill => (
                <span key={skill.id} className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-1 rounded-full">{skill.name}</span>
              ))}
            </div>
          </section>}
        </div>

        {/* Right Column */}
        <div className="col-span-8">
          {personalInfo.summary && <section className="mb-6">
            <h2 className="text-lg font-bold text-gray-800 border-b-2 border-gray-200 pb-1 mb-3">Profile</h2>
            <p className="text-gray-600">{personalInfo.summary}</p>
          </section>}

          {experience?.length > 0 && <section className="mb-6">
            <h2 className="text-lg font-bold text-gray-800 border-b-2 border-gray-200 pb-1 mb-3">Experience</h2>
            <div className="space-y-4">
              {experience.map(exp => (
                <div key={exp.id}>
                  <div className="flex justify-between items-baseline">
                    <h3 className="font-semibold text-gray-800">{exp.jobTitle}</h3>
                    <p className="text-sm text-gray-500 font-medium">{formatDate(exp.startDate)} - {formatDate(exp.endDate)}</p>
                  </div>
                  <p className="text-sm text-gray-600">{exp.company} | {exp.location}</p>
                  <ul className="mt-2 list-disc list-outside ml-4 space-y-1">
                    {formatDescription(exp.description)}
                  </ul>
                </div>
              ))}
            </div>
          </section>}
          
          {projects?.length > 0 && <section className="mb-6">
            <h2 className="text-lg font-bold text-gray-800 border-b-2 border-gray-200 pb-1 mb-3">Projects</h2>
            <div className="space-y-4">
              {projects.map(proj => (
                <div key={proj.id}>
                  <h3 className="font-semibold text-gray-800">{proj.name}
                    {proj.url && <a href={`https://${proj.url}`} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline ml-2 text-sm">[Link]</a>}
                  </h3>
                   <ul className="mt-1 list-disc list-outside ml-4 space-y-1">
                    {formatDescription(proj.description)}
                  </ul>
                </div>
              ))}
            </div>
          </section>}

          {achievements?.length > 0 && <section>
             <h2 className="text-lg font-bold text-gray-800 border-b-2 border-gray-200 pb-1 mb-3">Achievements</h2>
             <ul className="list-disc list-outside ml-4 space-y-1 text-gray-600">
                {achievements.map(ach => (
                    <li key={ach.id}>{ach.description}</li>
                ))}
            </ul>
          </section>}
        </div>
      </div>
    </div>
  );
}
