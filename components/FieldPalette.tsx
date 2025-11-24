'use client';

import React, { useState, useEffect } from 'react';
import { useForm } from '@/contexts/FormContext';
import { FieldType, FormField } from '@/types/form';
import {
  Type,
  Mail,
  Hash,
  FileText,
  List,
  Circle,
  Square,
  Calendar,
  Phone,
  Link,
} from 'lucide-react';

interface FieldTypeOption {
  type: FieldType;
  label: string;
  icon: React.ReactNode;
}

const fieldTypes: FieldTypeOption[] = [
  { type: 'text', label: 'Text', icon: <Type size={18} /> },
  { type: 'email', label: 'Email', icon: <Mail size={18} /> },
  { type: 'number', label: 'Number', icon: <Hash size={18} /> },
  { type: 'textarea', label: 'Textarea', icon: <FileText size={18} /> },
  { type: 'select', label: 'Select', icon: <List size={18} /> },
  { type: 'radio', label: 'Radio', icon: <Circle size={18} /> },
  { type: 'checkbox', label: 'Checkbox', icon: <Square size={18} /> },
  { type: 'date', label: 'Date', icon: <Calendar size={18} /> },
  { type: 'phone', label: 'Phone', icon: <Phone size={18} /> },
  { type: 'url', label: 'URL', icon: <Link size={18} /> },
];

export function FieldPalette() {
  const { addField, formData } = useForm();
  const theme = formData.theme;
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleAddField = (type: FieldType) => {
    const newField: FormField = {
      id: `field-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      type,
      label: `${type.charAt(0).toUpperCase() + type.slice(1)} Field`,
      required: false,
      ...(type === 'select' || type === 'radio' || type === 'checkbox'
        ? { options: ['Option 1', 'Option 2', 'Option 3'] }
        : {}),
    };
    addField(newField);
  };

  const paletteStyle: React.CSSProperties = {
    backgroundColor: theme.colors.background,
    borderRight: isMobile ? 'none' : `1px solid ${theme.colors.border}`,
    padding: theme.spacing.medium,
    height: isMobile ? 'auto' : '100vh',
    overflowY: 'auto',
    width: isMobile ? '100%' : '256px',
    borderBottom: isMobile ? `1px solid ${theme.colors.border}` : 'none',
  };

  const buttonStyle: React.CSSProperties = {
    width: '100%',
    padding: theme.spacing.medium,
    marginBottom: theme.spacing.small,
    backgroundColor: theme.colors.background,
    border: `1px solid ${theme.colors.border}`,
    borderRadius: theme.borderRadius,
    fontSize: theme.fonts.sizes.medium,
    fontFamily: theme.fonts.family,
    color: theme.colors.text,
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing.small,
    transition: 'all 0.2s',
  };

  return (
    <div style={paletteStyle} className="w-64 flex-shrink-0">
      <h2
        style={{
          fontSize: theme.fonts.sizes.large,
          fontWeight: 600,
          marginBottom: theme.spacing.medium,
          color: theme.colors.text,
        }}
      >
        Add Field
      </h2>
      <div>
        {fieldTypes.map((fieldType) => (
          <button
            key={fieldType.type}
            type="button"
            onClick={() => handleAddField(fieldType.type)}
            style={buttonStyle}
            className="hover:bg-gray-50 hover:border-blue-300"
          >
            {fieldType.icon}
            {fieldType.label}
          </button>
        ))}
      </div>
    </div>
  );
}

