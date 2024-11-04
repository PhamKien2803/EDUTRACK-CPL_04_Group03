import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Breadcrumbs,
  Link,
  Typography,
  Select,
  MenuItem,
  Button,
  IconButton,
  Collapse,
  Tooltip,
  SelectChangeEvent
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import SchoolIcon from '@mui/icons-material/School';
import HomeIcon from '@mui/icons-material/Home';
import { lession as Lession, participants as Participants, classRoom as ClassRoom } from "../../../../models/Interface"

// interface Lession {
//   id: string;
//   SemesterID: string;
//   SlotID: string[];
//   CourseID: string;
//   StudentID: string;
//   LecturersID: string;
//   ClassID: string;
// }

// interface Participants {
//   id: string;
//   UserName: string;
//   Age: number;
//   Gender: boolean;
//   Address: string;
//   Email: string;
//   Password: string;
//   Image: string;
//   Role: number;
//   isOnline: boolean;
//   Status: boolean;
// }

// interface ClassRoom {
//   ClassID: string;
//   ClassName: string;
//   Student: string[];
//   Status: boolean;
// }

interface Props {
  lession: Lession;
  participants: Participants[];
  classes: ClassRoom[];
  setSelected: (id: string) => void;
}

const Header: React.FC<Props> = ({ lession, classes }) => {
  const [activityFilter, setActivityFilter] = useState('All Activities');
  const [isVisible, setIsVisible] = useState(true);
  const navigate = useNavigate();

  const handleSelectChange = (event: SelectChangeEvent<string>) => {
    setActivityFilter(event.target.value as string);
  };

  const navigateToExam = () => {
    navigate("/exam-test");
  };

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  return (
    <Box p={3}>
      {/* Breadcrumbs */}
      <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 2 }}>
        <Link href="/homePage" color="inherit" underline="hover" display="flex" alignItems="center">
          <HomeIcon fontSize="small" sx={{ mr: 0.5 }} />
          Home
        </Link>
        <Typography color="text.primary" display="flex" alignItems="center">
          {lession?.CourseID}
        </Typography>
        <Typography color="text.secondary" display="flex" alignItems="center">
          Academic Writing Skills_Kỹ năng viết học thuật
        </Typography>
      </Breadcrumbs>

      {/* Dropdowns and Exam Button in a collapsible container */}
      <Collapse in={isVisible}>
        <Box display="flex" alignItems="center" gap={2} mb={2}>
          {/* Activity Filter Select */}
          <Select
            value={activityFilter}
            onChange={handleSelectChange}
            variant="outlined"
            sx={{ minWidth: 160 }}
            size="small"
            displayEmpty
          >
            <MenuItem value="All Activities">All Activities</MenuItem>
            <MenuItem value="Hidden">Hidden</MenuItem>
            <MenuItem value="On Going">On Going</MenuItem>
            <MenuItem value="Cancelled">Cancelled</MenuItem>
            <MenuItem value="Completed">Completed</MenuItem>
            <MenuItem value="Not Started">Not Started</MenuItem>
            <MenuItem value="Assignment or Feedback">Assignment or Feedback</MenuItem>
          </Select>

          {/* SlotID Select with "Select Slot" placeholder */}
          <Select
            variant="outlined"
            sx={{ minWidth: 120, color: "black" }}
            size="small"
            displayEmpty
            defaultValue=""
          >
            <MenuItem value="" disabled>Select Slot</MenuItem>
            {lession.SlotID.map((id, index) => (
              <MenuItem key={`slot-${id}`} value={id}>
                Slot {index + 1}
              </MenuItem>
            ))}
          </Select>

          {/* Class Select with "Select Class" placeholder */}
          <Select
            variant="outlined"
            sx={{ minWidth: 160 }}
            size="small"
            displayEmpty
            defaultValue=""
          >
            <MenuItem value="" disabled>Select Class</MenuItem>
            {classes.map(classItem => (
              <MenuItem key={classItem.ClassID} value={classItem.ClassID}>
                {classItem.ClassName}
              </MenuItem>
            ))}
          </Select>

          {/* Exam Button */}
          <Button
            variant="contained"
            color="secondary"
            onClick={navigateToExam}
            size="medium"
            sx={{ whiteSpace: 'nowrap' }}
          >
            EXAM
          </Button>
        </Box>
      </Collapse>

      {/* Toggle Visibility Button */}
      <Tooltip title={isVisible ? "Hide options" : "Show options"} arrow>
        <IconButton onClick={toggleVisibility} color="primary" size="small">
          {isVisible ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        </IconButton>
      </Tooltip>

      {/* Button Text Toggle */}
      <Button
        onClick={toggleVisibility}
        style={{
          color: isVisible ? 'red' : 'green',
          fontWeight: 'bold',
          fontSize: '16px',
          marginTop: '8px',
        }}
      >
        {isVisible ? 'HIDE OPTIONS' : 'SHOW OPTIONS'}
      </Button>

      {/* Teacher Information */}
      <Box mt={2} display="flex" alignItems="center" gap={1}>
        <SchoolIcon color="primary" />
        <Typography variant="body2" color="textSecondary">
          TEACHERS: THOPN3@FPT.EDU.VN
        </Typography>
      </Box>
    </Box>
  );
};

export default Header;
