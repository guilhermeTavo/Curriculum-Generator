
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

  const generatePDF = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    
    try {
      const printContent = document.getElementById('resume-preview');
      if (printContent) {
        // Criar uma nova janela para impressão
        const printWindow = window.open('', '_blank');
        if (printWindow) {
          printWindow.document.write(`
            <!DOCTYPE html>
            <html>
              <head>
                <title>Resume</title>
                <style>
                  body { 
                    font-family: Arial, sans-serif; 
                    margin: 0; 
                    padding: 20px; 
                    background: white;
                    color: black;
                  }
                  .resume-preview-content { 
                    max-width: 800px; 
                    margin: 0 auto; 
                  }
                  .resume-header { 
                    margin-bottom: 20px; 
                    text-align: center; 
                  }
                  .resume-header h1 { 
                    margin: 0; 
                    font-size: 32px; 
                    color: #2563eb; 
                  }
                  .resume-header h2 { 
                    margin: 5px 0 15px 0; 
                    font-size: 20px; 
                    color: #64748b; 
                  }
                  .contact-info { 
                    display: flex; 
                    justify-content: center; 
                    gap: 20px; 
                    flex-wrap: wrap; 
                  }
                  .resume-section { 
                    margin-bottom: 25px; 
                  }
                  .resume-section h3 { 
                    border-bottom: 2px solid #2563eb; 
                    padding-bottom: 5px; 
                    margin-bottom: 15px; 
                    color: #2563eb; 
                  }
                  .skills-list { 
                    display: flex; 
                    flex-wrap: wrap; 
                    gap: 10px; 
                  }
                  .skill-item { 
                    background: #f1f5f9; 
                    padding: 5px 12px; 
                    border-radius: 15px; 
                    font-size: 14px; 
                  }
                  .experience-item, .education-item { 
                    margin-bottom: 15px; 
                  }
                  .experience-item h4, .education-item h4 { 
                    margin: 0 0 5px 0; 
                    color: #1e293b; 
                  }
                  .date-range { 
                    color: #64748b; 
                    font-style: italic; 
                    margin-bottom: 8px; 
                  }
                  @media print {
                    body { 
                      margin: 0; 
                      padding: 0; 
                    }
                  }
                </style>
              </head>
              <body>
                ${printContent.innerHTML}
              </body>
            </html>
          `);
          printWindow.document.close();
          
          // Aguardar um pouco para garantir que o conteúdo foi carregado
          setTimeout(() => {
            printWindow.print();
            printWindow.close();
          }, 500);
        }
      }
    } catch (error) {
      console.error('Erro ao gerar PDF:', error);
      alert('Erro ao gerar PDF. Tente novamente.');
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
