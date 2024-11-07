import React from 'react';
import {
    Container,
    Typography,
    TextField,
    FormControl,
    RadioGroup,
    Radio,
    FormControlLabel,
    Button,
    Box,
    Switch,
    Divider,
} from '@mui/material';

export const AddExam = () => {
    return (
        <Container maxWidth="sm" sx={{ backgroundColor: '#f3e5f5', padding: 4, borderRadius: 2, mt: 5 }}>
            <Box sx={{ backgroundColor: '#ffffff', padding: 3, borderRadius: 2, boxShadow: 1, mb: 3 }}>
                <Typography variant="h5" sx={{ textAlign: 'center', color: '#4a148c', fontWeight: 'bold', mb: 2 }}>
                    EXAM ADDING
                </Typography>
                <TextField
                    label="Description Exam"
                    variant="standard"
                    fullWidth
                    sx={{ mb: 3 }}
                />
                <TextField
                    label="Time Limit(minute)"
                    variant="standard"
                    type="number"
                    fullWidth
                    sx={{ mb: 2 }}
                />
            </Box>

            <Box sx={{ backgroundColor: '#ffffff', padding: 3, borderRadius: 2, boxShadow: 1, mb: 3 }}>
                <TextField
                    label="Question Title"
                    variant="standard"
                    fullWidth
                    sx={{ mb: 2 }}
                />

                <FormControl component="fieldset">
                    <RadioGroup aria-label="quiz-options" name="quiz-options">
                        <FormControlLabel value="option1" control={<Radio />} label="Option 1" />
                        <FormControlLabel value="option2" control={<Radio />} label="Option 2" />
                        <FormControlLabel value="other" control={<Radio />} label="Other" />
                    </RadioGroup>
                </FormControl>

                <Divider sx={{ my: 2 }} />

                <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Button variant="outlined" color="primary" size="small">
                        Answer Key
                    </Button>
                    <Typography variant="caption" color="textSecondary">
                        (0 points)
                    </Typography>
                    <Box display="flex" alignItems="center">
                        <Typography variant="body2">Required</Typography>
                        <Switch />
                    </Box>
                </Box>
            </Box>

            {/* Submit Button */}
            <Box textAlign="center" mt={4}>
                <Button variant="contained" color="primary">
                    Save Quiz
                </Button>
            </Box>
        </Container>
    );
};
