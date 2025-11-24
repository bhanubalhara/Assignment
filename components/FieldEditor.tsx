'use client';

import React, { useState, useEffect } from 'react';
import { useForm } from '@/contexts/FormContext';
import { FormField } from '@/types/form';
import { X } from 'lucide-react';

interface FieldEditorProps {
  field: FormField | null;
  onClose: () => void;
}

export function FieldEditor({ field, onClose }: FieldEditorProps) {
  const { updateField, formData } = useForm();
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

  const [formState, setFormState] = useState<Partial<FormField>>({
    label: '',
    placeholder: '',
    required: false,
    options: [],
    tags: [],
  });

  useEffect(() => {
    if (field) {
      setFormState({
        label: field.label,
        placeholder: field.placeholder || '',
        required: field.required || false,
        options: field.options || [],
        tags: field.tags || [],
      });
    }
  }, [field]);

  if (!field) return null;

  const panelStyle: React.CSSProperties = {
    backgroundColor: theme.colors.background,
    borderLeft: isMobile ? 'none' : `1px solid ${theme.colors.border}`,
    borderTop: isMobile ? `1px solid ${theme.colors.border}` : 'none',
    padding: theme.spacing.large,
    height: isMobile ? 'auto' : '100vh',
    maxHeight: isMobile ? '80vh' : '100vh',
    overflowY: 'auto',
    width: isMobile ? '100%' : '320px',
    position: 'fixed',
    right: 0,
    top: isMobile ? 'auto' : 0,
    bottom: isMobile ? 0 : 'auto',
    zIndex: 50,
    boxShadow: '0 0 20px rgba(0,0,0,0.1)',
  };

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: theme.spacing.small,
    border: `1px solid ${theme.colors.border}`,
    borderRadius: theme.borderRadius,
    fontSize: theme.fonts.sizes.medium,
    fontFamily: theme.fonts.family,
    color: theme.colors.text,
    backgroundColor: theme.colors.background,
    marginBottom: theme.spacing.medium,
  };

  const labelStyle: React.CSSProperties = {
    fontSize: theme.fonts.sizes.small,
    fontWeight: 500,
    marginBottom: theme.spacing.small,
    color: theme.colors.text,
    display: 'block',
  };

  const handleSave = () => {
    updateField(field.id, formState);
    onClose();
  };

  const handleAddOption = () => {
    setFormState({
      ...formState,
      options: [...(formState.options || []), ''],
    });
  };

  const handleUpdateOption = (index: number, value: string) => {
    const newOptions = [...(formState.options || [])];
    newOptions[index] = value;
    setFormState({ ...formState, options: newOptions });
  };

  const handleRemoveOption = (index: number) => {
    const newOptions = formState.options?.filter((_, i) => i !== index) || [];
    setFormState({ ...formState, options: newOptions });
  };

  const handleAddTag = (tag: string) => {
    if (tag && !formState.tags?.includes(tag)) {
      setFormState({
        ...formState,
        tags: [...(formState.tags || []), tag],
      });
    }
  };

  const handleRemoveTag = (tag: string) => {
    setFormState({
      ...formState,
      tags: formState.tags?.filter((t) => t !== tag) || [],
    });
  };

  const needsOptions = ['select', 'radio', 'checkbox'].includes(field.type);

  return (
    <div style={panelStyle} className="shadow-lg">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: theme.spacing.large }}>
        <h2 style={{ fontSize: theme.fonts.sizes.large, fontWeight: 600, color: theme.colors.text }}>
          Edit Field
        </h2>
        <button
          type="button"
          onClick={onClose}
          style={{ background: 'none', border: 'none', cursor: 'pointer', color: theme.colors.text }}
        >
          <X size={20} />
        </button>
      </div>

      <div>
        <label style={labelStyle}>Label</label>
        <input
          type="text"
          value={formState.label}
          onChange={(e) => setFormState({ ...formState, label: e.target.value })}
          style={inputStyle}
        />
      </div>

      {field.type !== 'radio' && field.type !== 'checkbox' && (
        <div>
          <label style={labelStyle}>Placeholder</label>
          <input
            type="text"
            value={formState.placeholder}
            onChange={(e) => setFormState({ ...formState, placeholder: e.target.value })}
            style={inputStyle}
          />
        </div>
      )}

      <div style={{ marginBottom: theme.spacing.medium }}>
        <label style={{ ...labelStyle, display: 'flex', alignItems: 'center', gap: theme.spacing.small }}>
          <input
            type="checkbox"
            checked={formState.required}
            onChange={(e) => setFormState({ ...formState, required: e.target.checked })}
          />
          Required
        </label>
      </div>

      {needsOptions && (
        <div>
          <label style={labelStyle}>Options</label>
          {formState.options?.map((option, index) => (
            <div key={index} style={{ display: 'flex', gap: theme.spacing.small, marginBottom: theme.spacing.small }}>
              <input
                type="text"
                value={option}
                onChange={(e) => handleUpdateOption(index, e.target.value)}
                style={{ ...inputStyle, marginBottom: 0 }}
              />
              <button
                type="button"
                onClick={() => handleRemoveOption(index)}
                style={{
                  padding: theme.spacing.small,
                  backgroundColor: theme.colors.error,
                  color: 'white',
                  border: 'none',
                  borderRadius: theme.borderRadius,
                  cursor: 'pointer',
                }}
              >
                <X size={16} />
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={handleAddOption}
            style={{
              ...inputStyle,
              backgroundColor: theme.colors.primary,
              color: 'white',
              border: 'none',
              cursor: 'pointer',
              marginBottom: 0,
            }}
          >
            + Add Option
          </button>
        </div>
      )}

      <div>
        <label style={labelStyle}>Tags (for theme targeting)</label>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: theme.spacing.small, marginBottom: theme.spacing.small }}>
          {formState.tags?.map((tag) => (
            <span
              key={tag}
              style={{
                padding: `${theme.spacing.small} ${theme.spacing.medium}`,
                backgroundColor: theme.colors.primary,
                color: 'white',
                borderRadius: theme.borderRadius,
                fontSize: theme.fonts.sizes.small,
                display: 'flex',
                alignItems: 'center',
                gap: theme.spacing.small,
              }}
            >
              {tag}
              <button
                type="button"
                onClick={() => handleRemoveTag(tag)}
                style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer' }}
              >
                <X size={14} />
              </button>
            </span>
          ))}
        </div>
        <input
          type="text"
          placeholder="Add tag and press Enter"
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              handleAddTag(e.currentTarget.value);
              e.currentTarget.value = '';
            }
          }}
          style={inputStyle}
        />
      </div>

      <button
        type="button"
        onClick={handleSave}
        style={{
          width: '100%',
          padding: theme.spacing.medium,
          backgroundColor: theme.colors.primary,
          color: 'white',
          border: 'none',
          borderRadius: theme.borderRadius,
          fontSize: theme.fonts.sizes.medium,
          fontFamily: theme.fonts.family,
          fontWeight: 500,
          cursor: 'pointer',
          marginTop: theme.spacing.large,
        }}
        className="hover:opacity-90"
      >
        Save Changes
      </button>
    </div>
  );
}

