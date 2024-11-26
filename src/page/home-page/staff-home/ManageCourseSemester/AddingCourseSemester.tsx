import { Add, Delete } from "@mui/icons-material";
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import SearchIcon from '@mui/icons-material/Search';
import { Autocomplete, Box, Button, Card, CardContent, Divider, Grid, IconButton, InputAdornment, MenuItem, Select, TextField, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import { Semester, classRoom, courses, participants, slot } from "../../../../models/Interface";
import { getClass, getCourse, getCourseSemester, getParticipants } from "../../../../service/ApiService";
import ClearIcon from '@mui/icons-material/Clear';
import ContactEmergencyIcon from '@mui/icons-material/ContactEmergency';
import ClassIcon from '@mui/icons-material/Class';
import FolderIcon from '@mui/icons-material/Folder';
import { v4 as uuidv4 } from 'uuid';
import { postCourseSemester, postSlot } from "../../../../service/ExamApi";
import { useNavigate } from "react-router-dom";

export const AddingCourseSemester = () => {
    const [participants, setParticipants] = useState<participants[]>([])
    const [dataClass, setDataClass] = useState<classRoom[]>([]);
    const [dataCourse, setDataCourse] = useState<courses[]>([]);
    const [dataSemesterID, setDataSemesterID] = useState<string>("")
    const [lecturerId, setLecturerId] = useState<string>("")
    const [classId, setClassId] = useState<string>("");
    const [courseId, setCourseId] = useState<string>("");
    const [typeSearch, setTypeSearch] = useState<string>("1")
    const [tempLecturerId, setTempLecturerId] = useState<string>("");
    const [tempClassId, setTempClassId] = useState<string>("");
    const [tempCourseId, setTempCourseId] = useState<string>("");
    const nav = useNavigate();

    const [slotList, setSlotList] = useState<slot[]>([{
        id: uuidv4(),
        SlotName: "",
        Description: "",
        TimeStart: new Date().toISOString().split('T')[0],
        TimeEnd: getTomorrowDate(),
        Status: true
    }])


    useEffect(() => {
        fetchParticipants();
        fetchClass();
        fetchCourse();
        fetchSemester();
    }, [])

    const fetchSemester = async () => {
        const res = await getCourseSemester();
        if (Array.isArray(res)) {
            setDataSemesterID(res[res.length - 1].SemesterID)
        }
    }

    const fetchParticipants = async () => {
        const res = await getParticipants();
        if (Array.isArray(res)) {
            setParticipants(res.filter(user => user.Role === 1))
        }
    }

    const fetchClass = async () => {
        const res = await getClass();
        if (Array.isArray(res)) {
            setDataClass(res)
        }
    }

    const fetchCourse = async () => {
        const res = await getCourse();
        if (Array.isArray(res)) {
            setDataCourse(res)
        }
    }

    function getTomorrowDate() {
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 7);
        return tomorrow.toISOString().split('T')[0];
    }


    const handleSlot = (type: string, id: string) => {
        const dataClone = [...slotList]

        if (type === 'Add') {
            dataClone.push({
                id: uuidv4(),
                SlotName: "",
                Description: "",
                TimeStart: new Date().toISOString().split('T')[0],
                TimeEnd: getTomorrowDate(),
                Status: true
            })
            setSlotList(dataClone);
        } else {
            setSlotList(dataClone.filter(item => item.id !== id))

        }
    }

    const handleUpdateSlot = (type: string, value: string, sid: string) => {
        const dataClone = [...slotList]

        const slotIndex = dataClone.findIndex(item => item.id === sid)

        if (type === "description") {
            dataClone[slotIndex].Description = value
        } if (type === "status") {
            // console.log(value);
            const check = value === true


            dataClone[slotIndex].Status = check
        } if (type === "startDate") {
            dataClone[slotIndex].TimeStart = value;
        } else if (type === "endDate") {
            dataClone[slotIndex].TimeEnd = value;
        }

        setSlotList(dataClone)
    }

    console.log(slotList);

    const saveCourseSemester = async () => {
        if (!lecturerId || !classId || !courseId) {
            alert('You must choice full information (letutare or class or course) ')
        } else {
            const arr: string[] = []
            slotList.forEach(item => arr.push(item.id))
            const data = {
                id: uuidv4(),
                SemesterID: dataSemesterID,
                SlotID: arr,
                CourseID: courseId,
                LecturersID: classId,
                ClassID: classId,
            }
            if (data) {
                // console.log(data);
                // console.log(slotList);

                await postCourseSemester(data)
                slotList.forEach(async (item) => {
                    await postSlot(item)
                })
                nav('/manageCourseSmester')

            }
        }
    }


    return (
        <Box p={3} sx={{ backgroundColor: "#f5f5f5" }}>
            {/* Header */}
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                <Typography variant="h5">Adding course  </Typography>
                <Box>
                    <Button variant="contained" color="primary" onClick={() => saveCourseSemester()}>Save</Button>
                </Box>
            </Box>

            {/* Bulk update and search */}
            <Grid container spacing={2}>
                <Grid item xs={12} md={3} sx={{
                    position: "sticky",
                    top: "20px",
                    padding: "10px",
                }}>
                    <Card>
                        <CardContent>
                            <Typography variant="subtitle1">Setting Lesson</Typography>
                            <Divider sx={{ my: 1 }} />

                            {/* Dropdown to select Lecturer/Class/Course */}
                            <Select
                                defaultValue="1"
                                size="small"
                                fullWidth
                                onChange={e => setTypeSearch(e.target.value)}
                            >
                                <MenuItem value="1">Lecturer</MenuItem>
                                <MenuItem value="2">Class</MenuItem>
                                <MenuItem value="3">Course</MenuItem>
                            </Select>
                            <Divider sx={{ my: 1 }} />

                            {/* Autocomplete & Button for Selection */}
                            <Box display="flex" flexDirection="column" gap={2}>
                                <Autocomplete
                                    options={
                                        typeSearch === "1" ? participants :
                                            typeSearch === "2" ? dataClass :
                                                dataCourse
                                    }
                                    getOptionLabel={(option) => {
                                        if (typeSearch === "1") {
                                            return option.UserName;
                                        } else if (typeSearch === "2") {
                                            return option.ClassName;
                                        } else {
                                            return option.CourseName;
                                        }
                                    }}
                                    onChange={(event, value) => {
                                        if (typeSearch === "1") setTempLecturerId(value?.id || "");
                                        if (typeSearch === "2") setTempClassId(value?.ClassID || "");
                                        else setTempCourseId(value?.id || "");
                                    }}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            size="small"
                                            placeholder={`Search ${typeSearch === "1" ? "lecturer" : typeSearch === "2" ? "class" : "course"}`}
                                        />
                                    )}
                                    fullWidth
                                />

                                <Button
                                    variant="outlined"
                                    onClick={() => {
                                        if (typeSearch === "1") setLecturerId(tempLecturerId);
                                        if (typeSearch === "2") setClassId(tempClassId);
                                        if (typeSearch === "3") setCourseId(tempCourseId);
                                    }}
                                    sx={{ width: "100%" }}
                                >
                                    Enter
                                </Button>
                            </Box>

                            <Divider sx={{ my: 1 }} />

                            {/* Display Selected Lecturer */}
                            <Box display="flex" alignItems="center" justifyContent="space-between">
                                <Button variant="text" startIcon={<ContactEmergencyIcon />}>
                                    Lecturer:
                                </Button>
                                <Typography variant="body2">
                                    {participants?.find(item => item.id === lecturerId)?.UserName}
                                </Typography>
                                {lecturerId && (
                                    <IconButton onClick={() => setLecturerId('')}>
                                        <ClearIcon color="error" />
                                    </IconButton>
                                )}
                            </Box>

                            <Divider sx={{ my: 1 }} />

                            {/* Display Selected Class */}
                            <Box display="flex" alignItems="center" justifyContent="space-between">
                                <Button variant="text" startIcon={<ClassIcon />}>
                                    Class:
                                </Button>
                                <Typography variant="body2">
                                    {dataClass?.find(item => item.ClassID === classId)?.ClassName}
                                </Typography>
                                {classId && (
                                    <IconButton onClick={() => setClassId('')}>
                                        <ClearIcon color="error" />
                                    </IconButton>
                                )}
                            </Box>

                            <Divider sx={{ my: 1 }} />

                            {/* Display Selected Course */}
                            <Box display="flex" alignItems="center" justifyContent="space-between">
                                <Button variant="text" startIcon={<FolderIcon />}>
                                    Course:
                                </Button>
                                <Typography variant="body2">
                                    {dataCourse?.find(item => item.id === courseId)?.CourseName}
                                </Typography>
                                {courseId && (
                                    <IconButton onClick={() => setCourseId('')}>
                                        <ClearIcon color="error" />
                                    </IconButton>
                                )}
                            </Box>

                            <Divider sx={{ my: 1 }} />
                        </CardContent>
                    </Card>
                </Grid>

                <Grid item xs={12} md={9}>
                    <Card>
                        <CardContent>

                            <Typography variant="subtitle1"> Total Slots:</Typography>

                            {/* Question Items */}
                            <Box mt={2}>
                                {slotList && slotList.map((slot, index) => (
                                    <Card sx={{ mb: 2 }}>
                                        <CardContent>
                                            <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                                                <Typography variant="body1">{index + 1}. Slot {index + 1}</Typography>
                                                <TextField
                                                    select
                                                    label='Status'
                                                    value={slot.Status}
                                                    size='small'
                                                    variant='outlined'
                                                    onChange={e => handleUpdateSlot("status", e.target.value, slot.id)}
                                                >
                                                    <MenuItem value={true}>Start Slot</MenuItem>
                                                    <MenuItem value={false}>Not Start</MenuItem>
                                                </TextField>
                                                <Box display="flex" alignItems="center" gap={2}>

                                                    <TextField
                                                        label='Start'
                                                        type='date'
                                                        size='small'
                                                        onChange={(e) => handleUpdateSlot('startDate', e.target.value, slot.id)}
                                                        value={slot.TimeStart}
                                                    />
                                                    <TextField
                                                        label='End'
                                                        type='date'
                                                        size='small'
                                                        onChange={(e) => handleUpdateSlot('endDate', e.target.value, slot.id)}
                                                        value={slot.TimeEnd}
                                                    />

                                                    <IconButton onClick={() => handleSlot('Remove', slot.id)}>
                                                        <Delete />
                                                    </IconButton>
                                                </Box>
                                            </Box>
                                            <TextField
                                                placeholder="Comment descriprion slot here ..."
                                                multiline
                                                rows={10}
                                                fullWidth
                                                onChange={e => handleUpdateSlot('description', e.target.value, slot.id)}
                                                value={slot.Description}
                                                variant="outlined"
                                                sx={{
                                                    marginBottom: "20px",
                                                    borderRadius: "12px",
                                                    backgroundColor: "#f4f6f8",
                                                    "& .MuiOutlinedInput-root": {
                                                        "& fieldset": {
                                                            borderColor: "#b0bec5",
                                                        },
                                                        "&:hover fieldset": {
                                                            borderColor: "#3f51b5",
                                                        },
                                                        "&.Mui-focused fieldset": {
                                                            borderColor: "#3f51b5",
                                                        },
                                                    },
                                                }}
                                            />
                                            <Divider sx={{ my: 1 }} />
                                        </CardContent>
                                    </Card>

                                ))}


                            </Box>

                            {/* Add question button */}
                            <Box textAlign="center" mt={2}>
                                <Button variant="outlined" onClick={() => handleSlot("Add", "1")} startIcon={<Add />}>Add slot</Button>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
            />
        </Box >
    );
}
