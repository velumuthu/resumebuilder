
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
  { id: 'creative', name: 'Creative', imageUrl: 'https://i.imghippo.com/files/eJei9784iM.png', aiHint: 'creative resume' },
  { id: 'classic', name: 'Classic', imageUrl: 'https://placehold.co/300x400.png?text=Classic', aiHint: 'classic resume' },
  { id: 'professional', name: 'Professional', imageUrl: 'https://placehold.co/300x400.png?text=Professional', aiHint: 'professional resume' },
  { id: 'technical', name: 'Technical', imageUrl: 'https://placehold.co/300x400.png?text=Technical', aiHint: 'technical resume' },
  { id: 'minimalist', name: 'Minimalist', imageUrl: 'https://placehold.co/300x400.png?text=Minimalist', aiHint: 'minimalist resume' },
  { id: 'academic', name: 'Academic', imageUrl: 'https://placehold.co/300x400.png?text=Academic', aiHint: 'academic cv' },
  { id: 'corporate', name: 'Corporate', imageUrl: 'https://placehold.co/300x400.png?text=Corporate', aiHint: 'corporate resume' },
  { id: 'elegant', name: 'Elegant', imageUrl: 'https://placehold.co/300x400.png?text=Elegant', aiHint: 'elegant resume' },
  { id: 'bold', name: 'Bold', imageUrl: 'https://placehold.co/300x400.png?text=Bold', aiHint: 'bold resume' },
  { id: 'modern', name: 'Modern', imageUrl: 'https://placehold.co/300x400.png?text=Modern', aiHint: 'modern resume' },
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
              <div className="aspect-[3/4] overflow-hidden rounded-md relative">
                 <Image src={template.imageUrl} alt={`${template.name} template thumbnail`} fill className="object-cover" data-ai-hint={template.aiHint} />
              </div>
              <p className="text-center text-sm font-medium mt-2">{template.name}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
