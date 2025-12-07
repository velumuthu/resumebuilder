import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle2 } from 'lucide-react';
import type { Template } from '@/lib/types';

const templates: { name: Template; label: string }[] = [
    { name: 'classic', label: 'Classic' },
    { name: 'modern', label: 'Modern' },
    { name: 'professional', label: 'Professional' },
    { name: 'elegant', label: 'Elegant' },
    { name: 'corporate', label: 'Corporate' },
    { name: 'minimalist', label: 'Minimalist' },
    { name: 'bold', label: 'Bold' },
    { name: 'academic', label: 'Academic' },
    { name: 'creative', label: 'Creative' },
    { name: 'swiss', label: 'Swiss' },
    { name: 'ats-friendly', label: 'ATS-Friendly' },
    { name: 'visual', label: 'Visual' },
];

interface TemplateSelectorProps {
    selectedTemplate: Template;
    onSelectTemplate: (template: Template) => void;
}

export default function TemplateSelector({ selectedTemplate, onSelectTemplate }: TemplateSelectorProps) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Select a Template</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-3 gap-4">
                    {templates.map(({ name, label }) => (
                        <div
                            key={name}
                            className={`relative border-2 p-4 rounded-lg cursor-pointer transition-all duration-200 ${selectedTemplate === name ? 'border-primary shadow-lg' : 'border-border hover:border-primary/60'}`}
                            onClick={() => onSelectTemplate(name)}
                        >
                            {selectedTemplate === name && (
                                <CheckCircle2 className="absolute top-2 right-2 h-5 w-5 text-primary" />
                            )}
                            <div className="text-sm font-semibold text-center">{label}</div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}
