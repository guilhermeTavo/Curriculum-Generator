
import React from 'react';
import { useFormContext } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Download } from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';
import { ResumeData } from '@/pages/Index';
import { ResumePreview } from './ResumePreview';

interface PreviewStepProps {
  selectedTemplate: string;
  onTemplateChange: (template: string) => void;
}

export const PreviewStep = ({ selectedTemplate, onTemplateChange }: PreviewStepProps) => {
  const { watch } = useFormContext<ResumeData>();
  const { translations } = useLanguage();
  const formData = watch();

  const generatePDF = () => {
    // Aqui implementaremos a geração de PDF
    const printContent = document.getElementById('resume-preview');
    if (printContent) {
      const originalContent = document.body.innerHTML;
      document.body.innerHTML = printContent.innerHTML;
      window.print();
      document.body.innerHTML = originalContent;
      window.location.reload();
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold mb-6">{translations.preview_generate}</h2>
      
      {/* Template Selection */}
      <Card>
        <CardHeader>
          <CardTitle>{translations.choose_template}</CardTitle>
        </CardHeader>
        <CardContent>
          <RadioGroup value={selectedTemplate} onValueChange={onTemplateChange}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center space-x-2 p-4 border rounded-lg">
                <RadioGroupItem value="modern" id="modern" />
                <Label htmlFor="modern" className="flex-1 cursor-pointer">
                  <div className="font-medium">{translations.modern_template}</div>
                  <div className="text-sm text-muted-foreground">Clean and contemporary</div>
                </Label>
              </div>
              
              <div className="flex items-center space-x-2 p-4 border rounded-lg">
                <RadioGroupItem value="classic" id="classic" />
                <Label htmlFor="classic" className="flex-1 cursor-pointer">
                  <div className="font-medium">{translations.classic_template}</div>
                  <div className="text-sm text-muted-foreground">Traditional and professional</div>
                </Label>
              </div>
              
              <div className="flex items-center space-x-2 p-4 border rounded-lg">
                <RadioGroupItem value="minimal" id="minimal" />
                <Label htmlFor="minimal" className="flex-1 cursor-pointer">
                  <div className="font-medium">{translations.minimal_template}</div>
                  <div className="text-sm text-muted-foreground">Simple and elegant</div>
                </Label>
              </div>
            </div>
          </RadioGroup>
        </CardContent>
      </Card>

      {/* Resume Preview */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Preview</CardTitle>
          <Button onClick={generatePDF} className="flex items-center gap-2">
            <Download className="w-4 h-4" />
            {translations.generate_pdf}
          </Button>
        </CardHeader>
        <CardContent>
          <div id="resume-preview" className="border rounded-lg p-8 bg-white text-black min-h-[800px]">
            <ResumePreview data={formData} template={selectedTemplate} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
