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
  studentNames?: string[]; // Optional: List of students who commented
}

const ChartStatistics: React.FC<ChartStatisticsProps> = ({ totalStudents, studentsCommented, studentNames = [] }) => {
  const studentsNotCommented = totalStudents - studentsCommented;

  const data = {
    labels: ['Students Commented', 'Students Not Commented'],
    datasets: [
      {
        data: [studentsCommented, studentsNotCommented],
        backgroundColor: ['#76c7c0', '#f27c38'],
        hoverBackgroundColor: ['#5aaea6', '#d96428'],
      },
    ],
  };

  return (
    <Box sx={{ width: '50%', margin: 'auto' }}>
      <Typography sx={{ textAlign: 'center' }} variant="h6" gutterBottom>
        Comment Statistics
      </Typography>
      <Doughnut data={data} />
      <Box sx={{ mt: 3 }}>
        <Typography variant="subtitle1">Summary:</Typography>
        <Typography variant="body1">
          Total Students: {totalStudents}
        </Typography>
        <Typography variant="body1">
          Students Commented: {studentsCommented}
        </Typography>
        <Typography variant="body1">
          Students Not Commented: {studentsNotCommented}
        </Typography>
      </Box>
      {studentNames.length > 0 && (
        <Box sx={{ mt: 2 }}>
          <Typography variant="subtitle1">Students Who Commented:</Typography>
          <ul>
            {studentNames.map((name, index) => (
              <li key={index}>{name}</li>
            ))}
          </ul>
        </Box>
      )}
    </Box>
  );
};

export default ChartStatistics;
