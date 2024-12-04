import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@mui/material";
import PeopleIcon from '@mui/icons-material/People';
import ContactEmergencyIcon from '@mui/icons-material/ContactEmergency';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import ClassIcon from '@mui/icons-material/Class';
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import {
  getClass,
  getCourseSemester,
  getParticipants,
} from "../../../service/ApiService";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface Sale {
  name: string;
  email: string;
  amount: string;
}

const DashboardStaff: React.FC = () => {
  interface ChartData {
    labels: string[];
    datasets: {
      label: string;
      data: number[];
      backgroundColor: string;
      borderColor: string;
      borderWidth: number;
    }[];
  }

  const [chartData, setChartData] = useState<ChartData>({
    labels: [],
    datasets: [],
  });
  const [isLoading, setIsLoading] = useState<boolean>(true);
  interface User {
    Role: number;
  }

  const [dataUser, setDataUser] = useState<User[]>([]);
  interface Class {
    id: number;
    name: string;
  }

  const [dataClass, setDataClass] = useState<Class[]>([]);
  const [dataCourseSemester, setDataCourseSemester] = useState<CourseSemester[]>([]);

  // Hàm xử lý dữ liệu API thành dữ liệu biểu đồ
  interface CourseSemester {
    SemesterID: number;
  }

  const processChartData = (data: CourseSemester[]) => {
    const semesterCounts = data.reduce((acc: { [key: number]: number }, item: CourseSemester) => {
      acc[item.SemesterID] = (acc[item.SemesterID] || 0) + 1;
      return acc;
    }, {});

    const labels = Object.keys(semesterCounts);
    const counts = Object.values(semesterCounts);

    return {
      labels: labels,
      datasets: [
        {
          label: "Number of Courses",
          data: counts,
          backgroundColor: "orange",
          borderColor: "rgba(75, 192, 192, 1)",
          borderWidth: 1,
        },
      ],
    };
  };

  // Hàm gọi API và cập nhật dữ liệu
  const fetchCourseSemesterData = async () => {
    try {
      const data = await getCourseSemester();
      const formattedData = processChartData(data);
      setChartData(formattedData);
    } catch (error) {
      console.error("Error fetching course semester data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCourseSemesterData();
    fetchDataUser();
    fetchDataClass();
    fetchDataCourseSemester();
  }, []);

  const fetchDataUser = async () => {
    const res = await getParticipants();
    if (Array.isArray(res) && res.length > 0) {
      setDataUser(res);
    }
  };

  const fetchDataClass = async () => {
    const res = await getClass();
    if (Array.isArray(res) && res.length > 0) {
      setDataClass(res);
    }
  };

  const fetchDataCourseSemester = async () => {
    const res = await getCourseSemester();
    if (Array.isArray(res) && res.length > 0) {
      setDataCourseSemester(res);
    }
  };

  const barOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
      },
    },
  };

  const TopStudent: Sale[] = [
    {
      name: "Nguyễn Trung Nghĩa",
      email: "nghianthe170569@fpt.edu.vn",
      amount: "10",
    },
    { name: "Phạm Duy Kiên", email: "kienpdhe170155@fpt.edu.vn", amount: "9.9" },
    {
      name: "Do Dang Phuong",
      email: "phuongddhe173077@fpt.edu.vn",
      amount: "9.8",
    },
    {
      name: "Nguyen Duc Long",
      email: "longndhe171694@fpt.edu.vn",
      amount: "9.75",
    },
  ];

  return (
    <Box sx={{ p: 3 }}>


      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{
            transition: "transform 0.3s, box-shadow 0.3s",
            "&:hover": {
              transform: "scale(1.05)",
              boxShadow: "0 4px 20px rgba(128, 0, 128, 0.5)",
            },
          }}>
            <CardContent>
              <PeopleIcon sx={{ color: "red" }} />
              <Typography variant="h6">Student</Typography>
              <Typography variant="h4" sx={{ my: 1 }}>
                {dataUser.filter((user: User) => user.Role === 0).length}
              </Typography>
              <Typography color="textSecondary"></Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{
            transition: "transform 0.3s, box-shadow 0.3s",
            "&:hover": {
              transform: "scale(1.05)",
              boxShadow: "0 4px 20px rgba(128, 0, 128, 0.5)",
            },
          }} >
            <CardContent>
              <ContactEmergencyIcon sx={{ color: "purple" }} />
              <Typography variant="h6">Lecturer</Typography>
              <Typography variant="h4" sx={{ my: 1 }}>
                {dataUser.filter((user: User) => user.Role === 1).length}
              </Typography>
              <Typography color="textSecondary"></Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{
            transition: "transform 0.3s, box-shadow 0.3s",
            "&:hover": {
              transform: "scale(1.05)",
              boxShadow: "0 4px 20px rgba(128, 0, 128, 0.5)",
            },
          }} >
            <CardContent>
              <AnalyticsIcon sx={{ color: "green" }} />
              <Typography variant="h6">Course</Typography>
              <Typography variant="h4" sx={{ my: 1 }}>
                {dataCourseSemester.length}
              </Typography>
              <Typography color="textSecondary"></Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{
            transition: "transform 0.3s, box-shadow 0.3s",
            "&:hover": {
              transform: "scale(1.05)",
              boxShadow: "0 4px 20px rgba(128, 0, 128, 0.5)",
            },
          }} >
            <CardContent>
              <ClassIcon sx={{ color: "blue" }} />
              <Typography variant="h6">Class</Typography>
              <Typography variant="h4" sx={{ my: 1 }}>
                {dataClass.length}
              </Typography>
              <Typography color="textSecondary"></Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>



      <Grid container spacing={3} sx={{ mt: 3 }}>
        {/* Biểu đồ */}
        <Grid item xs={12} md={8}>
          <Card>
            <CardContent>
              <Typography variant="h6">Courses by Semester</Typography>
              {isLoading ? (
                <Typography>Loading...</Typography>
              ) : chartData.labels.length === 0 ||
                chartData.datasets.length === 0 ? (
                <Typography>No data available</Typography>
              ) : (
                <Box sx={{ height: 300 }}>
                  <Bar data={chartData} options={barOptions} />
                </Box>
              )}
            </CardContent>
          </Card>
        </Grid>

        {/* Danh sách học sinh */}
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Talented students
              </Typography>
              <List>
                {TopStudent.map((sale, index) => (
                  <ListItem key={index} divider>
                    <ListItemAvatar>
                      <Avatar>{sale.name[0]}</Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={sale.name} secondary={sale.email} />
                    <Typography variant="body2" color="textPrimary">
                      {sale.amount}
                    </Typography>
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default DashboardStaff;
