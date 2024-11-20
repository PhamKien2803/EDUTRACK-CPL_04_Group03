import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Stack from '@mui/material/Stack';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import AnalyticsRoundedIcon from '@mui/icons-material/AnalyticsRounded';
import PeopleRoundedIcon from '@mui/icons-material/PeopleRounded';
import AssignmentRoundedIcon from '@mui/icons-material/AssignmentRounded';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import InfoRoundedIcon from '@mui/icons-material/InfoRounded';
import HelpRoundedIcon from '@mui/icons-material/HelpRounded';

const mainListItems = [
  { text: 'Dashboard', icon: <HomeRoundedIcon />, key: 'dashboard' },
  { text: 'Class Management', icon: <AnalyticsRoundedIcon />, key: 'class' },
  { text: 'Semesters Management', icon: <PeopleRoundedIcon />, key: 'semesters' },
  { text: 'Student Management', icon: <AssignmentRoundedIcon />, key: 'student' },
];

const secondaryListItems = [
  { text: 'Settings', icon: <SettingsRoundedIcon />, key: 'settings' },
  { text: 'About', icon: <InfoRoundedIcon />, key: 'about' },
  { text: 'Feedback', icon: <HelpRoundedIcon />, key: 'feedback' },
];

interface MenuContentProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
}

export default function MenuContent({ currentTab, setCurrentTab }: MenuContentProps) {
  return (
    <Stack sx={{ flexGrow: 1, p: 1, justifyContent: 'space-between' }}>
      {/* Main Navigation */}
      <List dense>
        {mainListItems.map((item, index) => (
          <ListItem key={index} disablePadding>
            <ListItemButton
              selected={currentTab === item.key}
              onClick={() => setCurrentTab(item.key)} // Cập nhật tab hiện tại
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      {/* Secondary Navigation */}
      <List dense>
        {secondaryListItems.map((item, index) => (
          <ListItem key={index} disablePadding>
            <ListItemButton
              selected={currentTab === item.key}
              onClick={() => setCurrentTab(item.key)}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Stack>
  );
}
