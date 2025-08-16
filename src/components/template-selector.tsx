
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
  { id: 'creative', name: 'Creative', thumbnailUrl: '/images/template-creative.png' },
  { id: 'classic', name: 'Classic', thumbnailUrl: '/images/template-classic.png' },
] as const;

export default function TemplateSelector({ selectedTemplate, onSelectTemplate }: TemplateSelectorProps) {
  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>Select a Template</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
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
                 <img src={`https://placehold.co/300x400.png`} alt={`${template.name} template thumbnail`} className="w-full h-full object-cover" data-ai-hint="resume template" />
              </div>
              <p className="text-center text-sm font-medium mt-2">{template.name}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
