import { Navigate } from 'react-router-dom';
import { Box, Typography, Button, Container, Paper } from '@mui/material';
import { useAppSelector } from '@/store';
import { selectUser, selectUserRoles } from '@/features/auth';

interface RoleBasedRouteProps {
  children: React.ReactNode;
  requiredRoles: string[];
}

/**
 * Access Denied Component
 * Displayed when user doesn't have required permissions
 */
const AccessDenied = () => {
  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Paper sx={{ p: 4, textAlign: 'center' }}>
          <Typography variant="h4" component="h1" gutterBottom color="error">
            Access Denied
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
            You do not have permission to access this page.
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            If you believe this is an error, please contact your administrator.
          </Typography>
          <Button variant="contained" href="/" sx={{ mt: 2 }}>
            Go to Dashboard
          </Button>
        </Paper>
      </Box>
    </Container>
  );
};

/**
 * RoleBasedRoute Component
 * Wraps routes that require specific user roles
 * Displays access denied message for unauthorized users
 */
export const RoleBasedRoute = ({ children, requiredRoles }: RoleBasedRouteProps) => {
  const user = useAppSelector(selectUser);
  const userRoles = useAppSelector(selectUserRoles);

  // If user is not authenticated, redirect to login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Check if user has at least one of the required roles
  const hasRequiredRole = requiredRoles.some((role) => userRoles.includes(role));

  if (!hasRequiredRole) {
    return <AccessDenied />;
  }

  return <>{children}</>;
};
