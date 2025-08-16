
'use client';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { cn } from '@/lib/utils';
import type { ResumeData } from '@/lib/types';
import Image from 'next/image';

interface TemplateSelectorProps {
  selectedTemplate: ResumeData['template'];
  onSelectTemplate: (template: ResumeData['template']) => void;
}

const templates = [
  { id: 'creative', name: 'Creative', imageUrl: 'https://i.ibb.co/C0GvR9N/creative.png', aiHint: 'creative resume' },
  { id: 'classic', name: 'Classic', imageUrl: 'https://i.ibb.co/b3smbcr/classic.png', aiHint: 'classic resume' },
  { id: 'professional', name: 'Professional', imageUrl: 'https://i.ibb.co/qD6JtV9/professional.png', aiHint: 'professional resume' },
  { id: 'technical', name: 'Technical', imageUrl: 'https://i.ibb.co/M7Nms37/technical.png', aiHint: 'technical resume' },
  { id: 'minimalist', name: 'Minimalist', imageUrl: 'https://i.ibb.co/rpxg3M5/minimalist.png', aiHint: 'minimalist resume' },
  { id: 'academic', name: 'Academic', imageUrl: 'https://i.ibb.co/QcY9D6P/academic.png', aiHint: 'academic cv' },
  { id: 'corporate', name: 'Corporate', imageUrl: 'https://i.ibb.co/3Y8N0v6/corporate.png', aiHint: 'corporate resume' },
  { id: 'elegant', name: 'Elegant', imageUrl: 'https://i.ibb.co/wYXB2Qv/elegant.png', aiHint: 'elegant resume' },
  { id: 'bold', name: 'Bold', imageUrl: 'https://i.ibb.co/WpChHpM/bold.png', aiHint: 'bold resume' },
] as const;

export default function TemplateSelector({ selectedTemplate, onSelectTemplate }: TemplateSelectorProps) {
  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>Select a Template</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {templates.map((template) => (
            <div
              key={template.id}
              onClick={() => onSelectTemplate(template.id)}
              className={cn(
                'cursor-pointer rounded-lg border-2 bg-secondary/30 p-2 transition-all hover:opacity-90',
                selectedTemplate === template.id ? 'border-primary' : 'border-transparent'
              )}
            >
              <div className="aspect-[3/4] overflow-hidden rounded-md">
                 <img src={template.imageUrl} alt={`${template.name} template thumbnail`} className="w-full h-full object-cover" data-ai-hint={template.aiHint} />
              </div>
              <p className="text-center text-sm font-medium mt-2">{template.name}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
