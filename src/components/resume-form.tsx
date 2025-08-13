'use client';

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import type { ResumeData, PersonalInfo } from '@/lib/types';
import { PlusCircle, Trash2 } from 'lucide-react';
import type { Dispatch, SetStateAction } from 'react';
import AiSuggester from './ai-suggester';
import AdSpace from './ad-space';

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

  const handleSectionChange = <T extends keyof ResumeData>(
    section: T,
    index: number,
    field: keyof NonNullable<ResumeData[T]>[number],
    value: string
  ) => {
    setResumeData(prev => {
      const newSection = [...(prev[section] as any[])];
      newSection[index] = { ...newSection[index], [field]: value };
      return { ...prev, [section]: newSection };
    });
  };

  const addSectionItem = <T extends keyof ResumeData>(section: T, newItem: any) => {
    setResumeData(prev => ({
      ...prev,
      [section]: [...(prev[section] as any[]), newItem],
    }));
  };

  const removeSectionItem = <T extends keyof ResumeData>(section: T, id: string) => {
    setResumeData(prev => ({
      ...prev,
      [section]: (prev[section] as any[]).filter(item => item.id !== id),
    }));
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
                   <Button variant="ghost" size="icon" onClick={() => removeSectionItem('experience', exp.id)} className="text-muted-foreground hover:text-destructive">
                    <Trash2 className="h-4 w-4" />
                   </Button>
                 </div>
                  <div className="space-y-4">
                     <div>
                        <Label>Job Title</Label>
                        <Input value={exp.jobTitle} onChange={e => handleSectionChange('experience', index, 'jobTitle', e.target.value)} />
                      </div>
                      <div>
                        <Label>Company</Label>
                        <Input value={exp.company} onChange={e => handleSectionChange('experience', index, 'company', e.target.value)} />
                      </div>
                      <div>
                        <Label>Location</Label>
                        <Input value={exp.location} onChange={e => handleSectionChange('experience', index, 'location', e.target.value)} />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label>Start Date</Label>
                          <Input type="date" value={exp.startDate} onChange={e => handleSectionChange('experience', index, 'startDate', e.target.value)} />
                        </div>
                        <div>
                          <Label>End Date</Label>
                          <Input type="date" value={exp.endDate} onChange={e => handleSectionChange('experience', index, 'endDate', e.target.value)} />
                        </div>
                      </div>
                      <div>
                        <Label>Description</Label>
                        <Textarea value={exp.description} onChange={e => handleSectionChange('experience', index, 'description', e.target.value)} rows={6} />
                      </div>
                  </div>
                  <AccordionItem value={`ai-${exp.id}`}>
                    <AccordionTrigger className="text-sm text-primary hover:no-underline">AI Content Suggester</AccordionTrigger>
                    <AccordionContent>
                      <AiSuggester
                        onSuggestionSelect={(suggestion) => handleSectionChange('experience', index, 'description', `${exp.description}\n- ${suggestion}`)}
                      />
                    </AccordionContent>
                  </AccordionItem>
               </Accordion>
            ))}
            <Button onClick={() => addSectionItem('experience', { id: crypto.randomUUID(), jobTitle: '', company: '', location: '', startDate: '', endDate: '', description: '' })} variant="outline" className="w-full">
              <PlusCircle className="mr-2 h-4 w-4" /> Add Experience
            </Button>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-3">
          <AccordionTrigger className='text-lg font-semibold'>Education</AccordionTrigger>
          <AccordionContent className="space-y-6">
            {resumeData.education.map((edu, index) => (
              <div key={edu.id} className="border rounded-lg p-4 space-y-4 relative">
                <Button variant="ghost" size="icon" onClick={() => removeSectionItem('education', edu.id)} className="absolute top-2 right-2 text-muted-foreground hover:text-destructive">
                    <Trash2 className="h-4 w-4" />
                </Button>
                <div>
                  <Label>School/University</Label>
                  <Input value={edu.school} onChange={e => handleSectionChange('education', index, 'school', e.target.value)} />
                </div>
                <div>
                  <Label>Degree/Field of Study</Label>
                  <Input value={edu.degree} onChange={e => handleSectionChange('education', index, 'degree', e.target.value)} />
                </div>
                <div>
                  <Label>Location</Label>
                  <Input value={edu.location} onChange={e => handleSectionChange('education', index, 'location', e.target.value)} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Start Date</Label>
                    <Input type="date" value={edu.startDate} onChange={e => handleSectionChange('education', index, 'startDate', e.target.value)} />
                  </div>
                  <div>
                    <Label>End Date</Label>
                    <Input type="date" value={edu.endDate} onChange={e => handleSectionChange('education', index, 'endDate', e.target.value)} />
                  </div>
                </div>
              </div>
            ))}
            <Button onClick={() => addSectionItem('education', { id: crypto.randomUUID(), school: '', degree: '', location: '', startDate: '', endDate: '' })} variant="outline" className="w-full">
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
                  <Input value={skill.name} onChange={e => handleSectionChange('skills', index, 'name', e.target.value)} />
                  <Button variant="ghost" size="icon" onClick={() => removeSectionItem('skills', skill.id)} className="text-muted-foreground hover:text-destructive">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
            <Button onClick={() => addSectionItem('skills', { id: crypto.randomUUID(), name: '' })} variant="outline" className="w-full">
              <PlusCircle className="mr-2 h-4 w-4" /> Add Skill
            </Button>
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="item-5">
          <AccordionTrigger className='text-lg font-semibold'>Certifications</AccordionTrigger>
          <AccordionContent className="space-y-6">
            {resumeData.certifications.map((cert, index) => (
              <div key={cert.id} className="border rounded-lg p-4 space-y-4 relative">
                <Button variant="ghost" size="icon" onClick={() => removeSectionItem('certifications', cert.id)} className="absolute top-2 right-2 text-muted-foreground hover:text-destructive">
                    <Trash2 className="h-4 w-4" />
                </Button>
                <div>
                  <Label>Certification Name</Label>
                  <Input value={cert.name} onChange={e => handleSectionChange('certifications', index, 'name', e.target.value)} />
                </div>
                <div>
                  <Label>Issuing Organization</Label>
                  <Input value={cert.issuer} onChange={e => handleSectionChange('certifications', index, 'issuer', e.target.value)} />
                </div>
                <div>
                  <Label>Date Obtained</Label>
                  <Input type="date" value={cert.date} onChange={e => handleSectionChange('certifications', index, 'date', e.target.value)} />
                </div>
              </div>
            ))}
            <Button onClick={() => addSectionItem('certifications', { id: crypto.randomUUID(), name: '', issuer: '', date: '' })} variant="outline" className="w-full">
              <PlusCircle className="mr-2 h-4 w-4" /> Add Certification
            </Button>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-6">
          <AccordionTrigger className='text-lg font-semibold'>Projects</AccordionTrigger>
          <AccordionContent className="space-y-6">
            {resumeData.projects.map((proj, index) => (
              <div key={proj.id} className="border rounded-lg p-4 space-y-4 relative">
                <Button variant="ghost" size="icon" onClick={() => removeSectionItem('projects', proj.id)} className="absolute top-2 right-2 text-muted-foreground hover:text-destructive">
                    <Trash2 className="h-4 w-4" />
                </Button>
                <div>
                  <Label>Project Name</Label>
                  <Input value={proj.name} onChange={e => handleSectionChange('projects', index, 'name', e.target.value)} />
                </div>
                <div>
                  <Label>Project URL</Label>
                  <Input value={proj.url} onChange={e => handleSectionChange('projects', index, 'url', e.target.value)} />
                </div>
                <div>
                  <Label>Description</Label>
                  <Textarea value={proj.description} onChange={e => handleSectionChange('projects', index, 'description', e.target.value)} rows={3} />
                </div>
              </div>
            ))}
            <Button onClick={() => addSectionItem('projects', { id: crypto.randomUUID(), name: '', description: '', url: '' })} variant="outline" className="w-full">
              <PlusCircle className="mr-2 h-4 w-4" /> Add Project
            </Button>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-7">
          <AccordionTrigger className='text-lg font-semibold'>Achievements</AccordionTrigger>
          <AccordionContent className="space-y-4">
            {resumeData.achievements.map((ach, index) => (
              <div key={ach.id} className="flex items-center gap-2">
                <Input value={ach.description} onChange={e => handleSectionChange('achievements', index, 'description', e.target.value)} placeholder="e.g., Won 1st place in a hackathon" />
                <Button variant="ghost" size="icon" onClick={() => removeSectionItem('achievements', ach.id)} className="text-muted-foreground hover:text-destructive">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
            <Button onClick={() => addSectionItem('achievements', { id: crypto.randomUUID(), description: '' })} variant="outline" className="w-full">
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
                  <Input value={interest.name} onChange={e => handleSectionChange('areasOfInterest', index, 'name', e.target.value)} />
                  <Button variant="ghost" size="icon" onClick={() => removeSectionItem('areasOfInterest', interest.id)} className="text-muted-foreground hover:text-destructive">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
            <Button onClick={() => addSectionItem('areasOfInterest', { id: crypto.randomUUID(), name: '' })} variant="outline" className="w-full">
              <PlusCircle className="mr-2 h-4 w-4" /> Add Area of Interest
            </Button>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      <AdSpace />
    </div>
  );
}
