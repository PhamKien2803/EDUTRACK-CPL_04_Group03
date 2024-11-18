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
    const [checked, setChecked] = useState<boolean>(false)
    const [imagePreView, setImagePreView] = useState<string>("")

    const handleCheked = () => {
        if (checked) {
            setChecked(false)
            setDateOfBooking("")
        } else {
            setChecked(true)
        }
    }
    const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file && file.type.startsWith("image/")) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImage(reader.result as string);
                setImagePreView(reader.result as string)
            };
            reader.readAsDataURL(file);
        } else {
            console.log("Please upload a valid image file.");
        }
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth="md">
            <DialogTitle>
                <Box display="flex" alignItems="center">
                    <Typography variant="h6" component="div" style={{ flexGrow: 1 }}>
                        Great, you're almost done
                    </Typography>
                    <IconButton onClick={onClose}>
                        <CloseIcon />
                    </IconButton>
                </Box>
                <Typography variant="body2">
                    Review quiz settings and you’re good to go
                </Typography>
            </DialogTitle>
            <DialogContent dividers>
                <Box display="flex" gap={2}>
                    <Box flex="1">
                        <TextField
                            fullWidth
                            label="Name"
                            variant="outlined"
                            defaultValue="heello"
                            margin="normal"
                            disabled
                        />
                        <FormControl fullWidth margin="normal" >
                            <InputLabel>Display</InputLabel>
                            <Select defaultValue="fasle" onChange={e => setDisplay(e.target.value === "true")}>
                                <MenuItem value="fasle">No</MenuItem>
                                <MenuItem value="true">Yes</MenuItem>
                            </Select>
                        </FormControl>
                        <FormControl fullWidth margin="normal" >
                            <InputLabel>View Result</InputLabel>
                            <Select defaultValue="fasle" onChange={e => setStatus(e.target.value === "true")}>
                                <MenuItem value="fasle">No</MenuItem>
                                <MenuItem value="true">Yes</MenuItem>
                            </Select>
                        </FormControl>

                    </Box>
                    {imagePreView ? <Box
                        flex="1"
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                        border="1px dashed grey"
                        borderRadius="8px"
                        height="200px"
                        position="relative"
                    >
                        <img style={{ height: "200px", borderRadius: "8px" }} src={imagePreView} alt="Preview" />
                        <Button
                            component="label"
                            variant="outlined"
                            startIcon={<AddPhotoAlternateIcon />}
                            style={{
                                position: 'absolute',
                                top: '2px',
                                right: '2px',
                                background: 'white',

                            }}
                        >

                            <input type="file" hidden onChange={(e) => handleImage(e)} />
                        </Button>
                    </Box> : <Box
                        flex="1"
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                        border="1px dashed grey"
                        borderRadius="8px"
                        height="200px"
                    >
                        <Button component="label" variant="outlined" startIcon={<AddPhotoAlternateIcon />}>
                            Add cover image
                            <input type="file" hidden onChange={(e) => handleImage(e)} />
                        </Button>
                    </Box>}


                </Box>
                <FormControlLabel
                    control={<Switch checked={checked} onClick={() => handleCheked()} color="primary" />}
                    label="Do you want to set a date for the exam ? "
                />
                {checked &&
                    <TextField
                        fullWidth
                        onChange={e => setDateOfBooking(e.target.value)}
                        type='datetime-local'
                        variant="outlined"
                        margin="normal"
                    />

                }
            </DialogContent>
            <DialogActions>
                <Button onClick={handleSubmit} variant="contained" color="primary">
                    Publish
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default QuizSettingsModal;
