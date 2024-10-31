import { Box, Card, CardContent, Typography, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Carousel from 'react-bootstrap/Carousel';

interface Subject {
  id?: number;
  name?: string;
  code?: string;
  image?: string; 
}

interface Image{
  id?: number;
  image?: string;
}

const subjects: Subject[] = [
  {
    id: 1,
    name: "Mathematics for Computing",
    code: "MAS291",
    image: "https://d1e4pidl3fu268.cloudfront.net/2f9c984e-4c8c-47ca-a9a5-e25342688410/RobotMathwithText.png",
  },
  {
    id: 2,
    name: "Software Development Project",
    code: "SWP391",
    image: "https://waydev.co/wp-content/uploads/2021/07/Effective-Software-Development-Projects.png",
  },
];

const imageCarousel: Image[] = [
  {
    id: 1,
    image: "https://www.shutterstock.com/image-vector/investment-education-concept-web-banner-260nw-1944889492.jpg",
  },
  {
    id: 2,
    image: "https://www.shutterstock.com/image-vector/investment-education-concept-web-banner-260nw-1944889492.jpg",
  },
  {
    id: 3,
    image: "https://www.shutterstock.com/image-vector/investment-education-concept-web-banner-260nw-1944889492.jpg",
  },
];

export default function Subject() {
  const navigate = useNavigate();

  const handleSubjectClick = () => {
    navigate("/lesson-course");
  };

  return (
    <Box
      sx={{
        flexGrow: 1,
        p: 4,
        width: { sm: `calc(100% - ${65}px)` },
        ml: { sm: `${65}px` },
      }}
    >
      {/* Bootstrap Carousel */}
      <Carousel interval={3000} indicators={true} controls={true} style={{ borderRadius: "12px", overflow: "hidden" }}>
        {imageCarousel.map((image) => (
          <Carousel.Item key={image.id}>
            <Box
              sx={{
                backgroundColor: "#7800FF",
                color: "white",
                padding: "30px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              <Box>
                <img src={image.image} alt="image" style={{ width: "100%", height: "100%", objectFit: "cover" }}/>
              </Box>
              
            </Box>
          </Carousel.Item>
        ))}
      </Carousel>

      {/* Card Grid */}
      <Typography variant="h5" sx={{ mt: 5, mb: 3, fontWeight: 600 }}>
        Course
      </Typography>
      <Grid container spacing={2}>
        {subjects.map((subject) => (
          <Grid
            item
            xs={12}
            sm={6}
            md={4}
            key={subject.id}
            onClick={() => handleSubjectClick()}
            sx={{ p: 1.5 }}
          >
            <Card
              sx={{
                height: 180,
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
              }}
            >
              <Box
                component="img"
                src={subject.image}
                alt={`${subject.name} thumbnail`}
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
                  {subject.name}
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
                  {subject.code}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
