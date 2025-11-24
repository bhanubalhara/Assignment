'use client';

import React from 'react';
import { FormField, FormTheme } from '@/types/form';
import { getFieldTheme, mergeTheme } from '@/utils/theme';
import { useForm } from '@/contexts/FormContext';
import { X, GripVertical } from 'lucide-react';

interface BaseFieldProps {
  field: FormField;
  children: React.ReactNode;
  className?: string;
}

export function BaseField({ field, children, className = '' }: BaseFieldProps) {
  const { mode, deleteField, formData } = useForm();
  const fieldTheme = getFieldTheme(field, formData.theme);
  const theme = mergeTheme(formData.theme, fieldTheme);

  const isEditMode = mode === 'edit';

  const fieldStyle: React.CSSProperties = {
    fontFamily: theme.fonts.family,
    fontSize: theme.fonts.sizes.medium,
    color: theme.colors.text,
    marginBottom: theme.spacing.medium,
    position: 'relative',
    ...(isEditMode && {
      border: `2px dashed transparent`,
      borderRadius: theme.borderRadius,
      padding: theme.spacing.small,
      transition: 'all 0.2s',
    }),
  };

  const labelStyle: React.CSSProperties = {
    fontSize: theme.fonts.sizes.medium,
    color: theme.colors.text,
    marginBottom: theme.spacing.small,
    fontWeight: 500,
  };

  const handleClick = (e: React.MouseEvent) => {
    if (isEditMode && !(e.target as HTMLElement).closest('button')) {
      const event = new CustomEvent('field-click', { detail: { field } });
      window.dispatchEvent(event);
    }
  };

  const handleMouseEnter = () => {
    if (isEditMode) {
      const element = document.querySelector(`[data-field-id="${field.id}"]`) as HTMLElement;
      if (element) {
        element.style.borderColor = theme.colors.primary;
        element.style.backgroundColor = `${theme.colors.primary}10`;
      }
    }
  };

  const handleMouseLeave = () => {
    if (isEditMode) {
      const element = document.querySelector(`[data-field-id="${field.id}"]`) as HTMLElement;
      if (element) {
        element.style.borderColor = 'transparent';
        element.style.backgroundColor = 'transparent';
      }
    }
  };

  return (
    <div
      className={`relative group ${className} ${isEditMode ? 'cursor-pointer' : ''}`}
      style={fieldStyle}
      data-field-id={field.id}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {isEditMode && (
        <>
          <div className="absolute -left-8 top-0 items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity hidden md:flex">
            <button
              type="button"
              className="cursor-move text-gray-400 hover:text-gray-600"
              title="Drag to reorder"
              onClick={(e) => e.stopPropagation()}
            >
              <GripVertical size={16} />
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                deleteField(field.id);
              }}
              className="text-red-400 hover:text-red-600"
              title="Delete field"
            >
              <X size={16} />
            </button>
          </div>
          <div className="absolute top-2 right-2 md:hidden flex gap-1">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                deleteField(field.id);
              }}
              className="text-red-400 hover:text-red-600 bg-white rounded p-1 shadow"
              title="Delete field"
            >
              <X size={16} />
            </button>
          </div>
        </>
      )}
      
      <label
        htmlFor={field.id}
        style={labelStyle}
        className="block"
      >
        {field.label}
        {field.required && (
          <span style={{ color: theme.colors.error }} className="ml-1">*</span>
        )}
      </label>
      
      <div style={{ position: 'relative' }}>
        {children}
      </div>
    </div>
  );
}
