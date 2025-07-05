
import React from 'react';
import { ResumeData } from '@/pages/Index';

interface ResumePreviewProps {
  data: ResumeData;
  template: string;
}

export const ResumePreview = ({ data, template }: ResumePreviewProps) => {
  const { personalInfo, experience, education, skills, languages } = data;

  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString + '-01');
    return date.toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' });
  };

  if (template === 'modern') {
    return (
      <div className="space-y-6">
        {/* Header */}
        <div className="text-center border-b-2 border-blue-600 pb-4">
          <h1 className="text-3xl font-bold text-gray-800">{personalInfo.fullName}</h1>
          <h2 className="text-xl text-blue-600 mb-2">{personalInfo.professionalTitle}</h2>
          <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-600">
            {personalInfo.email && <span>{personalInfo.email}</span>}
            {personalInfo.phone && <span>{personalInfo.phone}</span>}
            {personalInfo.linkedin && <span>{personalInfo.linkedin}</span>}
            {personalInfo.website && <span>{personalInfo.website}</span>}
          </div>
        </div>

        {/* Summary */}
        {personalInfo.summary && (
          <div>
            <h3 className="text-lg font-semibold text-blue-600 mb-2">Resumo Profissional</h3>
            <p className="text-gray-700 leading-relaxed">{personalInfo.summary}</p>
          </div>
        )}

        {/* Skills */}
        {skills && skills.length > 0 && (
          <div>
            <h3 className="text-lg font-semibold text-blue-600 mb-2">Habilidades</h3>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill, index) => (
                <span key={index} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Experience */}
        {experience && experience.length > 0 && (
          <div>
            <h3 className="text-lg font-semibold text-blue-600 mb-3">Experiência Profissional</h3>
            <div className="space-y-4">
              {experience.map((exp, index) => (
                <div key={index} className="border-l-4 border-blue-200 pl-4">
                  <div className="flex justify-between items-start mb-1">
                    <h4 className="font-semibold text-gray-800">{exp.title}</h4>
                    <span className="text-sm text-gray-600">
                      {formatDate(exp.startDate)} - {exp.current ? 'Atual' : formatDate(exp.endDate)}
                    </span>
                  </div>
                  <p className="text-blue-600 mb-2">{exp.company}</p>
                  <p className="text-gray-700 text-sm leading-relaxed">{exp.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Education */}
        {education && education.length > 0 && (
          <div>
            <h3 className="text-lg font-semibold text-blue-600 mb-3">Educação</h3>
            <div className="space-y-4">
              {education.map((edu, index) => (
                <div key={index} className="border-l-4 border-blue-200 pl-4">
                  <div className="flex justify-between items-start mb-1">
                    <h4 className="font-semibold text-gray-800">{edu.degree}</h4>
                    <span className="text-sm text-gray-600">
                      {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                    </span>
                  </div>
                  <p className="text-blue-600 mb-2">{edu.school}</p>
                  {edu.description && (
                    <p className="text-gray-700 text-sm leading-relaxed">{edu.description}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Languages */}
        {languages && languages.length > 0 && languages.some(lang => lang.language) && (
          <div>
            <h3 className="text-lg font-semibold text-blue-600 mb-2">Idiomas</h3>
            <div className="grid grid-cols-2 gap-2">
              {languages.filter(lang => lang.language).map((lang, index) => (
                <div key={index} className="flex justify-between">
                  <span className="text-gray-700">{lang.language}</span>
                  <span className="text-blue-600 text-sm">{lang.proficiency}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }

  // Classic template
  if (template === 'classic') {
    return (
      <div className="space-y-4">
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-1">{personalInfo.fullName}</h1>
          <h2 className="text-lg text-gray-700 mb-3">{personalInfo.professionalTitle}</h2>
          <div className="text-sm text-gray-600 space-y-1">
            {personalInfo.email && <div>{personalInfo.email}</div>}
            {personalInfo.phone && <div>{personalInfo.phone}</div>}
            {personalInfo.linkedin && <div>{personalInfo.linkedin}</div>}
            {personalInfo.website && <div>{personalInfo.website}</div>}
          </div>
        </div>

        {/* Summary */}
        {personalInfo.summary && (
          <div className="mb-4">
            <h3 className="text-base font-bold text-gray-900 border-b border-gray-400 mb-2">RESUMO PROFISSIONAL</h3>
            <p className="text-gray-800 text-sm leading-relaxed">{personalInfo.summary}</p>
          </div>
        )}

        {/* Experience */}
        {experience && experience.length > 0 && (
          <div className="mb-4">
            <h3 className="text-base font-bold text-gray-900 border-b border-gray-400 mb-2">EXPERIÊNCIA PROFISSIONAL</h3>
            <div className="space-y-3">
              {experience.map((exp, index) => (
                <div key={index}>
                  <div className="flex justify-between items-start mb-1">
                    <div>
                      <h4 className="font-semibold text-gray-900">{exp.title}</h4>
                      <p className="text-gray-700 text-sm">{exp.company}</p>
                    </div>
                    <span className="text-xs text-gray-600">
                      {formatDate(exp.startDate)} - {exp.current ? 'Atual' : formatDate(exp.endDate)}
                    </span>
                  </div>
                  <p className="text-gray-800 text-sm leading-relaxed">{exp.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Education */}
        {education && education.length > 0 && (
          <div className="mb-4">
            <h3 className="text-base font-bold text-gray-900 border-b border-gray-400 mb-2">EDUCAÇÃO</h3>
            <div className="space-y-3">
              {education.map((edu, index) => (
                <div key={index}>
                  <div className="flex justify-between items-start mb-1">
                    <div>
                      <h4 className="font-semibold text-gray-900">{edu.degree}</h4>
                      <p className="text-gray-700 text-sm">{edu.school}</p>
                    </div>
                    <span className="text-xs text-gray-600">
                      {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                    </span>
                  </div>
                  {edu.description && (
                    <p className="text-gray-800 text-sm leading-relaxed">{edu.description}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Skills and Languages */}
        <div className="grid grid-cols-2 gap-4">
          {skills && skills.length > 0 && (
            <div>
              <h3 className="text-base font-bold text-gray-900 border-b border-gray-400 mb-2">HABILIDADES</h3>
              <ul className="text-sm text-gray-800 space-y-1">
                {skills.map((skill, index) => (
                  <li key={index}>• {skill}</li>
                ))}
              </ul>
            </div>
          )}

          {languages && languages.length > 0 && languages.some(lang => lang.language) && (
            <div>
              <h3 className="text-base font-bold text-gray-900 border-b border-gray-400 mb-2">IDIOMAS</h3>
              <div className="text-sm text-gray-800 space-y-1">
                {languages.filter(lang => lang.language).map((lang, index) => (
                  <div key={index}>{lang.language} - {lang.proficiency}</div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  // Minimal template (default)
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-light text-gray-900 mb-2">{personalInfo.fullName}</h1>
        <h2 className="text-xl text-gray-600 mb-4">{personalInfo.professionalTitle}</h2>
        <div className="flex flex-wrap gap-6 text-sm text-gray-600">
          {personalInfo.email && <span>{personalInfo.email}</span>}
          {personalInfo.phone && <span>{personalInfo.phone}</span>}
          {personalInfo.linkedin && <span>{personalInfo.linkedin}</span>}
          {personalInfo.website && <span>{personalInfo.website}</span>}
        </div>
      </div>

      {/* Summary */}
      {personalInfo.summary && (
        <div>
          <p className="text-gray-700 leading-relaxed">{personalInfo.summary}</p>
        </div>
      )}

      {/* Experience */}
      {experience && experience.length > 0 && (
        <div>
          <h3 className="text-xl font-light text-gray-900 mb-4">Experiência</h3>
          <div className="space-y-6">
            {experience.map((exp, index) => (
              <div key={index}>
                <div className="flex justify-between items-baseline mb-2">
                  <h4 className="text-lg font-medium text-gray-900">{exp.title}</h4>
                  <span className="text-sm text-gray-500">
                    {formatDate(exp.startDate)} - {exp.current ? 'Atual' : formatDate(exp.endDate)}
                  </span>
                </div>
                <p className="text-gray-600 mb-2">{exp.company}</p>
                <p className="text-gray-700 leading-relaxed">{exp.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Education */}
      {education && education.length > 0 && (
        <div>
          <h3 className="text-xl font-light text-gray-900 mb-4">Educação</h3>
          <div className="space-y-4">
            {education.map((edu, index) => (
              <div key={index}>
                <div className="flex justify-between items-baseline mb-1">
                  <h4 className="text-lg font-medium text-gray-900">{edu.degree}</h4>
                  <span className="text-sm text-gray-500">
                    {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                  </span>
                </div>
                <p className="text-gray-600 mb-2">{edu.school}</p>
                {edu.description && (
                  <p className="text-gray-700 leading-relaxed">{edu.description}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Skills */}
      {skills && skills.length > 0 && (
        <div>
          <h3 className="text-xl font-light text-gray-900 mb-4">Habilidades</h3>
          <div className="flex flex-wrap gap-3">
            {skills.map((skill, index) => (
              <span key={index} className="text-gray-700">{skill}</span>
            ))}
          </div>
        </div>
      )}

      {/* Languages */}
      {languages && languages.length > 0 && languages.some(lang => lang.language) && (
        <div>
          <h3 className="text-xl font-light text-gray-900 mb-4">Idiomas</h3>
          <div className="space-y-2">
            {languages.filter(lang => lang.language).map((lang, index) => (
              <div key={index} className="flex justify-between">
                <span className="text-gray-700">{lang.language}</span>
                <span className="text-gray-500">{lang.proficiency}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
