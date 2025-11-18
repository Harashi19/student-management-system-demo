import { Box, Typography, Paper, Stack, Chip, List, ListItem, ListItemText, Divider } from '@mui/material';
import {
  Schedule,
  Assignment,
  CheckCircle,
  Announcement,
  Event,
  Grade,
  CalendarToday,
} from '@mui/icons-material';
import { StatCard } from '@/components/common';
import { useAppSelector } from '@/store';
import { selectUser } from '@/features/auth';

interface TimetableSlot {
  id: string;
  period: string;
  time: string;
  subject: string;
  teacher: string;
  room: string;
}

interface RecentGrade {
  id: string;
  subject: string;
  assessment: string;
  marks: number;
  totalMarks: number;
  grade: string;
  date: string;
}

interface AttendanceRecord {
  id: string;
  date: string;
  status: 'PRESENT' | 'ABSENT' | 'LATE' | 'EXCUSED';
}

interface UpcomingAssessment {
  id: string;
  title: string;
  subject: string;
  type: 'ASSIGNMENT' | 'TEST' | 'MIDTERM' | 'FINAL';
  date: string;
  totalMarks: number;
}

interface AnnouncementItem {
  id: string;
  title: string;
  content: string;
  date: string;
  priority: 'high' | 'medium' | 'low';
}

/**
 * Student Dashboard Page
 * Main dashboard for students showing timetable, grades, attendance, assessments, and announcements
 */
export const StudentDashboard = () => {
  const user = useAppSelector(selectUser);

  // Demo data - will be replaced with real API calls
  const stats = [
    {
      title: 'Attendance Rate',
      value: '94%',
      icon: <CheckCircle />,
      color: 'success' as const,
      subtitle: 'This month',
    },
    {
      title: 'Average Grade',
      value: 'A-',
      icon: <Grade />,
      color: 'primary' as const,
      subtitle: 'Current term',
    },
    {
      title: 'Upcoming Tests',
      value: 4,
      icon: <Assignment />,
      color: 'warning' as const,
      subtitle: 'Next 2 weeks',
    },
    {
      title: 'Today\'s Classes',
      value: 6,
      icon: <Schedule />,
      color: 'info' as const,
      subtitle: 'Scheduled periods',
    },
  ];

  const todayTimetable: TimetableSlot[] = [
    {
      id: '1',
      period: 'Period 1',
      time: '08:00 - 08:45',
      subject: 'Mathematics',
      teacher: 'Mr. Johnson',
      room: 'Room 201',
    },
    {
      id: '2',
      period: 'Period 2',
      time: '08:50 - 09:35',
      subject: 'English',
      teacher: 'Ms. Williams',
      room: 'Room 105',
    },
    {
      id: '3',
      period: 'Period 3',
      time: '09:40 - 10:25',
      subject: 'Physics',
      teacher: 'Dr. Smith',
      room: 'Lab 1',
    },
    {
      id: '4',
      period: 'Period 4',
      time: '10:30 - 11:15',
      subject: 'Chemistry',
      teacher: 'Ms. Brown',
      room: 'Lab 2',
    },
    {
      id: '5',
      period: 'Period 6',
      time: '12:45 - 13:30',
      subject: 'History',
      teacher: 'Mr. Davis',
      room: 'Room 302',
    },
    {
      id: '6',
      period: 'Period 7',
      time: '13:35 - 14:20',
      subject: 'Physical Education',
      teacher: 'Coach Wilson',
      room: 'Sports Ground',
    },
  ];

  const recentGrades: RecentGrade[] = [
    {
      id: '1',
      subject: 'Mathematics',
      assessment: 'Unit Test 3',
      marks: 87,
      totalMarks: 100,
      grade: 'A',
      date: '2024-01-15',
    },
    {
      id: '2',
      subject: 'Physics',
      assessment: 'Lab Report 2',
      marks: 42,
      totalMarks: 50,
      grade: 'A-',
      date: '2024-01-14',
    },
    {
      id: '3',
      subject: 'English',
      assessment: 'Essay Assignment',
      marks: 78,
      totalMarks: 100,
      grade: 'B+',
      date: '2024-01-12',
    },
    {
      id: '4',
      subject: 'Chemistry',
      assessment: 'Midterm Exam',
      marks: 91,
      totalMarks: 100,
      grade: 'A+',
      date: '2024-01-10',
    },
  ];

  const recentAttendance: AttendanceRecord[] = [
    { id: '1', date: '2024-01-18', status: 'PRESENT' },
    { id: '2', date: '2024-01-17', status: 'PRESENT' },
    { id: '3', date: '2024-01-16', status: 'PRESENT' },
    { id: '4', date: '2024-01-15', status: 'LATE' },
    { id: '5', date: '2024-01-12', status: 'PRESENT' },
  ];

  const upcomingAssessments: UpcomingAssessment[] = [
    {
      id: '1',
      title: 'Mathematics Final Exam',
      subject: 'Mathematics',
      type: 'FINAL',
      date: '2024-01-25',
      totalMarks: 100,
    },
    {
      id: '2',
      title: 'Physics Unit Test 4',
      subject: 'Physics',
      type: 'TEST',
      date: '2024-01-27',
      totalMarks: 50,
    },
    {
      id: '3',
      title: 'English Literature Essay',
      subject: 'English',
      type: 'ASSIGNMENT',
      date: '2024-01-30',
      totalMarks: 100,
    },
    {
      id: '4',
      title: 'Chemistry Practical Exam',
      subject: 'Chemistry',
      type: 'MIDTERM',
      date: '2024-02-02',
      totalMarks: 50,
    },
  ];

  const announcements: AnnouncementItem[] = [
    {
      id: '1',
      title: 'Final Exam Schedule Released',
      content: 'The final examination schedule for this term has been published. Please check your timetable.',
      date: '2024-01-18',
      priority: 'high',
    },
    {
      id: '2',
      title: 'Sports Day - February 10th',
      content: 'Annual sports day will be held on February 10th. All students are encouraged to participate.',
      date: '2024-01-17',
      priority: 'medium',
    },
    {
      id: '3',
      title: 'Library Hours Extended',
      content: 'Library will remain open until 8 PM during exam week to support student preparation.',
      date: '2024-01-16',
      priority: 'low',
    },
    {
      id: '4',
      title: 'Science Fair Registration Open',
      content: 'Registration for the annual science fair is now open. Submit your project proposals by January 30th.',
      date: '2024-01-15',
      priority: 'medium',
    },
  ];

  const getCurrentPeriod = () => {
    const now = new Date();
    const currentTime = now.getHours() * 60 + now.getMinutes();
    
    // Simple logic to determine current period (8:00 AM = 480 minutes)
    if (currentTime >= 480 && currentTime < 525) return 'Period 1';
    if (currentTime >= 530 && currentTime < 575) return 'Period 2';
    if (currentTime >= 580 && currentTime < 625) return 'Period 3';
    if (currentTime >= 630 && currentTime < 675) return 'Period 4';
    if (currentTime >= 765 && currentTime < 810) return 'Period 6';
    if (currentTime >= 815 && currentTime < 860) return 'Period 7';
    
    return null;
  };

  const currentPeriod = getCurrentPeriod();

  const getAttendanceColor = (status: string) => {
    switch (status) {
      case 'PRESENT':
        return 'success';
      case 'ABSENT':
        return 'error';
      case 'LATE':
        return 'warning';
      case 'EXCUSED':
        return 'info';
      default:
        return 'default';
    }
  };

  const getAssessmentTypeColor = (type: string) => {
    switch (type) {
      case 'FINAL':
        return 'error';
      case 'MIDTERM':
        return 'warning';
      case 'TEST':
        return 'info';
      case 'ASSIGNMENT':
        return 'primary';
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
          Here's your academic overview for today
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
                            <strong>{slot.subject}</strong> - {slot.teacher} ({slot.room})
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
                          <Typography variant="subtitle2">
                            {grade.subject} - {grade.assessment}
                          </Typography>
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
                        <Box sx={{ mt: 0.5 }}>
                          <Typography variant="body2" color="text.secondary">
                            Score: {grade.marks}/{grade.totalMarks} • {grade.date}
                          </Typography>
                        </Box>
                      }
                    />
                  </ListItem>
                  {index < recentGrades.length - 1 && <Divider />}
                </Box>
              ))}
            </List>
          </Paper>

          {/* Attendance Summary */}
          <Paper sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <CalendarToday color="success" sx={{ mr: 1 }} />
              <Typography variant="h6">Recent Attendance</Typography>
            </Box>
            <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
              {recentAttendance.map((record) => (
                <Chip
                  key={record.id}
                  label={`${record.date}: ${record.status}`}
                  size="small"
                  color={getAttendanceColor(record.status) as any}
                  sx={{ mb: 1 }}
                />
              ))}
            </Stack>
            <Box sx={{ mt: 2, p: 2, bgcolor: 'success.light', borderRadius: 1 }}>
              <Typography variant="body2" color="success.dark" fontWeight="medium">
                Great attendance! Keep it up! 🎉
              </Typography>
            </Box>
          </Paper>
        </Box>

        {/* Right Column */}
        <Box sx={{ flex: { xs: '1 1 100%', lg: '1 1 34%' } }}>
          {/* Upcoming Assessments */}
          <Paper sx={{ p: 3, mb: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Event color="warning" sx={{ mr: 1 }} />
              <Typography variant="h6">Upcoming Assessments</Typography>
            </Box>
            <List>
              {upcomingAssessments.map((assessment, index) => (
                <Box key={assessment.id}>
                  <ListItem sx={{ px: 0 }}>
                    <ListItemText
                      primary={
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                          <Typography variant="subtitle2">
                            {assessment.title}
                          </Typography>
                        </Box>
                      }
                      secondary={
                        <Box sx={{ mt: 0.5 }}>
                          <Stack direction="row" spacing={1} alignItems="center" flexWrap="wrap">
                            <Chip
                              label={assessment.type}
                              size="small"
                              color={getAssessmentTypeColor(assessment.type) as any}
                            />
                            <Typography variant="caption" color="text.secondary">
                              {assessment.subject}
                            </Typography>
                          </Stack>
                          <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                            📅 {assessment.date} • {assessment.totalMarks} marks
                          </Typography>
                        </Box>
                      }
                    />
                  </ListItem>
                  {index < upcomingAssessments.length - 1 && <Divider />}
                </Box>
              ))}
            </List>
          </Paper>

          {/* Announcements */}
          <Paper sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Announcement color="info" sx={{ mr: 1 }} />
              <Typography variant="h6">Announcements</Typography>
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
