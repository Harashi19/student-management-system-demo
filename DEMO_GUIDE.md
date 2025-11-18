# Demo Guide - School Management System Frontend

## What's Been Implemented

### Demo 1: Authentication Module ✅
- **Login Page** - Full authentication with form validation
- **Protected Routes** - Automatic redirect for unauthenticated users
- **Role-Based Routes** - Access control based on user roles
- **Two-Factor Auth** - 2FA verification component

### Demo 2: Application Shell ✅
- **Main Layout** - Responsive layout with AppBar and Sidebar
- **AppBar** - Top navigation with search, notifications, user menu, theme toggle
- **Sidebar** - Collapsible navigation with role-based menu items
- **Dashboard** - Landing page with statistics cards
- **Routing** - Complete routing configuration with React Router

## How to Run

### 1. Start the Development Server

```bash
cd frontend
npm run dev
```

The application will be available at `http://localhost:5173`

### 2. Login with Demo Credentials

**No backend required!** The application includes demo mode for instant testing.

#### Option 1: Quick Login (Recommended)
1. Navigate to `http://localhost:5173/login`
2. Click "Show Demo Credentials"
3. Click any demo account button to login instantly

#### Option 2: Manual Login
Enter any of these credentials:

| Role | Email | Password |
|------|-------|----------|
| **Admin** | admin@school.com | admin123 |
| **Teacher** | teacher@school.com | teacher123 |
| **Student** | student@school.com | student123 |
| **Parent** | parent@school.com | parent123 |

### 3. Test with Real Backend (Optional)

If you want to test with the actual Django backend:

1. Make sure your Django backend is running
2. Update the API URL in `.env`:

```env
VITE_API_URL=http://localhost:8000/api
```

3. Use real credentials from your backend database

## Features You Can Test

### 1. Login Page
- Navigate to `/login`
- Click "Show Demo Credentials" to see all available demo accounts
- Click any demo account button for instant login
- Or manually enter demo credentials
- See form validation in action (try invalid email format)
- Error messages for invalid inputs

### 2. Protected Routes
- Try accessing `/` without logging in
- You'll be redirected to `/login`
- After login, you'll be redirected back to your intended destination

### 3. Main Layout
- **AppBar Features:**
  - Menu toggle button (opens/closes sidebar)
  - Search bar (UI only, not functional yet)
  - Theme toggle (light/dark mode button)
  - Notifications icon with badge
  - User menu with profile, settings, logout

- **Sidebar Features:**
  - Collapsible navigation menu
  - Role-based menu visibility
  - Active state highlighting
  - Nested menu sections
  - Responsive design (drawer on mobile)

### 4. Dashboard
- Welcome message with user's name
- Statistics cards (placeholder data)
- Responsive grid layout

### 5. Navigation
- Click sidebar items to navigate
- Placeholder pages for future modules
- 404 page for invalid routes

## Role-Based Access

The sidebar menu items are filtered based on user roles:

- **Everyone:** Dashboard, Academics (view), Attendance (view), Timetable (view), Communication
- **Admin:** All features including Students, Teachers, Finance, Hostel management
- **Teacher:** Students (view), Academics (marks entry), Attendance (marking)
- **Bursar:** Finance module
- **Hostel Warden:** Hostel module
- **Student/Parent:** Limited view-only access

## Next Steps

The following modules are ready to be implemented:

1. **Common Components** (Tasks 17-22)
   - DataTable, Form fields, Modals, Charts

2. **Dashboard Module** (Tasks 23-27)
   - Role-specific dashboards with real data

3. **Student Management** (Tasks 28-33)
   - Student list, forms, profiles, transfers

4. **Teacher Management** (Tasks 34-40)
   - Teacher list, assignments, departments

And many more modules...

## Known Limitations

- Authentication requires backend API
- Menu items link to placeholder pages
- Statistics show dummy data (0)
- Search functionality is UI only
- Notifications are hardcoded examples
- Theme toggle doesn't persist yet

## File Structure

```
frontend/src/
├── api/                    # RTK Query API definitions
│   ├── auth.api.ts
│   └── base.api.ts
├── components/
│   └── layout/            # Layout components
│       ├── AppBar.tsx
│       ├── MainLayout.tsx
│       └── Sidebar.tsx
├── features/
│   └── auth/              # Authentication feature
│       ├── components/
│       ├── pages/
│       └── authSlice.ts
├── pages/                 # Page components
│   ├── Dashboard.tsx
│   └── NotFound.tsx
├── routes/                # Route components
│   ├── ProtectedRoute.tsx
│   └── RoleBasedRoute.tsx
├── store/                 # Redux store
│   ├── hooks.ts
│   ├── index.ts
│   ├── middleware/
│   └── store.ts
├── theme/                 # MUI theme
│   └── index.ts
├── types/                 # TypeScript types
│   ├── auth.types.ts
│   └── index.ts
├── App.tsx               # Main app component
└── main.tsx              # Entry point
```

## Build for Production

```bash
npm run build
```

The production build will be in the `dist/` directory.

## Troubleshooting

### Port Already in Use
If port 5173 is in use, Vite will automatically try the next available port.

### API Connection Issues
Make sure the backend is running and the `VITE_API_URL` is correct in your `.env` file.

### TypeScript Errors
Run `npm run type-check` to see all TypeScript errors.

### Build Warnings
The large chunk warning is expected - we'll implement code splitting in later tasks.
