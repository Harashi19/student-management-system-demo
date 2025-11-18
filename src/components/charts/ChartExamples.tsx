import React from 'react';
import { Container, Grid, Paper } from '@mui/material';
import { LineChart, BarChart, PieChart } from './index';

// Sample data for LineChart
const lineChartData = [
  { month: 'Jan', students: 400, teachers: 24 },
  { month: 'Feb', students: 430, teachers: 26 },
  { month: 'Mar', students: 448, teachers: 28 },
  { month: 'Apr', students: 470, teachers: 30 },
  { month: 'May', students: 490, teachers: 32 },
  { month: 'Jun', students: 510, teachers: 34 },
];

// Sample data for BarChart
const barChartData = [
  { class: 'Grade 1', boys: 45, girls: 42 },
  { class: 'Grade 2', boys: 48, girls: 46 },
  { class: 'Grade 3', boys: 50, girls: 48 },
  { class: 'Grade 4', boys: 47, girls: 49 },
  { class: 'Grade 5', boys: 52, girls: 50 },
];

// Sample data for PieChart
const pieChartData = [
  { name: 'Present', value: 450 },
  { name: 'Absent', value: 30 },
  { name: 'Late', value: 15 },
  { name: 'Excused', value: 5 },
];

// Sample data for performance analytics
const performanceData = [
  { subject: 'Math', average: 78 },
  { subject: 'Science', average: 82 },
  { subject: 'English', average: 75 },
  { subject: 'History', average: 80 },
  { subject: 'Geography', average: 77 },
];

// Sample data for donut chart (PieChart with innerRadius)
const feeStatusData = [
  { name: 'Paid', value: 380 },
  { name: 'Pending', value: 80 },
  { name: 'Overdue', value: 40 },
];

export const ChartExamples: React.FC = () => {
  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Grid container spacing={3}>
        {/* LineChart Example */}
        <Grid size={{ xs: 12, lg: 6 }}>
          <Paper sx={{ p: 3 }}>
            <LineChart
              data={lineChartData}
              lines={[
                { dataKey: 'students', name: 'Students', color: '#1976d2' },
                { dataKey: 'teachers', name: 'Teachers', color: '#ff9800' },
              ]}
              xAxisKey="month"
              title="Enrollment Trends"
              xAxisLabel="Month"
              yAxisLabel="Count"
              height={350}
            />
          </Paper>
        </Grid>

        {/* BarChart Example */}
        <Grid size={{ xs: 12, lg: 6 }}>
          <Paper sx={{ p: 3 }}>
            <BarChart
              data={barChartData}
              bars={[
                { dataKey: 'boys', name: 'Boys', color: '#1976d2' },
                { dataKey: 'girls', name: 'Girls', color: '#ff9800' },
              ]}
              xAxisKey="class"
              title="Student Distribution by Gender"
              xAxisLabel="Class"
              yAxisLabel="Number of Students"
              height={350}
            />
          </Paper>
        </Grid>

        {/* PieChart Example */}
        <Grid size={{ xs: 12, lg: 6 }}>
          <Paper sx={{ p: 3 }}>
            <PieChart
              data={pieChartData}
              title="Attendance Status Distribution"
              height={350}
              outerRadius={100}
            />
          </Paper>
        </Grid>

        {/* Donut Chart Example (PieChart with innerRadius) */}
        <Grid size={{ xs: 12, lg: 6 }}>
          <Paper sx={{ p: 3 }}>
            <PieChart
              data={feeStatusData}
              title="Fee Payment Status"
              height={350}
              innerRadius={60}
              outerRadius={100}
              customColors={['#4caf50', '#ff9800', '#f44336']}
            />
          </Paper>
        </Grid>

        {/* Horizontal BarChart Example */}
        <Grid size={{ xs: 12, lg: 6 }}>
          <Paper sx={{ p: 3 }}>
            <BarChart
              data={performanceData}
              bars={[{ dataKey: 'average', name: 'Average Score' }]}
              xAxisKey="subject"
              title="Subject Performance"
              layout="vertical"
              xAxisLabel="Average Score"
              yAxisLabel="Subject"
              height={350}
            />
          </Paper>
        </Grid>

        {/* Stacked BarChart Example */}
        <Grid size={{ xs: 12, lg: 6 }}>
          <Paper sx={{ p: 3 }}>
            <BarChart
              data={barChartData}
              bars={[
                { dataKey: 'boys', name: 'Boys', stackId: 'a' },
                { dataKey: 'girls', name: 'Girls', stackId: 'a' },
              ]}
              xAxisKey="class"
              title="Total Students per Class (Stacked)"
              xAxisLabel="Class"
              yAxisLabel="Total Students"
              height={350}
            />
          </Paper>
        </Grid>

        {/* LineChart without Grid */}
        <Grid size={{ xs: 12 }}>
          <Paper sx={{ p: 3 }}>
            <LineChart
              data={lineChartData}
              lines={[
                {
                  dataKey: 'students',
                  name: 'Total Students',
                  color: '#4caf50',
                  strokeWidth: 3,
                },
              ]}
              xAxisKey="month"
              title="Student Growth (Clean View)"
              showGrid={false}
              height={300}
            />
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ChartExamples;
