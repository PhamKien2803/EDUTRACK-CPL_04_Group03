import React, { useState } from 'react';
import {
    Box,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Typography,
    Select,
    MenuItem,
    InputLabel,
    FormControl,
    IconButton,
    FormControlLabel,
    Switch,
} from '@mui/material';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import CloseIcon from '@mui/icons-material/Close';

interface Props {
    open: boolean,
    onClose: () => void,
    setStatus: (status: boolean) => void,
    setDisplay: (status: boolean) => void,
    setDateOfBooking: (date: string) => void,
    setImage: (date: string) => void,
    handleSubmit: () => void,
}

const QuizSettingsModal: React.FC<Props> = ({ open, onClose, setStatus, setDisplay, setDateOfBooking, setImage, handleSubmit }) => {
    const [checked, setChecked] = useState<boolean>(false);
    const [imagePreView, setImagePreView] = useState<string>("");

    const handleCheked = () => {
        if (checked) {
            setChecked(false);
            setDateOfBooking("");
        } else {
            setChecked(true);
        }
    };

    const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file && file.type.startsWith("image/")) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImage(reader.result as string);
                setImagePreView(reader.result as string);
            };
            reader.readAsDataURL(file);
        } else {
            console.log("Please upload a valid image file.");
        }
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
            <DialogTitle>
                <Box display="flex" alignItems="center">
                    <Typography variant="h6" component="div" style={{ flexGrow: 1, fontWeight: 'bold' }}>
                        Quiz Settings
                    </Typography>
                    <IconButton onClick={onClose}>
                        <CloseIcon />
                    </IconButton>
                </Box>
                <Typography variant="body2" color="textSecondary">
                    Finalize your quiz settings and publish
                </Typography>
            </DialogTitle>
            <DialogContent dividers style={{ paddingTop: '24px', paddingBottom: '24px', maxHeight: '600px', overflow: 'auto' }}>
                <Box display="flex" gap={3} flexWrap="wrap">
                    {/* Name Input */}
                    <Box flex="1" minWidth="250px">
                        <TextField
                            fullWidth
                            label="Quiz Name"
                            variant="outlined"
                            value="Sample Quiz"
                            margin="normal"
                            disabled
                            InputProps={{
                                style: { backgroundColor: '#f9f9f9', borderRadius: 8 }
                            }}
                        />
                        <FormControl variant='standard' margin="normal" sx={{ minWidth: 240, marginLeft: 1.5}}>
                            <InputLabel>Display Quiz</InputLabel>
                            <Select
                                defaultValue="false"
                                onChange={e => setDisplay(e.target.value === "true")}
                            >
                                <MenuItem value="false">No</MenuItem>
                                <MenuItem value="true">Yes</MenuItem>
                            </Select>
                        </FormControl>

                        <FormControl variant='standard' margin="normal" sx={{ minWidth: 240, marginLeft: 1.5}}>
                            <InputLabel>Allow Viewing Results</InputLabel>
                            <Select
                                defaultValue="false"
                                onChange={e => setStatus(e.target.value === "true")}
                            >
                                <MenuItem value="false">No</MenuItem>
                                <MenuItem value="true">Yes</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>

                    {/* Image Upload */}
                    <Box
                        flex="1"
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                        border="2px dashed #d3d3d3"
                        borderRadius="12px"
                        position="relative"
                        height="250px"
                        style={{ backgroundColor: '#f9f9f9' }}
                    >
                        {imagePreView ? (
                            <>
                                <img
                                    src={imagePreView}
                                    alt="Preview"
                                    style={{ maxHeight: '100%', maxWidth: '100%', borderRadius: '8px' }}
                                />
                                <IconButton
                                    component="label"
                                    style={{
                                        position: 'absolute',
                                        top: 10,
                                        right: 10,
                                        backgroundColor: '#fff',
                                        boxShadow: '0px 2px 4px rgba(0,0,0,0.1)',
                                    }}
                                >
                                    <AddPhotoAlternateIcon />
                                    <input type="file" hidden onChange={(e) => handleImage(e)} />
                                </IconButton>
                            </>
                        ) : (
                            <Button
                                component="label"
                                variant="outlined"
                                startIcon={<AddPhotoAlternateIcon />}
                                style={{ borderRadius: 8 }}
                            >
                                Add Cover Image
                                <input type="file" hidden onChange={(e) => handleImage(e)} />
                            </Button>
                        )}
                    </Box>
                </Box>

                {/* Date Scheduling */}
                <FormControlLabel
                    control={<Switch checked={checked} onClick={handleCheked} color="primary" />}
                    label="Set a date for the quiz?"
                    style={{ marginTop: '16px' }}
                />
                {checked && (
                    <TextField
                        fullWidth
                        onChange={e => setDateOfBooking(e.target.value)}
                        type="datetime-local"
                        variant="outlined"
                        margin="normal"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        style={{ borderRadius: 8 }}
                    />
                )}
            </DialogContent>
            <DialogActions style={{ paddingBottom: '16px', paddingTop: '8px' }}>
                <Button onClick={onClose} variant="outlined" style={{ marginRight: '8px' }}>
                    Cancel
                </Button>
                <Button onClick={handleSubmit} variant="contained" style={{ backgroundColor: '#4caf50', color: '#fff' }}>
                    Save
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default QuizSettingsModal;
