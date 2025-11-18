import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { Provider } from 'react-redux';
import { store } from './store';
import { theme } from './theme';
import { LoginPage } from './features/auth';
import { ProtectedRoute } from './routes';
import { MainLayout } from './components/layout';
import { Dashboard, NotFound } from './pages';
import { ErrorBoundary } from './components/common';

/**
 * Main App Component
 * Sets up routing, theme, and Redux store
 */
function App() {
  // Set basename for GitHub Pages deployment
  const basename = import.meta.env.BASE_URL || '/';

  return (
    <ErrorBoundary
      onError={(error, errorInfo) => {
        // Log errors to console in development
        console.error('Application Error:', error, errorInfo);
        // In production, send to error tracking service (e.g., Sentry)
      }}
    >
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <BrowserRouter basename={basename}>
            <Routes>
              {/* Public Routes */}
              <Route path="/login" element={<LoginPage />} />

              {/* Protected Routes */}
              <Route
                path="/"
                element={
                  <ProtectedRoute>
                    <MainLayout />
                  </ProtectedRoute>
                }
              >
                <Route index element={<Dashboard />} />
                
                {/* Placeholder routes - will be implemented in future tasks */}
                <Route path="students" element={<div>Students Module (Coming Soon)</div>} />
                <Route path="teachers" element={<div>Teachers Module (Coming Soon)</div>} />
                <Route path="academics/*" element={<div>Academics Module (Coming Soon)</div>} />
                <Route path="attendance/*" element={<div>Attendance Module (Coming Soon)</div>} />
                <Route path="timetable/*" element={<div>Timetable Module (Coming Soon)</div>} />
                <Route path="finance/*" element={<div>Finance Module (Coming Soon)</div>} />
                <Route path="hostel/*" element={<div>Hostel Module (Coming Soon)</div>} />
                <Route path="communication/*" element={<div>Communication Module (Coming Soon)</div>} />
                <Route path="profile" element={<div>Profile Page (Coming Soon)</div>} />
                <Route path="settings" element={<div>Settings Page (Coming Soon)</div>} />
              </Route>

              {/* 404 Not Found */}
              <Route path="/404" element={<NotFound />} />
              <Route path="*" element={<Navigate to="/404" replace />} />
            </Routes>
          </BrowserRouter>
        </ThemeProvider>
      </Provider>
    </ErrorBoundary>
  );
}

export default App;
