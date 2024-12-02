import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import { Box, Card, MenuItem, TextField, Typography } from '@mui/material';
import { toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';
import { postSlot } from '../../../../service/ExamApi';
import { slot } from '../../../../models/Interface';

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

interface Props {
    open2: boolean,
    handleClickModal2: () => void,
    slotUpdate?: slot,
}

export const ModalUpdate: React.FC<Props> = ({ open2, handleClickModal2, slotUpdate }) => {
    const [status, setState] = React.useState<boolean>(true);
    const [description, setDescription] = React.useState<string>(slotUpdate.Description)
    const [timeStart, setTimeStart] = React.useState<string>(new Date().toISOString().split('T')[0]);
    const [timeEnd, setTimeEnd] = React.useState<string>(getTomorrowDate)

    function getTomorrowDate() {
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 7);
        return tomorrow.toISOString().split('T')[0];
    }

    return (

        <Dialog
            open={open2}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleClickModal2}
            aria-describedby="alert-dialog-slide-description"
            maxWidth="md"
            fullWidth
        >
            <Box
                sx={{
                    maxHeight: "600px",
                    overflowY: "auto",
                    overflowX: "hidden",
                    padding: "24px",
                    backgroundColor: "#f4f6f8",
                }}
            >
                <Card
                    sx={{
                        padding: "24px",
                        border: "1px solid #e0e0e0",
                        borderRadius: "16px",
                        backgroundColor: "#fff",
                    }}
                >   <Box display={'flex'} justifyContent={'space-between'} sx={{ mb: 3, fontWeight: "bold" }}>
                        <Typography
                            variant="h5"
                            component="div"
                        >
                            Update Slot
                        </Typography>
                        <Button variant='outlined' >
                            save
                        </Button>
                    </Box>


                    <Box display="flex" gap={3} mb={3}>
                        <TextField
                            select
                            label="Status"
                            size="small"
                            value={status.toString()}
                            onChange={(e) => setState(e.target.value === "true")}
                            sx={{
                                minWidth: "200px",
                                fontSize: "1.2rem",
                            }}
                        >
                            <MenuItem value={"true"}>Start Slot</MenuItem>
                            <MenuItem value={"false"}>Not Start</MenuItem>
                        </TextField>

                        <TextField
                            label="Start"
                            type="date"
                            size="small"
                            fullWidth
                            onChange={e => setTimeStart(e.target.value)}
                            value={timeStart}
                            InputLabelProps={{ shrink: true }}
                            sx={{
                                fontSize: "1.2rem",
                            }}
                        />
                        <TextField
                            label="End"
                            type="date"
                            size="small"
                            fullWidth
                            value={timeEnd}
                            onChange={e => setTimeEnd(e.target.value)}
                            InputLabelProps={{ shrink: true }}
                            sx={{
                                fontSize: "1.2rem",
                            }}
                        />
                    </Box>

                    <TextField
                        placeholder="Comment description slot here ..."
                        multiline
                        rows={4}
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                        fullWidth
                        sx={{
                            backgroundColor: "#f9f9f9",
                            borderRadius: "8px",
                            fontSize: "1.2rem",
                            "& .MuiOutlinedInput-root": {
                                padding: "12px",
                            },
                        }}
                    />
                </Card>
            </Box>
        </Dialog>
    );
};
