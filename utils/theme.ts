import { FormTheme, FormField } from '@/types/form';

export function getFieldTheme(field: FormField, theme: FormTheme): Partial<FormTheme> {
  if (!field.tags || field.tags.length === 0 || !theme.tags) {
    return {};
  }

  const fieldTheme: Partial<FormTheme> = {};
  
  for (const tag of field.tags) {
    if (theme.tags[tag]) {
      const tagTheme = theme.tags[tag];
      if (tagTheme.colors) {
        fieldTheme.colors = { ...fieldTheme.colors, ...tagTheme.colors };
      }
      if (tagTheme.fonts) {
        fieldTheme.fonts = { ...fieldTheme.fonts, ...tagTheme.fonts };
      }
      if (tagTheme.spacing) {
        fieldTheme.spacing = { ...fieldTheme.spacing, ...tagTheme.spacing };
      }
      if (tagTheme.borderRadius) {
        fieldTheme.borderRadius = tagTheme.borderRadius;
      }
    }
  }

  return fieldTheme;
}

export function mergeTheme(base: FormTheme, override: Partial<FormTheme>): FormTheme {
  return {
    colors: { ...base.colors, ...override.colors },
    fonts: {
      ...base.fonts,
      ...override.fonts,
      sizes: { ...base.fonts.sizes, ...override.fonts?.sizes },
    },
    spacing: { ...base.spacing, ...override.spacing },
    borderRadius: override.borderRadius ?? base.borderRadius,
  };
}

