
import React from 'react';
import { useFormContext } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { useLanguage } from '@/hooks/useLanguage';
import { ResumeData } from '@/pages/Index';

export const PersonalInfoStep = () => {
  const { control } = useFormContext<ResumeData>();
  const { translations } = useLanguage();

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold mb-6">{translations.personal_info}</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          control={control}
          name="personalInfo.fullName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{translations.full_name}</FormLabel>
              <FormControl>
                <Input placeholder={translations.full_name} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={control}
          name="personalInfo.professionalTitle"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{translations.professional_title}</FormLabel>
              <FormControl>
                <Input placeholder={translations.professional_title} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <FormField
        control={control}
        name="personalInfo.summary"
        render={({ field }) => (
          <FormItem>
            <FormLabel>{translations.summary}</FormLabel>
            <FormControl>
              <Textarea 
                placeholder={translations.summary}
                className="min-h-[100px]"
                {...field} 
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          control={control}
          name="personalInfo.email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{translations.email}</FormLabel>
              <FormControl>
                <Input type="email" placeholder={translations.email} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={control}
          name="personalInfo.phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{translations.phone}</FormLabel>
              <FormControl>
                <Input type="tel" placeholder={translations.phone} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          control={control}
          name="personalInfo.linkedin"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{translations.linkedin}</FormLabel>
              <FormControl>
                <Input placeholder={translations.linkedin} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={control}
          name="personalInfo.website"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{translations.website}</FormLabel>
              <FormControl>
                <Input placeholder={translations.website} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
};
