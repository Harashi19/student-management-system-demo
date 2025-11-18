import { Box, Typography, Paper, Stack, Chip, List, ListItem, ListItemText, Divider } from '@mui/material';
import {
  School,
  Assignment,
  Schedule,
  Announcement,
  CheckCircle,
  Warning,
} from '@mui/icons-material';
import { StatCard, DataTable } from '@/components/common';
import type { Column } from '@/components/common';
import { useAppSelector } from '@/store';
import { selectUser } from '@/features/auth';

interface AssignedClass {
  id: string;
  name: string;
  subject: string;
  students: number;
}

interface TimetableSlot {
  id: string;
  period: string;
  time: string;
  subject: string;
  class: string;
  room: string;
}

interface PendingMark {
  id: string;
  assessment: string;
  class: string;
  subject: string;
  dueDate: string;
  studentsCount: number;
}

interface AnnouncementItem {
  id: string;
  title: string;
  date: string;
  priority: 'high' | 'medium' | 'low';
}

/**
 * Teacher Dashboard Page
 * Main dashboard for teachers showing assigned classes, timetable, pending marks, and announcements
 */
export const TeacherDashboard = () => {
  const user = useAppSelector(selectUser);

  // Demo data - will be replaced with real API calls
  const stats = [
    {
      title: 'Assigned Classes',
      value: 6,
      icon: <School />,
      color: 'primary' as const,
      subtitle: 'Across 3 subjects',
    },
    {
      title: 'Total Students',
      value: 180,
      icon: <School />,
      color: 'info' as const,
      subtitle: 'In all classes',
    },
    {
      title: 'Pending Marks',
      value: 3,
      icon: <Assignment />,
      color: 'warning' as const,
      subtitle: 'Assessments to grade',
    },
    {
      title: 'Today\'s Classes',
      value: 5,
      icon: <Schedule />,
      color: 'success' as const,
      subtitle: 'Scheduled periods',
    },
  ];

  const assignedClasses: AssignedClass[] = [
    {
      id: '1',
      name: 'Grade 10-A',
      subject: 'Mathematics',
      students: 35,
    },
    {
      id: '2',
      name: 'Grade 10-B',
      subject: 'Mathematics',
      students: 32,
    },
    {
      id: '3',
      name: 'Grade 9-A',
      subject: 'Mathematics',
      students: 30,
    },
    {
      id: '4',
      name: 'Grade 11-A',
      subject: 'Physics',
      students: 28,
    },
    {
      id: '5',
      name: 'Grade 11-B',
      subject: 'Physics',
      students: 30,
    },
    {
      id: '6',
      name: 'Grade 12-A',
      subject: 'Physics',
      students: 25,
    },
  ];

  const todayTimetable: TimetableSlot[] = [
    {
      id: '1',
      period: 'Period 1',
      time: '08:00 - 08:45',
      subject: 'Mathematics',
      class: 'Grade 10-A',
      room: 'Room 201',
    },
    {
      id: '2',
      period: 'Period 2',
      time: '08:50 - 09:35',
      subject: 'Mathematics',
      class: 'Grade 10-B',
      room: 'Room 201',
    },
    {
      id: '3',
      period: 'Period 4',
      time: '10:30 - 11:15',
      subject: 'Physics',
      class: 'Grade 11-A',
      room: 'Lab 1',
    },
    {
      id: '4',
      period: 'Period 6',
      time: '12:45 - 13:30',
      subject: 'Physics',
      class: 'Grade 11-B',
      room: 'Lab 1',
    },
    {
      id: '5',
      period: 'Period 7',
      time: '13:35 - 14:20',
      subject: 'Mathematics',
      class: 'Grade 9-A',
      room: 'Room 201',
    },
  ];

  const pendingMarks: PendingMark[] = [
    {
      id: '1',
      assessment: 'Midterm Exam',
      class: 'Grade 10-A',
      subject: 'Mathematics',
      dueDate: '2024-01-20',
      studentsCount: 35,
    },
    {
      id: '2',
      assessment: 'Unit Test 3',
      class: 'Grade 11-A',
      subject: 'Physics',
      dueDate: '2024-01-22',
      studentsCount: 28,
    },
    {
      id: '3',
      assessment: 'Assignment 5',
      class: 'Grade 9-A',
      subject: 'Mathematics',
      dueDate: '2024-01-25',
      studentsCount: 30,
    },
  ];

  const recentAnnouncements: AnnouncementItem[] = [
    {
      id: '1',
      title: 'Staff Meeting - Friday 3 PM',
      date: '2024-01-15',
      priority: 'high',
    },
    {
      id: '2',
      title: 'Midterm Exam Schedule Released',
      date: '2024-01-14',
      priority: 'high',
    },
    {
      id: '3',
      title: 'New Grading Guidelines Available',
      date: '2024-01-13',
      priority: 'medium',
    },
    {
      id: '4',
      title: 'Sports Day Preparation Meeting',
      date: '2024-01-12',
      priority: 'low',
    },
  ];

  const classColumns: Column<AssignedClass>[] = [
    {
      id: 'name',
      label: 'Class',
      minWidth: 120,
    },
    {
      id: 'subject',
      label: 'Subject',
      minWidth: 150,
    },
    {
      id: 'students',
      label: 'Students',
      minWidth: 100,
      align: 'center',
    },
  ];

  const getCurrentPeriod = () => {
    const now = new Date();
    const currentTime = now.getHours() * 60 + now.getMinutes();
    
    // Simple logic to determine current period (8:00 AM = 480 minutes)
    if (currentTime >= 480 && currentTime < 525) return 'Period 1';
    if (currentTime >= 530 && currentTime < 575) return 'Period 2';
    if (currentTime >= 630 && currentTime < 675) return 'Period 4';
    if (currentTime >= 765 && currentTime < 810) return 'Period 6';
    if (currentTime >= 815 && currentTime < 860) return 'Period 7';
    
    return null;
  };

  const currentPeriod = getCurrentPeriod();

  return (
    <Box>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          Welcome back, {user?.first_name}!
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Here's your schedule and pending tasks for today
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

      {/* Main Content */}
      <Stack direction={{ xs: 'column', lg: 'row' }} spacing={3}>
        {/* Left Column */}
        <Box sx={{ flex: { xs: '1 1 100%', lg: '1 1 66%' } }}>
          {/* Today's Timetable */}
          <Paper sx={{ p: 3, mb: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Schedule color="primary" sx={{ mr: 1 }} />
              <Typography variant="h6">Today's Timetable</Typography>
            </Box>
            <List>
              {todayTimetable.map((slot, index) => (
                <Box key={slot.id}>
                  <ListItem
                    sx={{
                      bgcolor: currentPeriod === slot.period ? 'action.selected' : 'transparent',
                      borderRadius: 1,
                      mb: 1,
                    }}
                  >
                    <ListItemText
                      primary={
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <Typography variant="subtitle1" fontWeight="medium">
                            {slot.period}
                          </Typography>
                          {currentPeriod === slot.period && (
                            <Chip
                              label="Current"
                              size="small"
                              color="success"
                              icon={<CheckCircle />}
                            />
                          )}
                        </Box>
                      }
                      secondary={
                        <Box sx={{ mt: 0.5 }}>
                          <Typography variant="body2" color="text.secondary">
                            {slot.time}
                          </Typography>
                          <Typography variant="body2">
                            <strong>{slot.subject}</strong> - {slot.class} ({slot.room})
                          </Typography>
                        </Box>
                      }
                    />
                  </ListItem>
                  {index < todayTimetable.length - 1 && <Divider />}
                </Box>
              ))}
            </List>
          </Paper>

          {/* Assigned Classes */}
          <DataTable
            title="Assigned Classes & Subjects"
            columns={classColumns}
            data={assignedClasses}
          />
        </Box>

        {/* Right Column */}
        <Box sx={{ flex: { xs: '1 1 100%', lg: '1 1 34%' } }}>
          {/* Pending Marks Entry */}
          <Paper sx={{ p: 3, mb: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Assignment color="warning" sx={{ mr: 1 }} />
              <Typography variant="h6">Pending Marks Entry</Typography>
            </Box>
            {pendingMarks.length > 0 ? (
              <List>
                {pendingMarks.map((mark, index) => (
                  <Box key={mark.id}>
                    <ListItem sx={{ px: 0 }}>
                      <ListItemText
                        primary={
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Warning color="warning" fontSize="small" />
                            <Typography variant="subtitle2">
                              {mark.assessment}
                            </Typography>
                          </Box>
                        }
                        secondary={
                          <Box sx={{ mt: 0.5 }}>
                            <Typography variant="body2" color="text.secondary">
                              {mark.class} - {mark.subject}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              {mark.studentsCount} students • Due: {mark.dueDate}
                            </Typography>
                          </Box>
                        }
                      />
                    </ListItem>
                    {index < pendingMarks.length - 1 && <Divider />}
                  </Box>
                ))}
              </List>
            ) : (
              <Box sx={{ textAlign: 'center', py: 3 }}>
                <CheckCircle color="success" sx={{ fontSize: 48, mb: 1 }} />
                <Typography variant="body2" color="text.secondary">
                  All marks are up to date!
                </Typography>
              </Box>
            )}
          </Paper>

          {/* Recent Announcements */}
          <Paper sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Announcement color="info" sx={{ mr: 1 }} />
              <Typography variant="h6">Recent Announcements</Typography>
            </Box>
            <List>
              {recentAnnouncements.map((announcement, index) => (
                <Box key={announcement.id}>
                  <ListItem sx={{ px: 0 }}>
                    <ListItemText
                      primary={
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <Typography variant="subtitle2">
                            {announcement.title}
                          </Typography>
                          <Chip
                            label={announcement.priority}
                            size="small"
                            color={
                              announcement.priority === 'high'
                                ? 'error'
                                : announcement.priority === 'medium'
                                ? 'warning'
                                : 'default'
                            }
                          />
                        </Box>
                      }
                      secondary={
                        <Typography variant="caption" color="text.secondary">
                          {announcement.date}
                        </Typography>
                      }
                    />
                  </ListItem>
                  {index < recentAnnouncements.length - 1 && <Divider />}
                </Box>
              ))}
            </List>
          </Paper>
        </Box>
      </Stack>
    </Box>
  );
};
