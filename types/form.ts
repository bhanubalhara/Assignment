export type FieldType = 
  | 'text'
  | 'email'
  | 'number'
  | 'textarea'
  | 'select'
  | 'radio'
  | 'checkbox'
  | 'date'
  | 'phone'
  | 'url';

export interface FormField {
  id: string;
  type: FieldType;
  label: string;
  placeholder?: string;
  required?: boolean;
  validation?: {
    min?: number;
    max?: number;
    pattern?: string;
    customMessage?: string;
  };
  options?: string[]; // For select, radio, checkbox
  defaultValue?: string | number | boolean;
  tags?: string[]; // For theme targeting
}

export interface FormTheme {
  colors: {
    primary: string;
    secondary: string;
    background: string;
    text: string;
    border: string;
    error: string;
    success: string;
  };
  fonts: {
    family: string;
    sizes: {
      small: string;
      medium: string;
      large: string;
      heading: string;
    };
  };
  spacing: {
    small: string;
    medium: string;
    large: string;
  };
  borderRadius: string;
  tags?: Record<string, Partial<FormTheme>>; // Theme overrides for specific tags
}

export interface FormData {
  id: string;
  title: string;
  description?: string;
  fields: FormField[];
  theme: FormTheme;
}

export type FormMode = 'edit' | 'preview';

