import * as React from 'react';
import SendIcon from '@mui/icons-material/Send';
import { Button, TextField, Box, Typography, Grid } from '@mui/material';
import emailjs from '@emailjs/browser';

function Contact() {
    const sendEmail = (e) => {
        e.preventDefault();
        
        emailjs.sendForm('service_k7tjo7o', 'template_gvcv25b', e.target, 'BEG8X3EKg9_bLjfCn')
            .then((result) => {
                console.log('Email sent successfully:', result.text);
            }, (error) => {
                console.error('Error sending email:', error.text);
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
                Contact Support
            </Typography>

            <form className="contact__form" onSubmit={sendEmail} style={{ width: '100%' }}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                            label="Email"
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
                            label="Message"
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
                    Send
                </Button>
            </form>
        </Box>
    );
}

export default Contact;
