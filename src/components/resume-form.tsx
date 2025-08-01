'use client';

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import type { Education, Experience, PersonalInfo, ResumeData, Skill } from '@/lib/types';
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
      </Accordion>
    </div>
  );
}
