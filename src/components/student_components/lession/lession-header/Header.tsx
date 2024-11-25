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
import { lession as Lession, participants as Participants, classRoom as ClassRoom, slot as Slot, questionSlot as QuestionSlot, courses as Course } from "../../../../models/Interface";
import { useTranslation } from 'react-i18next';

interface Props {
  questionSlot: QuestionSlot[];
  slot: Slot[];
  lession: Lession;
  participants: Participants[];
  classes: ClassRoom[];
  setSelected: (id: string) => void;
  courses: Course[];
}

const Header: React.FC<Props> = ({ slot, lession, classes, setSelected, questionSlot, courses, participants }) => {
  const { t } = useTranslation();
  const [activityFilter, setActivityFilter] = useState('All Activities');
  console.log(activityFilter);
  const [isVisible, setIsVisible] = useState(true);
  const navigate = useNavigate();


  const handleSelectChange = (event: SelectChangeEvent<string>) => {
    setActivityFilter(event.target.value as string);
  };

  console.log(handleSelectChange);

  const handleSlotChange = (event: SelectChangeEvent<string>) => {
    const selectedSlotId = event.target.value;
    setSelected(selectedSlotId);
  };

  const navigateToExam = () => {
    navigate(`/exam-test?csId=${lession.id}`);
  };

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  const filterSlotName = (slotid: string): string | undefined => {
    const slotName = slot.find((s) => s.id === questionSlot.find((q) => q.Slotid === slotid)?.Slotid)?.SlotName;
    return slotName;
  }

  const filterSlotName2 = (slotId: string): string | undefined => {
    const question = questionSlot.find(q => q.Slotid === slotId);
    if (question) {
      const slotFound = slot.find(s => s.id === question.Slotid);
      return slotFound ? slotFound.SlotName : undefined; // Trả về SlotName hoặc undefined
    }
    return undefined; // Nếu không tìm thấy câu hỏi
  };
  console.log(filterSlotName2("s11"));

  console.log(filterSlotName("s11"));

  return (
    <Box p={3}>
      {/* Breadcrumbs */}
      <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 2 }}>
        <Link href="/homePage" color="inherit" underline="hover" display="flex" alignItems="center">
          <HomeIcon fontSize="small" sx={{ mr: 0.5 }} />
          {t('breadcrumb_home')}
        </Link>
        <Typography color="text.primary" display="flex" alignItems="center">
          {lession?.CourseID || t('breadcrumb_course_id')}
        </Typography>
        <Typography color="text.secondary" display="flex" alignItems="center">
          {courses?.find((c) => c.id === lession?.CourseID)?.CourseName || t('breadcrumb_course_name')}
        </Typography>
      </Breadcrumbs>

      {/* Dropdowns and Exam Button in a collapsible container */}
      <Collapse in={isVisible}>
        <Box display="flex" alignItems="center" gap={2} mb={2}>
          {/* Slot Select with SlotName */}
          <Select
            variant="outlined"
            sx={{ minWidth: 120, color: "black" }}
            size="small"
            displayEmpty
            onChange={handleSlotChange}
            defaultValue=""
          >
            <MenuItem value="">{t('select_all_slots')}</MenuItem>
            {lession?.SlotID?.map((slotItem, index) => (
              <MenuItem key={`slt-${slotItem}`} value={slotItem}>
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
            defaultValue="index"
          >

            <MenuItem value="index">
              {classes.find(item => item.ClassID === lession.ClassID)?.ClassName}
            </MenuItem>
          </Select>

          {/* Exam Button */}
          <Button
            variant="contained"
            color="secondary"
            onClick={navigateToExam}
            size="medium"
            sx={{ whiteSpace: 'nowrap' }}
          >
            {t('button_exam')}
          </Button>
        </Box>
      </Collapse>

      {/* Toggle Visibility Button */}
      <Tooltip title={isVisible ? t('tooltip_hide_options') : t('tooltip_show_options')} arrow>
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
        {isVisible ? t('button_hide_options') : t('button_show_options')}
      </Button>

      {/* Teacher Information */}
      <Box mt={2} display="flex" alignItems="center" gap={1}>
        <SchoolIcon color="primary" />
        <Typography variant="body2" color="textSecondary">
          {t('teacher_email')}: {participants?.find((p) => p.id === lession.LecturersID)?.Email}
        </Typography>
      </Box>
    </Box>
  );
};

export default Header;
