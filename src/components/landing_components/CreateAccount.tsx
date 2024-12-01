import * as React from 'react';
import SendIcon from '@mui/icons-material/Send';
import { Button, TextField, Box, Typography, Grid, Alert, Paper } from '@mui/material';
import emailjs from '@emailjs/browser';
import { useTranslation } from 'react-i18next';

function CreateAccount() {
    const { t } = useTranslation();
    const [statusMessage, setStatusMessage] = React.useState<{ type: 'success' | 'error'; message: string } | null>(null);
    const [isSubmitting, setIsSubmitting] = React.useState(false);

    const sendEmail = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setStatusMessage(null);
        setIsSubmitting(true);

        emailjs
            .sendForm('service_k7tjo7o', 'template_cluyyub', e.target as HTMLFormElement, 'BEG8X3EKg9_bLjfCn')
            .then(
                () => {
                    setStatusMessage({ type: 'success', message: t('email_sent_success') });
                    (e.target as HTMLFormElement).reset();
                },
                () => {
                    setStatusMessage({ type: 'error', message: t('email_sent_error') });
                }
            )
            .finally(() => setIsSubmitting(false));
    };

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '100vh',
                backgroundColor: '#f8f9fa',
                padding: 3,
            }}
        >
            <Paper
                elevation={2}
                sx={{
                    width: '100%',
                    maxWidth: 500,
                    padding: 4,
                    borderRadius: 2,
                    backgroundColor: '#ffffff',
                }}
            >
                {/* Header */}
                <Typography
                    variant="h5"
                    component="h1"
                    fontWeight="500"
                    gutterBottom
                    sx={{
                        color: '#1a1a1a',
                        textAlign: 'center',
                        marginBottom: 1,
                    }}
                >
                    {t('contact_support', { defaultValue: 'Contact Support' })}
                </Typography>
                <Typography variant="body2" color="textSecondary" textAlign="center" sx={{ marginBottom: 3 }}>
                    {t(
                        'contact_intro',
                        {
                            defaultValue:
                                'We are here to help! Please fill out the form below and we will get back to you as soon as possible.',
                        }
                    )}
                </Typography>

                {/* Alert message */}
                {statusMessage && (
                    <Alert severity={statusMessage.type} sx={{ width: '100%', marginBottom: 2 }}>
                        {statusMessage.message}
                    </Alert>
                )}

                {/* Form */}
                <form onSubmit={sendEmail} style={{ width: '100%' }}>
                    <Grid container spacing={2}>
                        {/* Email Field */}
                        <Grid item xs={12}>
                            <TextField
                                label={t('email_label', { defaultValue: 'Your Email Address' })}
                                variant="outlined"
                                fullWidth
                                name="email_from"
                                id="emailFrom"
                                placeholder="person@example.com"
                                required
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                        borderRadius: '8px',
                                        backgroundColor: '#f7f7f7',
                                        '&:hover': { backgroundColor: '#eeeeee' },
                                    },
                                }}
                            />
                        </Grid>

                        {/* Message Field */}
                        <Grid item xs={12}>
                            <TextField
                                label={t('message_label', { defaultValue: 'Your Message' })}
                                variant="outlined"
                                fullWidth
                                name="message"
                                id="message"
                                multiline
                                rows={4}
                                required
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                        borderRadius: '8px',
                                        backgroundColor: '#f7f7f7',
                                        '&:hover': { backgroundColor: '#eeeeee' },
                                    },
                                }}
                            />
                        </Grid>
                    </Grid>

                    {/* Submit Button */}
                    <Button
                        type="submit"
                        variant="contained"
                        endIcon={<SendIcon />}
                        disabled={isSubmitting}
                        sx={{
                            marginTop: 3,
                            width: '100%',
                            padding: '12px 0',
                            fontSize: '14px',
                            fontWeight: 'bold',
                            backgroundColor: '#007bff',
                            color: '#ffffff',
                            borderRadius: '6px',
                            textTransform: 'none',
                            boxShadow: 'none',
                            '&:hover': {
                                backgroundColor: '#0056b3',
                            },
                        }}
                    >
                        {isSubmitting
                            ? t('sending', { defaultValue: 'Sending...' })
                            : t('send_button', { defaultValue: 'Send Message' })}
                    </Button>
                </form>

                {/* Footer Text */}
                <Typography
                    variant="caption"
                    color="textSecondary"
                    sx={{ marginTop: 3, textAlign: 'center', display: 'block' }}
                >
                    {t('footer_note', { defaultValue: 'We usually respond within 1-2 business days.' })}
                </Typography>
            </Paper>
        </Box>
    );
}

export default CreateAccount;
