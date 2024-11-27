import { useState } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import Dicussion from '../dicussion-question/comment/Dicussion';
import { useTranslation } from 'react-i18next';
import FeedBack from './FeedBack';


function NavTabs() {
  const { t } = useTranslation();
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
    <Box sx={{ width: '100%' }}>
      <Tabs style={{ margin: '20px' }}
        value={value}
        onChange={handleChange}
        textColor="secondary"
        indicatorColor="secondary"
        aria-label="secondary tabs example"
      >
        <Tab value="one" label={t('discussion_label')} />
        <Tab value="two" label={t('teachers_feedback_label')} />
      </Tabs>

      {loading && <LinearProgress color="secondary" />}

      {!loading && (
        <Box sx={{ marginTop: '20px' }}>
          {value === 'one' && (
            <Dicussion />
          )}
          {value == 'two' && (
            <FeedBack />
          )}
        </Box>
      )}
    </Box>
  );
}

export default NavTabs;
