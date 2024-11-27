import * as React from 'react';
import SendIcon from '@mui/icons-material/Send';
import { Button, TextField, Box, Typography, Grid, Alert, Paper } from '@mui/material';
import emailjs from '@emailjs/browser';
import { useTranslation } from 'react-i18next';

function Contact() {
    const { t } = useTranslation();
    const [statusMessage, setStatusMessage] = React.useState<{ type: 'success' | 'error', message: string } | null>(null);
    const [isSubmitting, setIsSubmitting] = React.useState(false); // Trạng thái loading khi gửi email

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
                padding: 4,
                background: 'linear-gradient(135deg, #1e3c72, #2a5298)',
                color: 'white',
            }}
        >
            <Paper
                elevation={5}
                sx={{
                    width: '100%',
                    maxWidth: 500,
                    padding: 4,
                    borderRadius: 3,
                    backgroundColor: 'rgba(255, 255, 255, 0.95)',
                    boxShadow: '0px 10px 20px rgba(0, 0, 0, 0.2)',
                }}
            >
                {/* Header */}
                <Typography variant="h4" component="h1" fontWeight="bold" gutterBottom color="primary">
                    {t('contact_support', { defaultValue: 'Contact Support' })}
                </Typography>
                <Typography variant="body1" color="textSecondary" gutterBottom>
                    {t('contact_intro', { defaultValue: 'We are here to help! Please fill out the form below and we will get back to you as soon as possible.' })}
                </Typography>

                {/* Alert message */}
                {statusMessage && (
                    <Alert severity={statusMessage.type} sx={{ width: '100%' }}>
                        {statusMessage.message}
                    </Alert>
                )}

                {/* Form */}
                <form onSubmit={sendEmail} style={{ width: '100%' }}>
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            minHeight: '100%',
                            marginRight: 2,
                        }}
                    >
                        <Grid container spacing={3} sx={{ maxWidth: 500, width: '100%' }}>
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
                                        borderRadius: '5px',
                                        '& .MuiOutlinedInput-root': {
                                            background: '#f5f5f5',
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
                                        borderRadius: '5px',
                                        '& .MuiOutlinedInput-root': {
                                            background: '#f5f5f5',
                                        },
                                    }}
                                />
                            </Grid>
                        </Grid>
                    </Box>


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
                            fontSize: '16px',
                            fontWeight: 'bold',
                            color: '#fff',
                            background: isSubmitting
                                ? 'linear-gradient(to right, #b8c6db, #f5f7fa)'
                                : 'linear-gradient(to right, #6a11cb, #2575fc)',
                            borderRadius: '30px',
                            '&:hover': {
                                background: isSubmitting
                                    ? 'linear-gradient(to right, #b8c6db, #f5f7fa)'
                                    : 'linear-gradient(to right, #5b10ba, #1e66e1)',
                            },
                        }}
                    >
                        {isSubmitting ? t('sending', { defaultValue: 'Sending...' }) : t('send_button', { defaultValue: 'Send Message' })}
                    </Button>
                </form>

                {/* Footer Text */}
                <Typography variant="caption" color="textSecondary" sx={{ marginTop: 3 }}>
                    {t('footer_note', { defaultValue: 'We usually respond within 1-2 business days.' })}
                </Typography>
            </Paper>
        </Box>

    );
}

export default Contact;
