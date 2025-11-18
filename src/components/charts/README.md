# Chart Components

This directory contains reusable chart components built with Recharts for data visualization throughout the School Management System.

## Components

### LineChart

A responsive line chart component for displaying trends over time.

**Features:**
- Multiple lines support
- Responsive sizing
- Customizable tooltips
- Grid display toggle
- Legend support
- Axis labels

**Props:**
```typescript
interface LineChartProps {
  data: LineChartDataPoint[];
  lines: LineChartLine[];
  xAxisKey: string;
  title?: string;
  height?: number;
  showGrid?: boolean;
  showLegend?: boolean;
  showTooltip?: boolean;
  xAxisLabel?: string;
  yAxisLabel?: string;
  customTooltip?: React.ComponentType<TooltipProps>;
}
```

**Example:**
```tsx
<LineChart
  data={[
    { month: 'Jan', students: 400, teachers: 24 },
    { month: 'Feb', students: 430, teachers: 26 },
  ]}
  lines={[
    { dataKey: 'students', name: 'Students', color: '#1976d2' },
    { dataKey: 'teachers', name: 'Teachers', color: '#ff9800' },
  ]}
  xAxisKey="month"
  title="Enrollment Trends"
  xAxisLabel="Month"
  yAxisLabel="Count"
/>
```

### BarChart

A responsive bar chart component for comparing values across categories.

**Features:**
- Multiple bars support
- Horizontal and vertical layouts
- Stacked bars support
- Responsive sizing
- Customizable tooltips
- Grid display toggle
- Legend support
- Axis labels

**Props:**
```typescript
interface BarChartProps {
  data: BarChartDataPoint[];
  bars: BarChartBar[];
  xAxisKey: string;
  title?: string;
  height?: number;
  showGrid?: boolean;
  showLegend?: boolean;
  showTooltip?: boolean;
  xAxisLabel?: string;
  yAxisLabel?: string;
  layout?: 'horizontal' | 'vertical';
  customTooltip?: React.ComponentType<TooltipProps>;
  customColors?: string[];
}
```

**Example:**
```tsx
<BarChart
  data={[
    { class: 'Grade 1', boys: 45, girls: 42 },
    { class: 'Grade 2', boys: 48, girls: 46 },
  ]}
  bars={[
    { dataKey: 'boys', name: 'Boys', color: '#1976d2' },
    { dataKey: 'girls', name: 'Girls', color: '#ff9800' },
  ]}
  xAxisKey="class"
  title="Student Distribution"
  xAxisLabel="Class"
  yAxisLabel="Number of Students"
/>
```

**Stacked Bar Example:**
```tsx
<BarChart
  data={barChartData}
  bars={[
    { dataKey: 'boys', name: 'Boys', stackId: 'a' },
    { dataKey: 'girls', name: 'Girls', stackId: 'a' },
  ]}
  xAxisKey="class"
  title="Total Students per Class"
/>
```

### PieChart

A responsive pie/donut chart component for displaying proportional data.

**Features:**
- Pie and donut chart modes
- Responsive sizing
- Customizable tooltips
- Labels with percentages
- Legend support
- Custom colors
- Automatic percentage calculation

**Props:**
```typescript
interface PieChartProps {
  data: PieChartDataPoint[];
  title?: string;
  height?: number;
  showLegend?: boolean;
  showTooltip?: boolean;
  showLabels?: boolean;
  innerRadius?: number;
  outerRadius?: number;
  customColors?: string[];
  customTooltip?: React.ComponentType<TooltipProps>;
  labelFormatter?: (value: number, name: string) => string;
}
```

**Pie Chart Example:**
```tsx
<PieChart
  data={[
    { name: 'Present', value: 450 },
    { name: 'Absent', value: 30 },
    { name: 'Late', value: 15 },
  ]}
  title="Attendance Status"
  outerRadius={100}
/>
```

**Donut Chart Example:**
```tsx
<PieChart
  data={feeStatusData}
  title="Fee Payment Status"
  innerRadius={60}
  outerRadius={100}
  customColors={['#4caf50', '#ff9800', '#f44336']}
/>
```

## Common Features

### Responsive Sizing
All charts use `ResponsiveContainer` from Recharts to automatically adjust to their container width while maintaining the specified height.

### Theme Integration
Charts automatically use colors from the Material-UI theme, ensuring consistency with the application's design system.

### Custom Tooltips
All charts support custom tooltip components. The default tooltips are styled with Material-UI components and match the application theme.

### Accessibility
Charts include proper ARIA labels and semantic HTML structure for screen reader compatibility.

## Usage in Features

### Performance Analytics
Use LineChart and BarChart to display:
- Class performance trends
- Subject-wise analysis
- Student progress over time

### Dashboard Widgets
Use all chart types for:
- Enrollment statistics (LineChart)
- Gender distribution (BarChart)
- Attendance status (PieChart)
- Fee payment status (PieChart/Donut)

### Financial Reports
Use BarChart and PieChart for:
- Monthly collections (BarChart)
- Fee category breakdown (PieChart)
- Payment method distribution (PieChart)

### Attendance Reports
Use LineChart and PieChart for:
- Attendance trends (LineChart)
- Status distribution (PieChart)
- Class-wise comparison (BarChart)

## Dependencies

- `recharts`: Chart library
- `@mui/material`: Material-UI components for styling
- `react`: React framework

## Best Practices

1. **Data Preparation**: Ensure data is in the correct format before passing to charts
2. **Performance**: For large datasets, consider pagination or data aggregation
3. **Colors**: Use theme colors or provide custom colors that maintain good contrast
4. **Responsive Design**: Test charts on different screen sizes
5. **Accessibility**: Provide meaningful titles and labels for screen readers
6. **Loading States**: Show loading indicators while fetching chart data
7. **Error Handling**: Display appropriate messages when data is unavailable

## Examples

See `ChartExamples.tsx` for comprehensive examples of all chart types with various configurations.
