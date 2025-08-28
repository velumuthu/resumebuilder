
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
  { id: 'classic', name: 'Classic', imageUrl: 'https://i.imghippo.com/files/QFoF9685iA.png', aiHint: 'classic resume' },
  { id: 'professional', name: 'Professional', imageUrl: 'https://i.imghippo.com/files/bunG6603vA.png', aiHint: 'professional resume' },
  { id: 'technical', name: 'Technical', imageUrl: 'https://i.imghippo.com/files/Bwq5964uU.png', aiHint: 'technical resume' },
  { id: 'minimalist', name: 'Minimalist', imageUrl: 'https://i.imghippo.com/files/OpV7754i.png', aiHint: 'minimalist resume' },
  { id: 'academic', name: 'Academic', imageUrl: 'https://i.imghippo.com/files/jrJS7434DBo.png', aiHint: 'academic cv' },
  { id: 'corporate', name: 'Corporate', imageUrl: 'https://i.imghippo.com/files/mM6306YPQ.png', aiHint: 'corporate resume' },
  { id: 'elegant', name: 'Elegant', imageUrl: 'https://i.imghippo.com/files/S0gWf1722429953.png', aiHint: 'elegant resume' },
  { id: 'bold', name: 'Bold', imageUrl: 'https://i.imghippo.com/files/MwX4896mA.png', aiHint: 'bold resume' },
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
