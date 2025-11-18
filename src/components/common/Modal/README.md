# Modal Components

This directory contains reusable modal and dialog components for the School Management System frontend.

## Components

### Modal

A flexible, reusable modal component that serves as the base for other dialog types.

**Props:**
- `open` (boolean, required): Controls modal visibility
- `onClose` (function, required): Callback when modal is closed
- `title` (string, optional): Modal title
- `children` (ReactNode, required): Modal content
- `actions` (ReactNode, optional): Custom action buttons
- `maxWidth` ('xs' | 'sm' | 'md' | 'lg' | 'xl' | false, default: 'sm'): Maximum width
- `fullWidth` (boolean, default: true): Whether modal should take full width
- `disableBackdropClick` (boolean, default: false): Prevent closing on backdrop click
- `showCloseButton` (boolean, default: true): Show close button in title

**Example:**
```tsx
import { Modal } from '@/components/common';

<Modal
  open={isOpen}
  onClose={handleClose}
  title="Custom Modal"
  actions={
    <>
      <Button onClick={handleClose}>Cancel</Button>
      <Button onClick={handleSave} variant="contained">Save</Button>
    </>
  }
>
  <Typography>Modal content goes here</Typography>
</Modal>
```

### ConfirmDialog

A specialized dialog for confirming destructive or important actions.

**Props:**
- `open` (boolean, required): Controls dialog visibility
- `onClose` (function, required): Callback when dialog is closed
- `onConfirm` (function, required): Callback when action is confirmed
- `title` (string, required): Dialog title
- `message` (string, required): Confirmation message
- `confirmText` (string, default: 'Confirm'): Confirm button text
- `cancelText` (string, default: 'Cancel'): Cancel button text
- `confirmColor` ('primary' | 'secondary' | 'error' | 'warning' | 'info' | 'success', default: 'error'): Confirm button color
- `loading` (boolean, default: false): Show loading state
- `severity` ('warning' | 'error' | 'info', default: 'warning'): Icon severity level

**Example:**
```tsx
import { ConfirmDialog } from '@/components/common';

<ConfirmDialog
  open={isOpen}
  onClose={handleClose}
  onConfirm={handleDelete}
  title="Delete Student"
  message="Are you sure you want to delete this student? This action cannot be undone."
  confirmText="Delete"
  confirmColor="error"
  severity="error"
/>
```

### FormDialog

A dialog optimized for quick forms with built-in submit/cancel actions.

**Props:**
- `open` (boolean, required): Controls dialog visibility
- `onClose` (function, required): Callback when dialog is closed
- `onSubmit` (function, required): Callback when form is submitted
- `title` (string, required): Dialog title
- `children` (ReactNode, required): Form content
- `submitText` (string, default: 'Submit'): Submit button text
- `cancelText` (string, default: 'Cancel'): Cancel button text
- `loading` (boolean, default: false): Show loading state
- `disabled` (boolean, default: false): Disable submit button
- `maxWidth` ('xs' | 'sm' | 'md' | 'lg' | 'xl' | false, default: 'sm'): Maximum width

**Example:**
```tsx
import { FormDialog } from '@/components/common';
import { TextField } from '@/components/common';

<FormDialog
  open={isOpen}
  onClose={handleClose}
  onSubmit={handleSubmit}
  title="Add Quick Note"
  submitText="Save Note"
  loading={isSubmitting}
>
  <TextField
    label="Note"
    multiline
    rows={4}
    fullWidth
    value={note}
    onChange={(e) => setNote(e.target.value)}
  />
</FormDialog>
```

## Features

- **Responsive Design**: Automatically switches to fullscreen on mobile devices
- **Accessibility**: Proper ARIA labels and keyboard navigation support
- **Loading States**: Built-in loading indicators for async operations
- **Flexible Styling**: Customizable through Material-UI theme
- **Backdrop Control**: Option to disable backdrop click for critical actions
- **Mobile Optimized**: Touch-friendly and responsive on all devices

## Usage Guidelines

1. **Use Modal** for custom dialogs with unique layouts or actions
2. **Use ConfirmDialog** for delete operations, irreversible actions, or important confirmations
3. **Use FormDialog** for quick data entry forms, notes, or simple input collection

## Accessibility

All modal components follow WCAG 2.1 Level AA guidelines:
- Proper focus management
- Keyboard navigation (ESC to close, TAB for navigation)
- ARIA labels and roles
- Screen reader compatible
