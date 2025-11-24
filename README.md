# Form Builder - JotForm Clone

A powerful, responsive form builder built with Next.js, TypeScript, and React. Create and customize forms with a drag-and-drop interface, theme customization, and real-time preview.

## Features

- ✅ **Edit & Preview Modes**: Switch between editing and previewing your form
- ✅ **Multiple Field Types**: Text, Email, Number, Textarea, Select, Radio, Checkbox, Date
- ✅ **Theme System**: Customize colors, fonts, font sizes, and spacing
- ✅ **Tag-based Theming**: Apply different themes to fields using tags
- ✅ **Form Validation**: Full validation support in preview mode
- ✅ **Responsive Design**: Mobile-first approach with responsive UI
- ✅ **Component-driven Architecture**: Clean, reusable components
- ✅ **TypeScript**: Fully typed for better developer experience

## Tech Stack

- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe development
- **React Hook Form** - Form state management and validation
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Icon library

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd Assignment
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Usage

### Adding Fields

1. In **Edit Mode**, use the left sidebar to add fields
2. Click on any field type to add it to your form
3. Click on a field in the form to edit its properties

### Editing Fields

1. Click on any field in edit mode
2. The field editor panel will open on the right
3. Customize:
   - Label
   - Placeholder
   - Required status
   - Options (for select, radio, checkbox)
   - Tags (for theme targeting)

### Theme Customization

1. Click the **Theme** button on the right side
2. Customize:
   - Colors (Primary, Secondary, Background, Text, Border, Error)
   - Font Family
   - Font Sizes (Heading, Large, Medium, Small)
   - Border Radius
   - Spacing

### Tag-based Theming

1. Add tags to fields in the field editor
2. Tags can be used to apply different themes to specific fields
3. Theme overrides are applied based on field tags

### Preview Mode

1. Click the **Preview** button in the header
2. Test your form with full validation
3. Submit the form to see the data in the console

## Project Structure

```
Assignment/
├── app/
│   ├── layout.tsx          # Root layout with FormProvider
│   ├── page.tsx            # Main page component
│   └── globals.css         # Global styles
├── components/
│   ├── fields/             # Form field components
│   │   ├── BaseField.tsx
│   │   ├── TextField.tsx
│   │   ├── EmailField.tsx
│   │   ├── TextareaField.tsx
│   │   ├── SelectField.tsx
│   │   ├── RadioField.tsx
│   │   ├── CheckboxField.tsx
│   │   ├── NumberField.tsx
│   │   ├── DateField.tsx
│   │   └── FieldRenderer.tsx
│   ├── FormBuilder.tsx     # Main form builder component
│   ├── FieldPalette.tsx    # Sidebar for adding fields
│   ├── FieldEditor.tsx     # Panel for editing field properties
│   ├── ThemeEditor.tsx     # Theme customization panel
│   └── Header.tsx          # Header with mode toggle
├── contexts/
│   └── FormContext.tsx     # Form state management
├── types/
│   └── form.ts             # TypeScript type definitions
├── utils/
│   └── theme.ts            # Theme utility functions
└── package.json
```

## Deployment

### Vercel

1. Push your code to GitHub
2. Import your repository in Vercel
3. Vercel will automatically detect Next.js and deploy

Or use Vercel CLI:
```bash
npm i -g vercel
vercel
```

## Development

### Build for Production

```bash
npm run build
npm start
```

### Linting

```bash
npm run lint
```

## Features in Detail

### Form Fields

- **Text**: Single-line text input
- **Email**: Email input with validation
- **Number**: Numeric input with min/max validation
- **Textarea**: Multi-line text input
- **Select**: Dropdown selection
- **Radio**: Radio button group
- **Checkbox**: Checkbox group
- **Date**: Date picker

### Validation

All fields support:
- Required validation
- Custom validation rules
- Min/Max length (for text fields)
- Min/Max values (for number fields)
- Pattern matching (for text fields)
- Email format validation

### Theme System

The theme system supports:
- Color customization
- Font family selection
- Font size adjustments
- Spacing customization
- Border radius
- Tag-based overrides

## License

MIT

## Author

Built as an assignment for a React/Next.js/TypeScript Frontend Developer position.

