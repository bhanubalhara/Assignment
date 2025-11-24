'use client';

import React, { createContext, useContext, useState, useCallback } from 'react';
import { FormData, FormMode, FormField, FormTheme } from '@/types/form';

interface FormContextType {
  formData: FormData;
  mode: FormMode;
  setMode: (mode: FormMode) => void;
  updateFormData: (data: Partial<FormData>) => void;
  addField: (field: FormField) => void;
  updateField: (id: string, field: Partial<FormField>) => void;
  deleteField: (id: string) => void;
  reorderFields: (fields: FormField[]) => void;
  updateTheme: (theme: Partial<FormTheme>) => void;
}

const defaultTheme: FormTheme = {
  colors: {
    primary: '#3b82f6',
    secondary: '#64748b',
    background: '#ffffff',
    text: '#1e293b',
    border: '#e2e8f0',
    error: '#ef4444',
    success: '#10b981',
  },
  fonts: {
    family: 'Inter, sans-serif',
    sizes: {
      small: '0.875rem',
      medium: '1rem',
      large: '1.125rem',
      heading: '1.5rem',
    },
  },
  spacing: {
    small: '0.5rem',
    medium: '1rem',
    large: '1.5rem',
  },
  borderRadius: '0.375rem',
};

const defaultFormData: FormData = {
  id: '1',
  title: 'Untitled Form',
  description: '',
  fields: [],
  theme: defaultTheme,
};

const FormContext = createContext<FormContextType | undefined>(undefined);

export function FormProvider({ children }: { children: React.ReactNode }) {
  const [formData, setFormData] = useState<FormData>(defaultFormData);
  const [mode, setMode] = useState<FormMode>('edit');

  const updateFormData = useCallback((data: Partial<FormData>) => {
    setFormData((prev) => ({ ...prev, ...data }));
  }, []);

  const addField = useCallback((field: FormField) => {
    setFormData((prev) => ({
      ...prev,
      fields: [...prev.fields, field],
    }));
  }, []);

  const updateField = useCallback((id: string, field: Partial<FormField>) => {
    setFormData((prev) => ({
      ...prev,
      fields: prev.fields.map((f) => (f.id === id ? { ...f, ...field } : f)),
    }));
  }, []);

  const deleteField = useCallback((id: string) => {
    setFormData((prev) => ({
      ...prev,
      fields: prev.fields.filter((f) => f.id !== id),
    }));
  }, []);

  const reorderFields = useCallback((fields: FormField[]) => {
    setFormData((prev) => ({
      ...prev,
      fields,
    }));
  }, []);

  const updateTheme = useCallback((theme: Partial<FormTheme>) => {
    setFormData((prev) => ({
      ...prev,
      theme: { ...prev.theme, ...theme },
    }));
  }, []);

  return (
    <FormContext.Provider
      value={{
        formData,
        mode,
        setMode,
        updateFormData,
        addField,
        updateField,
        deleteField,
        reorderFields,
        updateTheme,
      }}
    >
      {children}
    </FormContext.Provider>
  );
}

export function useForm() {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error('useForm must be used within FormProvider');
  }
  return context;
}

