import React from 'react';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import {
    ThemeProvider,
    alpha,
    createTheme,
    getContrastRatio
} from '@mui/material/styles';

// Augment the palette to include a violet color
declare module '@mui/material/styles' {
    interface Palette {
        violet: Palette['primary'];
    }

    interface PaletteOptions {
        violet?: PaletteOptions['primary'];
    }
}

declare module '@mui/material/Button' {
    interface ButtonPropsColorOverrides {
        violet: true;
    }
}

const violetBase = '#7F00FF';
const violetMain = alpha(violetBase, 0.7);
const contrastText = getContrastRatio(violetMain, '#fff') > 4.5 ? '#fff' : '#111';

const theme = createTheme({
    palette: {
        violet: {
            main: violetMain,
            light: alpha(violetBase, 0.5),
            dark: alpha(violetBase, 0.9),
            contrastText: contrastText,
        },
    },
});

interface Props {
    string: string;
    icon?: React.ReactNode;
}

const UsingStylesUtils: React.FC<Props> = ({ string, icon }) => {
    return (
        <ThemeProvider theme={theme}>
            <Stack sx={{ gap: 2, alignItems: 'center' }}>
                <Button variant="contained" color="violet" startIcon={icon}>
                    {string}
                </Button>
            </Stack>
        </ThemeProvider>
    );
};

export default UsingStylesUtils;
