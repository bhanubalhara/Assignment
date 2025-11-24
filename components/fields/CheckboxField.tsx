'use client';

import React from 'react';
import { FormField } from '@/types/form';
import { BaseField } from './BaseField';
import { useForm } from '@/contexts/FormContext';
import { useFormContext as useReactHookFormContext } from 'react-hook-form';

interface CheckboxFieldProps {
  field: FormField;
}

export function CheckboxField({ field }: CheckboxFieldProps) {
  const { mode, formData } = useForm();
  const { register, formState: { errors } } = useReactHookFormContext();
  const fieldTheme = formData.theme;
  
  const isEditMode = mode === 'edit';
  const error = errors[field.id];

  if (isEditMode) {
    return (
      <BaseField field={field}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: fieldTheme.spacing.small }}>
          {field.options?.map((option, index) => (
            <label
              key={index}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: fieldTheme.spacing.small,
                fontSize: fieldTheme.fonts.sizes.medium,
                fontFamily: fieldTheme.fonts.family,
                color: fieldTheme.colors.text,
                cursor: 'default',
              }}
            >
              <input
                type="checkbox"
                name={field.id}
                value={option}
                defaultChecked={field.defaultValue === option}
                disabled
                style={{ cursor: 'default' }}
              />
              {option}
            </label>
          ))}
        </div>
      </BaseField>
    );
  }

  return (
    <BaseField field={field}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: fieldTheme.spacing.small }}>
        {field.options?.map((option, index) => (
          <label
            key={index}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: fieldTheme.spacing.small,
              fontSize: fieldTheme.fonts.sizes.medium,
              fontFamily: fieldTheme.fonts.family,
              color: fieldTheme.colors.text,
              cursor: 'pointer',
            }}
          >
            <input
              type="checkbox"
              value={option}
              {...register(field.id, {
                required: field.required ? `${field.label} is required` : false,
              })}
              style={{ cursor: 'pointer' }}
            />
            {option}
          </label>
        ))}
      </div>
      {error && (
        <p style={{ color: fieldTheme.colors.error, fontSize: fieldTheme.fonts.sizes.small, marginTop: fieldTheme.spacing.small }}>
          {error.message as string}
        </p>
      )}
    </BaseField>
  );
}

