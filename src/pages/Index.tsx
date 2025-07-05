
import React, { useState, useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PersonalInfoStep } from '@/components/resume/PersonalInfoStep';
import { ExperienceStep } from '@/components/resume/ExperienceStep';
import { EducationStep } from '@/components/resume/EducationStep';
import { SkillsStep } from '@/components/resume/SkillsStep';
import { PreviewStep } from '@/components/resume/PreviewStep';
import { LanguageSelector } from '@/components/resume/LanguageSelector';
import { ThemeToggle } from '@/components/resume/ThemeToggle';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';
import { useTheme } from '@/hooks/useTheme';

export interface ResumeData {
  personalInfo: {
    fullName: string;
    professionalTitle: string;
    email: string;
    phone: string;
    linkedin: string;
    website: string;
    summary: string;
  };
  experience: Array<{
    company: string;
    title: string;
    startDate: string;
    endDate: string;
    current: boolean;
    description: string;
  }>;
  education: Array<{
    school: string;
    degree: string;
    startDate: string;
    endDate: string;
    description: string;
  }>;
  skills: string[];
  languages: Array<{
    language: string;
    proficiency: string;
  }>;
  certifications: string[];
}

const Index = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedTemplate, setSelectedTemplate] = useState('modern');
  const { translations, currentLanguage, setLanguage } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  
  const methods = useForm<ResumeData>({
    defaultValues: {
      personalInfo: {
        fullName: '',
        professionalTitle: '',
        email: '',
        phone: '',
        linkedin: '',
        website: '',
        summary: ''
      },
      experience: [{ company: '', title: '', startDate: '', endDate: '', current: false, description: '' }],
      education: [{ school: '', degree: '', startDate: '', endDate: '', description: '' }],
      skills: [],
      languages: [{ language: '', proficiency: '' }],
      certifications: []
    }
  });

  const totalSteps = 5;
  const progress = (currentStep / totalSteps) * 100;

  const steps = [
    { number: 1, key: 'step_personal', component: PersonalInfoStep },
    { number: 2, key: 'step_experience', component: ExperienceStep },
    { number: 3, key: 'step_education', component: EducationStep },
    { number: 4, key: 'step_skills', component: SkillsStep },
    { number: 5, key: 'step_preview', component: PreviewStep }
  ];

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const CurrentStepComponent = steps[currentStep - 1].component;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-primary">
              {translations.app_title}
            </h1>
            <div className="flex items-center gap-4">
              <LanguageSelector 
                currentLanguage={currentLanguage}
                onLanguageChange={setLanguage}
              />
              <ThemeToggle theme={theme} onToggle={toggleTheme} />
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Progress */}
        <div className="mb-8">
          <Progress value={progress} className="h-2 mb-4" />
          <div className="flex justify-between text-sm">
            {steps.map(step => (
              <div 
                key={step.number}
                className={`flex flex-col items-center ${
                  currentStep >= step.number ? 'text-primary font-semibold' : 'text-muted-foreground'
                }`}
              >
                <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center mb-2 ${
                  currentStep >= step.number 
                    ? 'bg-primary border-primary text-primary-foreground' 
                    : 'border-muted-foreground'
                }`}>
                  {step.number}
                </div>
                <span className="text-center">{translations[step.key]}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Form */}
        <FormProvider {...methods}>
          <Card>
            <CardContent className="p-6">
              <CurrentStepComponent 
                selectedTemplate={selectedTemplate}
                onTemplateChange={setSelectedTemplate}
              />
              
              {/* Navigation */}
              <div className="flex justify-between mt-8 pt-6 border-t">
                <Button
                  type="button"
                  variant="outline"
                  onClick={prevStep}
                  disabled={currentStep === 1}
                  className="flex items-center gap-2"
                >
                  <ChevronLeft className="w-4 h-4" />
                  {translations.previous}
                </Button>
                
                {currentStep < totalSteps ? (
                  <Button
                    type="button"
                    onClick={nextStep}
                    className="flex items-center gap-2"
                  >
                    {translations.next}
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                ) : null}
              </div>
            </CardContent>
          </Card>
        </FormProvider>
      </div>
    </div>
  );
};

export default Index;
