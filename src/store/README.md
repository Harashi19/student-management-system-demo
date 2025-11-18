# Redux Store Configuration

This directory contains the Redux store configuration using Redux Toolkit and RTK Query.

## Structure

- `store.ts` - Main store configuration with reducers and middleware
- `hooks.ts` - Typed Redux hooks for TypeScript support
- `middleware.ts` - Custom middleware for error handling
- `index.ts` - Public exports

## Usage

### Using Typed Hooks

Always use the typed hooks instead of the plain Redux hooks:

```typescript
import { useAppDispatch, useAppSelector } from '@/store';

function MyComponent() {
  const dispatch = useAppDispatch();
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
  
  // ...
}
```

### Accessing the Store

The store is already wrapped in the Provider in `main.tsx`:

```typescript
import { Provider } from 'react-redux';
import { store } from '@/store';

<Provider store={store}>
  <App />
</Provider>
```

### Using RTK Query

RTK Query endpoints are defined in feature-specific API files in the `src/api` directory. They automatically inject into the base API:

```typescript
// In src/api/students.api.ts
import { baseApi } from './base.api';

export const studentsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getStudents: builder.query({
      query: () => '/students/',
      providesTags: ['Student'],
    }),
  }),
});

export const { useGetStudentsQuery } = studentsApi;
```

### Authentication

The store automatically includes authentication tokens in API requests. The token is retrieved from the auth slice and added to the Authorization header.

### Error Handling

The error handling middleware automatically logs errors and can be extended to show toast notifications or handle specific error scenarios.

## Cache Invalidation

RTK Query uses tags for cache invalidation. The following tags are configured:

- User
- Student
- Teacher
- Assessment
- Mark
- Attendance
- Fee
- Payment
- Timetable
- Announcement
- Message
- Notification
- Hostel
- Room
- Subject
- Class
- Department
- CalendarEvent

Use `providesTags` in queries and `invalidatesTags` in mutations to manage cache automatically.
