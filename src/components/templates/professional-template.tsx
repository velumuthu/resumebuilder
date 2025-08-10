import type { ResumeData } from '@/lib/types';
import { Mail, Phone, Globe, MapPin, Award, Star, FolderGit2, Target } from 'lucide-react';
import { Separator } from '../ui/separator';

interface TemplateProps {
  resumeData: ResumeData;
}

export default function ProfessionalTemplate({ resumeData }: TemplateProps) {
  const { personalInfo, experience, education, skills, certifications, projects, achievements, areasOfInterest } = resumeData;

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

      {experience?.length > 0 && <section className="mt-6">
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
                {exp.description.split('\n').filter(line => line.trim()).map((line, i) => <li key={i}>{line.replace(/^- /, '')}</li>)}
              </ul>
            </div>
          ))}
        </div>
      </section>}

      {skills?.length > 0 && <section className="mt-6">
        <h2 className="text-lg font-bold text-blue-800 border-b-2 border-gray-200 pb-1 mb-3 tracking-wide">SKILLS</h2>
        <div className="flex flex-wrap gap-2">
          {skills.map((skill) => (
            <span key={skill.id} className="bg-gray-200 text-gray-800 text-xs font-medium px-2.5 py-1 rounded-full">{skill.name}</span>
          ))}
        </div>
      </section>}
      
      {projects?.length > 0 && <section className="mt-6">
        <h2 className="text-lg font-bold text-blue-800 border-b-2 border-gray-200 pb-1 mb-3 tracking-wide">PROJECTS</h2>
        <div className="space-y-4">
          {projects.map((proj) => (
            <div key={proj.id}>
              <div className="flex justify-between items-baseline">
                <h3 className="text-md font-semibold text-gray-900 flex items-center gap-2">{proj.name || 'Project Name'}
                {proj.url && <a href={`https://${proj.url}`} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline"><FolderGit2 className="h-4 w-4" /></a>}
                </h3>
              </div>
              <p className="mt-1.5 text-sm text-gray-700">{proj.description}</p>
            </div>
          ))}
        </div>
      </section>}

      {education?.length > 0 && <section className="mt-6">
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
      </section>}

      {certifications?.length > 0 && <section className="mt-6">
        <h2 className="text-lg font-bold text-blue-800 border-b-2 border-gray-200 pb-1 mb-3 tracking-wide">CERTIFICATIONS</h2>
        <div className="space-y-3">
          {certifications.map((cert) => (
            <div key={cert.id}>
               <div className="flex justify-between items-baseline">
                <h3 className="text-md font-semibold text-gray-900 flex items-center gap-2"><Award className="h-4 w-4" /> {cert.name || 'Certification Name'}</h3>
                <p className="text-xs text-gray-600 font-medium">{formatDate(cert.date)}</p>
              </div>
              <p className="text-sm font-medium text-gray-700 ml-6">{cert.issuer || 'Issuer'}</p>
            </div>
          ))}
        </div>
      </section>}
      
      {achievements?.length > 0 && <section className="mt-6">
        <h2 className="text-lg font-bold text-blue-800 border-b-2 border-gray-200 pb-1 mb-3 tracking-wide">ACHIEVEMENTS</h2>
        <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
          {achievements.map((ach) => (
             <li key={ach.id} className="flex items-start gap-2"><Star className="h-4 w-4 text-yellow-500 mt-0.5 shrink-0" /><span>{ach.description}</span></li>
          ))}
        </ul>
      </section>}

      {areasOfInterest?.length > 0 && <section className="mt-6">
        <h2 className="text-lg font-bold text-blue-800 border-b-2 border-gray-200 pb-1 mb-3 tracking-wide">AREAS OF INTEREST</h2>
        <div className="flex flex-wrap gap-2">
          {areasOfInterest.map((interest) => (
            <span key={interest.id} className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-1 rounded-full flex items-center gap-1.5"><Target className="h-3 w-3" />{interest.name}</span>
          ))}
        </div>
      </section>}

    </div>
  );
}
