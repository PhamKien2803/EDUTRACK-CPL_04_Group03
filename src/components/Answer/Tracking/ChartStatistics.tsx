import { Doughnut } from 'react-chartjs-2';
import { Box, Typography } from '@mui/material';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';
import React from 'react';

ChartJS.register(ArcElement, Tooltip, Legend);

interface ChartStatisticsProps {
  totalStudents: number;
  studentsCommented: number;
}

const ChartStatistics: React.FC<ChartStatisticsProps> = ({ totalStudents, studentsCommented }) => {
  const studentsNotCommented = totalStudents - studentsCommented;

  const data = {
    labels: ['Total Comments', 'Students Commented', 'Students Not Commented'],
    datasets: [
      {
        data: [100, studentsCommented, studentsNotCommented],
        backgroundColor: ['#76c7c0', '#f7b267', '#f27c38'],
        hoverBackgroundColor: ['#5aaea6', '#de9d52', '#d96428'],
      },
    ],
  };

  return (
    <Box sx={{ width: '50%', margin: 'auto'}}>
      <Typography sx={{ textAlign: 'center' }} variant="h6" gutterBottom>Comment Statistics</Typography>
      <Doughnut data={data} />
    </Box>
  );
};

export default ChartStatistics;
