import React from 'react';
import type { ResumeData } from '../../lib/types';
import ClassicTemplate from './templates/classic-template';
import ModernTemplate from './templates/modern-template';
import ProfessionalTemplate from './templates/professional-template';
import ElegantTemplate from './templates/elegant-template';
import CorporateTemplate from './templates/corporate-template';
import MinimalistTemplate from './templates/minimalist-template';
import BoldTemplate from './templates/bold-template';
import AcademicTemplate from './templates/academic-template';
import CreativeTemplate from './templates/creative-template';
import SwissTemplate from './templates/swiss-template';
import ATSFriendlyTemplate from './templates/ats-friendly-template';
import VisualTemplate from './templates/visual-template';

interface ResumePreviewProps {
  resumeData: ResumeData;
  setResumeData: (data: ResumeData) => void;
}

export default function ResumePreview({ resumeData, setResumeData }: ResumePreviewProps) {
  const handleContentChange = (
    e: React.FormEvent<HTMLDivElement>,
    section: keyof ResumeData,
    id: string,
    field: string
  ) => {
    const newText = e.currentTarget.textContent || '';
    const newData = { ...resumeData };

    if (Array.isArray(newData[section])) {
      newData[section] = (newData[section] as any[]).map(item => {
        if (item.id === id) {
          return { ...item, [field]: newText };
        }
        return item;
      });
    } else {
      newData[section] = {
        ...(newData[section] as object),
        [field]: newText
      };
    }
    
    setResumeData(newData);
  };

  const handleImageUpload = (imageData: string) => {
    setResumeData({
      ...resumeData,
      personalInfo: {
        ...resumeData.personalInfo,
        profilePicture: imageData,
      },
    });
  };

  const renderTemplate = () => {
    switch (resumeData.template) {
      case 'classic':
        return <ClassicTemplate resumeData={resumeData} handleContentChange={handleContentChange} />;
      case 'modern':
        return <ModernTemplate resumeData={resumeData} handleContentChange={handleContentChange} />;
      case 'professional':
        return <ProfessionalTemplate resumeData={resumeData} handleContentChange={handleContentChange} />;
      case 'elegant':
        return <ElegantTemplate resumeData={resumeData} handleContentChange={handleContentChange} />;
      case 'corporate':
        return <CorporateTemplate resumeData={resumeData} handleContentChange={handleContentChange} />;
      case 'minimalist':
        return <MinimalistTemplate resumeData={resumeData} handleContentChange={handleContentChange} />;
      case 'bold':
        return <BoldTemplate resumeData={resumeData} handleContentChange={handleContentChange} />;
      case 'academic':
        return <AcademicTemplate resumeData={resumeData} handleContentChange={handleContentChange} />;
      case 'creative':
        return <CreativeTemplate resumeData={resumeData} handleContentChange={handleContentChange} onImageUpload={handleImageUpload} />;
      case 'swiss':
        return <SwissTemplate resumeData={resumeData} handleContentChange={handleContentChange} />;
      case 'ats-friendly':
        return <ATSFriendlyTemplate resumeData={resumeData} handleContentChange={handleContentChange} />;
      case 'visual':
        return <VisualTemplate resumeData={resumeData} handleContentChange={handleContentChange} onImageUpload={handleImageUpload} />;
      default:
        return <ClassicTemplate resumeData={resumeData} handleContentChange={handleContentChange} />;
    }
  };

  return (
    <div id="resume-preview-content">
      {renderTemplate()}
    </div>
  );
}
