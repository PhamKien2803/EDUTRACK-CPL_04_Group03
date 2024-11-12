import React from 'react';
import { Grid, Paper, Typography, Box, LinearProgress } from '@mui/material';

interface StatCardProps {
  title: string;
  value: string | number;
  progress?: number; 
  color: string; 
}

const StatCard: React.FC<StatCardProps> = ({ title, value, progress, color }) => {
  return (
    <Paper sx={{ padding: 2, boxShadow: 3, borderRadius: 2 }}>
      <Typography variant="h6" sx={{ color: color }}>
        {title}
      </Typography>
      <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
        {value}
      </Typography>
      {progress !== undefined && (
        <Box sx={{ marginTop: 1 }}>
          <LinearProgress variant="determinate" value={progress} sx={{ height: 8, borderRadius: 1 }} />
        </Box>
      )}
    </Paper>
  );
};

const ColsContent: React.FC = () => {
  const stats = [
    {
      title: 'Total Assignments',
      value: 20,
      color: '#1976d2',
    },
    {
      title: 'Completed Submissions',
      value: 15,
      color: '#388e3c',
      progress: (15 / 20) * 100,
    },
    {
      title: 'Pending Submissions',
      value: 5,
      color: '#f57c00',
    },
    {
      title: 'Upcoming Deadlines',
      value: 3,
      color: '#d32f2f',
    },
    {
      title: 'Average Grade',
      value: '85%',
      color: '#0288d1',
    },
  ];

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', color: '#1976d2' }}>
        Assignment Overview
      </Typography>
      <Grid container spacing={3}>
        {stats.map((stat, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <StatCard title={stat.title} value={stat.value} progress={stat.progress} color={stat.color} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default ColsContent;
