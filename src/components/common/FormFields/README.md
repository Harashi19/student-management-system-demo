# Form Field Components

Reusable form field components with react-hook-form integration and validation support.

## Components

### TextField
Text input field with validation display.

```tsx
import { TextField } from '@/components/common';
import { useForm, FormProvider } from 'react-hook-form';

const MyForm = () => {
  const methods = useForm();
  
  return (
    <FormProvider {...methods}>
      <TextField
        name="email"
        label="Email Address"
        type="email"
        validation={{ required: 'Email is required' }}
        helperText="Enter your email address"
      />
    </FormProvider>
  );
};
```

### Select
Dropdown select with optional search functionality.

```tsx
import { Select } from '@/components/common';

const options = [
  { value: '1', label: 'Option 1' },
  { value: '2', label: 'Option 2' },
];

<Select
  name="category"
  label="Category"
  options={options}
  searchable
  validation={{ required: 'Please select a category' }}
/>
```

### DatePicker
Date picker with calendar interface.

```tsx
import { DatePicker } from '@/components/common';

<DatePicker
  name="birthdate"
  label="Date of Birth"
  disableFuture
  validation={{ required: 'Date is required' }}
/>
```

### FileUpload
File upload with drag-and-drop support.

```tsx
import { FileUpload } from '@/components/common';

<FileUpload
  name="documents"
  label="Upload Documents"
  accept=".pdf,.doc,.docx"
  maxSize={5 * 1024 * 1024} // 5MB
  multiple
  validation={{ required: 'Please upload at least one document' }}
/>
```

### Checkbox
Single checkbox or checkbox group.

```tsx
import { Checkbox, CheckboxGroup } from '@/components/common';

// Single checkbox
<Checkbox
  name="terms"
  label="I agree to the terms and conditions"
  validation={{ required: 'You must accept the terms' }}
/>

// Checkbox group
const options = [
  { value: 'math', label: 'Mathematics' },
  { value: 'science', label: 'Science' },
  { value: 'english', label: 'English' },
];

<CheckboxGroup
  name="subjects"
  options={options}
  validation={{ required: 'Select at least one subject' }}
/>
```

### RadioGroup
Radio button group for single selection.

```tsx
import { RadioGroup } from '@/components/common';

const options = [
  { value: 'male', label: 'Male' },
  { value: 'female', label: 'Female' },
  { value: 'other', label: 'Other' },
];

<RadioGroup
  name="gender"
  label="Gender"
  options={options}
  row
  validation={{ required: 'Please select your gender' }}
/>
```

## Features

- **React Hook Form Integration**: All components work seamlessly with react-hook-form
- **Automatic Validation Display**: Error messages are automatically displayed from form validation
- **Consistent API**: All components follow the same prop pattern
- **Accessibility**: Built with ARIA labels and keyboard navigation support
- **TypeScript Support**: Full TypeScript definitions included
- **Standalone Usage**: Components can be used without form context for simple cases

## Usage with React Hook Form

```tsx
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { TextField, Select, DatePicker, Checkbox } from '@/components/common';

const schema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email'),
  birthdate: z.date(),
  category: z.string().min(1, 'Category is required'),
  terms: z.boolean().refine(val => val === true, 'You must accept the terms'),
});

const MyForm = () => {
  const methods = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <TextField name="name" label="Full Name" />
        <TextField name="email" label="Email" type="email" />
        <DatePicker name="birthdate" label="Date of Birth" />
        <Select
          name="category"
          label="Category"
          options={[
            { value: 'student', label: 'Student' },
            { value: 'teacher', label: 'Teacher' },
          ]}
        />
        <Checkbox name="terms" label="I agree to the terms" />
        <button type="submit">Submit</button>
      </form>
    </FormProvider>
  );
};
```

## Props

### Common Props (All Components)

- `name` (string, required): Field name for form registration
- `label` (string, required): Label text
- `validation` (object, optional): Validation rules for react-hook-form
- `helperText` (string, optional): Helper text displayed below the field
- `disabled` (boolean, optional): Disable the field

### Component-Specific Props

See individual component files for detailed prop definitions.
