import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  IconButton,
  InputAdornment,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { Link } from "react-router-dom";
import { useState } from "react";

import { useSelector } from "react-redux";
import {
  getCourse,
  getCourseSemesterByLecturersID,
  getSemester,
} from "../../../service/ApiService";
import { useEffect } from "react";

interface CourseSemester {
  id: string;
  SemesterID: string;
  SlotID: string[];
  CourseID: string;
  StudentID: string;
  LecturersID: string;
  ClassID: string;
}

interface Semester {
  SemesterID: string;
  SemesterName: string;
  StartDate: string;
  EndDate: string;
  Status: boolean;
}

interface course {
  id: string;
  CourseName: string;
  Status: boolean;
}
// Mock data with multiple courses

function LecturersHomePage() {
  const [data, setData] = useState<CourseSemester[]>([]);
  const [semesterId, setSemesterId] = useState<string>("");
  const [dataSemester, setDataSemester] = useState<Semester[]>([]);
  const [dataCourse, setDataCourse] = useState<course[]>([]);

  const account = useSelector((state: any) => state.account.account);
  // const isAuthenticated = useSelector(
  //   (state: any) => state.account.isAuthenticated
  // );

  // console.log(account);

  useEffect(() => {
    fetchCourse();
    fetchDataSemester();
  }, []);

  useEffect(() => {
    if (semesterId) fetchCourseSemester();
  }, [semesterId]);
  const fetchCourseSemester = async () => {
    const res = await getCourseSemesterByLecturersID(account.UserID);
    if (Array.isArray(res)) {
      const filteredData = res.filter((item) => item.SemesterID === semesterId);
      setData(filteredData);
    }
  };

  console.log(data);

  const fetchDataSemester = async () => {
    const res = await getSemester();
    if (Array.isArray(res) && res.length > 0) {
      const latestSemesterId = res[res.length - 1].SemesterID;
      setSemesterId(latestSemesterId);
      setDataSemester(res);
    }
  };

  // console.log(semesterId);

  const fetchCourse = async () => {
    const res = await getCourse();
    if (Array.isArray(res) && res.length > 0) {
      setDataCourse(res);
    }
  };

  console.log(dataCourse);

  return (
    <div>
      <Box
        sx={{
          flexGrow: 1,
          p: 4,
          width: { sm: `calc(100% - ${65}px)` },
          ml: { sm: `${65}px` },
        }}
      >
        <Typography variant="h5" sx={{ mt: 5, mb: 3, fontWeight: 600 }}>
          Course
        </Typography>
        <Box sx={{ minWidth: 120, mb: 2 }}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Semester</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Semester"
              sx={{ width: "100%", maxWidth: "200px", marginBottom: "30px" }}
              defaultValue="fall2024"
            >
              <MenuItem value="fall2024">Fall 2024</MenuItem>
              <MenuItem value="summer2024">Summer 2024</MenuItem>
              <MenuItem value="fall2023">Fall 2023</MenuItem>
              <MenuItem value="summer2023">Summer 2023</MenuItem>
            </Select>
          </FormControl>
        </Box>
        {/* Smaller search bar */}
        <TextField
          label="Search by Course ID"
          variant="outlined"
          sx={{ mb: 2, maxWidth: "300px" }}
          // value={searchTerm}
          // onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton aria-label="search">
                  <SearchIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <Grid container spacing={2} justifyContent="center">
          {data.map((course) => (
            <Grid item xs={12} sm={6} md={3} key={course.id} sx={{ p: 1.5 }}>
              <Card
                sx={{
                  height: 180,
                  maxWidth: 250,
                  display: "flex",
                  flexDirection: "column",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    transform: "translateY(-5px)",
                    boxShadow: "0 8px 16px rgba(0,0,0,0.1)",
                    bgcolor: "primary.light",
                    "& .MuiTypography-root": {
                      color: "white",
                    },
                  },
                  borderRadius: 2,
                  cursor: "pointer",
                  border: "1px solid #e0e0e0",
                  margin: "0 auto",
                }}
              >
                <Box
                  component="img"
                  src="https://ippeducation.vn/wp-content/uploads/2022/10/23.jpg"
                  sx={{
                    height: 80,
                    width: "100%",
                    objectFit: "cover",
                    borderTopLeftRadius: 12,
                    borderTopRightRadius: 12,
                  }}
                />
                <CardContent
                  sx={{
                    flexGrow: 1,
                    p: 1,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    textAlign: "center",
                  }}
                >
                  <Typography
                    variant="h6"
                    component="h2"
                    sx={{
                      fontWeight: 500,
                      fontSize: "0.85rem",
                      lineHeight: 1.3,
                      maxHeight: "2.8em",
                      overflow: "hidden",
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                      mb: 0.5,
                    }}
                  >
                    {course.CourseID}
                  </Typography>
                  <Link to={`/lession-course?subjectId=${course.id}`}>
                    <Typography
                      variant="body1"
                      sx={{
                        fontSize: "0.9rem",
                        fontWeight: "600",
                        color: "primary.main",
                        p: 0.5,
                        borderRadius: 1,
                        bgcolor: "rgba(25, 118, 210, 0.08)",
                      }}
                    >
                      {dataCourse[0].CourseName}
                    </Typography>
                  </Link>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </div>
  );
}

export default LecturersHomePage;
