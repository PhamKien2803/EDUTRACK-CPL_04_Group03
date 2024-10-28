import React from "react";
import { Box, Typography, Paper } from "@mui/material";

interface SubjectProps {
  code: string;
  name: string;
  lecturer: string;
  credits: number;
  semester?: string; // Thêm semester là optional
}

const Subject: React.FC<SubjectProps> = ({ code, name, lecturer, credits }) => {
  return (
    <Paper
      elevation={3}
      sx={{
        width: "100%",
        height: 200,
        padding: 2,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        cursor: "pointer",
        "&:hover": {
          boxShadow: 6,
        },
      }}
    >
      <Box>
        <Typography variant="h6" gutterBottom>
          {code}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {name}
        </Typography>
      </Box>
      <Box>
        <Typography variant="caption" color="text.secondary">
          Lecturer: {lecturer}
        </Typography>
        <Typography variant="caption" color="text.secondary" display="block">
          Credits: {credits}
        </Typography>
      </Box>
    </Paper>
  );
};

export default Subject;
