import { Box, Typography, Paper, Stack, Chip, List, ListItem, ListItemText, Divider } from '@mui/material';
import {
  School,
  CheckCircle,
  Announcement,
  Event,
  Grade,
  AccountBalance,
} from '@mui/icons-material';
import { StatCard, DataTable } from '@/components/common';
import type { Column } from '@/components/common';
import { useAppSelector } from '@/store';
import { selectUser } from '@/features/auth';

interface ChildInfo {
  id: string;
  name: string;
  class: string;
  attendanceRate: string;
  averageGrade: string;
}

interface RecentGrade {
  id: string;
  childName: string;
  subject: string;
  assessment: string;
  marks: number;
  totalMarks: number;
  grade: string;
  date: string;
}

interface UpcomingEvent {
  id: string;
  title: string;
  type: 'EXAM' | 'MEETING' | 'HOLIDAY' | 'EVENT';
  date: string;
  childName?: string;
}

interface FeeRecord {
  id: string;
  childName: string;
  term: string;
  amount: number;
  paid: number;
  balance: number;
  dueDate: string;
  status: 'PAID' | 'PARTIAL' | 'PENDING' | 'OVERDUE';
}

interface AnnouncementItem {
  id: string;
  title: string;
  content: string;
  date: string;
  priority: 'high' | 'medium' | 'low';
}

/**
 * Parent Dashboard Page
 * Main dashboard for parents showing children's information, grades, fees, and announcements
 */
export const ParentDashboard = () => {
  const user = useAppSelector(selectUser);

  // Demo data - will be replaced with real API calls
  const stats = [
    {
      title: 'Children',
      value: 2,
      icon: <School />,
      color: 'primary' as const,
      subtitle: 'Enrolled students',
    },
    {
      title: 'Avg Attendance',
      value: '96%',
      icon: <CheckCircle />,
      color: 'success' as const,
      subtitle: 'Across all children',
    },
    {
      title: 'Pending Fees',
      value: '$450',
      icon: <AccountBalance />,
      color: 'warning' as const,
      subtitle: 'Due this month',
    },
    {
      title: 'Upcoming Events',
      value: 5,
      icon: <Event />,
      color: 'info' as const,
      subtitle: 'Next 2 weeks',
    },
  ];

  const children: ChildInfo[] = [
    {
      id: '1',
      name: 'Emma Johnson',
      class: 'Grade 10-A',
      attendanceRate: '97%',
      averageGrade: 'A',
    },
    {
      id: '2',
      name: 'Liam Johnson',
      class: 'Grade 7-B',
      attendanceRate: '95%',
      averageGrade: 'A-',
    },
  ];

  const recentGrades: RecentGrade[] = [
    {
      id: '1',
      childName: 'Emma Johnson',
      subject: 'Mathematics',
      assessment: 'Unit Test 3',
      marks: 92,
      totalMarks: 100,
      grade: 'A+',
      date: '2024-01-15',
    },
    {
      id: '2',
      childName: 'Emma Johnson',
      subject: 'Physics',
      assessment: 'Lab Report',
      marks: 45,
      totalMarks: 50,
      grade: 'A',
      date: '2024-01-14',
    },
    {
      id: '3',
      childName: 'Liam Johnson',
      subject: 'English',
      assessment: 'Essay',
      marks: 82,
      totalMarks: 100,
      grade: 'B+',
      date: '2024-01-13',
    },
    {
      id: '4',
      childName: 'Liam Johnson',
      subject: 'Science',
      assessment: 'Quiz 2',
      marks: 38,
      totalMarks: 40,
      grade: 'A',
      date: '2024-01-12',
    },
  ];

  const upcomingEvents: UpcomingEvent[] = [
    {
      id: '1',
      title: 'Parent-Teacher Meeting',
      type: 'MEETING',
      date: '2024-01-22',
      childName: 'Emma Johnson',
    },
    {
      id: '2',
      title: 'Mathematics Final Exam',
      type: 'EXAM',
      date: '2024-01-25',
      childName: 'Emma Johnson',
    },
    {
      id: '3',
      title: 'Science Fair',
      type: 'EVENT',
      date: '2024-01-28',
    },
    {
      id: '4',
      title: 'English Midterm',
      type: 'EXAM',
      date: '2024-01-30',
      childName: 'Liam Johnson',
    },
    {
      id: '5',
      title: 'School Holiday',
      type: 'HOLIDAY',
      date: '2024-02-01',
    },
  ];

  const feeRecords: FeeRecord[] = [
    {
      id: '1',
      childName: 'Emma Johnson',
      term: 'Term 1 - 2024',
      amount: 1500,
      paid: 1500,
      balance: 0,
      dueDate: '2024-01-15',
      status: 'PAID',
    },
    {
      id: '2',
      childName: 'Liam Johnson',
      term: 'Term 1 - 2024',
      amount: 1200,
      paid: 750,
      balance: 450,
      dueDate: '2024-01-31',
      status: 'PARTIAL',
    },
  ];

  const announcements: AnnouncementItem[] = [
    {
      id: '1',
      title: 'Final Exam Schedule Released',
      content: 'The final examination schedule has been published. Please review with your children.',
      date: '2024-01-18',
      priority: 'high',
    },
    {
      id: '2',
      title: 'Fee Payment Reminder',
      content: 'Term fees are due by January 31st. Please ensure timely payment to avoid late fees.',
      date: '2024-01-17',
      priority: 'high',
    },
    {
      id: '3',
      title: 'Sports Day Registration',
      content: 'Annual sports day on February 10th. Encourage your children to participate!',
      date: '2024-01-16',
      priority: 'medium',
    },
  ];

  const childrenColumns: Column<ChildInfo>[] = [
    {
      id: 'name',
      label: 'Child Name',
      minWidth: 150,
    },
    {
      id: 'class',
      label: 'Class',
      minWidth: 120,
    },
    {
      id: 'attendanceRate',
      label: 'Attendance',
      minWidth: 100,
      align: 'center',
    },
    {
      id: 'averageGrade',
      label: 'Avg Grade',
      minWidth: 100,
      align: 'center',
    },
  ];

  const feeColumns: Column<FeeRecord>[] = [
    {
      id: 'childName',
      label: 'Child',
      minWidth: 130,
    },
    {
      id: 'term',
      label: 'Term',
      minWidth: 120,
    },
    {
      id: 'amount',
      label: 'Amount',
      minWidth: 100,
      format: (value: number) => `$${value}`,
    },
    {
      id: 'balance',
      label: 'Balance',
      minWidth: 100,
      format: (value: number) => `$${value}`,
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
            value === 'PAID' ? 'success' :
            value === 'PARTIAL' ? 'warning' :
            value === 'OVERDUE' ? 'error' : 'default'
          }
        />
      ),
    },
  ];

  const getEventTypeColor = (type: string) => {
    switch (type) {
      case 'EXAM':
        return 'error';
      case 'MEETING':
        return 'primary';
      case 'HOLIDAY':
        return 'success';
      case 'EVENT':
        return 'info';
      default:
        return 'default';
    }
  };

  return (
    <Box>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          Welcome back, {user?.first_name}!
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Stay updated with your children's academic progress
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

      {/* Children Overview */}
      <Box sx={{ mb: 3 }}>
        <DataTable
          title="Your Children"
          columns={childrenColumns}
          data={children}
        />
      </Box>

      {/* Main Content */}
      <Stack direction={{ xs: 'column', lg: 'row' }} spacing={3}>
        {/* Left Column */}
        <Box sx={{ flex: { xs: '1 1 100%', lg: '1 1 66%' } }}>
          {/* Recent Grades */}
          <Paper sx={{ p: 3, mb: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Grade color="primary" sx={{ mr: 1 }} />
              <Typography variant="h6">Recent Grades</Typography>
            </Box>
            <List>
              {recentGrades.map((grade, index) => (
                <Box key={grade.id}>
                  <ListItem sx={{ px: 0 }}>
                    <ListItemText
                      primary={
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                          <Box>
                            <Typography variant="subtitle2">
                              {grade.childName}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              {grade.subject} - {grade.assessment}
                            </Typography>
                          </Box>
                          <Chip
                            label={grade.grade}
                            size="small"
                            color={
                              grade.grade.startsWith('A') ? 'success' :
                              grade.grade.startsWith('B') ? 'primary' :
                              grade.grade.startsWith('C') ? 'warning' : 'error'
                            }
                          />
                        </Box>
                      }
                      secondary={
                        <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                          Score: {grade.marks}/{grade.totalMarks} • {grade.date}
                        </Typography>
                      }
                    />
                  </ListItem>
                  {index < recentGrades.length - 1 && <Divider />}
                </Box>
              ))}
            </List>
          </Paper>

          {/* Fee Records */}
          <DataTable
            title="Fee Status"
            columns={feeColumns}
            data={feeRecords}
          />
        </Box>

        {/* Right Column */}
        <Box sx={{ flex: { xs: '1 1 100%', lg: '1 1 34%' } }}>
          {/* Upcoming Events */}
          <Paper sx={{ p: 3, mb: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Event color="info" sx={{ mr: 1 }} />
              <Typography variant="h6">Upcoming Events</Typography>
            </Box>
            <List>
              {upcomingEvents.map((event, index) => (
                <Box key={event.id}>
                  <ListItem sx={{ px: 0 }}>
                    <ListItemText
                      primary={
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                          <Typography variant="subtitle2">
                            {event.title}
                          </Typography>
                          <Chip
                            label={event.type}
                            size="small"
                            color={getEventTypeColor(event.type) as any}
                          />
                        </Box>
                      }
                      secondary={
                        <Box sx={{ mt: 0.5 }}>
                          {event.childName && (
                            <Typography variant="body2" color="text.secondary">
                              {event.childName}
                            </Typography>
                          )}
                          <Typography variant="body2" color="text.secondary">
                            📅 {event.date}
                          </Typography>
                        </Box>
                      }
                    />
                  </ListItem>
                  {index < upcomingEvents.length - 1 && <Divider />}
                </Box>
              ))}
            </List>
          </Paper>

          {/* Announcements */}
          <Paper sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Announcement color="warning" sx={{ mr: 1 }} />
              <Typography variant="h6">Important Announcements</Typography>
            </Box>
            <List>
              {announcements.map((announcement, index) => (
                <Box key={announcement.id}>
                  <ListItem sx={{ px: 0 }}>
                    <ListItemText
                      primary={
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                          <Typography variant="subtitle2">
                            {announcement.title}
                          </Typography>
                          {announcement.priority === 'high' && (
                            <Chip
                              label="Important"
                              size="small"
                              color="error"
                            />
                          )}
                        </Box>
                      }
                      secondary={
                        <Box sx={{ mt: 0.5 }}>
                          <Typography variant="body2" color="text.secondary">
                            {announcement.content}
                          </Typography>
                          <Typography variant="caption" color="text.secondary" sx={{ mt: 0.5, display: 'block' }}>
                            {announcement.date}
                          </Typography>
                        </Box>
                      }
                    />
                  </ListItem>
                  {index < announcements.length - 1 && <Divider />}
                </Box>
              ))}
            </List>
          </Paper>
        </Box>
      </Stack>
    </Box>
  );
};
