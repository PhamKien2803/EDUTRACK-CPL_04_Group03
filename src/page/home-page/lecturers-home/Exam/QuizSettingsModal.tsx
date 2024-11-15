import React from 'react';
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
} from '@mui/material';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import CloseIcon from '@mui/icons-material/Close';

interface Props {
    open: boolean,
    onClose: () => void
}


const QuizSettingsModal: React.FC<Props> = ({ open, onClose }) => {
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
                        />
                        <FormControl fullWidth margin="normal">
                            <InputLabel>Subject</InputLabel>
                            <Select defaultValue="Mathematics">
                                <MenuItem value="Mathematics">Mathematics</MenuItem>
                                <MenuItem value="Science">Science</MenuItem>
                                <MenuItem value="History">History</MenuItem>
                            </Select>
                        </FormControl>
                        <FormControl fullWidth margin="normal">
                            <InputLabel>Grade</InputLabel>
                            <Select defaultValue="Kindergarten">
                                <MenuItem value="Kindergarten">Kindergarten</MenuItem>
                                <MenuItem value="1st Grade">1st Grade</MenuItem>
                                <MenuItem value="2nd Grade">2nd Grade</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>
                    <Box
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
                            <input type="file" hidden />
                        </Button>
                    </Box>
                </Box>
            </DialogContent>
            <DialogActions>
                <Button variant="contained" color="primary">
                    Publish
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default QuizSettingsModal;
