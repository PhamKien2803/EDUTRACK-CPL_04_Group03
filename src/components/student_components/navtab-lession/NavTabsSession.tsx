import { useEffect, useState } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import Content from '../lession-infor/question-content/Content';
import StudentList from '../lession-infor/student-list/StudentList';
import { getClass, getParticipants, getQuestionSLot } from "../../../service/ApiService";
import { classRoom, participants, questionSlot } from "../../../models/Interface";



function NavTabsSession() {
  const [participants, setParticipants] = useState<participants[]>([]);
  const [questionSlot, setQuestionSlot] = useState<questionSlot[]>([]);
  const [classes, setClasses] = useState<classRoom[]>([]);

  const [value, setValue] = useState<string>('one');
  const [loading, setLoading] = useState<boolean>(false);

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
    fetchClass();
  }, []);


  const getParticipant = async () => {
    const res = await getParticipants()
    if (Array.isArray(res)) {
      setParticipants(res);
    }
  }



  const fetchQuestionSLot = async () => {
    const res = await getQuestionSLot()
    if (Array.isArray(res)) {
      setQuestionSlot(res);
    }
  }

  const fetchClass = async () => {
    const res = await getClass()
    if (Array.isArray(res)) {
      setClasses(res);
    }
  }

  return (
    <Box sx={{ width: '100%', border: '1px solid gray', borderRadius: '10px', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)', marginTop: "2rem" }}>
      <Tabs style={{ margin: '20px' }}
        value={value}
        onChange={handleChange}
        textColor="secondary"
        indicatorColor="secondary"
        aria-label="secondary tabs example"
      >
        <Tab value="one" label="Content" />
        <Tab value="two" label="Students List" />
      </Tabs>

      {loading && <LinearProgress color="secondary" />}

      {!loading && (
        <Box sx={{ marginTop: '20px' }}>
          {value === 'one' && <Content questionSlot={questionSlot} slots={[]} />}
          {value === 'two' && <StudentList participants={participants} classes={classes} />}
        </Box>
      )}
    </Box>
  );
}

export default NavTabsSession;
