import { useEffect, useState } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';
import { getClass, getParticipants, getQuestionSLot, getAssignmentSlot } from "../../../../service/ApiService";
import { classRoom, participants, questionSlot, assignmentSlot } from "../../../../models/Interface";
import ContentSes from './content-session/ContentSes';
import List from './student-list/List';
import { useTranslation } from 'react-i18next';

function TabSession() {
  const [participants, setParticipants] = useState<participants[]>([]);
  const [questionSlot, setQuestionSlot] = useState<questionSlot[]>([]);
  const [assignmentSlot, setAssignmentSlot] = useState<assignmentSlot[]>([]);
  const [classes, setClasses] = useState<classRoom[]>([]);
  const [value, setValue] = useState<string>('one');
  const [loading, setLoading] = useState<boolean>(false);
  const { t } = useTranslation();
  console.log(participants, questionSlot, classes, assignmentSlot);

  const handleChange = (_event: React.SyntheticEvent, newValue: string) => {
    setLoading(true);
    setValue(newValue);

    setTimeout(() => {
      setLoading(false);
    }, 500);
  };

  useEffect(() => {
    getParticipant();
    fetchQuestionSLot();
    fetchAssignmentSlot();
    fetchClass();
  }, []);

  const getParticipant = async () => {
    const res = await getParticipants();
    if (Array.isArray(res)) {
      setParticipants(res);
    }
  };

  const fetchQuestionSLot = async () => {
    const res = await getQuestionSLot();
    if (Array.isArray(res)) {
      setQuestionSlot(res);
    }
  };

  const fetchAssignmentSlot = async () => {
    const res = await getAssignmentSlot()
    if (Array.isArray(res)) {
      setAssignmentSlot(res);
    }
  }

  const fetchClass = async () => {
    const res = await getClass();
    if (Array.isArray(res)) {
      setClasses(res);
    }
  };

  return (
    <Box sx={{ width: '100%', border: '1px solid #ddd', borderRadius: '10px', boxShadow: '0 6px 15px rgba(0, 0, 0, 0.1)', marginTop: "2rem", backgroundColor: '#fff' }}>
      <Tabs
        value={value}
        onChange={handleChange}
        aria-label="Tab navigation"
        textColor="secondary"
        indicatorColor="secondary"
        sx={{
          backgroundColor: '#f5f5f5',
          borderBottom: '1px solid #ddd',
          padding: '10px 20px',
          '& .MuiTab-root': {
            fontWeight: '600',
            textTransform: 'none',
          },
          '& .Mui-selected': {
            color: 'secondary.main',
          },
        }}
      >
        <Tab value="one" label={t('Content', { defaultValue: "Content" })} />
        <Tab value="two" label={t('Students List', { defaultValue: "Students List" })} />
      </Tabs>

      {/* Loading State */}
      {loading && (
        <Box sx={{ padding: '10px 20px' }}>
          <LinearProgress color="secondary" />
        </Box>
      )}

      {/* Content Area */}
      {!loading && (
        <Box sx={{ padding: '20px' }}>
          {/* Content Session */}
          {value === 'one' && (
            <Box sx={{ backgroundColor: '#fafafa', borderRadius: '8px', padding: '20px' }}>
              <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: '10px', color: 'secondary.main' }}>{t('Content Overview', { defaultValue: "Content Overview" })}</Typography>
              <ContentSes questionSlot={questionSlot} assignmentSlot={assignmentSlot} slots={[]} />
            </Box>
          )}

          {/* Students List */}
          {value === 'two' && (
            <Box sx={{ backgroundColor: '#fafafa', borderRadius: '8px', padding: '20px' }}>
              <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: '10px', color: 'secondary.main' }}>{t('Students List', { defaultValue: "Students List" })}</Typography>
              <List participants={participants} classes={classes} />
            </Box>
          )}
        </Box>
      )}
    </Box>
  );
}

export default TabSession;
