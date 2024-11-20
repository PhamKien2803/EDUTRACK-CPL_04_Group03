import type { } from '@mui/x-date-pickers/themeAugmentation';
import type { } from '@mui/x-charts/themeAugmentation';
import type { } from '@mui/x-data-grid/themeAugmentation';
import type { } from '@mui/x-tree-view/themeAugmentation';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import AppNavbar from '../../../components/staff_components/ComponentsPage/layouts/AppNavBar';
import AppTheme from '../../../components/staff_components/ComponentsPage/theme/AppTheme';
import {
  chartsCustomizations,
  dataGridCustomizations,
  datePickersCustomizations,
  treeViewCustomizations,
} from '../../../components/staff_components/ComponentsPage/theme/customizations';
import MainLayout from '../../../components/staff_components/ComponentsPage/Main/MainLayout';

const xThemeComponents = {
  ...chartsCustomizations,
  ...dataGridCustomizations,
  ...datePickersCustomizations,
  ...treeViewCustomizations,
};

export default function StaffHomePage(props: { disableCustomTheme?: boolean }) {
  return (
    <AppTheme {...props} themeComponents={xThemeComponents}>
      <CssBaseline enableColorScheme />
      <Box sx={{ display: 'flex' }}>
        {/* <SideMenu /> */}
        <MainLayout />
        <AppNavbar />
        {/* Main content */}
      </Box>
    </AppTheme>
  );
}
