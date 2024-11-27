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
  const [chartData, setChartData] = useState<any>({
    labels: [],
    datasets: [],
  });
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [dataUser, setDataUser] = useState<any>([]);
  const [dataClass, setDataClass] = useState<any>([]);
  const [dataCourseSemester, setDataCourseSemester] = useState<any>([]);

  // Hàm xử lý dữ liệu API thành dữ liệu biểu đồ
  const processChartData = (data: any) => {
    const semesterCounts = data.reduce((acc: any, item: any) => {
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

  const recentSales: Sale[] = [
    {
      name: "Nguyễn Trung Nghĩa",
      email: "nghianthe170569@fpt.edu.vn",
      amount: "10",
    },
    { name: "Phạm Duy Kiên", email: "kienpdhe170155@fpt.edu.vn", amount: "10" },
    {
      name: "Do Dang Phuong",
      email: "phuongddhe173077@fpt.edu.vn",
      amount: "10",
    },
    {
      name: "Nguyen Duc Long",
      email: "longndhe171694@fpt.edu.vn",
      amount: "10",
    },
  ];

  return (
    <Box sx={{ p: 3 }}>
      <Grid container spacing={3}>
        {/* Thống kê tổng quan */}
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6">Student</Typography>
              <Typography variant="h4" sx={{ my: 1 }}>
                {dataUser.filter((user: any) => user.Role === 0).length}
              </Typography>
              <Typography color="textSecondary">10% change</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6">Lecturer</Typography>
              <Typography variant="h4" sx={{ my: 1 }}>
                {dataUser.filter((user: any) => user.Role === 1).length}
              </Typography>
              <Typography color="textSecondary">10% change</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6">Course</Typography>
              <Typography variant="h4" sx={{ my: 1 }}>
                {dataCourseSemester.length}
              </Typography>
              <Typography color="textSecondary">10% change</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6">Class</Typography>
              <Typography variant="h4" sx={{ my: 1 }}>
                {dataClass.length}
              </Typography>
              <Typography color="textSecondary">10% change</Typography>
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

        {/* Recent Sales */}
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2 }}>
                talented students
              </Typography>
              <List>
                {recentSales.map((sale, index) => (
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
