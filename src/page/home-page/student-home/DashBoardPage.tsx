import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  CircularProgress,
  Tooltip, // Import Tooltip
} from "@mui/material";
import { useEffect, useState } from "react";

function DashBoardPage() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true); // Trigger animations on component load
  }, []);

  const learningPaths = [
    {
      title: "Lộ trình học Front-end",
      description:
        "Lập trình viên Front-end là người xây dựng ra giao diện websites. Trong phần này F8 sẽ chia sẻ cho bạn lộ trình để trở thành lập trình viên Front-end nhé.",
      image:
        "https://files.fullstack.edu.vn/f8-prod/learning-paths/2/63b4642136f3e.png",
      link: "/learning-paths/front-end-development",
      skills: [
        {
          img: "https://files.fullstack.edu.vn/f8-prod/courses/7/6200b81f52d83.png",
          progress: 60,
        },
        {
          img: "https://files.fullstack.edu.vn/f8-prod/courses/15/62385d6c63dfa.png",
          progress: 80,
        },
        {
          img: "https://files.fullstack.edu.vn/f8-prod/courses/1/6200ad9d8a2d8.png",
          progress: 40,
        },
        {
          img: "https://files.fullstack.edu.vn/f8-prod/courses/13/6200af9262b30.png",
          progress: 90,
        },
      ],
    },
    {
      title: "Lộ trình học Back-end",
      description:
        "Trái với Front-end thì lập trình viên Back-end là người làm việc với dữ liệu, công việc thường nặng tính logic hơn. Chúng ta sẽ cùng tìm hiểu thêm về lộ trình học Back-end nhé.",
      image:
        "https://files.fullstack.edu.vn/f8-prod/learning-paths/3/63b4641535b16.png",
      link: "/learning-paths/back-end-development",
      skills: [
        {
          img: "https://files.fullstack.edu.vn/f8-prod/courses/7/6200b81f52d83.png",
          progress: 60,
        },
        {
          img: "https://files.fullstack.edu.vn/f8-prod/courses/15/62385d6c63dfa.png",
          progress: 80,
        },
        {
          img: "https://files.fullstack.edu.vn/f8-prod/courses/1/6200ad9d8a2d8.png",
          progress: 40,
        },
        {
          img: "https://files.fullstack.edu.vn/f8-prod/courses/13/6200af9262b30.png",
          progress: 90,
        },
      ],
    },
  ];

  return (
    <Box sx={{ p: 4, textAlign: "center" }}>
      <Typography
        variant="h4"
        sx={{ fontWeight: "bold", mb: 2, color: "#242424" }}
      >
        Lộ trình học
      </Typography>
      <Typography sx={{ maxWidth: 600, mx: "auto", mb: 4, color: "#242424" }}>
        Để bắt đầu một cách thuận lợi, bạn nên tập trung vào một lộ trình học.
        Ví dụ: Để đi làm với vị trí "Lập trình viên Front-end" bạn nên tập trung
        vào lộ trình "Front-end".
      </Typography>

      <Grid container spacing={2} justifyContent="center" sx={{ mb: 4 }}>
        {learningPaths.map((path, index) => (
          <Grid
            item
            xs={12}
            sm={6}
            md={5}
            key={index}
            style={{ margin: "auto" }}
          >
            <Card
              sx={{
                p: 2,
                borderRadius: 2,
                boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                textAlign: "center",
                backgroundColor: "#fff",
                border: "1px solid #ddd",
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? "translateY(0)" : "translateY(50px)",
                transition: "opacity 0.5s ease, transform 0.5s ease",
                "&:hover": {
                  boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.2)",
                  transform: "translateY(-10px)", // Nâng thẻ lên khi hover
                  transition:
                    "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
                },
              }}
            >
              <CardContent>
                <Typography
                  variant="h6"
                  sx={{ fontWeight: "bold", mb: 1, color: "#242424" }}
                >
                  {path.title}
                </Typography>
                <Typography sx={{ mb: 2, color: "#242424" }}>
                  {path.description}
                </Typography>
                <div className="_thumb-wrap_1qw7z_39">
                  <a className="_thumb-round_1qw7z_45" href={path.link}>
                    <img
                      className="_thumb_1qw7z_39"
                      src={path.image}
                      alt={path.title}
                    />
                  </a>
                </div>

                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    gap: 0.5,
                    mb: 2,
                  }}
                >
                  {path.skills.map((skill, skillIndex) => (
                    <Box sx={{ position: "relative" }} key={skillIndex}>
                      {/* Tooltip hiển thị tiến độ */}
                      <Tooltip
                        title={`${skill.progress}% tiến độ đã hoàn thành`}
                      >
                        <span>
                          {/* Thêm span để Tooltip không bị che khuất bởi CircularProgress */}
                          <img
                            src={skill.img}
                            alt="Skill"
                            style={{
                              width: 40,
                              height: 40,
                              borderRadius: "50%",
                              objectFit: "cover",
                              border: "2px solid #ddd",
                            }}
                          />
                        </span>
                      </Tooltip>
                      <CircularProgress
                        variant="determinate"
                        value={skill.progress}
                        size={40}
                        thickness={3}
                        sx={{
                          position: "absolute",
                          top: 0,
                          left: 0,
                          zIndex: 1,
                          "& .MuiCircularProgress-circle": {
                            stroke: "#f05123",
                          },
                          "& .MuiCircularProgress-dashed": {
                            stroke: "#f05123",
                          },
                        }}
                      />
                    </Box>
                  ))}
                </Box>

                <Button variant="contained" color="primary" sx={{ mt: 1 }}>
                  Xem chi tiết
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default DashBoardPage;
