import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { alpha, createTheme, getContrastRatio, ThemeProvider } from '@mui/material/styles';
import * as React from 'react';

// Augment the palette to include an ochre color
declare module '@mui/material/styles' {
    interface Palette {
        ochre: Palette['primary'];
    }

    interface PaletteOptions {
        ochre?: PaletteOptions['primary'];
    }
}

// Update the Button's color options to include an ochre option
declare module '@mui/material/Button' {
    interface ButtonPropsColorOverrides {
        ochre: true;
    }
}

const theme = (color: string) => {
    return createTheme({
        palette: {
            ochre: {
                main: alpha(color, 0.7),
                light: alpha(color, 0.5),
                dark: alpha(color, 0.5),
                contrastText: getContrastRatio(color, '#fff') > 4.5 ? '#fff' : '#111',
            },
        },
    });
}
interface Props {
    color: string;
    string: string;
    icon?: React.ReactNode;
}

const UsingStyleColor: React.FC<Props> = ({ color, string, icon }) => {
    return (
        <ThemeProvider theme={theme(color)}>
            <Stack sx={{ gap: 2, alignItems: 'center' }}>
                <Button variant="contained" color="ochre" startIcon={icon}>
                    {string}
                </Button>
            </Stack>
        </ThemeProvider>
    );
}
export default UsingStyleColor;