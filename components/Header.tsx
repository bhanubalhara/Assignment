'use client';

import React from 'react';
import { useForm } from '@/contexts/FormContext';
import { Eye, Edit, Save } from 'lucide-react';

export function Header() {
  const { mode, setMode, formData, updateFormData } = useForm();
  const theme = formData.theme;
  const [isEditingTitle, setIsEditingTitle] = React.useState(false);
  const [title, setTitle] = React.useState(formData.title);

  React.useEffect(() => {
    setTitle(formData.title);
  }, [formData.title]);

  const headerStyle: React.CSSProperties = {
    backgroundColor: theme.colors.background,
    borderBottom: `1px solid ${theme.colors.border}`,
    padding: theme.spacing.medium,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'sticky',
    top: 0,
    zIndex: 40,
  };

  const buttonStyle: React.CSSProperties = {
    padding: `${theme.spacing.small} ${theme.spacing.medium}`,
    border: `1px solid ${theme.colors.border}`,
    borderRadius: theme.borderRadius,
    fontSize: theme.fonts.sizes.medium,
    fontFamily: theme.fonts.family,
    backgroundColor: mode === 'preview' ? theme.colors.primary : theme.colors.background,
    color: mode === 'preview' ? 'white' : theme.colors.text,
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing.small,
    transition: 'all 0.2s',
  };

  const handleTitleSave = () => {
    updateFormData({ title });
    setIsEditingTitle(false);
  };

  return (
    <header style={headerStyle} className="shadow-sm">
      <div style={{ display: 'flex', alignItems: 'center', gap: theme.spacing.medium, flex: 1 }}>
        {isEditingTitle ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: theme.spacing.small, flex: 1 }}>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              onBlur={handleTitleSave}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleTitleSave();
                }
                if (e.key === 'Escape') {
                  setTitle(formData.title);
                  setIsEditingTitle(false);
                }
              }}
              autoFocus
              style={{
                fontSize: theme.fonts.sizes.large,
                fontWeight: 600,
                fontFamily: theme.fonts.family,
                color: theme.colors.text,
                border: `1px solid ${theme.colors.border}`,
                borderRadius: theme.borderRadius,
                padding: theme.spacing.small,
                flex: 1,
                outline: 'none',
              }}
            />
          </div>
        ) : (
          <h1
            onClick={() => setIsEditingTitle(true)}
            style={{
              fontSize: theme.fonts.sizes.large,
              fontWeight: 600,
              fontFamily: theme.fonts.family,
              color: theme.colors.text,
              cursor: 'pointer',
            }}
            className="hover:opacity-70"
          >
            {formData.title || 'Untitled Form'}
          </h1>
        )}
      </div>

      <div style={{ display: 'flex', gap: theme.spacing.small }}>
        <button
          type="button"
          onClick={() => setMode(mode === 'edit' ? 'preview' : 'edit')}
          style={buttonStyle}
          className="hover:opacity-90"
        >
          {mode === 'edit' ? (
            <>
              <Eye size={18} />
              Preview
            </>
          ) : (
            <>
              <Edit size={18} />
              Edit
            </>
          )}
        </button>
      </div>
    </header>
  );
}

