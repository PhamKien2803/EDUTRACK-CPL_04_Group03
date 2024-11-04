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
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import Carousel from "react-bootstrap/Carousel";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  getCourseSemesterByUserId,
  getSemester,
} from "../../../service/ApiService";

import dataCarousel from "../../../../database.json";

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

export default function Subject() {
  const navigate = useNavigate();
  const [data, setData] = useState<CourseSemester[]>([]);
  const [dataSemester, setDataSemester] = useState<Semester[]>([]);
  const [semesterId, setSemesterId] = useState<string>("");

  const navigateToLession = () => {
    navigate("/lession-course");
  }

  // const account = useSelector((state) => state.account.account);
  // const isAuthenticated = useSelector((state) => state.account.isAuthenticated);

  // console.log(account);
  // console.log(isAuthenticated);

  useEffect(() => {
    fetchCourseSemester();
    fetchDataSemester();
  }, [semesterId]);

  const fetchCourseSemester = async () => {
    const res = await getCourseSemesterByUserId("he173077");
    if (Array.isArray(res)) {
      if (semesterId) {
        const datas = res.filter((item) => item.SemesterID === semesterId);
        console.log("data", datas);
      } else {
        setData(res);
      }
    }
  };

  const fetchDataSemester = async () => {
    const res = await getSemester();
    if (Array.isArray(res)) {
      setSemesterId(res[res.length - 1].SemesterID);
      setDataSemester(res);
    }
  };

  // console.log(semesterId);

  // const handleSubjectClick = () => {
  //   navigate("/lession-course");
  // };

  return (
    <Box
      sx={{
        flexGrow: 1,
        p: 4,
        width: { sm: `calc(100% - ${65}px)` },
        ml: { sm: `${65}px` },
      }}
    >
      <Carousel
        interval={3000}
        indicators={true}
        controls={true}
        style={{
          borderRadius: "12px",
          overflow: "hidden",
          width: "85%",
          margin: "0 auto",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {dataCarousel.Carousel.map((item) => (
          <Carousel.Item key={item?.id}>
            <Box
              sx={{
                backgroundColor: "white",
                color: "white",
                padding: "15px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "100%",
              }}
            >
              <Box>
                <img
                  src={item.image}
                  alt="image"
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </Box>
            </Box>
          </Carousel.Item>
        ))}
      </Carousel>

      <Typography variant="h5" sx={{ mt: 5, mb: 3, fontWeight: 600 }}>
        Course
      </Typography>
      <Box sx={{ minWidth: 120 }}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Year</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="year"
            sx={{ width: "100%", maxWidth: "200px", marginBottom: "30px" }} // Adjusted to make the select box smaller
            defaultValue="summer 2024"
          >
            <MenuItem value="summer 2024" selected>
              Summer 2024
            </MenuItem>
            <MenuItem value="summer 2023">Summer 2023</MenuItem>
            <MenuItem value="summer 2022">Summer 2022</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <Grid container spacing={2} justifyContent="center">
        {data?.map((subject) => (
          <Grid item xs={12} sm={6} md={3} key={subject.id} sx={{ p: 1.5 }}>
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
                src={
                  "https://ippeducation.vn/wp-content/uploads/2022/10/23.jpg"
                }
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
                  {subject.ClassID}
                </Typography>
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
                  {subject.CourseID}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
