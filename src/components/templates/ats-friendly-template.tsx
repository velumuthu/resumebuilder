import React from 'react';
import type { ResumeData } from '../../lib/types';

interface TemplateProps {
  resumeData: ResumeData;
  handleContentChange?: (e: React.FocusEvent<HTMLElement>, section: keyof ResumeData, id: string, field: string) => void;
}

export default function ATSFriendlyTemplate({ resumeData, handleContentChange }: TemplateProps) {
  const { personalInfo, experience, education, skills, projects, certifications, achievements, areasOfInterest } = resumeData;

  return (
    <div className="p-8 bg-white text-black font-serif">
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold" contentEditable onBlur={(e) => handleContentChange?.(e, 'personalInfo', '', 'name')} dangerouslySetInnerHTML={{ __html: personalInfo.name }}></h1>
        <p className="text-lg" contentEditable onBlur={(e) => handleContentChange?.(e, 'personalInfo', '', 'email')} dangerouslySetInnerHTML={{ __html: personalInfo.email }}></p>
        <p className="text-lg" contentEditable onBlur={(e) => handleContentChange?.(e, 'personalInfo', '', 'phone')} dangerouslySetInnerHTML={{ __html: personalInfo.phone }}></p>
        <p className="text-lg" contentEditable onBlur={(e) => handleContentChange?.(e, 'personalInfo', '', 'website')} dangerouslySetInnerHTML={{ __html: personalInfo.website }}></p>
      </header>

      <section className="mb-6">
        <h2 className="text-2xl font-bold border-b-2 border-black pb-2">Summary</h2>
        <p className="mt-4" contentEditable onBlur={(e) => handleContentChange?.(e, 'personalInfo', '', 'summary')} dangerouslySetInnerHTML={{ __html: personalInfo.summary }}></p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-bold border-b-2 border-black pb-2">Skills</h2>
        <ul className="list-disc list-inside mt-2">
          {skills.map(skill => (
            <li key={skill.id} contentEditable onBlur={(e) => handleContentChange?.(e, 'skills', skill.id, 'name')} dangerouslySetInnerHTML={{ __html: skill.name }}></li>
          ))}
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-bold border-b-2 border-black pb-2">Experience</h2>
        {experience.map(exp => (
          <div key={exp.id} className="mt-4">
            <h3 className="text-xl font-semibold" contentEditable onBlur={(e) => handleContentChange?.(e, 'experience', exp.id, 'jobTitle')} dangerouslySetInnerHTML={{ __html: exp.jobTitle }}></h3>
            <p className="italic" contentEditable onBlur={(e) => handleContentChange?.(e, 'experience', exp.id, 'company')} dangerouslySetInnerHTML={{ __html: `${exp.company}, ${exp.startDate} - ${exp.endDate}` }}></p>
            <div className="mt-2" contentEditable onBlur={(e) => handleContentChange?.(e, 'experience', exp.id, 'description')} dangerouslySetInnerHTML={{ __html: exp.description }}></div>
          </div>
        ))}
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-bold border-b-2 border-black pb-2">Education</h2>
        {education.map(edu => (
          <div key={edu.id} className="mt-4">
            <h3 className="text-xl font-semibold" contentEditable onBlur={(e) => handleContentChange?.(e, 'education', edu.id, 'school')} dangerouslySetInnerHTML={{ __html: edu.school }}></h3>
            <p className="italic" contentEditable onBlur={(e) => handleContentChange?.(e, 'education', edu.id, 'degree')} dangerouslySetInnerHTML={{ __html: `${edu.degree}, ${edu.startDate} - ${edu.endDate}` }}></p>
          </div>
        ))}
      </section>

      {projects?.length > 0 && <section className="mb-6">
        <h2 className="text-2xl font-bold border-b-2 border-black pb-2">Projects</h2>
        {projects.map(proj => (
          <div key={proj.id} className="mt-4">
            <h3 className="text-xl font-semibold" contentEditable onBlur={(e) => handleContentChange?.(e, 'projects', proj.id, 'name')} dangerouslySetInnerHTML={{ __html: proj.name }}></h3>
            {proj.url && <a href={`https://${proj.url}`} target="_blank" rel="noopener noreferrer" className="text-blue-700 hover:underline">{proj.url}</a>}
            <div className="mt-2" contentEditable onBlur={(e) => handleContentChange?.(e, 'projects', proj.id, 'description')} dangerouslySetInnerHTML={{ __html: proj.description }}></div>
          </div>
        ))}
      </section>}

      {certifications?.length > 0 && <section className="mb-6">
        <h2 className="text-2xl font-bold border-b-2 border-black pb-2">Certifications</h2>
        {certifications.map(cert => (
          <div key={cert.id} className="mt-4">
            <h3 className="text-xl font-semibold" contentEditable onBlur={(e) => handleContentChange?.(e, 'certifications', cert.id, 'name')} dangerouslySetInnerHTML={{ __html: cert.name }}></h3>
            <p className="italic" contentEditable onBlur={(e) => handleContentChange?.(e, 'certifications', cert.id, 'issuer')} dangerouslySetInnerHTML={{ __html: `${cert.issuer}, ${cert.date}` }}></p>
          </div>
        ))}
      </section>}

      {achievements?.length > 0 && <section className="mb-6">
        <h2 className="text-2xl font-bold border-b-2 border-black pb-2">Achievements</h2>
        <ul className="list-disc list-inside mt-2">
          {achievements.map(ach => (
            <li key={ach.id} contentEditable onBlur={(e) => handleContentChange?.(e, 'achievements', ach.id, 'description')} dangerouslySetInnerHTML={{ __html: ach.description }}></li>
          ))}
        </ul>
      </section>}

      {areasOfInterest?.length > 0 && <section className="mb-6">
        <h2 className="text-2xl font-bold border-b-2 border-black pb-2">Areas of Interest</h2>
        <ul className="list-disc list-inside mt-2">
          {areasOfInterest.map(interest => (
            <li key={interest.id} contentEditable onBlur={(e) => handleContentChange?.(e, 'areasOfInterest', interest.id, 'name')} dangerouslySetInnerHTML={{ __html: interest.name }}></li>
          ))}
        </ul>
      </section>}
    </div>
  );
}
