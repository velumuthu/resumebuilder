import React, { useCallback } from 'react';
import type { ResumeData } from '../../lib/types';

interface TemplateProps {
  resumeData: ResumeData;
  handleContentChange?: (e: React.FocusEvent<HTMLElement>, section: keyof ResumeData, id: string, field: string) => void;
  onImageUpload?: (imageData: string) => void;
}

export default function VisualTemplate({ resumeData, handleContentChange, onImageUpload }: TemplateProps) {
  const { personalInfo, experience, education, skills, projects, certifications, achievements, areasOfInterest } = resumeData;

  const handleImageChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0] && onImageUpload) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          onImageUpload(event.target.result as string);
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  }, [onImageUpload]);

  return (
    <div className="p-8 bg-gray-50 text-gray-800 font-serif">
      <div className="grid grid-cols-3 gap-8">
        <div className="col-span-1">
          <label htmlFor="profile-picture-upload-visual" className="cursor-pointer">
            <div 
              className="w-32 h-32 rounded-full bg-gray-300 mx-auto mb-6 relative group shadow-lg"
              style={personalInfo.profilePicture ? { backgroundImage: `url(${personalInfo.profilePicture})`, backgroundSize: 'cover', backgroundPosition: 'center' } : {}}
            >
              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="text-white text-sm px-3 py-1 bg-indigo-600 rounded-md">
                  {personalInfo.profilePicture ? 'Change' : 'Upload'}
                </div>
              </div>
            </div>
          </label>
          <input id="profile-picture-upload-visual" type="file" accept="image/*" className="hidden" onChange={handleImageChange} />

          <section className="mb-6 text-center">
            <h1 className="text-3xl font-bold text-indigo-700" contentEditable onBlur={(e) => handleContentChange?.(e, 'personalInfo', '', 'name')} dangerouslySetInnerHTML={{ __html: personalInfo.name }}></h1>
          </section>

          <section className="mb-6">
            <h2 className="text-xl font-semibold text-indigo-700 border-b-2 border-indigo-200 pb-2">Contact</h2>
            <ul className="mt-3 space-y-2 text-sm">
              <li contentEditable onBlur={(e) => handleContentChange?.(e, 'personalInfo', '', 'email')} dangerouslySetInnerHTML={{ __html: `📧 ${personalInfo.email}` }}></li>
              <li contentEditable onBlur={(e) => handleContentChange?.(e, 'personalInfo', '', 'phone')} dangerouslySetInnerHTML={{ __html: `📞 ${personalInfo.phone}` }}></li>
              <li contentEditable onBlur={(e) => handleContentChange?.(e, 'personalInfo', '', 'website')} dangerouslySetInnerHTML={{ __html: `🌐 ${personalInfo.website}` }}></li>
            </ul>
          </section>

          <section className="mb-6">
            <h2 className="text-xl font-semibold text-indigo-700 border-b-2 border-indigo-200 pb-2">Skills</h2>
            <div className="mt-3 flex flex-wrap gap-2">
              {skills.map(skill => (
                <span key={skill.id} className="bg-indigo-100 text-indigo-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded-full" contentEditable onBlur={(e) => handleContentChange?.(e, 'skills', skill.id, 'name')} dangerouslySetInnerHTML={{ __html: skill.name }}></span>
              ))}
            </div>
          </section>

          {areasOfInterest?.length > 0 && <section>
            <h2 className="text-xl font-semibold text-indigo-700 border-b-2 border-indigo-200 pb-2">Interests</h2>
            <ul className="mt-3 space-y-1 text-sm list-inside list-disc">
              {areasOfInterest.map(interest => (
                <li key={interest.id} contentEditable onBlur={(e) => handleContentChange?.(e, 'areasOfInterest', interest.id, 'name')} dangerouslySetInnerHTML={{ __html: interest.name }}></li>
              ))}
            </ul>
          </section>}
        </div>

        <div className="col-span-2">
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-indigo-800 border-b-4 border-indigo-300 pb-2">Summary</h2>
            <p className="mt-4 text-md" contentEditable onBlur={(e) => handleContentChange?.(e, 'personalInfo', '', 'summary')} dangerouslySetInnerHTML={{ __html: personalInfo.summary }}></p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-indigo-800 border-b-4 border-indigo-300 pb-2">Experience</h2>
            {experience.map(exp => (
              <div key={exp.id} className="mt-4">
                <h3 className="text-xl font-semibold" contentEditable onBlur={(e) => handleContentChange?.(e, 'experience', exp.id, 'jobTitle')} dangerouslySetInnerHTML={{ __html: exp.jobTitle }}></h3>
                <p className="italic text-md" contentEditable onBlur={(e) => handleContentChange?.(e, 'experience', exp.id, 'company')} dangerouslySetInnerHTML={{ __html: `${exp.company} | ${exp.startDate} - ${exp.endDate}` }}></p>
                <p className="mt-2 text-sm" contentEditable onBlur={(e) => handleContentChange?.(e, 'experience', exp.id, 'description')} dangerouslySetInnerHTML={{ __html: exp.description }}></p>
              </div>
            ))}
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-indigo-800 border-b-4 border-indigo-300 pb-2">Education</h2>
            {education.map(edu => (
              <div key={edu.id} className="mt-4">
                <h3 className="text-xl font-semibold" contentEditable onBlur={(e) => handleContentChange?.(e, 'education', edu.id, 'school')} dangerouslySetInnerHTML={{ __html: edu.school }}></h3>
                <p className="italic text-md" contentEditable onBlur={(e) => handleContentChange?.(e, 'education', edu.id, 'degree')} dangerouslySetInnerHTML={{ __html: `${edu.degree}, ${edu.startDate} - ${edu.endDate}` }}></p>
              </div>
            ))}
          </section>

          {projects?.length > 0 && <section className="mb-8">
            <h2 className="text-2xl font-bold text-indigo-800 border-b-4 border-indigo-300 pb-2">Projects</h2>
            {projects.map(proj => (
              <div key={proj.id} className="mt-4">
                <h3 className="text-xl font-semibold" contentEditable onBlur={(e) => handleContentChange?.(e, 'projects', proj.id, 'name')} dangerouslySetInnerHTML={{ __html: proj.name }}></h3>
                {proj.url && <a href={`https://${proj.url}`} target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline">{proj.url}</a>}
                <p className="mt-2 text-sm" contentEditable onBlur={(e) => handleContentChange?.(e, 'projects', proj.id, 'description')} dangerouslySetInnerHTML={{ __html: proj.description }}></p>
              </div>
            ))}
          </section>}

          {certifications?.length > 0 && <section className="mb-8">
            <h2 className="text-2xl font-bold text-indigo-800 border-b-4 border-indigo-300 pb-2">Certifications</h2>
            {certifications.map(cert => (
              <div key={cert.id} className="mt-4">
                <h3 className="text-xl font-semibold" contentEditable onBlur={(e) => handleContentChange?.(e, 'certifications', cert.id, 'name')} dangerouslySetInnerHTML={{ __html: cert.name }}></h3>
                <p className="italic text-md" contentEditable onBlur={(e) => handleContentChange?.(e, 'certifications', cert.id, 'issuer')} dangerouslySetInnerHTML={{ __html: `${cert.issuer}, ${cert.date}` }}></p>
              </div>
            ))}
          </section>}

          {achievements?.length > 0 && <section>
            <h2 className="text-2xl font-bold text-indigo-800 border-b-4 border-indigo-300 pb-2">Achievements</h2>
            <ul className="mt-3 space-y-1 text-sm list-inside list-disc">
              {achievements.map(ach => (
                <li key={ach.id} contentEditable onBlur={(e) => handleContentChange?.(e, 'achievements', ach.id, 'description')} dangerouslySetInnerHTML={{ __html: ach.description }}></li>
              ))}
            </ul>
          </section>}
        </div>
      </div>
    </div>
  );
}
