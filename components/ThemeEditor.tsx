'use client';

import React, { useState, useEffect } from 'react';
import { useForm } from '@/contexts/FormContext';
import { FormTheme } from '@/types/form';
import { Palette } from 'lucide-react';

export function ThemeEditor() {
  const { formData, updateTheme } = useForm();
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const theme = formData.theme;

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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
    right: isOpen ? 0 : isMobile ? '-100%' : '-320px',
    top: isMobile ? 'auto' : 0,
    bottom: isMobile ? 0 : 'auto',
    zIndex: 50,
    transition: 'right 0.3s ease',
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

  const handleColorChange = (key: keyof FormTheme['colors'], value: string) => {
    updateTheme({
      colors: {
        ...theme.colors,
        [key]: value,
      },
    });
  };

  const handleFontSizeChange = (key: keyof FormTheme['fonts']['sizes'], value: string) => {
    updateTheme({
      fonts: {
        ...theme.fonts,
        sizes: {
          ...theme.fonts.sizes,
          [key]: value,
        },
      },
    });
  };

  const handleFontFamilyChange = (value: string) => {
    updateTheme({
      fonts: {
        ...theme.fonts,
        family: value,
      },
    });
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        style={{
          position: 'fixed',
          right: isOpen ? (isMobile ? '100%' : '320px') : '0',
          top: isMobile ? '10px' : '50%',
          transform: isMobile ? 'none' : 'translateY(-50%)',
          padding: theme.spacing.medium,
          backgroundColor: theme.colors.primary,
          color: 'white',
          border: 'none',
          borderTopLeftRadius: theme.borderRadius,
          borderBottomLeftRadius: theme.borderRadius,
          cursor: 'pointer',
          zIndex: 51,
          transition: 'right 0.3s ease',
          display: 'flex',
          alignItems: 'center',
          gap: theme.spacing.small,
        }}
        className="hover:opacity-90"
      >
        <Palette size={20} />
        <span className="hidden md:inline">Theme</span>
      </button>

      <div style={panelStyle} className="shadow-lg">
        <h2 style={{ fontSize: theme.fonts.sizes.large, fontWeight: 600, marginBottom: theme.spacing.large, color: theme.colors.text }}>
          Theme Settings
        </h2>

        <div>
          <h3 style={{ ...labelStyle, fontSize: theme.fonts.sizes.medium, marginTop: theme.spacing.medium }}>Colors</h3>
          
          <div>
            <label style={labelStyle}>Primary</label>
            <div style={{ display: 'flex', gap: theme.spacing.small }}>
              <input
                type="color"
                value={theme.colors.primary}
                onChange={(e) => handleColorChange('primary', e.target.value)}
                style={{ width: '60px', height: '40px', border: 'none', cursor: 'pointer' }}
              />
              <input
                type="text"
                value={theme.colors.primary}
                onChange={(e) => handleColorChange('primary', e.target.value)}
                style={inputStyle}
              />
            </div>
          </div>

          <div>
            <label style={labelStyle}>Secondary</label>
            <div style={{ display: 'flex', gap: theme.spacing.small }}>
              <input
                type="color"
                value={theme.colors.secondary}
                onChange={(e) => handleColorChange('secondary', e.target.value)}
                style={{ width: '60px', height: '40px', border: 'none', cursor: 'pointer' }}
              />
              <input
                type="text"
                value={theme.colors.secondary}
                onChange={(e) => handleColorChange('secondary', e.target.value)}
                style={inputStyle}
              />
            </div>
          </div>

          <div>
            <label style={labelStyle}>Background</label>
            <div style={{ display: 'flex', gap: theme.spacing.small }}>
              <input
                type="color"
                value={theme.colors.background}
                onChange={(e) => handleColorChange('background', e.target.value)}
                style={{ width: '60px', height: '40px', border: 'none', cursor: 'pointer' }}
              />
              <input
                type="text"
                value={theme.colors.background}
                onChange={(e) => handleColorChange('background', e.target.value)}
                style={inputStyle}
              />
            </div>
          </div>

          <div>
            <label style={labelStyle}>Text</label>
            <div style={{ display: 'flex', gap: theme.spacing.small }}>
              <input
                type="color"
                value={theme.colors.text}
                onChange={(e) => handleColorChange('text', e.target.value)}
                style={{ width: '60px', height: '40px', border: 'none', cursor: 'pointer' }}
              />
              <input
                type="text"
                value={theme.colors.text}
                onChange={(e) => handleColorChange('text', e.target.value)}
                style={inputStyle}
              />
            </div>
          </div>

          <div>
            <label style={labelStyle}>Border</label>
            <div style={{ display: 'flex', gap: theme.spacing.small }}>
              <input
                type="color"
                value={theme.colors.border}
                onChange={(e) => handleColorChange('border', e.target.value)}
                style={{ width: '60px', height: '40px', border: 'none', cursor: 'pointer' }}
              />
              <input
                type="text"
                value={theme.colors.border}
                onChange={(e) => handleColorChange('border', e.target.value)}
                style={inputStyle}
              />
            </div>
          </div>

          <div>
            <label style={labelStyle}>Error</label>
            <div style={{ display: 'flex', gap: theme.spacing.small }}>
              <input
                type="color"
                value={theme.colors.error}
                onChange={(e) => handleColorChange('error', e.target.value)}
                style={{ width: '60px', height: '40px', border: 'none', cursor: 'pointer' }}
              />
              <input
                type="text"
                value={theme.colors.error}
                onChange={(e) => handleColorChange('error', e.target.value)}
                style={inputStyle}
              />
            </div>
          </div>
        </div>

        <div>
          <h3 style={{ ...labelStyle, fontSize: theme.fonts.sizes.medium, marginTop: theme.spacing.medium }}>Typography</h3>
          
          <div>
            <label style={labelStyle}>Font Family</label>
            <select
              value={theme.fonts.family}
              onChange={(e) => handleFontFamilyChange(e.target.value)}
              style={inputStyle}
            >
              <option value="Inter, sans-serif">Inter</option>
              <option value="Roboto, sans-serif">Roboto</option>
              <option value="Open Sans, sans-serif">Open Sans</option>
              <option value="Lato, sans-serif">Lato</option>
              <option value="Montserrat, sans-serif">Montserrat</option>
              <option value="Poppins, sans-serif">Poppins</option>
              <option value="Arial, sans-serif">Arial</option>
              <option value="Georgia, serif">Georgia</option>
              <option value="Times New Roman, serif">Times New Roman</option>
            </select>
          </div>

          <div>
            <label style={labelStyle}>Heading Size</label>
            <input
              type="text"
              value={theme.fonts.sizes.heading}
              onChange={(e) => handleFontSizeChange('heading', e.target.value)}
              style={inputStyle}
              placeholder="e.g., 1.5rem"
            />
          </div>

          <div>
            <label style={labelStyle}>Large Size</label>
            <input
              type="text"
              value={theme.fonts.sizes.large}
              onChange={(e) => handleFontSizeChange('large', e.target.value)}
              style={inputStyle}
              placeholder="e.g., 1.125rem"
            />
          </div>

          <div>
            <label style={labelStyle}>Medium Size</label>
            <input
              type="text"
              value={theme.fonts.sizes.medium}
              onChange={(e) => handleFontSizeChange('medium', e.target.value)}
              style={inputStyle}
              placeholder="e.g., 1rem"
            />
          </div>

          <div>
            <label style={labelStyle}>Small Size</label>
            <input
              type="text"
              value={theme.fonts.sizes.small}
              onChange={(e) => handleFontSizeChange('small', e.target.value)}
              style={inputStyle}
              placeholder="e.g., 0.875rem"
            />
          </div>
        </div>

        <div>
          <h3 style={{ ...labelStyle, fontSize: theme.fonts.sizes.medium, marginTop: theme.spacing.medium }}>Spacing</h3>
          
          <div>
            <label style={labelStyle}>Border Radius</label>
            <input
              type="text"
              value={theme.borderRadius}
              onChange={(e) => updateTheme({ borderRadius: e.target.value })}
              style={inputStyle}
              placeholder="e.g., 0.375rem"
            />
          </div>
        </div>
      </div>
    </>
  );
}

