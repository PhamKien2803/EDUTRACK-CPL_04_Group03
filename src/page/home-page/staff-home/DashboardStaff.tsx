import React from "react";
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

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

// Định nghĩa kiểu dữ liệu cho thông tin thống kê
interface Statistic {
  title: string;
  value: string;
  change: string;
}

// Định nghĩa kiểu dữ liệu cho thông tin bán hàng gần đây
interface Sale {
  name: string;
  email: string;
  amount: string;
}

const DashboardStaff: React.FC = () => {
  // Dữ liệu cho các thẻ thống kê
  const statistics: Statistic[] = [
    {
      title: "Total Revenue",
      value: "$45,231.89",
      change: "+20.1% from last month",
    },
    {
      title: "Subscriptions",
      value: "+2350",
      change: "+180.1% from last month",
    },
    { title: "Sales", value: "+12,234", change: "+19% from last month" },
    { title: "Active Now", value: "+573", change: "+201 since last hour" },
  ];

  // Dữ liệu cho danh sách bán hàng gần đây
  const recentSales: Sale[] = [
    {
      name: "Olivia Martin",
      email: "olivia.martin@email.com",
      amount: "$1,999.00",
    },
    { name: "Jackson Lee", email: "jackson.lee@email.com", amount: "$39.00" },
    {
      name: "Isabella Nguyen",
      email: "isabella.nguyen@email.com",
      amount: "$299.00",
    },
    { name: "William Kim", email: "will@email.com", amount: "$99.00" },
    { name: "Sofia Davis", email: "sofia.davis@email.com", amount: "$39.00" },
  ];

  // Dữ liệu cho biểu đồ
  const barData = {
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    datasets: [
      {
        label: "Revenue",
        data: [
          1500, 1000, 3000, 2500, 2000, 3000, 4000, 6000, 1500, 2000, 2500,
          4000,
        ],
        backgroundColor: "black",
      },
    ],
  };

  const barOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  return (
    <Box sx={{ p: 3 }}>
      {/* Thống kê trên cùng */}
      <Grid container spacing={3}>
        {statistics.map((stat, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card>
              <CardContent>
                <Typography variant="h6">{stat.title}</Typography>
                <Typography variant="h4" sx={{ my: 1 }}>
                  {stat.value}
                </Typography>
                <Typography color="textSecondary">{stat.change}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Overview và Recent Sales */}
      <Grid container spacing={3} sx={{ mt: 3 }}>
        {/* Biểu đồ */}
        <Grid item xs={12} md={8}>
          <Card>
            <CardContent>
              <Typography variant="h6">Overview</Typography>
              <Box sx={{ height: 300 }}>
                <Bar data={barData} options={barOptions} />
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Recent Sales */}
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Recent Sales
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
