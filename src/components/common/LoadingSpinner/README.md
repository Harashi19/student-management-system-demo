# LoadingSpinner Components

This directory contains loading spinner components for displaying loading states throughout the application.

## Components

### LoadingSpinner

A flexible loading spinner component with different sizes.

**Props:**
- `size?: 'small' | 'medium' | 'large'` - Size of the spinner (default: 'medium')
- `fullScreen?: boolean` - Whether to display as a full-screen overlay (default: false)
- `color?: 'primary' | 'secondary' | 'inherit'` - Color of the spinner (default: 'primary')

**Usage:**

```tsx
import { LoadingSpinner } from '@/components/common';

// Inline spinner
<LoadingSpinner size="small" />

// Full-screen overlay
<LoadingSpinner fullScreen />
```

### PageLoadingOverlay

A full-page loading overlay with an optional message.

**Props:**
- `message?: string` - Message to display below the spinner (default: 'Loading...')
- `open?: boolean` - Whether the overlay is visible (default: true)

**Usage:**

```tsx
import { PageLoadingOverlay } from '@/components/common';

<PageLoadingOverlay message="Loading data..." open={isLoading} />
```

## Examples

### Basic Loading Spinner

```tsx
function MyComponent() {
  const [loading, setLoading] = useState(true);

  if (loading) {
    return <LoadingSpinner />;
  }

  return <div>Content</div>;
}
```

### Full-Screen Loading

```tsx
function App() {
  const [initializing, setInitializing] = useState(true);

  return (
    <>
      {initializing && <LoadingSpinner fullScreen />}
      <MainContent />
    </>
  );
}
```

### Page Loading Overlay

```tsx
function DataPage() {
  const { data, isLoading } = useGetDataQuery();

  return (
    <>
      <PageLoadingOverlay message="Fetching data..." open={isLoading} />
      <DataDisplay data={data} />
    </>
  );
}
```
