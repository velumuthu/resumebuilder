
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Palette, FontSize, Type } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface ThemeCustomizerProps {
  onColorChange: (color: string) => void;
  onFontSizeChange: (size: string) => void;
  onFontFamilyChange: (font: string) => void;
  onTextColorChange: (color: string) => void;
}

export default function ThemeCustomizer({ onColorChange, onFontSizeChange, onFontFamilyChange, onTextColorChange }: ThemeCustomizerProps) {
  const [primaryColor, setPrimaryColor] = useState('#000000');
  const [fontSize, setFontSize] = useState('12px');
  const [fontFamily, setFontFamily] = useState('Arial');
  const [textColor, setTextColor] = useState('#000000');

  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newColor = e.target.value;
    setPrimaryColor(newColor);
    onColorChange(newColor);
  };

  const handleFontSizeChange = (value: string) => {
    setFontSize(value);
    onFontSizeChange(value);
  };

  const handleFontFamilyChange = (value: string) => {
    setFontFamily(value);
    onFontFamilyChange(value);
  };

  const handleTextColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newColor = e.target.value;
    setTextColor(newColor);
    onTextColorChange(newColor);
  };

  return (
    <div className="p-4 border-t">
      <h3 className="text-lg font-semibold mb-4">Customize Template</h3>
      <div className="space-y-4">
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline">
              <Palette className="mr-2 h-4 w-4" />
              Primary Color
            </Button>
          </PopoverTrigger>
          <PopoverContent>
            <div className="p-2">
              <Label htmlFor="primary-color">Select Color</Label>
              <Input
                id="primary-color"
                type="color"
                value={primaryColor}
                onChange={handleColorChange}
                className="w-full"
              />
            </div>
          </PopoverContent>
        </Popover>

        <div className="space-y-2">
          <Label>Font Size</Label>
          <Select onValueChange={handleFontSizeChange} defaultValue={fontSize}>
            <SelectTrigger>
              <SelectValue placeholder="Select size" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="10px">Small</SelectItem>
              <SelectItem value="12px">Medium</SelectItem>
              <SelectItem value="14px">Large</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Font Family</Label>
          <Select onValueChange={handleFontFamilyChange} defaultValue={fontFamily}>
            <SelectTrigger>
              <SelectValue placeholder="Select font" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Arial">Arial</SelectItem>
              <SelectItem value="Times New Roman">Times New Roman</SelectItem>
              <SelectItem value="Verdana">Verdana</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline">
              <Type className="mr-2 h-4 w-4" />
              Text Color
            </Button>
          </PopoverTrigger>
          <PopoverContent>
            <div className="p-2">
              <Label htmlFor="text-color">Select Color</Label>
              <Input
                id="text-color"
                type="color"
                value={textColor}
                onChange={handleTextColorChange}
                className="w-full"
              />
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
}
