import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import { Box, Card, FormControlLabel, IconButton, MenuItem, Select, Switch, TextField, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { Exam } from '../../../../models/Interface';
import { useTranslation } from 'react-i18next';
import { putExam } from '../../../../service/ExamApi';
import { toast } from 'react-toastify';
interface Props {
    open: boolean,
    handleClickModal: () => void,
    exam: Exam,
    setExam: (exam: Exam) => void

}
const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});
export const ModalUpdateExam: React.FC<Props> = ({ open, handleClickModal, exam, setExam }) => {
    const [title, setTitle] = React.useState<string>(exam.examContent)
    const [display, setDisplay] = React.useState<boolean>(exam.display)
    const [status, setStatus] = React.useState<boolean>(exam.status)
    const [checked, setChecked] = React.useState<boolean>(false)
    const [dateOfBook, setDateOfBook] = React.useState<string>(exam?.dateOfBooking)
    const [time, setTime] = React.useState<string>(exam.timeLimit)

    const { t } = useTranslation();
    React.useEffect(() => {
        if (exam?.dateOfBooking) {
            setChecked(true)
        }
    }, [])

    const handleSaveExam = async () => {
        const examSave = {
            id: exam.id,
            examID: exam.examID,
            examContent: title,
            courseSemesterID: exam.courseSemesterID,
            timeLimit: time,
            image: exam.image,
            status: status,
            createdAt: exam.createdAt,
            display: display,
            dateOfBooking: checked ? dateOfBook : ""
        }
        console.log(examSave);

        const req = await putExam(examSave);
        if (req) {
            setExam(exam)
            toast.success('Udate succesfully')
            handleClickModal();
        }
    }

    return (
        <Dialog
            open={open}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleClickModal}
            aria-describedby="alert-dialog-slide-description"
            maxWidth="sm"
            fullWidth
            sx={{
                "& .MuiDialog-paper": {
                    borderRadius: "20px",
                    boxShadow: "0 8px 24px rgba(0, 0, 0, 0.2)",
                },
            }}
        >
            <Box
                sx={{
                    maxHeight: "600px",
                    overflowY: "auto",
                    padding: "24px",
                    backgroundColor: "#f5f7fb",
                }}
            >
                <Card
                    sx={{
                        padding: "32px",
                        border: "none",
                        borderRadius: "16px",
                        backgroundColor: "#ffffff",
                        boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
                    }}
                >
                    {/* Header */}
                    <Box
                        display="flex"
                        justifyContent="space-between"
                        alignItems="center"
                        sx={{ mb: 4 }}
                    >
                        <Typography variant="h5" component="div" fontWeight="600">
                            Update Exam
                        </Typography>
                        <IconButton
                            aria-label="close"
                            onClick={handleClickModal}
                            sx={{
                                color: "#444",
                                "&:hover": { backgroundColor: "#f5f5f5" },
                            }}
                        >
                            <CloseIcon />
                        </IconButton>
                    </Box>

                    {/* Form Fields */}
                    <Box
                        display="flex"
                        flexDirection="column"
                        gap={3}
                        sx={{ mb: 3 }}
                    >
                        <TextField
                            label="Title"
                            value={title}
                            size="small"
                            onChange={e => setTitle(e.target.value)}
                            sx={{
                                "& .MuiInputBase-root": {
                                    fontSize: "1rem",
                                    borderRadius: "8px",
                                },
                            }}
                        />



                        <Box display="flex" gap={2}>
                            <TextField
                                select
                                label="Display"
                                size="small"
                                fullWidth
                                onChange={e => setDisplay(e.target.value === 'true')}
                                defaultValue={display.toString()}
                                InputLabelProps={{ shrink: true }}
                                sx={{
                                    "& .MuiInputBase-root": {
                                        fontSize: "1rem",
                                        borderRadius: "8px",
                                    },
                                }}
                            >
                                <MenuItem value={'false'}>No</MenuItem>
                                <MenuItem value={'true'}>Yes</MenuItem>
                            </TextField>
                            <TextField
                                select
                                label="Status"
                                size="small"
                                fullWidth
                                onChange={e => setStatus(e.target.value === 'true')}
                                defaultValue={status.toString()}
                                InputLabelProps={{ shrink: true }}
                                sx={{
                                    "& .MuiInputBase-root": {
                                        fontSize: "1rem",
                                        borderRadius: "8px",
                                    },
                                }}
                            >
                                <MenuItem value={'false'}>No</MenuItem>
                                <MenuItem value={'true'}>Yes</MenuItem>
                            </TextField>
                        </Box>
                        <Select
                            defaultValue={time}
                            onChange={e => setTime(e.target.value)}
                            size="small"
                        >
                            <MenuItem value="900">{t("15_min")}</MenuItem>
                            <MenuItem value="1800">{t("30_min")}</MenuItem>
                            <MenuItem value="2700">{t("45_min")}</MenuItem>
                            <MenuItem value="3600">{t("60_min")}</MenuItem>
                            <MenuItem value="5400">{t("90_min")}</MenuItem>
                            <MenuItem value="7200">{t("120_min")}</MenuItem>
                            <MenuItem value="9000">{t("150_min")}</MenuItem>
                            <MenuItem value="10800">{t("180_min")}</MenuItem>
                        </Select>
                        <Box>
                            <FormControlLabel
                                control={<Switch color="primary" />}
                                label={'Set Date For Exam'}
                                onChange={() => setChecked(!checked)}
                                checked={checked}
                            />
                            {checked &&
                                <TextField
                                    fullWidth
                                    type="datetime-local"
                                    variant="outlined"
                                    margin="normal"
                                    onChange={e => setDateOfBook(e.target.value)}
                                    defaultValue={dateOfBook}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    style={{ borderRadius: 8 }}
                                />

                            }
                        </Box>

                    </Box>

                    <Box
                        display="flex"
                        justifyContent="flex-end"
                        gap={2}
                        sx={{ mt: 4 }}
                    >
                        <Button
                            variant="outlined"
                            color="secondary"
                            onClick={handleClickModal}
                            sx={{
                                borderRadius: "8px",
                                textTransform: "none",
                                padding: "8px 16px",
                            }}
                        >
                            Cancel
                        </Button>
                        <Button
                            variant="contained"
                            color="primary"
                            sx={{
                                borderRadius: "8px",
                                textTransform: "none",
                                padding: "8px 16px",
                            }}
                            onClick={() => handleSaveExam()}
                        >
                            Save
                        </Button >
                    </Box>
                </Card>
            </Box>
        </Dialog>
    )
}
