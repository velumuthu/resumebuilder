
import type { ResumeData } from '@/lib/types';
import { Mail, Phone, Globe, Linkedin, Github } from 'lucide-react';
import Image from 'next/image';

interface TemplateProps {
  resumeData: ResumeData;
}

export default function CreativeTemplate({ resumeData }: TemplateProps) {
  const { personalInfo, experience, education, skills, certifications, projects, achievements, areasOfInterest } = resumeData;

  const SectionTitle = ({ title }: { title: string }) => (
    <h2 className="text-xs font-bold uppercase tracking-widest text-blue-700 border-b-2 border-blue-200 pb-1 mb-2 mt-3">
      {title}
    </h2>
  );

  const formatDate = (dateString: string) => {
      if (!dateString || dateString.toLowerCase() === 'present') return 'Present';
      try {
        const date = new Date(dateString);
        return new Date(date.getTime() + date.getTimezoneOffset() * 60000).toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
      } catch {
        return dateString;
      }
  };

  const formatDescription = (desc: string) => {
      return desc.split(/\\n|\n/).filter(line => line.trim()).map((line, i) => (
          <li key={i} className="ml-4">{line.replace(/^- /, '')}</li>
      ));
  }

  const groupedSkills = skills.reduce((acc, skill) => {
    const [category, ...skillNames] = skill.name.split(':');
    const skillName = skillNames.join(':').trim();
    if (!skillName) {
        // If no category, put in a default "Others" category
        if (!acc['Others']) acc['Others'] = [];
        acc['Others'].push(category.trim());
        return acc;
    }
    if (!acc[category.trim()]) {
      acc[category.trim()] = [];
    }
    acc[category.trim()].push(skillName);
    return acc;
  }, {} as Record<string, string[]>);

  return (
    <div className="bg-white text-gray-800 font-sans text-[8pt] md:text-[10pt] leading-normal w-full max-w-4xl mx-auto p-4 md:p-6 print:p-0 tracking-wide">
      <header className="flex items-center justify-between pb-2">
        <div className="flex-grow text-center">
            <h1 className="text-xl md:text-2xl font-bold tracking-wider uppercase text-gray-800">{personalInfo.name || 'Your Name'}</h1>
            <div className="flex justify-center items-center flex-wrap gap-x-3 text-xs mt-2 text-gray-600">
                {personalInfo.address && <span>{personalInfo.address}</span>}
                {personalInfo.phone && <><span>|</span><span>{personalInfo.phone}</span></>}
                {personalInfo.email && <><span>|</span><a href={`mailto:${personalInfo.email}`} className="text-blue-600 hover:underline">{personalInfo.email}</a></>}
                {personalInfo.website && <><span>|</span><a href={`https://${personalInfo.website}`} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Portfolio</a></>}
            </div>
        </div>
        <div className="flex-shrink-0">
             <Image 
                src="https://i.imghippo.com/files/VVp1196wpo.png" 
                alt={personalInfo.name} 
                width={80} 
                height={80} 
                className="rounded-full w-16 h-16 md:w-20 md:h-20 object-cover"
                data-ai-hint="person photo"
            />
        </div>
      </header>
      
      <div className="border-t border-gray-300 my-2"></div>

      <main className="w-full">
         <section className="mb-2">
          <SectionTitle title="Professional Summary" />
          <p className="text-xs text-gray-700 leading-relaxed">{personalInfo.summary || 'Professional summary...'}</p>
        </section>

        {experience?.length > 0 && <section className="mb-2">
          <SectionTitle title="Work Experience" />
          <div className="space-y-2">
            {experience.map((exp) => (
              <div key={exp.id} className="text-xs">
                <div className="flex justify-between items-baseline">
                   <div>
                      <h3 className="font-bold text-gray-800">{exp.jobTitle || 'Job Title'}</h3>
                      <p className="font-semibold text-gray-700">{exp.company || 'Company'}</p>
                   </div>
                  <p className="text-gray-600 font-medium text-right whitespace-nowrap">{formatDate(exp.startDate)} - {formatDate(exp.endDate)}</p>
                </div>
                 <div className="flex justify-between items-baseline">
                    <p></p>
                    <p className="text-gray-600 font-medium text-right whitespace-nowrap">{exp.location || 'Location'}</p>
                </div>
                <ul className="mt-1 list-disc text-gray-700 space-y-1">
                  {formatDescription(exp.description)}
                </ul>
              </div>
            ))}
          </div>
        </section>}

        {education?.length > 0 && <section className="mb-2">
          <SectionTitle title="Education" />
          {education.map((edu) => (
            <div key={edu.id} className="text-xs mb-2">
                <div className="flex justify-between">
                    <h3 className="font-bold text-gray-800">{edu.school || 'School/University'}, <span className="font-normal">{edu.location || 'Location'}</span></h3>
                    <p className="text-gray-600 font-medium">{formatDate(edu.startDate)} - {formatDate(edu.endDate)}</p>
                </div>
                <div className="flex justify-between">
                    <p className="text-gray-700">{edu.degree || 'Degree'}</p>
                </div>
            </div>
          ))}
        </section>}

         {skills?.length > 0 && <section className="mb-2">
            <SectionTitle title="Skills" />
            <div className="text-xs">
                {Object.entries(groupedSkills).map(([category, skillList]) => (
                    <div key={category} className="flex items-start mt-1">
                        <span className="font-semibold w-24 md:w-36">{category}:</span>
                        <span>{skillList.join(', ')}</span>
                    </div>
                ))}
            </div>
          </section>}
        
        {projects?.length > 0 && <section className="mb-2">
          <SectionTitle title="Projects" />
           <div className="space-y-2">
                {projects.map((proj) => (
                    <div key={proj.id} className="text-xs">
                        <p className="font-semibold">{proj.name}
                          {proj.url && <a href={`https://${proj.url}`} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline ml-2">[Link]</a>}
                        </p>
                        <ul className="list-disc text-gray-700 space-y-1">
                          {formatDescription(proj.description)}
                        </ul>
                    </div>
                ))}
            </div>
        </section>}

        {certifications?.length > 0 && <section className="mb-2">
            <SectionTitle title="Certifications" />
             <ul className="list-disc text-xs text-gray-700 space-y-1">
                {certifications.map((cert) => (
                    <li key={cert.id} className="ml-4">
                        <span className="font-semibold">{cert.name}</span>, <span className="text-gray-600">{cert.issuer} ({formatDate(cert.date)})</span>
                    </li>
                ))}
            </ul>
        </section>}
        
        {achievements?.length > 0 && <section className="mb-2">
          <SectionTitle title="Achievements" />
          <ul className="list-disc text-xs text-gray-700 space-y-1">
            {achievements.map((ach) => (
              <li key={ach.id} className="ml-4">{ach.description}</li>
            ))}
          </ul>
        </section>}

        {areasOfInterest?.length > 0 && <section className="mb-2">
            <SectionTitle title="Areas of Interest" />
            <ul className="list-disc text-xs text-gray-700 space-y-1">
                {areasOfInterest.map((interest) => (
                    <li key={interest.id} className="ml-4">{interest.name}</li>
                ))}
            </ul>
        </section>}

      </main>
    </div>
  );
}
