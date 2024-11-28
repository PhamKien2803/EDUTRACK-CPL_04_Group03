import CssBaseline from '@mui/material/CssBaseline';
import Stack from '@mui/material/Stack';
import Content from '../sign-in/Content';
import SignInCard from '../sign-in/SignInCard';
import { Box, Button } from '@mui/material';
import { Grid } from '@mui/material';
import ReplyAllIcon from '@mui/icons-material/ReplyAll';
import { useNavigate } from 'react-router-dom';

export default function SignInSide() {
  const navigate = useNavigate();
  return (
    <>
      <CssBaseline enableColorScheme />
      <Box
        display="flex"
        alignItems="center"
        mt={1}
        ml={3}
        sx={{
          gap: 1,
        }}
      >
        <Grid item>
          <Button
            startIcon={<ReplyAllIcon />}
            onClick={() => navigate("/landing-page")}
            variant="outlined"
            color="secondary"
          >
            Back
          </Button>
        </Grid>
      </Box>
      <Stack
        direction="column"
        component="main"
        sx={[
          {
            justifyContent: 'center',
            height: 'calc((1 - var(--template-frame-height, 0)) * 50%)',
            marginTop: 'max(10px - var(--template-frame-height, 0px), 0px)',
            minHeight: '60vh',
          },
          (theme) => ({
            '&::before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              zIndex: -1,
              inset: 0,
              backgroundImage:
                'radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))',
              backgroundRepeat: 'no-repeat',
              ...theme.applyStyles('dark', {
                backgroundImage:
                  'radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))',
              }),
            },
          }),
        ]}
      >
        <Stack
          direction={{ xs: 'column-reverse', md: 'row' }}
          sx={{
            justifyContent: 'center',
            gap: { xs: 6, sm: 12 },
            p: 2,
            mx: 'auto',
          }}
        >
          <Stack
            direction={{ xs: 'column-reverse', md: 'row' }}
            sx={{
              justifyContent: 'center',
              gap: { xs: 6, sm: 12 },
              p: { xs: 2, sm: 4 },
              m: 'auto',
            }}
          >
            <Content />
            <SignInCard />
          </Stack>
        </Stack>
      </Stack>
    </>
  );
}

