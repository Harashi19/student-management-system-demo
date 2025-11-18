import React from 'react';
import {
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { Box, Paper, Typography, useTheme } from '@mui/material';

export interface PieChartDataPoint {
  name: string;
  value: number;
  [key: string]: string | number;
}

export interface PieChartProps {
  data: PieChartDataPoint[];
  title?: string;
  height?: number;
  showLegend?: boolean;
  showTooltip?: boolean;
  showLabels?: boolean;
  innerRadius?: number;
  outerRadius?: number;
  customColors?: string[];
  customTooltip?: any;
  labelFormatter?: (value: number, name: string) => string;
}

const CustomTooltip = (props: any) => {
  const theme = useTheme();
  const { active, payload } = props;

  if (active && payload && payload.length) {
    const data = payload[0];
    return (
      <Paper
        sx={{
          p: 1.5,
          backgroundColor: theme.palette.background.paper,
          border: `1px solid ${theme.palette.divider}`,
        }}
      >
        <Typography variant="body2" fontWeight="bold">
          {data.name}
        </Typography>
        <Typography variant="body2" sx={{ color: data.payload?.fill }}>
          Value: {data.value}
        </Typography>
        {data.payload?.percentage && (
          <Typography variant="body2" color="text.secondary">
            {data.payload.percentage}%
          </Typography>
        )}
      </Paper>
    );
  }

  return null;
};

const renderLabel = (entry: { name?: string; percent?: number }) => {
  const percent = entry.percent ? (entry.percent * 100).toFixed(0) : 0;
  return `${entry.name || 'Unknown'}: ${percent}%`;
};

export const PieChart: React.FC<PieChartProps> = ({
  data,
  title,
  height = 400,
  showLegend = true,
  showTooltip = true,
  showLabels = true,
  innerRadius = 0,
  outerRadius = 80,
  customColors,
  customTooltip,
  labelFormatter,
}) => {
  const theme = useTheme();

  const defaultColors = [
    theme.palette.primary.main,
    theme.palette.secondary.main,
    theme.palette.success.main,
    theme.palette.warning.main,
    theme.palette.error.main,
    theme.palette.info.main,
    theme.palette.primary.light,
    theme.palette.secondary.light,
  ];

  const colors = customColors || defaultColors;

  // Calculate percentages
  const total = data.reduce((sum, entry) => sum + entry.value, 0);
  const dataWithPercentages = data.map((entry) => ({
    ...entry,
    percentage: ((entry.value / total) * 100).toFixed(1),
  }));

  return (
    <Box>
      {title && (
        <Typography variant="h6" gutterBottom>
          {title}
        </Typography>
      )}
      <ResponsiveContainer width="100%" height={height}>
        <RechartsPieChart>
          <Pie
            data={dataWithPercentages}
            cx="50%"
            cy="50%"
            labelLine={showLabels}
            label={
              showLabels
                ? labelFormatter
                  ? (entry: any) => labelFormatter(entry.value, entry.name || '')
                  : renderLabel
                : false
            }
            outerRadius={outerRadius}
            innerRadius={innerRadius}
            fill="#8884d8"
            dataKey="value"
          >
            {dataWithPercentages.map((_entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={colors[index % colors.length]}
              />
            ))}
          </Pie>
          {showTooltip && <Tooltip content={customTooltip || CustomTooltip} />}
          {showLegend && <Legend />}
        </RechartsPieChart>
      </ResponsiveContainer>
    </Box>
  );
};
