import { useAppSelector } from '@/store';
import { selectUserRoles } from '@/features/auth';
import { AdminDashboard, TeacherDashboard, StudentDashboard, ParentDashboard } from '@/features/dashboard';
import { Box, Typography, Paper } from '@mui/material';

/**
 * Dashboard Page
 * Routes to role-specific dashboard based on user's role
 */
export const Dashboard = () => {
  const userRoles = useAppSelector(selectUserRoles);

  // Route to appropriate dashboard based on role
  if (userRoles.includes('ADMIN')) {
    return <AdminDashboard />;
  }

  if (userRoles.includes('TEACHER')) {
    return <TeacherDashboard />;
  }

  if (userRoles.includes('STUDENT')) {
    return <StudentDashboard />;
  }

  if (userRoles.includes('PARENT')) {
    return <ParentDashboard />;
  }

  // Default dashboard for other roles
  return <DefaultDashboard />;
};

// Placeholder component for other roles
const DefaultDashboard = () => (
  <Box>
    <Typography variant="h4" gutterBottom>
      Dashboard
    </Typography>
    <Paper sx={{ p: 3 }}>
      <Typography>Welcome! Your dashboard is being prepared.</Typography>
    </Paper>
  </Box>
);
