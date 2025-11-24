'use client';

import React from 'react';
import { useForm } from '@/contexts/FormContext';
import { FieldRenderer } from './fields/FieldRenderer';
import { FormProvider, useForm as useReactHookForm } from 'react-hook-form';

export function FormBuilder() {
  const { formData, mode } = useForm();
  const theme = formData.theme;

  const formStyle: React.CSSProperties = {
    fontFamily: theme.fonts.family,
    color: theme.colors.text,
    backgroundColor: theme.colors.background,
    padding: theme.spacing.large,
    minHeight: '100vh',
  };

  const titleStyle: React.CSSProperties = {
    fontSize: theme.fonts.sizes.heading,
    fontWeight: 600,
    marginBottom: theme.spacing.medium,
    color: theme.colors.text,
  };

  const descriptionStyle: React.CSSProperties = {
    fontSize: theme.fonts.sizes.medium,
    marginBottom: theme.spacing.large,
    color: theme.colors.secondary,
  };

  if (mode === 'preview') {
    return <FormPreview />;
  }

  return (
    <div style={formStyle} className="w-full">
      <h1 style={titleStyle}>{formData.title || 'Untitled Form'}</h1>
      {formData.description && (
        <p style={descriptionStyle}>{formData.description}</p>
      )}
      <div className="space-y-4">
        {formData.fields.length === 0 ? (
          <div
            style={{
              padding: theme.spacing.large,
              border: `2px dashed ${theme.colors.border}`,
              borderRadius: theme.borderRadius,
              textAlign: 'center',
              color: theme.colors.secondary,
            }}
          >
            <p>No fields yet. Add fields from the sidebar to get started.</p>
          </div>
        ) : (
          formData.fields.map((field) => (
            <FieldRenderer key={field.id} field={field} />
          ))
        )}
      </div>
    </div>
  );
}

function FormPreview() {
  const { formData } = useForm();
  const theme = formData.theme;
  const methods = useReactHookForm();

  const formStyle: React.CSSProperties = {
    fontFamily: theme.fonts.family,
    color: theme.colors.text,
    backgroundColor: theme.colors.background,
    padding: theme.spacing.large,
    minHeight: '100vh',
  };

  const titleStyle: React.CSSProperties = {
    fontSize: theme.fonts.sizes.heading,
    fontWeight: 600,
    marginBottom: theme.spacing.medium,
    color: theme.colors.text,
  };

  const descriptionStyle: React.CSSProperties = {
    fontSize: theme.fonts.sizes.medium,
    marginBottom: theme.spacing.large,
    color: theme.colors.secondary,
  };

  const buttonStyle: React.CSSProperties = {
    padding: `${theme.spacing.medium} ${theme.spacing.large}`,
    backgroundColor: theme.colors.primary,
    color: '#ffffff',
    border: 'none',
    borderRadius: theme.borderRadius,
    fontSize: theme.fonts.sizes.medium,
    fontFamily: theme.fonts.family,
    fontWeight: 500,
    cursor: 'pointer',
    marginTop: theme.spacing.large,
    transition: 'opacity 0.2s',
  };

  const onSubmit = (data: any) => {
    console.log('Form submitted:', data);
    alert('Form submitted successfully! Check console for data.');
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} style={formStyle} className="w-full">
        <h1 style={titleStyle}>{formData.title || 'Untitled Form'}</h1>
        {formData.description && (
          <p style={descriptionStyle}>{formData.description}</p>
        )}
        <div className="space-y-4">
          {formData.fields.map((field) => (
            <FieldRenderer key={field.id} field={field} />
          ))}
        </div>
        {formData.fields.length > 0 && (
          <button type="submit" style={buttonStyle} className="hover:opacity-90">
            Submit
          </button>
        )}
      </form>
    </FormProvider>
  );
}

