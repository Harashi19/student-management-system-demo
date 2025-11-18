import { Box, Typography, Paper, Button, Stack, Chip } from '@mui/material';
import {
  People,
  School,
  Class,
  Assignment,
  TrendingUp,
  Add,
  Notifications,
} from '@mui/icons-material';
import { StatCard, DataTable } from '@/components/common';
import type { Column } from '@/components/common';
import { useAppSelector } from '@/store';
import { selectUser } from '@/features/auth';

interface RecentActivity {
  id: string;
  type: string;
  description: string;
  time: string;
  status: 'pending' | 'completed' | 'rejected';
}

interface PendingApproval {
  id: string;
  type: string;
  item: string;
  requestedBy: string;
  date: string;
}

/**
 * Admin Dashboard Page
 * Main dashboard for administrators with statistics and quick actions
 */
export const AdminDashboard = () => {
  const user = useAppSelector(selectUser);

  // Demo data - will be replaced with real API calls
  const stats = [
    {
      title: 'Total Students',
      value: 1247,
      icon: <People />,
      color: 'primary' as const,
      trend: { value: 12, isPositive: true },
      subtitle: '+150 this month',
    },
    {
      title: 'Total Teachers',
      value: 89,
      icon: <School />,
      color: 'success' as const,
      trend: { value: 5, isPositive: true },
      subtitle: '+4 this month',
    },
    {
      title: 'Active Classes',
      value: 42,
      icon: <Class />,
      color: 'info' as const,
      subtitle: 'Across all grades',
    },
    {
      title: 'Pending Approvals',
      value: 15,
      icon: <Assignment />,
      color: 'warning' as const,
      subtitle: 'Requires attention',
    },
  ];

  const recentActivities: RecentActivity[] = [
    {
      id: '1',
      type: 'Student Enrollment',
      description: 'New student John Doe enrolled in Grade 10-A',
      time: '2 hours ago',
      status: 'completed',
    },
    {
      id: '2',
      type: 'Teacher Assignment',
      description: 'Ms. Smith assigned to Mathematics Grade 9',
      time: '4 hours ago',
      status: 'completed',
    },
    {
      id: '3',
      type: 'Fee Payment',
      description: 'Payment received from Student ID: 12345',
      time: '5 hours ago',
      status: 'completed',
    },
    {
      id: '4',
      type: 'Leave Request',
      description: 'Teacher leave request pending approval',
      time: '1 day ago',
      status: 'pending',
    },
  ];

  const pendingApprovals: PendingApproval[] = [
    {
      id: '1',
      type: 'Student Transfer',
      item: 'Transfer request for Student ID: 12345',
      requestedBy: 'John Teacher',
      date: '2024-01-15',
    },
    {
      id: '2',
      type: 'Leave Request',
      item: 'Teacher leave for 3 days',
      requestedBy: 'Jane Smith',
      date: '2024-01-14',
    },
    {
      id: '3',
      type: 'Fee Waiver',
      item: 'Fee waiver request for Student ID: 67890',
      requestedBy: 'Mary Parent',
      date: '2024-01-13',
    },
  ];

  const activityColumns: Column<RecentActivity>[] = [
    {
      id: 'type',
      label: 'Type',
      minWidth: 150,
    },
    {
      id: 'description',
      label: 'Description',
      minWidth: 250,
    },
    {
      id: 'time',
      label: 'Time',
      minWidth: 120,
    },
    {
      id: 'status',
      label: 'Status',
      minWidth: 100,
      format: (value: string) => (
        <Chip
          label={value}
          size="small"
          color={
            value === 'completed' ? 'success' : value === 'pending' ? 'warning' : 'error'
          }
        />
      ),
    },
  ];

  const approvalColumns: Column<PendingApproval>[] = [
    {
      id: 'type',
      label: 'Type',
      minWidth: 130,
    },
    {
      id: 'item',
      label: 'Item',
      minWidth: 250,
    },
    {
      id: 'requestedBy',
      label: 'Requested By',
      minWidth: 150,
    },
    {
      id: 'date',
      label: 'Date',
      minWidth: 120,
    },
  ];

  return (
    <Box>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          Welcome back, {user?.first_name}!
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Here's what's happening in your school today
        </Typography>
      </Box>

      {/* Statistics Cards */}
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        spacing={3}
        sx={{ mb: 4 }}
        flexWrap="wrap"
      >
        {stats.map((stat, index) => (
          <Box key={index} sx={{ flex: { xs: '1 1 100%', sm: '1 1 calc(50% - 12px)', md: '1 1 calc(25% - 18px)' } }}>
            <StatCard {...stat} />
          </Box>
        ))}
      </Stack>

      {/* Quick Actions */}
      <Paper sx={{ p: 3, mb: 4 }}>
        <Typography variant="h6" gutterBottom>
          Quick Actions
        </Typography>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ mt: 2 }}>
          <Button variant="contained" startIcon={<Add />} href="/students/new">
            Add Student
          </Button>
          <Button variant="contained" startIcon={<Add />} href="/teachers/new">
            Add Teacher
          </Button>
          <Button variant="outlined" startIcon={<Assignment />} href="/academics/marks">
            Enter Marks
          </Button>
          <Button variant="outlined" startIcon={<Notifications />} href="/communication/announcements">
            Send Announcement
          </Button>
        </Stack>
      </Paper>

      {/* Two Column Layout */}
      <Stack direction={{ xs: 'column', lg: 'row' }} spacing={3}>
        {/* Pending Approvals */}
        <Box sx={{ flex: 1 }}>
          <DataTable
            title="Pending Approvals"
            columns={approvalColumns}
            data={pendingApprovals}
            actions={
              <Button size="small" href="/approvals">
                View All
              </Button>
            }
          />
        </Box>

        {/* Recent Activity */}
        <Box sx={{ flex: 1 }}>
          <DataTable
            title="Recent Activity"
            columns={activityColumns}
            data={recentActivities}
          />
        </Box>
      </Stack>

      {/* Performance Overview */}
      <Paper sx={{ p: 3, mt: 4 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <TrendingUp color="success" sx={{ mr: 1 }} />
          <Typography variant="h6">Performance Overview</Typography>
        </Box>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={3}>
          <Box sx={{ flex: 1, textAlign: 'center' }}>
            <Typography variant="h3" color="success.main">
              94%
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Average Attendance
            </Typography>
          </Box>
          <Box sx={{ flex: 1, textAlign: 'center' }}>
            <Typography variant="h3" color="primary.main">
              87%
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Fee Collection Rate
            </Typography>
          </Box>
          <Box sx={{ flex: 1, textAlign: 'center' }}>
            <Typography variant="h3" color="info.main">
              92%
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Student Satisfaction
            </Typography>
          </Box>
        </Stack>
      </Paper>
    </Box>
  );
};
