import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';

const techIcons = [
  'https://logowik.com/content/uploads/images/mui-material-ui9415.logowik.com.webp', // MUI
  'https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg', // React
  'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Typescript_logo_2020.svg/1024px-Typescript_logo_2020.svg.png', // TypeScript
  'https://i1.wp.com/www.ux-republic.com/wp-content/uploads/2016/11/logo-redux.png?fit=500%2C500&ssl=1', // Redux
  'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ae/Github-desktop-logo-symbol.svg/2048px-Github-desktop-logo-symbol.svg.png', // GitHub
  'https://firebase.google.com/static/images/brand-guidelines/logo-vertical.png', // Firebase
];

const iconStyle = {
  width: '100px',
  height: '100px',
  margin: '0 32px',
  transition: 'transform 0.3s, filter 0.3s',
};

const spinStyle = `
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

export default function TechnologyCollection() {
  return (
    <Box id="technologyCollection" sx={{ py: 4 }}>
      <Typography
        component="p"
        variant="subtitle2"
        align="center"
        sx={{ color: 'text.secondary', fontSize: '1.2rem', marginBottom: 5 }}
      >
        <strong>Technologies used in this project</strong>
      </Typography>
      <style>
        {spinStyle}
      </style>
      <Grid container sx={{ justifyContent: 'center', mt: 0.5 }}>
        {techIcons.map((icon, index) => (
          <Grid
            item
            key={index}
            sx={{
              '&:hover img': {
                transform: index === 1 ? 'scale(1.3) rotate(360deg)' : 'scale(1.3)',
                filter: 'brightness(1.5)',
                cursor: 'pointer',
                animation: index === 1 ? 'spin 1s linear infinite' : 'none',
              },
            }}
          >
            <img
              src={icon}
              alt={`Technology number ${index + 1}`}
              style={iconStyle}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
