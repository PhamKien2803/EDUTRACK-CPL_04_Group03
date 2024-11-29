import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import axios from "axios";
import { deleteStudentinClass, getClass, getParticipantsById, updateClassStudents } from "../../../../service/ApiService";
import { Box, Grid, IconButton, Pagination, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tooltip, Typography, useTheme } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import Swal from "sweetalert2";
import DeleteIcon from '@mui/icons-material/Delete';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import DoNotDisturbOnIcon from '@mui/icons-material/DoNotDisturbOn';
import { useNavigate } from "react-router-dom";
import ReplyAllIcon from '@mui/icons-material/ReplyAll';
const ITEMS_PER_PAGE = 5; // Số học sinh mỗi trang

interface ClassData {
  ClassID: string;
  ClassName: string;
  Student: string[];
  Status: boolean;
  id: string;
}

interface Participant {
  id: string;
  UserName: string;
  Age: number;
  Gender: boolean;
  Address: string;
  Email: string;
  Password: string;
  Image: string;
  Role: number;
  isOnline: boolean;
  Status: boolean;
}
const StudentList: React.FC = () => {
  const { classId } = useParams<{ classId: string }>();
  const [classData, setClassData] = useState<ClassData | null>(null);
  const [studentsInfo, setStudentsInfo] = useState<Participant[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [allParticipants, setAllParticipants] = useState<Participant[]>([]);
  const [selectedStudent, setSelectedStudent] = useState<Participant | null>(null);
  const [searchText, setSearchText] = useState<string>(""); // Giá trị tìm kiếm
  const [currentPage, setCurrentPage] = useState<number>(1); // Trang hiện tại
  const navigate = useNavigate();

  useEffect(() => {
    if (classId) {
      getClass()
        .then((response) => {
          const cls = response.find((item: ClassData) => item.ClassID === classId);
          setClassData(cls || null);
        })
        .catch((error) => console.error("Error fetching class:", error));
    }
  }, [classId]);

  useEffect(() => {
    if (classData) {
      const fetchStudentInfo = async () => {
        const students = await Promise.all(
          classData.Student.map(async (studentId) => {
            try {
              const student = await getParticipantsById(studentId);
              return student;
            } catch (error) {
              console.error("Error fetching student info:", error);
              return null;
            }
          })
        );
        setStudentsInfo(students.filter((student) => student !== null) as Participant[]);
        setLoading(false);
      };
      fetchStudentInfo();
    }
  }, [classData]);

  useEffect(() => {
    axios
      .get("/Participants")
      .then((response) => {
        if (Array.isArray(response.data)) {
          const filteredParticipants = response.data.filter(
            (participant: Participant) =>
              participant.Role === 0 &&
              !(classData?.Student.includes(participant.id))
          );
          setAllParticipants(filteredParticipants);
        } else {
          setAllParticipants([]);
        }
      })
      .catch((error) => console.error("Error fetching participants:", error));
  }, [classData]);

  const handleAddStudent = () => {
    if (selectedStudent && classData) {
      if (!classData.Student.includes(selectedStudent.id)) {
        const updatedStudents = [...classData.Student, selectedStudent.id];
        updateClassStudents(classData.id, updatedStudents)
          .then(() => {
            setClassData({ ...classData, Student: updatedStudents });
            setStudentsInfo([...studentsInfo, selectedStudent]);
            setSelectedStudent(null);


            Swal.fire({
              icon: 'success',
              title: 'Add student successfully!',
              text: `Student ${selectedStudent.UserName} have been added to the class.`,
              confirmButtonText: 'OK'
            });
          })
          .catch((error) => {
            console.log(error);
            Swal.fire({
              icon: 'error',
              title: 'Add student failed!',
              text: 'There was an error adding the student.',
              confirmButtonText: 'OK'
            });
          });
      } else {

        Swal.fire({
          icon: 'warning',
          title: 'Student already in class!',
          text: 'Student is already in the class.',
          confirmButtonText: 'OK'
        });
      }
    }
  };

  const handleRemoveStudent = (studentId: string) => {
    if (!classData) return;

    const updatedStudents = classData.Student.filter((id) => id !== studentId);
    const updatedClass = { ...classData, Student: updatedStudents };

    deleteStudentinClass(classData.id, updatedClass)
      .then(() => {
        setClassData(updatedClass);
        setStudentsInfo(studentsInfo.filter((student) => student.id !== studentId));


        Swal.fire({
          icon: 'success',
          title: 'Remove student successfully!',
          text: 'Student has been removed from the class.',
          confirmButtonText: 'OK'
        });
      })
      .catch((error) => {
        console.log(error);
        Swal.fire({
          icon: 'error',
          title: 'Remove student failed!',
          text: 'There was an error removing the student.',
          confirmButtonText: 'OK'
        });
      });
  };
  const filteredStudents = studentsInfo.filter(
    (student) =>
      student.UserName.toLowerCase().includes(searchText.toLowerCase()) ||
      student.id.toLowerCase().includes(searchText.toLowerCase())
  );

  const totalPages = Math.ceil(filteredStudents.length / ITEMS_PER_PAGE);
  const currentStudents = filteredStudents.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const theme = useTheme();
  const isDarkMode = theme.palette.mode === 'dark';

  if (loading) return <p>Loading...</p>;
  if (!classData) return <p>No find class</p>;

  return (
    <Box
      sx={{
        padding: 4,
        bgcolor: isDarkMode ? '#121212' : '#f5f5f5',
        color: isDarkMode ? '#e0e0e0' : '#000',
        minHeight: '100vh',
      }}
    >
      <Grid item>
        <Button
          startIcon={<ReplyAllIcon />}
          onClick={() => navigate("/staff/manage_class")}
          variant="outlined"
          color="primary"
        >
          Back
        </Button>
      </Grid>
      {/* Header */}
      <Typography
        variant="h4"
        align="center"
        style={{
          textAlign: "center",
          color: "inherit",
          fontFamily: "'Roboto', sans-serif",
          fontWeight: "700",
          fontSize: "36px",
          letterSpacing: "1.5px",
          textTransform: "uppercase",
          margin: "10px 0",
          padding: "5px",
          position: "relative",
        }}
        sx={(theme) => ({
          color: theme.palette.mode === 'dark' ? 'white' : 'black',
        })}
      >
        Class {classData.ClassName}
      </Typography>

      {/* Search and Add Section */}
      <Grid container spacing={3} sx={{ marginBottom: 3, alignItems: 'center' }}>
        {/* Search */}
        <Grid item xs={12} sm={6}>
          <TextField
            variant="standard"
            label="Search student"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            InputProps={{
              endAdornment: (
                <IconButton>
                  <SearchIcon />
                </IconButton>
              ),
            }}
            sx={{
              bgcolor: isDarkMode ? '#1e1e1e' : '#fff',
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: isDarkMode ? '#90caf9' : '#1976d2',
                },
              },
            }}
          />
        </Grid>

        {/* Autocomplete */}
        <Grid item xs={12} sm={6} md={4}>
          <Autocomplete
            options={allParticipants || []}
            getOptionLabel={(option) => `${option.id} - ${option.UserName}`}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Select student to add"
                variant="outlined"
                sx={{
                  bgcolor: isDarkMode ? '#1e1e1e' : '#fff',
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                      borderColor: isDarkMode ? '#90caf9' : '#1976d2',
                    },
                  },
                }}
              />
            )}
            value={selectedStudent}
            onChange={(_, newValue) => setSelectedStudent(newValue)}
          />
        </Grid>

        <Grid item xs={12} sm={6} md={2}>
          <Button
            fullWidth
            variant="contained"
            onClick={handleAddStudent}
            size="large"
            sx={{
              height: '100%',
              bgcolor: isDarkMode
                ? 'linear-gradient(45deg, #90caf9 30%, #42a5f5 90%)'
                : 'linear-gradient(45deg, #1976d2 30%, #42a5f5 90%)',
              color: '#fff',
              borderRadius: '8px',
              fontWeight: 'bold',
              textTransform: 'capitalize',
              boxShadow: isDarkMode
                ? '0px 4px 8px rgba(144, 202, 249, 0.4)'
                : '0px 4px 8px rgba(25, 118, 210, 0.4)',
              transition: 'all 0.3s ease',
              '&:hover': {
                bgcolor: isDarkMode
                  ? 'linear-gradient(45deg, #42a5f5 30%, #90caf9 90%)'
                  : 'linear-gradient(45deg, #42a5f5 30%, #1976d2 90%)',
                boxShadow: '0px 6px 12px rgba(0, 0, 0, 0.2)',
                transform: 'scale(1.05)',
              },
              '&:active': {
                transform: 'scale(0.98)',
              },
            }}
          >
            Add Students
          </Button>
        </Grid>

      </Grid>

      <TableContainer
        component={Paper}
        elevation={3}
        sx={{
          maxWidth: '90%',
          margin: 'auto',
          overflow: 'hidden',
          bgcolor: isDarkMode ? '#1e1e1e' : '#fff',
          borderRadius: '8px',
          border: `1px solid ${isDarkMode ? '#383850' : '#DADCE0'}`,
        }}
      >
        <Table>
          {/* Header Section */}
          <TableHead>
            <TableRow>
              {['Action', 'ID', 'Name', 'Age', 'Gender', 'Address', 'Email', 'Status'].map(
                (header) => (
                  <TableCell
                    key={header}
                    align="center"
                    sx={{
                      backgroundColor: isDarkMode ? '#2C2C3E' : '#2C3E50',
                      color: '#FFFFFF',
                      fontWeight: 600,
                      fontSize: '14px',
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px',
                      borderBottom: `1px solid ${isDarkMode ? '#383850' : '#DADCE0'}`,
                    }}
                  >
                    {header}
                  </TableCell>
                )
              )}
            </TableRow>
          </TableHead>

          {/* Body Section */}
          <TableBody>
            {currentStudents.map((student) => (
              <TableRow
                key={student.id}
                sx={{
                  '&:nth-of-type(odd)': {
                    bgcolor: isDarkMode ? '#2A2A3C' : '#F4F6F8',
                  },
                  '&:nth-of-type(even)': {
                    bgcolor: isDarkMode ? '#24242F' : '#FFFFFF',
                  },
                  '&:hover': {
                    bgcolor: isDarkMode ? '#31313F' : '#E9ECEF',
                    transition: 'background-color 0.3s ease-in-out',
                  },
                }}
              >
                <TableCell>
                  <Tooltip title="Remove Student">
                    <IconButton
                      color="error"
                      onClick={() => handleRemoveStudent(student.id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>
                </TableCell>
                <TableCell>{student.id}</TableCell>
                <TableCell>{student.UserName}</TableCell>
                <TableCell>{student.Age}</TableCell>
                <TableCell>{student.Gender ? 'Male' : 'Female'}</TableCell>
                <TableCell>{student.Address}</TableCell>
                <TableCell>{student.Email}</TableCell>
                <TableCell>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      padding: '4px 10px',
                      borderRadius: '16px',
                      color: '#fff',
                      fontWeight: 'bold',
                      textTransform: 'uppercase',
                      fontSize: '12px',
                      bgcolor: student.Status ? '#4caf50' : '#f44336',
                      gap: 1,
                    }}
                  >
                    {student.Status ? (
                      <>
                        <CheckCircleIcon fontSize="small" />
                        Active
                      </>
                    ) : (
                      <>
                        <DoNotDisturbOnIcon fontSize="small" />
                        Inactive
                      </>
                    )}
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pagination Section */}
      <Box
        sx={{
          marginTop: 4,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Pagination
          count={totalPages}
          page={currentPage}
          onChange={(_, value) =>
            value > currentPage ? handleNextPage() : handlePrevPage()
          }
          color="primary"
          sx={{
            '& .MuiPaginationItem-root': {
              color: isDarkMode ? '#90caf9' : '#1976d2',
            },
          }}
        />
      </Box>
    </Box>
  );
};

export default StudentList;
