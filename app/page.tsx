'use client';

import React, { useState, useEffect } from 'react';
import { FormBuilder } from '@/components/FormBuilder';
import { FieldPalette } from '@/components/FieldPalette';
import { FieldEditor } from '@/components/FieldEditor';
import { ThemeEditor } from '@/components/ThemeEditor';
import { Header } from '@/components/Header';
import { useForm } from '@/contexts/FormContext';
import { FormField } from '@/types/form';

export default function Home() {
  const { mode, formData } = useForm();
  const [selectedField, setSelectedField] = useState<FormField | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const handleFieldClick = (event: CustomEvent<{ field: FormField }>) => {
      setSelectedField(event.detail.field);
    };

    window.addEventListener('field-click', handleFieldClick as EventListener);
    return () => {
      window.removeEventListener('field-click', handleFieldClick as EventListener);
    };
  }, []);

  const containerStyle: React.CSSProperties = {
    display: 'flex',
    minHeight: '100vh',
    backgroundColor: formData.theme.colors.background,
    flexDirection: isMobile ? 'column' : 'row',
  };

  const mainContentStyle: React.CSSProperties = {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
    width: '100%',
  };

  const contentAreaStyle: React.CSSProperties = {
    flex: 1,
    overflowY: 'auto',
    display: 'flex',
    justifyContent: 'center',
    padding: mode === 'edit' ? '1rem' : '1rem',
  };

  const formWrapperStyle: React.CSSProperties = {
    width: '100%',
    maxWidth: mode === 'preview' ? '600px' : '100%',
    padding: mode === 'edit' ? '1rem' : '0',
  };

  return (
    <div style={containerStyle}>
      {mode === 'edit' && <FieldPalette />}
      
      <div style={mainContentStyle}>
        <Header />
        
        <div style={contentAreaStyle}>
          <div style={formWrapperStyle}>
            <FormBuilder />
          </div>
        </div>
      </div>

      {mode === 'edit' && (
        <>
          {selectedField && (
            <FieldEditor
              field={selectedField}
              onClose={() => setSelectedField(null)}
            />
          )}
          <ThemeEditor />
        </>
      )}
    </div>
  );
}

