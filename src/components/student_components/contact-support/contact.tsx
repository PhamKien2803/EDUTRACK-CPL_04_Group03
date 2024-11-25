import * as React from 'react';
import SendIcon from '@mui/icons-material/Send';
import { Button, TextField, Box, Typography, Grid, Alert } from '@mui/material';
import emailjs from '@emailjs/browser';
import { useTranslation } from 'react-i18next'; 

function Contact() {
    // State để lưu trạng thái thông báo
    const { t } = useTranslation();
    const [statusMessage, setStatusMessage] = React.useState(null); // { type: 'success' | 'error', message: string }
  
    const sendEmail = (e) => {
        e.preventDefault();

        // Reset thông báo trước khi gửi email
        setStatusMessage(null);
        
        emailjs.sendForm('service_k7tjo7o', 'template_cluyyub', e.target, 'BEG8X3EKg9_bLjfCn')
            .then((result) => {
                console.log('Email sent successfully:', result.text);
                setStatusMessage({
                    type: 'success',
                    message: t('email_sent_success')
                });
            }, (error) => {
                console.error('Error sending email:', error.text);
                setStatusMessage({
                    type: 'error',
                    message: t('email_sent_error')
                });
            });
    }

    return (
        <Box 
            className="App"
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                padding: 4,
                maxWidth: 600,
                margin: '0 auto',
                backgroundColor: '#f9f9f9',
                borderRadius: 2,
                boxShadow: 3,
                marginTop: 10
            }}
        >
            <Typography variant="h4" component="h1" gutterBottom align="center">
                {t('contact_support')}
            </Typography>
            
            {/* Hiển thị thông báo thành công hoặc lỗi */}
            {statusMessage && (
                <Alert severity={statusMessage.type} sx={{ width: '100%', marginBottom: 2 }}>
                    {statusMessage.message}
                </Alert>
            )}

            <form className="contact__form" onSubmit={sendEmail} style={{ width: '100%' }}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                            label={t('email_label')}
                            variant="outlined"
                            fullWidth
                            name="email_from"
                            id="emailFrom"
                            placeholder="person@example.com"
                            required
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label={t('message_label')}
                            variant="outlined"
                            fullWidth
                            name="message"
                            id="message"
                            multiline
                            rows={4}
                            required
                        />
                    </Grid>
                </Grid>
                
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    endIcon={<SendIcon />}
                    sx={{
                        marginTop: 2,
                        padding: '10px 20px',
                        fontSize: '16px',
                        '&:hover': {
                            backgroundColor: '#1976d2', // Hover effect
                        },
                    }}
                >
                    {t('send_button')}
                </Button>
            </form>
        </Box>
    );
}

export default Contact;
