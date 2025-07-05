
import React, { useState } from 'react';
import { useFormContext, useFieldArray } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, Trash2, X } from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';
import { ResumeData } from '@/pages/Index';

export const SkillsStep = () => {
  const { control, watch, setValue } = useFormContext<ResumeData>();
  const { translations } = useLanguage();
  const [skillInput, setSkillInput] = useState('');
  
  const skills = watch('skills') || [];
  
  const { fields, append, remove } = useFieldArray({
    control,
    name: "languages"
  });

  const addSkill = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && skillInput.trim() && !skills.includes(skillInput.trim())) {
      e.preventDefault();
      setValue('skills', [...skills, skillInput.trim()]);
      setSkillInput('');
    }
  };

  const removeSkill = (skillToRemove: string) => {
    setValue('skills', skills.filter((skill: string) => skill !== skillToRemove));
  };

  const addLanguage = () => {
    append({ language: '', proficiency: '' });
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold mb-6">{translations.skills_languages}</h2>
      
      {/* Skills Section */}
      <Card>
        <CardHeader>
          <CardTitle>{translations.skills}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Input
            placeholder={translations.skills_placeholder}
            value={skillInput}
            onChange={(e) => setSkillInput(e.target.value)}
            onKeyPress={addSkill}
          />
          
          <div className="flex flex-wrap gap-2">
            {skills.map((skill: string, index: number) => (
              <Badge key={index} variant="secondary" className="flex items-center gap-1">
                {skill}
                <X 
                  className="w-3 h-3 cursor-pointer" 
                  onClick={() => removeSkill(skill)}
                />
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Languages Section */}
      <Card>
        <CardHeader>
          <CardTitle>{translations.languages_spoken}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {fields.map((field, index) => (
            <div key={field.id} className="flex gap-4 items-end">
              <FormField
                control={control}
                name={`languages.${index}.language`}
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>{translations.languages_spoken}</FormLabel>
                    <FormControl>
                      <Input placeholder={translations.language_placeholder} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={control}
                name={`languages.${index}.proficiency`}
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>{translations.select_proficiency}</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder={translations.select_proficiency} />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="beginner">{translations.beginner}</SelectItem>
                        <SelectItem value="intermediate">{translations.intermediate}</SelectItem>
                        <SelectItem value="advanced">{translations.advanced}</SelectItem>
                        <SelectItem value="native">{translations.native}</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {fields.length > 1 && (
                <Button
                  type="button"
                  variant="destructive"
                  size="sm"
                  onClick={() => remove(index)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              )}
            </div>
          ))}

          <Button type="button" variant="outline" onClick={addLanguage} className="w-full">
            <Plus className="w-4 h-4 mr-2" />
            {translations.add_language}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};
