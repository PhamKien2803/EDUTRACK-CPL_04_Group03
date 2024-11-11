import React, { useRef, useState } from 'react';
import {
    Container,
    Typography,
    TextField,
    FormControl,
    Checkbox,
    Button,
    Box,
    Switch,
    Divider,
} from '@mui/material';
import ImageSearchIcon from '@mui/icons-material/ImageSearch';
import ClearIcon from '@mui/icons-material/Clear';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

export const AddExam = () => {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [imagePrev, setImagePrev] = useState<string>("");
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const handleClick = () => {
        fileInputRef.current?.click();
    };

    const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            if (file.type.startsWith("image/")) {
                const reader = new FileReader();
                reader.onloadend = () => {
                    setImagePrev(reader.result as string);
                    setErrorMessage(null); // Clear any previous errors
                };
                reader.readAsDataURL(file);
            } else {
                setErrorMessage("Please upload a valid image file.");
            }
        }
    };

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
                    label="Time Limit (minutes)"
                    variant="standard"
                    type="number"
                    fullWidth
                    sx={{ mb: 2 }}
                />
            </Box>

            <Box sx={{ backgroundColor: '#ffffff', padding: 3, borderRadius: 2, boxShadow: 1, mb: 3 }}>
                <Box display="flex" alignItems="center" sx={{ mb: 2 }}>
                    <TextField
                        label="Question Title"
                        variant="standard"
                        fullWidth
                        sx={{ mr: 2 }}
                    />
                    <ImageSearchIcon onClick={handleClick} style={{ cursor: 'pointer' }} />
                </Box>

                <input
                    ref={fileInputRef}
                    type="file"
                    style={{ display: 'none' }}
                    onChange={handleImage}
                />

                {imagePrev && (
                    <Box display="flex" justifyContent="center" my={2} onClick={() => setImagePrev("")}>
                        <img src={imagePrev} alt="Preview" style={{ width: '300px', cursor: 'pointer' }} />
                        <ClearIcon color="error" style={{ cursor: 'pointer' }} />
                    </Box>
                )}

                {errorMessage && (
                    <Typography color="error" variant="caption" sx={{ textAlign: 'center', display: 'block', mb: 2 }}>
                        {errorMessage}
                    </Typography>
                )}

                <FormControl component="fieldset" fullWidth>
                    {[...Array(2)].map((_, index) => (
                        <Box display="flex" alignItems="center" sx={{ mb: 1 }} key={index}>
                            <Checkbox />
                            <TextField type="text" variant="standard" fullWidth />
                        </Box>
                    ))}

                </FormControl>
                <Typography sx={{ ml: 1 }} style={{ cursor: 'pointer' }}>
                    <AddCircleOutlineIcon color='success' />
                    Add Answer
                </Typography>

                <Divider sx={{ my: 2 }} />

                <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Button variant="outlined" color="primary" size="small">
                        ADD Question
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

            <Box textAlign="center" mt={4}>
                <Button variant="contained" color="primary">
                    Save Quiz
                </Button>
            </Box>
        </Container>
    );
};
