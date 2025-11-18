# ErrorBoundary Components

This directory contains error boundary and error display components for handling errors gracefully throughout the application.

## Components

### ErrorBoundary

A React error boundary component that catches JavaScript errors in child components and displays a fallback UI.

**Props:**
- `children: ReactNode` - Child components to wrap
- `fallback?: ReactNode` - Custom fallback UI (optional)
- `onError?: (error: Error, errorInfo: ErrorInfo) => void` - Error callback for logging (optional)

**Usage:**

```tsx
import { ErrorBoundary } from '@/components/common';

<ErrorBoundary>
  <MyComponent />
</ErrorBoundary>
```

### ErrorFallback

Default fallback UI displayed when ErrorBoundary catches an error. Shows error details in development mode.

**Props:**
- `error: Error | null` - The error object
- `onReset?: () => void` - Callback to reset the error state

**Usage:**

```tsx
import { ErrorFallback } from '@/components/common';

<ErrorFallback error={error} onReset={handleReset} />
```

### ErrorDisplay

Inline error display component for showing error messages with optional retry functionality.

**Props:**
- `error?: Error | string | null` - Error to display
- `title?: string` - Error title (default: 'Error')
- `severity?: 'error' | 'warning' | 'info'` - Alert severity (default: 'error')
- `onRetry?: () => void` - Retry callback (optional)
- `showDetails?: boolean` - Show error stack trace in development (default: false)

**Usage:**

```tsx
import { ErrorDisplay } from '@/components/common';

<ErrorDisplay 
  error={error} 
  title="Failed to load data"
  onRetry={refetch}
  showDetails
/>
```

## Examples

### Wrapping the Entire App

```tsx
import { ErrorBoundary } from '@/components/common';

function App() {
  return (
    <ErrorBoundary onError={(error, errorInfo) => {
      // Log to error tracking service
      console.error('App error:', error, errorInfo);
    }}>
      <Router>
        <Routes />
      </Router>
    </ErrorBoundary>
  );
}
```

### Wrapping Specific Features

```tsx
import { ErrorBoundary } from '@/components/common';

function Dashboard() {
  return (
    <div>
      <ErrorBoundary>
        <StudentList />
      </ErrorBoundary>
      
      <ErrorBoundary>
        <TeacherList />
      </ErrorBoundary>
    </div>
  );
}
```

### Custom Fallback UI

```tsx
import { ErrorBoundary } from '@/components/common';

function MyComponent() {
  return (
    <ErrorBoundary 
      fallback={
        <div>
          <h2>Something went wrong in this section</h2>
          <button onClick={() => window.location.reload()}>
            Reload
          </button>
        </div>
      }
    >
      <ComplexComponent />
    </ErrorBoundary>
  );
}
```

### Inline Error Display

```tsx
import { ErrorDisplay } from '@/components/common';

function DataFetcher() {
  const { data, error, refetch } = useQuery();

  return (
    <div>
      <ErrorDisplay 
        error={error}
        title="Failed to fetch data"
        onRetry={refetch}
        showDetails
      />
      {data && <DataDisplay data={data} />}
    </div>
  );
}
```

### API Error Handling

```tsx
import { ErrorDisplay } from '@/components/common';

function StudentForm() {
  const [createStudent, { error, isLoading }] = useCreateStudentMutation();

  const handleSubmit = async (data) => {
    try {
      await createStudent(data).unwrap();
    } catch (err) {
      // Error will be displayed by ErrorDisplay
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <ErrorDisplay 
        error={error}
        title="Failed to create student"
        severity="error"
      />
      {/* Form fields */}
    </form>
  );
}
```

## Error Logging

In production, you should integrate with an error tracking service like Sentry:

```tsx
import * as Sentry from '@sentry/react';

<ErrorBoundary 
  onError={(error, errorInfo) => {
    Sentry.captureException(error, {
      contexts: {
        react: {
          componentStack: errorInfo.componentStack,
        },
      },
    });
  }}
>
  <App />
</ErrorBoundary>
```
