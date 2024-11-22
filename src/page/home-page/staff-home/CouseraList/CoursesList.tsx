import React, { useEffect, useState } from 'react';
import {
    Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography,
    InputAdornment, IconButton, Paper, Dialog, DialogActions, DialogContent, DialogTitle,
    InputLabel,
    Select,
    MenuItem,
    DialogContentText
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { getCourse, addCourse, updateCourse, deleteCourse } from '../../../../service/ApiService';

interface Course {
    id: string;
    CourseName: string;
    Status: boolean;
}

const CouseraList: React.FC = () => {
    const [courses, setCourses] = useState<Course[]>([]);
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [openAddDialog, setOpenAddDialog] = useState(false);
    const [openEditDialog, setOpenEditDialog] = useState(false);
    const [currentCourse, setCurrentCourse] = useState<Course | null>(null); // Khóa học hiện tại để chỉnh sửa
    const [newCourse, setNewCourse] = useState<Course>({
        id: '',
        CourseName: '',
        Status: true,
    });

    useEffect(() => {
        getCourse()
            .then((response: Course[]) => {
                const filteredCourses = response.filter((course) => course.Status === true);
                setCourses(filteredCourses);
            })
            .catch((error) => {
                console.error("Error fetching courses:", error);
            });
    }, []);

    const handleOpenAddDialog = () => setOpenAddDialog(true);
    const handleCloseAddDialog = () => setOpenAddDialog(false);

    const handleOpenEditDialog = (course: Course) => {
        setCurrentCourse(course);
        setOpenEditDialog(true);
    };
    const handleCloseEditDialog = () => setOpenEditDialog(false);

    const handleAddCourse = async () => {
        try {
            await addCourse(newCourse);
            setCourses([...courses, newCourse]);
            handleCloseAddDialog();
        } catch (error) {
            console.error("Error adding course:", error);
        }
    };

    const handleUpdateCourse = async () => {
        if (!currentCourse) return;
        try {
            await updateCourse(currentCourse.id, currentCourse); // Gọi API để cập nhật
            setCourses(courses.map(course => (course.id === currentCourse.id ? currentCourse : course)));
            handleCloseEditDialog();
        } catch (error) {
            console.error("Error updating course:", error);
        }
    };

    const handleDeleteCourse = async (id: string) => {
        if (window.confirm("Are you sure you want to delete this course?")) {
            try {
                await deleteCourse(id); // Gọi API để xóa
                setCourses(courses.filter(course => course.id !== id));
            } catch (error) {
                console.error("Error deleting course:", error);
            }
        }
    };

    const filteredCourses = courses.filter(course =>
        course.CourseName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div>
            {/* TableContainer */}
            <TableContainer component={Paper} elevation={3} style={{ borderRadius: "10px" }}>
                <div style={{ textAlign: "center", marginBottom: "30px" }}>
                    <Typography variant="h4" style={{ fontWeight: "bold" }}>List of Courses</Typography>
                </div>

                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "20px" }}>
                    <TextField
                        fullWidth
                        placeholder="Search Courses"
                        variant="outlined"
                        size="small"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchIcon />
                                </InputAdornment>
                            ),
                        }}
                    />

                    <Button variant="contained" onClick={handleOpenAddDialog} style={{ marginLeft: "10px" }}>
                        Add Course
                    </Button>
                </div>

                {/* Table */}
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>STT</TableCell>
                            <TableCell>ID</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredCourses.map((course, index) => (
                            <TableRow key={course.id}>
                                <TableCell>{index + 1}</TableCell>
                                <TableCell>{course.id}</TableCell>
                                <TableCell>{course.CourseName}</TableCell>
                                <TableCell>{course.Status ? "Active" : "Inactive"}</TableCell>
                                <TableCell>
                                    <IconButton onClick={() => handleOpenEditDialog(course)} color="primary">
                                        <EditIcon />
                                    </IconButton>
                                    <IconButton onClick={() => handleDeleteCourse(course.id)} color="error">
                                        <DeleteIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* Add Course Dialog */}
            <Dialog open={openAddDialog} onClose={handleCloseAddDialog}>
                <DialogTitle>Add New Course</DialogTitle>
                <DialogContent>
                    <TextField
                        fullWidth
                        margin="dense"
                        label="ID"
                        value={newCourse.id}
                        onChange={(e) => setNewCourse({ ...newCourse, id: e.target.value })}
                    />
                    <TextField
                        fullWidth
                        margin="dense"
                        label="Course Name"
                        value={newCourse.CourseName}
                        onChange={(e) => setNewCourse({ ...newCourse, CourseName: e.target.value })}
                    />
                    <InputLabel>Status</InputLabel>
                    <Select
                        value={newCourse.Status ? "true" : "false"}
                        onChange={(e) => setNewCourse({ ...newCourse, Status: e.target.value === "true" })}
                    >
                        <MenuItem value="true">Active</MenuItem>
                        <MenuItem value="false">Inactive</MenuItem>
                    </Select>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseAddDialog}>Cancel</Button>
                    <Button onClick={handleAddCourse} variant="contained">Save</Button>
                </DialogActions>
            </Dialog>

            {/* Edit Course Dialog */}
            <Dialog open={openEditDialog} onClose={handleCloseEditDialog}>
                <DialogTitle>Edit Course</DialogTitle>
                <DialogContent>
                    <TextField
                        fullWidth
                        margin="dense"
                        label="ID"
                        value={currentCourse?.id || ''}
                        disabled
                    />
                    <TextField
                        fullWidth
                        margin="dense"
                        label="Course Name"
                        value={currentCourse?.CourseName || ''}
                        onChange={(e) =>
                            setCurrentCourse(currentCourse ? { ...currentCourse, CourseName: e.target.value } : null)
                        }
                    />
                    <InputLabel>Status</InputLabel>
                    <Select
                        value={currentCourse?.Status ? "true" : "false"}
                        onChange={(e) =>
                            setCurrentCourse(currentCourse ? { ...currentCourse, Status: e.target.value === "true" } : null)
                        }
                    >
                        <MenuItem value="true">Active</MenuItem>
                        <MenuItem value="false">Inactive</MenuItem>
                    </Select>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseEditDialog}>Cancel</Button>
                    <Button onClick={handleUpdateCourse} variant="contained">Save</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default CouseraList;
