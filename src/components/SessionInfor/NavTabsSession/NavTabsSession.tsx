import { useState } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import Content from '../QuestionContent/Content';
import StudentList from '../StudentsList/StudentList';

function NavTabsSession() {
  const [value, setValue] = useState<string>('one');
  const [loading, setLoading] = useState<boolean>(false);

  const handleChange = (_event: React.SyntheticEvent, newValue: string) => {
    setLoading(true);
    setValue(newValue);

    setTimeout(() => {
      setLoading(false);
    }, 500);
  };

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
          {value === 'one' && <Content/>}
          {value === 'two' && <StudentList/>}
        </Box>
      )}
    </Box>
  );
}

export default NavTabsSession;
