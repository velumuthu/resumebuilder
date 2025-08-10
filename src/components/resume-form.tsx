'use client';

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import type { Education, Experience, PersonalInfo, ResumeData, Skill, Certification, Project, Achievement, AreaOfInterest } from '@/lib/types';
import { PlusCircle, Trash2 } from 'lucide-react';
import type { Dispatch, SetStateAction } from 'react';
import AiSuggester from './ai-suggester';

interface ResumeFormProps {
  resumeData: ResumeData;
  setResumeData: Dispatch<SetStateAction<ResumeData>>;
}

export default function ResumeForm({ resumeData, setResumeData }: ResumeFormProps) {
  
  const handlePersonalInfoChange = (field: keyof PersonalInfo, value: string) => {
    setResumeData(prev => ({
      ...prev,
      personalInfo: { ...prev.personalInfo, [field]: value },
    }));
  };

  const handleExperienceChange = (index: number, field: keyof Experience, value: string) => {
    const newExperience = [...resumeData.experience];
    newExperience[index] = { ...newExperience[index], [field]: value };
    setResumeData(prev => ({ ...prev, experience: newExperience }));
  };
  
  const addExperience = () => {
    const newExperience: Experience = { id: crypto.randomUUID(), jobTitle: '', company: '', location: '', startDate: '', endDate: '', description: '' };
    setResumeData(prev => ({ ...prev, experience: [...prev.experience, newExperience] }));
  };

  const removeExperience = (id: string) => {
    setResumeData(prev => ({ ...prev, experience: prev.experience.filter(exp => exp.id !== id) }));
  };

  const handleEducationChange = (index: number, field: keyof Education, value: string) => {
    const newEducation = [...resumeData.education];
    newEducation[index] = { ...newEducation[index], [field]: value };
    setResumeData(prev => ({ ...prev, education: newEducation }));
  };

  const addEducation = () => {
    const newEducation: Education = { id: crypto.randomUUID(), school: '', degree: '', location: '', startDate: '', endDate: '' };
    setResumeData(prev => ({ ...prev, education: [...prev.education, newEducation] }));
  };

  const removeEducation = (id: string) => {
    setResumeData(prev => ({ ...prev, education: prev.education.filter(edu => edu.id !== id) }));
  };

  const handleSkillChange = (index: number, value: string) => {
    const newSkills = [...resumeData.skills];
    newSkills[index] = { ...newSkills[index], name: value };
    setResumeData(prev => ({ ...prev, skills: newSkills }));
  };

  const addSkill = () => {
    setResumeData(prev => ({ ...prev, skills: [...prev.skills, { id: crypto.randomUUID(), name: '' }] }));
  };
  
  const removeSkill = (id: string) => {
    setResumeData(prev => ({ ...prev, skills: prev.skills.filter(skill => skill.id !== id) }));
  };
  
  const handleCertificationChange = (index: number, field: keyof Certification, value: string) => {
    const newItems = [...resumeData.certifications];
    newItems[index] = { ...newItems[index], [field]: value };
    setResumeData(prev => ({ ...prev, certifications: newItems }));
  };
  
  const addCertification = () => {
    setResumeData(prev => ({ ...prev, certifications: [...prev.certifications, { id: crypto.randomUUID(), name: '', issuer: '', date: '' }] }));
  };
  
  const removeCertification = (id: string) => {
    setResumeData(prev => ({ ...prev, certifications: prev.certifications.filter(item => item.id !== id) }));
  };
  
  const handleProjectChange = (index: number, field: keyof Project, value: string) => {
    const newItems = [...resumeData.projects];
    newItems[index] = { ...newItems[index], [field]: value };
    setResumeData(prev => ({ ...prev, projects: newItems }));
  };
  
  const addProject = () => {
    setResumeData(prev => ({ ...prev, projects: [...prev.projects, { id: crypto.randomUUID(), name: '', description: '', url: '' }] }));
  };

  const removeProject = (id: string) => {
    setResumeData(prev => ({ ...prev, projects: prev.projects.filter(item => item.id !== id) }));
  };
  
  const handleAchievementChange = (index: number, value: string) => {
    const newItems = [...resumeData.achievements];
    newItems[index] = { ...newItems[index], description: value };
    setResumeData(prev => ({ ...prev, achievements: newItems }));
  };
  
  const addAchievement = () => {
    setResumeData(prev => ({ ...prev, achievements: [...prev.achievements, { id: crypto.randomUUID(), description: '' }] }));
  };

  const removeAchievement = (id: string) => {
    setResumeData(prev => ({ ...prev, achievements: prev.achievements.filter(item => item.id !== id) }));
  };

  const handleAreaOfInterestChange = (index: number, value: string) => {
    const newItems = [...resumeData.areasOfInterest];
    newItems[index] = { ...newItems[index], name: value };
    setResumeData(prev => ({ ...prev, areasOfInterest: newItems }));
  };

  const addAreaOfInterest = () => {
    setResumeData(prev => ({ ...prev, areasOfInterest: [...prev.areasOfInterest, { id: crypto.randomUUID(), name: '' }] }));
  };

  const removeAreaOfInterest = (id: string) => {
    setResumeData(prev => ({ ...prev, areasOfInterest: prev.areasOfInterest.filter(item => item.id !== id) }));
  };


  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-primary">Edit Your Resume</h2>
      <Accordion type="multiple" defaultValue={['item-1', 'item-2']} className="w-full">
        <AccordionItem value="item-1">
          <AccordionTrigger className='text-lg font-semibold'>Personal Information</AccordionTrigger>
          <AccordionContent className="space-y-4">
            <div>
              <Label htmlFor="name">Full Name</Label>
              <Input id="name" value={resumeData.personalInfo.name} onChange={e => handlePersonalInfoChange('name', e.target.value)} />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" value={resumeData.personalInfo.email} onChange={e => handlePersonalInfoChange('email', e.target.value)} />
            </div>
            <div>
              <Label htmlFor="phone">Phone</Label>
              <Input id="phone" value={resumeData.personalInfo.phone} onChange={e => handlePersonalInfoChange('phone', e.target.value)} />
            </div>
            <div>
              <Label htmlFor="address">Address</Label>
              <Input id="address" value={resumeData.personalInfo.address} onChange={e => handlePersonalInfoChange('address', e.target.value)} />
            </div>
            <div>
              <Label htmlFor="website">Website/Portfolio</Label>
              <Input id="website" value={resumeData.personalInfo.website} onChange={e => handlePersonalInfoChange('website', e.target.value)} />
            </div>
             <div>
              <Label htmlFor="summary">Professional Summary</Label>
              <Textarea id="summary" value={resumeData.personalInfo.summary} onChange={e => handlePersonalInfoChange('summary', e.target.value)} rows={5} />
            </div>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger className='text-lg font-semibold'>Work Experience</AccordionTrigger>
          <AccordionContent className="space-y-6">
            {resumeData.experience.map((exp, index) => (
               <Accordion key={exp.id} type="single" collapsible className="w-full border rounded-lg p-4 space-y-4 relative">
                 <div className="flex justify-between items-center">
                   <p className="font-medium">{exp.jobTitle || 'New Experience'}</p>
                   <Button variant="ghost" size="icon" onClick={() => removeExperience(exp.id)} className="text-muted-foreground hover:text-destructive">
                    <Trash2 className="h-4 w-4" />
                   </Button>
                 </div>
                  <div className="space-y-4">
                     <div>
                        <Label>Job Title</Label>
                        <Input value={exp.jobTitle} onChange={e => handleExperienceChange(index, 'jobTitle', e.target.value)} />
                      </div>
                      <div>
                        <Label>Company</Label>
                        <Input value={exp.company} onChange={e => handleExperienceChange(index, 'company', e.target.value)} />
                      </div>
                      <div>
                        <Label>Location</Label>
                        <Input value={exp.location} onChange={e => handleExperienceChange(index, 'location', e.target.value)} />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label>Start Date</Label>
                          <Input type="date" value={exp.startDate} onChange={e => handleExperienceChange(index, 'startDate', e.target.value)} />
                        </div>
                        <div>
                          <Label>End Date</Label>
                          <Input type="date" value={exp.endDate} onChange={e => handleExperienceChange(index, 'endDate', e.target.value)} />
                        </div>
                      </div>
                      <div>
                        <Label>Description</Label>
                        <Textarea value={exp.description} onChange={e => handleExperienceChange(index, 'description', e.target.value)} rows={6} />
                      </div>
                  </div>
                  <AccordionItem value={`ai-${exp.id}`}>
                    <AccordionTrigger className="text-sm text-primary hover:no-underline">AI Content Suggester</AccordionTrigger>
                    <AccordionContent>
                      <AiSuggester
                        onSuggestionSelect={(suggestion) => handleExperienceChange(index, 'description', `${exp.description}\n- ${suggestion}`)}
                      />
                    </AccordionContent>
                  </AccordionItem>
               </Accordion>
            ))}
            <Button onClick={addExperience} variant="outline" className="w-full">
              <PlusCircle className="mr-2 h-4 w-4" /> Add Experience
            </Button>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-3">
          <AccordionTrigger className='text-lg font-semibold'>Education</AccordionTrigger>
          <AccordionContent className="space-y-6">
            {resumeData.education.map((edu, index) => (
              <div key={edu.id} className="border rounded-lg p-4 space-y-4 relative">
                <Button variant="ghost" size="icon" onClick={() => removeEducation(edu.id)} className="absolute top-2 right-2 text-muted-foreground hover:text-destructive">
                    <Trash2 className="h-4 w-4" />
                </Button>
                <div>
                  <Label>School/University</Label>
                  <Input value={edu.school} onChange={e => handleEducationChange(index, 'school', e.target.value)} />
                </div>
                <div>
                  <Label>Degree/Field of Study</Label>
                  <Input value={edu.degree} onChange={e => handleEducationChange(index, 'degree', e.target.value)} />
                </div>
                <div>
                  <Label>Location</Label>
                  <Input value={edu.location} onChange={e => handleEducationChange(index, 'location', e.target.value)} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Start Date</Label>
                    <Input type="date" value={edu.startDate} onChange={e => handleEducationChange(index, 'startDate', e.target.value)} />
                  </div>
                  <div>
                    <Label>End Date</Label>
                    <Input type="date" value={edu.endDate} onChange={e => handleEducationChange(index, 'endDate', e.target.value)} />
                  </div>
                </div>
              </div>
            ))}
            <Button onClick={addEducation} variant="outline" className="w-full">
              <PlusCircle className="mr-2 h-4 w-4" /> Add Education
            </Button>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-4">
          <AccordionTrigger className='text-lg font-semibold'>Skills</AccordionTrigger>
          <AccordionContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              {resumeData.skills.map((skill, index) => (
                <div key={skill.id} className="flex items-center gap-2">
                  <Input value={skill.name} onChange={e => handleSkillChange(index, e.target.value)} />
                  <Button variant="ghost" size="icon" onClick={() => removeSkill(skill.id)} className="text-muted-foreground hover:text-destructive">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
            <Button onClick={addSkill} variant="outline" className="w-full">
              <PlusCircle className="mr-2 h-4 w-4" /> Add Skill
            </Button>
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="item-5">
          <AccordionTrigger className='text-lg font-semibold'>Certifications</AccordionTrigger>
          <AccordionContent className="space-y-6">
            {resumeData.certifications.map((cert, index) => (
              <div key={cert.id} className="border rounded-lg p-4 space-y-4 relative">
                <Button variant="ghost" size="icon" onClick={() => removeCertification(cert.id)} className="absolute top-2 right-2 text-muted-foreground hover:text-destructive">
                    <Trash2 className="h-4 w-4" />
                </Button>
                <div>
                  <Label>Certification Name</Label>
                  <Input value={cert.name} onChange={e => handleCertificationChange(index, 'name', e.target.value)} />
                </div>
                <div>
                  <Label>Issuing Organization</Label>
                  <Input value={cert.issuer} onChange={e => handleCertificationChange(index, 'issuer', e.target.value)} />
                </div>
                <div>
                  <Label>Date Obtained</Label>
                  <Input type="date" value={cert.date} onChange={e => handleCertificationChange(index, 'date', e.target.value)} />
                </div>
              </div>
            ))}
            <Button onClick={addCertification} variant="outline" className="w-full">
              <PlusCircle className="mr-2 h-4 w-4" /> Add Certification
            </Button>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-6">
          <AccordionTrigger className='text-lg font-semibold'>Projects</AccordionTrigger>
          <AccordionContent className="space-y-6">
            {resumeData.projects.map((proj, index) => (
              <div key={proj.id} className="border rounded-lg p-4 space-y-4 relative">
                <Button variant="ghost" size="icon" onClick={() => removeProject(proj.id)} className="absolute top-2 right-2 text-muted-foreground hover:text-destructive">
                    <Trash2 className="h-4 w-4" />
                </Button>
                <div>
                  <Label>Project Name</Label>
                  <Input value={proj.name} onChange={e => handleProjectChange(index, 'name', e.target.value)} />
                </div>
                <div>
                  <Label>Project URL</Label>
                  <Input value={proj.url} onChange={e => handleProjectChange(index, 'url', e.target.value)} />
                </div>
                <div>
                  <Label>Description</Label>
                  <Textarea value={proj.description} onChange={e => handleProjectChange(index, 'description', e.target.value)} rows={3} />
                </div>
              </div>
            ))}
            <Button onClick={addProject} variant="outline" className="w-full">
              <PlusCircle className="mr-2 h-4 w-4" /> Add Project
            </Button>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-7">
          <AccordionTrigger className='text-lg font-semibold'>Achievements</AccordionTrigger>
          <AccordionContent className="space-y-4">
            {resumeData.achievements.map((ach, index) => (
              <div key={ach.id} className="flex items-center gap-2">
                <Input value={ach.description} onChange={e => handleAchievementChange(index, e.target.value)} placeholder="e.g., Won 1st place in a hackathon" />
                <Button variant="ghost" size="icon" onClick={() => removeAchievement(ach.id)} className="text-muted-foreground hover:text-destructive">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
            <Button onClick={addAchievement} variant="outline" className="w-full">
              <PlusCircle className="mr-2 h-4 w-4" /> Add Achievement
            </Button>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-8">
          <AccordionTrigger className='text-lg font-semibold'>Areas of Interest</AccordionTrigger>
          <AccordionContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              {resumeData.areasOfInterest.map((interest, index) => (
                <div key={interest.id} className="flex items-center gap-2">
                  <Input value={interest.name} onChange={e => handleAreaOfInterestChange(index, e.target.value)} />
                  <Button variant="ghost" size="icon" onClick={() => removeAreaOfInterest(interest.id)} className="text-muted-foreground hover:text-destructive">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
            <Button onClick={addAreaOfInterest} variant="outline" className="w-full">
              <PlusCircle className="mr-2 h-4 w-4" /> Add Area of Interest
            </Button>
          </AccordionContent>
        </AccordionItem>

      </Accordion>
    </div>
  );
}
