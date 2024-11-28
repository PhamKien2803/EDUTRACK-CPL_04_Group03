import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import axios from "axios";
import { deleteStudentinClass, getClass, getParticipantsById, updateClassStudents } from "../../../../service/ApiService";
import { Box, Grid, InputAdornment, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import Swal from "sweetalert2";
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

  if (loading) return <p>Loading...</p>;
  if (!classData) return <p>No find class</p>;

  return (
    <div>
      <h2 style={{ textAlign: 'center', marginBottom: '20px', marginTop: '20px' }}>Class {classData.ClassName}</h2>
  
     
      <Grid item xs={12} sm={6} md={4} style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <TextField
          label="Enter name student to search"
          variant="outlined"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          style={{
            width: '35%',
            marginRight: '90px', 
          }}
        />
      </Grid>
  
     
      <Grid container spacing={2} alignItems="center" style={{ marginBottom: "20px", maxWidth: '1200px' }}>
        
        <Grid item xs={12} sm={6} md={4} style={{ marginLeft: '80px' }}>
          <Autocomplete
            options={allParticipants || []}
            getOptionLabel={(option) => `${option.id} - ${option.UserName}`}
            renderInput={(params) => <TextField {...params} label="Select student to add in class" />}
            value={selectedStudent}
            onChange={(_, newValue) => setSelectedStudent(newValue)}
            fullWidth
          />
        </Grid>
  
       
        <Grid item xs={12} sm={6} md={4} style={{ display: 'flex', justifyContent: 'flex-start' }}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleAddStudent}
            style={{height: '50px'}}
          >
            Add Student
          </Button>
        </Grid>
      </Grid>
  
      
      <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
        <TableContainer component={Paper} style={{ marginTop: "20px", maxWidth: "85%" }}>
          <Table size="small">
            <TableHead>
              <TableRow>
              <TableCell style={{ width: '10%' }}>Action</TableCell>
                <TableCell style={{ width: '10%' }}>ID</TableCell>
                <TableCell style={{ width: '20%' }}>Name</TableCell>
                <TableCell style={{ width: '10%' }}>Age</TableCell>
                <TableCell style={{ width: '10%' }}>Gender</TableCell>
                <TableCell style={{ width: '20%' }}>Address</TableCell>
                <TableCell style={{ width: '20%' }}>Email</TableCell>
                <TableCell style={{ width: '10%' }}>Status</TableCell>
                
              </TableRow>
            </TableHead>
            <TableBody>
              {currentStudents.map((student) => (
                <TableRow key={student.id}>
                  <TableCell>
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={() => handleRemoveStudent(student.id)}
                      size="small"
                    >
                      Delete
                    </Button>
                  </TableCell>
                  <TableCell>{student.id}</TableCell>
                  <TableCell>{student.UserName}</TableCell>
                  <TableCell>{student.Age}</TableCell>
                  <TableCell>{student.Gender ? "Nam" : "Nữ"}</TableCell>
                  <TableCell>{student.Address}</TableCell>
                  <TableCell>{student.Email}</TableCell>
                  <TableCell>{student.Status ? "Active" : "Inactive"}</TableCell>
                  
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
  
      <Box sx={{ marginTop: "20px", display: "flex", justifyContent: "center", alignItems: "center" }}>
       
        <Button variant="contained" disabled={currentPage === 1} onClick={handlePrevPage}>
          Prev
        </Button>
  
    
        <Typography sx={{ margin: "0 20px" }}>
          Page {currentPage} / {totalPages}
        </Typography>
  
       
        <Button variant="contained" disabled={currentPage === totalPages} onClick={handleNextPage}>
          Next
        </Button>
      </Box>
    </div>
  );
  
  
  
};

export default StudentList;
