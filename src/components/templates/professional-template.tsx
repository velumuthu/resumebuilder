import type { ResumeData } from '@/lib/types';
import { Mail, Phone, Globe, MapPin } from 'lucide-react';
import { Separator } from '../ui/separator';

interface TemplateProps {
  resumeData: ResumeData;
}

export default function ProfessionalTemplate({ resumeData }: TemplateProps) {
  const { personalInfo, experience, education, skills } = resumeData;

  const formatDate = (dateString: string) => {
    if (!dateString) return 'Present';
    try {
      return new Date(dateString).toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
    } catch {
      return dateString;
    }
  };

  return (
    <div id="resume-preview-content" className="bg-white text-gray-800 font-sans p-8 w-full max-w-4xl mx-auto rounded-md">
      <header className="text-center mb-6">
        <h1 className="text-4xl font-bold text-gray-900 tracking-tight">{personalInfo.name || 'Your Name'}</h1>
        <div className="flex justify-center items-center gap-x-4 gap-y-1 text-sm text-gray-600 mt-2 flex-wrap">
          {personalInfo.email && <a href={`mailto:${personalInfo.email}`} className="flex items-center gap-1.5 hover:text-blue-600"><Mail className="h-3 w-3" />{personalInfo.email}</a>}
          {personalInfo.phone && <a href={`tel:${personalInfo.phone}`} className="flex items-center gap-1.5 hover:text-blue-600"><Phone className="h-3 w-3" />{personalInfo.phone}</a>}
          {personalInfo.address && <p className="flex items-center gap-1.5"><MapPin className="h-3 w-3" />{personalInfo.address}</p>}
          {personalInfo.website && <a href={`https://${personalInfo.website}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 hover:text-blue-600"><Globe className="h-3 w-3" />{personalInfo.website}</a>}
        </div>
      </header>

      <section>
        <h2 className="text-lg font-bold text-blue-800 border-b-2 border-gray-200 pb-1 mb-3 tracking-wide">PROFESSIONAL SUMMARY</h2>
        <p className="text-sm text-gray-700 leading-relaxed">{personalInfo.summary || 'Professional summary...'}</p>
      </section>

      <section className="mt-6">
        <h2 className="text-lg font-bold text-blue-800 border-b-2 border-gray-200 pb-1 mb-3 tracking-wide">WORK EXPERIENCE</h2>
        <div className="space-y-4">
          {experience.map((exp) => (
            <div key={exp.id}>
              <div className="flex justify-between items-baseline">
                <h3 className="text-md font-semibold text-gray-900">{exp.jobTitle || 'Job Title'}</h3>
                <p className="text-xs text-gray-600 font-medium">{formatDate(exp.startDate)} - {formatDate(exp.endDate)}</p>
              </div>
              <div className="flex justify-between items-baseline">
                <p className="text-sm font-medium text-gray-700">{exp.company || 'Company'}</p>
                <p className="text-xs text-gray-600">{exp.location || 'Location'}</p>
              </div>
              <ul className="mt-1.5 list-disc list-inside text-sm text-gray-700 space-y-1">
                {exp.description.split('\n').map((line, i) => line.trim() && <li key={i}>{line.replace(/^- /, '')}</li>)}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-6">
        <h2 className="text-lg font-bold text-blue-800 border-b-2 border-gray-200 pb-1 mb-3 tracking-wide">SKILLS</h2>
        <div className="flex flex-wrap gap-2">
          {skills.map((skill) => (
            <span key={skill.id} className="bg-gray-200 text-gray-800 text-xs font-medium px-2.5 py-1 rounded-full">{skill.name}</span>
          ))}
        </div>
      </section>

      <section className="mt-6">
        <h2 className="text-lg font-bold text-blue-800 border-b-2 border-gray-200 pb-1 mb-3 tracking-wide">EDUCATION</h2>
        <div className="space-y-3">
          {education.map((edu) => (
            <div key={edu.id}>
              <div className="flex justify-between items-baseline">
                <h3 className="text-md font-semibold text-gray-900">{edu.school || 'School/University'}</h3>
                <p className="text-xs text-gray-600 font-medium">{formatDate(edu.startDate)} - {formatDate(edu.endDate)}</p>
              </div>
              <div className="flex justify-between items-baseline">
                <p className="text-sm font-medium text-gray-700">{edu.degree || 'Degree'}</p>
                <p className="text-xs text-gray-600">{edu.location || 'Location'}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
