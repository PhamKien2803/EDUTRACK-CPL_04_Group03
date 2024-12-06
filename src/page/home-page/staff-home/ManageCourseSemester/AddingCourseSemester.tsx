import { Add, Delete } from "@mui/icons-material";
import { Autocomplete, Box, Button, Card, CardContent, Divider, Grid, IconButton, MenuItem, Select, TextField, Tooltip, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import { classRoom, courses, participants, slot } from "../../../../models/Interface";
import { getClass, getCourse, getCourseSemester, getParticipants, getSemester } from "../../../../service/ApiService";
import ClearIcon from '@mui/icons-material/Clear';
import Swal from 'sweetalert2';
import { v4 as uuidv4 } from 'uuid';
import { postCourseSemester, postSlot } from "../../../../service/ExamApi";
import { useNavigate } from "react-router-dom";
import ReplyAllIcon from '@mui/icons-material/ReplyAll';

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
        const res = await getSemester();
        if (Array.isArray(res)) {
            console.log(res);

            setDataSemesterID(res[res.length - 1].SemesterID)
        }
    }

    console.log(dataSemesterID);


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


    const saveCourseSemester = async () => {
        if (!lecturerId || !classId || !courseId) {
            Swal.fire({
                icon: 'error',
                title: 'Incomplete Information',
                text: 'You must choose full information (Lecturer, Class, and Course).',
                confirmButtonText: 'OK',
                confirmButtonColor: '#d33'
            });
        } else {
            const arr = slotList.map(item => item.id);
            const data = {
                id: uuidv4(),
                SemesterID: dataSemesterID,
                SlotID: arr,
                CourseID: courseId,
                LecturersID: lecturerId,
                ClassID: classId,
            };

            if (data) {
                const result = await Swal.fire({
                    title: 'Are you sure?',
                    text: 'Do you want to save this course semester?',
                    icon: 'question',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Yes, save it!',
                    cancelButtonText: 'Cancel',
                });

                if (result.isConfirmed) {
                    try {
                        await postCourseSemester(data);

                        await Promise.all(slotList.map(async (item) => await postSlot(item)));

                        Swal.fire({
                            icon: 'success',
                            title: 'Saved!',
                            text: 'The course semester has been saved successfully.',
                            confirmButtonText: 'OK',
                            confirmButtonColor: '#3085d6',
                        }).then(() => {
                            nav('/staff/manage_course_semester');
                        });
                    } catch (error) {
                        console.error('Error saving course semester:', error);
                        Swal.fire({
                            icon: 'error',
                            title: 'Error',
                            text: 'An error occurred while saving the data. Please try again.',
                            confirmButtonText: 'OK',
                            confirmButtonColor: '#d33',
                        });
                    }
                }
            }
        }
    };

    return (
        <Box p={3} sx={{ backgroundColor: "#edf2f7", minHeight: "100vh" }}>
            {/* Navigation and Header */}
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Box display="flex" alignItems="center" justifyContent="space-between">
                        <Button
                            startIcon={<ReplyAllIcon />}
                            onClick={() => nav(-1)}
                            variant="outlined"
                            color="secondary"
                            sx={{
                                borderRadius: "8px",
                                boxShadow: "0px 2px 4px rgba(0,0,0,0.1)"
                            }}
                        >
                            Back
                        </Button>
                        <Typography variant="h4" fontWeight="600">
                            Adding Course
                        </Typography>
                        <Button
                            variant="contained"
                            sx={{
                                backgroundColor: "#283593",
                                marginRight: "16px",
                                padding: "8px 20px",
                                boxShadow: "0px 4px 8px rgba(0,0,0,0.15)"
                            }}
                            onClick={() => saveCourseSemester()}
                        >
                            Save
                        </Button>
                    </Box>
                </Grid>
            </Grid>

            {/* Main Content */}
            <Grid container spacing={3} mt={3}>
                {/* Sidebar Settings */}
                <Grid item xs={12} md={4}>
                    <Card sx={{ boxShadow: "0px 4px 12px rgba(0,0,0,0.1)", borderRadius: "12px" }}>
                        <CardContent>
                            <Typography variant="h6" fontWeight="500">
                                Setting Lesson
                            </Typography>
                            <Divider sx={{ my: 2 }} />

                            {/* Dropdown */}
                            <Select
                                defaultValue="1"
                                size="small"
                                fullWidth
                                onChange={(e) => setTypeSearch(e.target.value)}
                                sx={{ marginBottom: "16px" }}
                            >
                                <MenuItem value="1">Lecturer</MenuItem>
                                <MenuItem value="2">Class</MenuItem>
                                <MenuItem value="3">Course</MenuItem>
                            </Select>

                            {/* Search Autocomplete */}
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
                                sx={{ marginBottom: "16px" }}
                            />

                            <Button
                                variant="outlined"
                                fullWidth
                                color="error"
                                onClick={() => {
                                    if (typeSearch === "1") setLecturerId(tempLecturerId);
                                    if (typeSearch === "2") setClassId(tempClassId);
                                    if (typeSearch === "3") setCourseId(tempCourseId);
                                }}
                                sx={{
                                    padding: "10px",
                                    borderRadius: "8px"
                                }}
                            >
                                Add Selection
                            </Button>

                            <Divider sx={{ my: 2 }} />

                            {/* Display Selections */}
                            {[
                                { label: "Lecturer", value: participants?.find((item) => item.id === lecturerId)?.UserName, clear: () => setLecturerId("") },
                                { label: "Class", value: dataClass?.find((item) => item.ClassID === classId)?.ClassName, clear: () => setClassId("") },
                                { label: "Course", value: dataCourse?.find((item) => item.id === courseId)?.CourseName, clear: () => setCourseId("") }
                            ].map(({ label, value, clear }) => (
                                <Box key={label} display="flex" alignItems="center" justifyContent="space-between" sx={{ marginBottom: "12px" }}>
                                    <Typography variant="body2" fontWeight="500">{label}:</Typography>
                                    <Typography variant="body2">{value || "Not selected"}</Typography>
                                    {value && (
                                        <IconButton onClick={clear}>
                                            <ClearIcon color="error" />
                                        </IconButton>
                                    )}
                                </Box>
                            ))}
                        </CardContent>
                    </Card>
                </Grid>

                {/* Slot Management */}
                <Grid item xs={12} md={8}>
                    <Card sx={{ boxShadow: "0px 4px 12px rgba(0,0,0,0.1)", borderRadius: "12px" }}>
                        <CardContent>
                            <Typography variant="h6" fontWeight="500" mb={3}>
                                Setting Slots
                            </Typography>

                            <Box
                                sx={{
                                    maxHeight: "400px",
                                    overflowY: "auto",
                                    overflowX: "hidden",
                                    paddingRight: "8px",
                                    maxWidth: "100%",
                                }}
                            >
                                {slotList && slotList.map((slot, index) => (
                                    <Card
                                        key={slot.id}
                                        sx={{
                                            mb: 2,
                                            padding: "16px",
                                            border: "1px solid #e0e0e0",
                                            borderRadius: "12px",
                                            backgroundColor: "#f9f9f9"
                                        }}
                                    >
                                        <Box display="flex" alignItems="center" justifyContent="space-between" mb={2}>
                                            <Typography variant="subtitle1">{index + 1}. Slot {index + 1}</Typography>
                                            <TextField
                                                select
                                                label="Status"
                                                size="small"
                                                value={slot.Status}
                                                onChange={(e) => handleUpdateSlot("status", e.target.value, slot.id)}
                                                sx={{ minWidth: "150px" }}
                                            >
                                                <MenuItem value={true}>Start Slot</MenuItem>
                                                <MenuItem value={false}>Not Start</MenuItem>
                                            </TextField>
                                        </Box>

                                        <Box display="flex" gap={2} mb={2}>
                                            <TextField
                                                label="Start"
                                                type="date"
                                                size="small"
                                                fullWidth
                                                onChange={(e) => handleUpdateSlot("startDate", e.target.value, slot.id)}
                                                value={slot.TimeStart}
                                            />
                                            <TextField
                                                label="End"
                                                type="date"
                                                size="small"
                                                fullWidth
                                                onChange={(e) => handleUpdateSlot("endDate", e.target.value, slot.id)}
                                                value={slot.TimeEnd}
                                            />
                                            <Tooltip title="Delete Slots"><IconButton onClick={() => handleSlot("Remove", slot.id)}>
                                                <Delete sx={{ color: "red" }} />
                                            </IconButton></Tooltip>

                                        </Box>

                                        <TextField
                                            placeholder="Comment description slot here ..."
                                            multiline
                                            rows={3}
                                            fullWidth
                                            onChange={(e) => handleUpdateSlot("description", e.target.value, slot.id)}
                                            value={slot.Description}
                                            sx={{ backgroundColor: "#fff", borderRadius: "8px" }}
                                        />
                                    </Card>
                                ))}
                            </Box>

                            <Box textAlign="center">
                                <Button
                                    variant="contained"
                                    size="medium"
                                    onClick={() => handleSlot("Add", "1")}
                                    startIcon={<Add />}
                                    sx={{ backgroundColor: "#263238" }}
                                >
                                    Add More Slot
                                </Button>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>



            </Grid>

            {/* Toast Notifications */}
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
        </Box>
    );


}
