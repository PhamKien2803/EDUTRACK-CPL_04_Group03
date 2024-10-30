import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import MuiCard from '@mui/material/Card';
import Checkbox from '@mui/material/Checkbox';
import Divider from '@mui/material/Divider';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import SchoolIcon from '@mui/icons-material/School';

import { styled } from '@mui/material/styles';

import ForgotPassword from '../forgot-password/Forgot';
import { GoogleIcon, FacebookIcon, SitemarkIcon } from '../icons/CustomIcon';

const Card = styled(MuiCard)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignSelf: 'center',
    width: '100%',
    padding: theme.spacing(5),
    gap: theme.spacing(2.5),
    boxShadow:
        '0px 10px 25px rgba(0, 0, 0, 0.05), 0px 20px 40px rgba(0, 0, 0, 0.1)',
    borderRadius: '16px',
    backgroundColor: theme.palette.background.paper,
    [theme.breakpoints.up('sm')]: {
        width: '500px',
    },
}));

export default function SignInCard() {
    const [emailError, setEmailError] = React.useState(false);
    const [emailErrorMessage, setEmailErrorMessage] = React.useState('');
    const [passwordError, setPasswordError] = React.useState(false);
    const [passwordErrorMessage, setPasswordErrorMessage] = React.useState('');
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!validateInputs()) return;
        const data = new FormData(event.currentTarget);
        console.log({
            email: data.get('email'),
            password: data.get('password'),
        });
    };

    const validateInputs = () => {
        const email = document.getElementById('email') as HTMLInputElement;
        const password = document.getElementById('password') as HTMLInputElement;
        let isValid = true;

        if (!email.value || !/\S+@\S+\.\S+/.test(email.value)) {
            setEmailError(true);
            setEmailErrorMessage('Please enter a valid email address.');
            isValid = false;
        } else {
            setEmailError(false);
            setEmailErrorMessage('');
        }

        if (!password.value || password.value.length < 6) {
            setPasswordError(true);
            setPasswordErrorMessage('Password must be at least 6 characters long.');
            isValid = false;
        } else {
            setPasswordError(false);
            setPasswordErrorMessage('');
        }

        return isValid;
    };

    return (
        <Card variant="outlined">
            <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
                <SitemarkIcon />
            </Box>
            <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                <SchoolIcon sx={{ fontSize: '2.5rem' }} />
                <img
                    src="https://th.bing.com/th/id/OIP.yQVfminp9JifX-QE4swlHwAAAA?rs=1&pid=ImgDetMain"
                    alt="EduTrack logo"
                    style={{ marginRight: 8, width: '50%' }}
                />
            </Box>
            <Box
                component="form"
                onSubmit={handleSubmit}
                noValidate
                sx={{ display: 'flex', flexDirection: 'column', width: '100%', gap: 3 }}
            >
                <FormControl>
                    <TextField
                        id="email"
                        label="Email"
                        error={emailError}
                        helperText={emailErrorMessage}
                        placeholder="your@email.com"
                        required
                        fullWidth
                        variant="outlined"
                        color={emailError ? 'error' : 'primary'}
                        InputProps={{ style: { borderRadius: '12px' } }}
                    />
                </FormControl>
                <FormControl>
                    <TextField
                        id="password"
                        label="Password"
                        error={passwordError}
                        helperText={passwordErrorMessage}
                        name="password"
                        placeholder="••••••"
                        type="password"
                        required
                        fullWidth
                        variant="outlined"
                        color={passwordError ? 'error' : 'primary'}
                        InputProps={{ style: { borderRadius: '12px' } }}
                    />
                    <Link
                        component="button"
                        type="button"
                        onClick={handleClickOpen}
                        variant="body2"
                        sx={{ alignSelf: 'flex-end', mt: 1 }}
                    >
                        Forgot Password?
                    </Link>
                </FormControl>
                <FormControlLabel
                    control={<Checkbox value="remember" color="primary" />}
                    label="Remember me"
                />
                <ForgotPassword open={open} handleClose={handleClose} />
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    onClick={validateInputs}
                    sx={{
                        py: 1.5,
                        borderRadius: '12px',
                        fontSize: '1rem',
                        backgroundColor: 'secondary.main',
                    }}
                >
                    Sign in to EduTrack
                </Button>
            </Box>
            <Divider sx={{ mt: 3, mb: 2 }}>or</Divider>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Button
                    fullWidth
                    variant="outlined"
                    onClick={() => alert('Sign in with Google')}
                    startIcon={<GoogleIcon />}
                    sx={{ borderRadius: '12px', py: 1.5 }}
                >
                    Sign in with Google
                </Button>
                <Button
                    fullWidth
                    variant="outlined"
                    onClick={() => alert('Sign in with Facebook')}
                    startIcon={<FacebookIcon />}
                    sx={{ borderRadius: '12px', py: 1.5 }}
                >
                    Sign in with Facebook
                </Button>
            </Box>
        </Card>
    );
}
