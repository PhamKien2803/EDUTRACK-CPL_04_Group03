import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getClass, getParticipantsById } from "../../../../service/ApiService";
import {
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  TextField,
  Box,
  Button,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";


interface ClassData {
  ClassID: string;
  ClassName: string;
  Student: string[]; 
  Status: boolean;
  id: string;
}

interface Participants {
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
  const [studentsInfo, setStudentsInfo] = useState<Participants[]>([]); 
  const [loading, setLoading] = useState<boolean>(true); 
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [page, setPage] = useState<number>(0); 
  const rowsPerPage = 5; 

  useEffect(() => {
    if (classId) {
      getClass()
        .then((response) => {
          const cls = response.find((item: ClassData) => item.ClassID === classId);
          setClassData(cls || null);
        })
        .catch((error) => {
          console.error("Lỗi khi lấy dữ liệu class:", error);
        });
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
              console.error("Lỗi khi lấy dữ liệu học sinh:", error);
              return null;
            }
          })
        );
        setStudentsInfo(students.filter((student) => student !== null) as Participants[]);
        setLoading(false);
      };
      fetchStudentInfo();
    }
  }, [classData]);


  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };


  const filteredStudents = studentsInfo.filter((student) =>
    student.UserName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.Age.toString().includes(searchTerm) ||
    (student.Gender ? "Male" : "Female").toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.Address.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.Email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (student.Status ? "Active" : "Inactive").toLowerCase().includes(searchTerm.toLowerCase())
  );


  const currentStudents = filteredStudents.slice(page * rowsPerPage, (page + 1) * rowsPerPage);

  const handlePrevPage = () => {
    if (page > 0) setPage(page - 1);
  };

  const handleNextPage = () => {
    if ((page + 1) * rowsPerPage < filteredStudents.length) setPage(page + 1);
  };

  if (loading) {
    return (
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
        <CircularProgress />
      </div>
    );
  }

  if (!classData) {
    return <Typography variant="h6" color="error">Không tìm thấy lớp học.</Typography>;
  }

  return (
    <Box>
      
      <Typography
        variant="h4"
        align="center"
        gutterBottom
        sx={{ marginTop: 2, fontWeight: "bold", color: "#597445" }}
      >
        Class {classData.ClassName} List
      </Typography>

      
      <Box display="flex" justifyContent="flex-end" alignItems="center" mb={2}>
        <TextField
          variant="outlined"
          size="small"
          placeholder="Search..."
          value={searchTerm}
          onChange={handleSearchChange}
          style={{ marginRight: "150px" }}
          InputProps={{
            startAdornment: <SearchIcon sx={{ marginRight: 1 }} />,
          }}
          sx={{ width: "200px" }}
        />
      </Box>

      
      <TableContainer
        component={Paper}
        sx={{
          maxWidth: "900px",
          margin: "0 auto",
          border: "1px solid lightgray",
          borderRadius: "8px",
        }}
      >
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: "#597445", color: "white" }}>
              <TableCell sx={{ color: "white" }}>ID</TableCell>
              <TableCell sx={{ color: "white" }}>Name</TableCell>
              <TableCell sx={{ color: "white" }}>Age</TableCell>
              <TableCell sx={{ color: "white" }}>Gender</TableCell>
              <TableCell sx={{ color: "white" }}>Address</TableCell>
              <TableCell sx={{ color: "white" }}>Email</TableCell>
              <TableCell sx={{ color: "white" }}>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {currentStudents.map((student) => (
              <TableRow key={student.id} hover>
                <TableCell>{student.id}</TableCell>
                <TableCell>{student.UserName}</TableCell>
                <TableCell>{student.Age}</TableCell>
                <TableCell>{student.Gender ? "Male" : "Female"}</TableCell>
                <TableCell>{student.Address}</TableCell>
                <TableCell>{student.Email}</TableCell>
                <TableCell>{student.Status ? "Active" : "Inactive"}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

     
      <Box display="flex" justifyContent="center" alignItems="center" mt={2}>
        <Button
          variant="contained"
          style={{ backgroundColor: "#597445", color: "white" }}
          onClick={handlePrevPage}
          disabled={page === 0}
          sx={{ marginRight: 1 }}
        >
          Prev
        </Button>
        <Typography variant="body1" sx={{ marginX: 2 }}>
          Page {page + 1} / {Math.ceil(filteredStudents.length / rowsPerPage)}
        </Typography>
        <Button
          variant="contained"
          style={{ backgroundColor: "#597445", color: "white" }}
          onClick={handleNextPage}
          disabled={(page + 1) * rowsPerPage >= filteredStudents.length}
        >
          Next
        </Button>
      </Box>
    </Box>
  );
};

export default StudentList;
