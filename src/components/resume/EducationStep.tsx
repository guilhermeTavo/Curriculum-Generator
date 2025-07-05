
import React from 'react';
import { useFormContext, useFieldArray } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, Trash2 } from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';
import { ResumeData } from '@/pages/Index';

export const EducationStep = () => {
  const { control } = useFormContext<ResumeData>();
  const { translations } = useLanguage();
  
  const { fields, append, remove } = useFieldArray({
    control,
    name: "education"
  });

  const addEducation = () => {
    append({ school: '', degree: '', startDate: '', endDate: '', description: '' });
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold mb-6">{translations.education}</h2>
      
      {fields.map((field, index) => (
        <Card key={field.id}>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg">
              {translations.education} {index + 1}
            </CardTitle>
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
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={control}
                name={`education.${index}.school`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{translations.school_name}</FormLabel>
                    <FormControl>
                      <Input placeholder={translations.school_name} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={control}
                name={`education.${index}.degree`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{translations.degree}</FormLabel>
                    <FormControl>
                      <Input placeholder={translations.degree} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={control}
                name={`education.${index}.startDate`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{translations.start_date}</FormLabel>
                    <FormControl>
                      <Input type="month" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={control}
                name={`education.${index}.endDate`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{translations.end_date}</FormLabel>
                    <FormControl>
                      <Input type="month" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={control}
              name={`education.${index}.description`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{translations.education_description}</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder={translations.education_description}
                      className="min-h-[80px]"
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>
      ))}

      <Button type="button" variant="outline" onClick={addEducation} className="w-full">
        <Plus className="w-4 h-4 mr-2" />
        {translations.add_education}
      </Button>
    </div>
  );
};
