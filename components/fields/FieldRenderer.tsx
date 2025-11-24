'use client';

import React from 'react';
import { FormField } from '@/types/form';
import { TextField } from './TextField';
import { EmailField } from './EmailField';
import { TextareaField } from './TextareaField';
import { SelectField } from './SelectField';
import { RadioField } from './RadioField';
import { CheckboxField } from './CheckboxField';
import { NumberField } from './NumberField';
import { DateField } from './DateField';
import { PhoneField } from './PhoneField';
import { UrlField } from './UrlField';

interface FieldRendererProps {
  field: FormField;
}

export function FieldRenderer({ field }: FieldRendererProps) {
  switch (field.type) {
    case 'text':
      return <TextField field={field} />;
    case 'email':
      return <EmailField field={field} />;
    case 'textarea':
      return <TextareaField field={field} />;
    case 'select':
      return <SelectField field={field} />;
    case 'radio':
      return <RadioField field={field} />;
    case 'checkbox':
      return <CheckboxField field={field} />;
    case 'number':
      return <NumberField field={field} />;
    case 'date':
      return <DateField field={field} />;
    case 'phone':
      return <PhoneField field={field} />;
    case 'url':
      return <UrlField field={field} />;
    default:
      return <TextField field={field} />;
  }
}

