import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid2';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import AutoFixHighRoundedIcon from '@mui/icons-material/AutoFixHighRounded';
import ConstructionRoundedIcon from '@mui/icons-material/ConstructionRounded';
import QueryStatsRoundedIcon from '@mui/icons-material/QueryStatsRounded';
import SettingsSuggestRoundedIcon from '@mui/icons-material/SettingsSuggestRounded';
import SupportAgentRoundedIcon from '@mui/icons-material/SupportAgentRounded';
import ThumbUpAltRoundedIcon from '@mui/icons-material/ThumbUpAltRounded';
import { useTranslation } from 'react-i18next';

export default function Highlights() {
  const { t } = useTranslation();
  const items = [
    {
      icon: <SettingsSuggestRoundedIcon />,
      title: t("customizable_learning_paths_title"),
      description: t("customizable_learning_paths_description"),
    },
    {
      icon: <ConstructionRoundedIcon />,
      title: t("robust_exam_management_title"),
      description: t("robust_exam_management_description"),
    },
    {
      icon: <ThumbUpAltRoundedIcon />,
      title: t("user_friendly_interface_title"),
      description: t("user_friendly_interface_description"),
    },
    {
      icon: <AutoFixHighRoundedIcon />,
      title: t("innovative_reporting_tools_title"),
      description: t("innovative_reporting_tools_description"),
    },
    {
      icon: <SupportAgentRoundedIcon />,
      title: t("dedicated_support_title"),
      description: t("dedicated_support_description"),
    },
    {
      icon: <QueryStatsRoundedIcon />,
      title: t("real_time_progress_tracking_title"),
      description: t("real_time_progress_tracking_description"),
    },
  ];
  return (
    <Box
      id="highlights"
      sx={{
        pt: { xs: 4, sm: 12 },
        pb: { xs: 8, sm: 16 },
        color: 'white',
        bgcolor: 'grey.900',
      }}
    >
      <Container
        sx={{
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: { xs: 3, sm: 6 },
        }}
      >
        <Box
          sx={{
            width: { sm: '100%', md: '60%' },
            textAlign: { sm: 'left', md: 'center' },
          }}
        >
          <Typography component="h2" variant="h4" gutterBottom>
            {t("highlights_title")}
          </Typography>
          <Typography variant="body1" sx={{ color: 'grey.400' }}>
            {t("highlights_subtitle")}
          </Typography>
        </Box>
        <Grid container spacing={2}>
          {items.map((item, index) => (
            <Grid size={{ xs: 12, sm: 6, md: 4 }} key={index}>
              <Stack
                direction="column"
                component={Card}
                spacing={1}
                useFlexGap
                sx={{
                  color: 'inherit',
                  p: 3,
                  height: '100%',
                  borderColor: 'hsla(220, 25%, 25%, 0.3)',
                  backgroundColor: 'grey.800',
                  transition: 'transform 0.3s, box-shadow 0.3s',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: '0px 8px 30px rgba(0, 180, 255, 1)',
                  },
                }}
              >
                <Box sx={{ opacity: '50%' }}>{item.icon}</Box>
                <div>
                  <Typography gutterBottom sx={{ fontWeight: 'medium' }}>
                    {item.title}
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'grey.400' }}>
                    {item.description}
                  </Typography>
                </div>
              </Stack>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
