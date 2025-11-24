'use client';

import React from 'react';
import { FormField } from '@/types/form';
import { BaseField } from './BaseField';
import { useForm } from '@/contexts/FormContext';
import { useFormContext as useReactHookFormContext } from 'react-hook-form';

interface UrlFieldProps {
  field: FormField;
}

export function UrlField({ field }: UrlFieldProps) {
  const { mode, formData } = useForm();
  const { register, formState: { errors } } = useReactHookFormContext();
  const fieldTheme = formData.theme;
  
  const isEditMode = mode === 'edit';
  const error = errors[field.id];

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: fieldTheme.spacing.medium,
    border: `1px solid ${error ? fieldTheme.colors.error : fieldTheme.colors.border}`,
    borderRadius: fieldTheme.borderRadius,
    fontSize: fieldTheme.fonts.sizes.medium,
    fontFamily: fieldTheme.fonts.family,
    color: fieldTheme.colors.text,
    backgroundColor: fieldTheme.colors.background,
    outline: 'none',
    transition: 'border-color 0.2s',
  };

  if (isEditMode) {
    return (
      <BaseField field={field}>
        <input
          type="url"
          id={field.id}
          placeholder={field.placeholder || 'https://example.com'}
          defaultValue={field.defaultValue as string}
          style={inputStyle}
          disabled
        />
      </BaseField>
    );
  }

  return (
    <BaseField field={field}>
      <input
        type="url"
        id={field.id}
        placeholder={field.placeholder || 'https://example.com'}
        {...register(field.id, {
          required: field.required ? `${field.label} is required` : false,
          pattern: {
            value: /^https?:\/\/.+/,
            message: 'Please enter a valid URL (starting with http:// or https://)',
          },
        })}
        style={inputStyle}
        className="focus:ring-2 focus:ring-opacity-50"
      />
      {error && (
        <p style={{ color: fieldTheme.colors.error, fontSize: fieldTheme.fonts.sizes.small, marginTop: fieldTheme.spacing.small }}>
          {error.message as string}
        </p>
      )}
    </BaseField>
  );
}

