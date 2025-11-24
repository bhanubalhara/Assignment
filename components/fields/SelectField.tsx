'use client';

import React from 'react';
import { FormField } from '@/types/form';
import { BaseField } from './BaseField';
import { useForm } from '@/contexts/FormContext';
import { useFormContext as useReactHookFormContext } from 'react-hook-form';

interface SelectFieldProps {
  field: FormField;
}

export function SelectField({ field }: SelectFieldProps) {
  const { mode, formData } = useForm();
  const { register, formState: { errors } } = useReactHookFormContext();
  const fieldTheme = formData.theme;
  
  const isEditMode = mode === 'edit';
  const error = errors[field.id];

  const selectStyle: React.CSSProperties = {
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
    cursor: isEditMode ? 'default' : 'pointer',
  };

  if (isEditMode) {
    return (
      <BaseField field={field}>
        <select
          id={field.id}
          defaultValue={field.defaultValue as string}
          style={selectStyle}
          disabled
        >
          <option value="">Select an option</option>
          {field.options?.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </select>
      </BaseField>
    );
  }

  return (
    <BaseField field={field}>
      <select
        id={field.id}
        {...register(field.id, {
          required: field.required ? `${field.label} is required` : false,
        })}
        style={selectStyle}
        className="focus:ring-2 focus:ring-opacity-50"
      >
        <option value="">Select an option</option>
        {field.options?.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
      {error && (
        <p style={{ color: fieldTheme.colors.error, fontSize: fieldTheme.fonts.sizes.small, marginTop: fieldTheme.spacing.small }}>
          {error.message as string}
        </p>
      )}
    </BaseField>
  );
}

