import { Box, Card, CardContent, Typography, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";
interface Subject {
  id: number;
  name: string;
  code: string;
}

const subjects: Subject[] = [
  {
    id: 1,
    name: "Mathematics for Computing",
    code: "MAS291",
  },
  {
    id: 2,
    name: "Software Development Project",
    code: "SWP391",
  },
  {
    id: 3,
    name: "Basic Cross-Platform Application Programming With .NET",
    code: "PRN211",
  },
  {
    id: 4,
    name: "Software Requirement",
    code: "SWR302",
  },
  {
    id: 5,
    name: "Web Design",
    code: "WED201c",
  },
  {
    id: 6,
    name: "Introduction to Computing",
    code: "CEA201",
  },
  {
    id: 7,
    name: "Data Structures and Algorithms",
    code: "CSD201",
  },
  {
    id: 8,
    name: "Database Systems",
    code: "DBI202",
  },
  {
    id: 9,
    name: "Object-Oriented Programming",
    code: "PRO192",
  },
  {
    id: 10,
    name: "Basic Web Programming",
    code: "WEB201c",
  },
  {
    id: 11,
    name: "Software Testing",
    code: "SWT301",
  },
  {
    id: 12,
    name: "Mobile Programming",
    code: "PRM392",
  },
  {
    id: 13,
    name: "Java Web Application Development",
    code: "PRJ301",
  },
  {
    id: 14,
    name: "Information Assurance Overview",
    code: "IAO202",
  },
  {
    id: 15,
    name: "Computer Organization",
    code: "CSI104",
  },
  {
    id: 16,
    name: "Software Architecture and Design",
    code: "SWD392",
  },
];

export default function Subject() {
  const navigate = useNavigate();
  const handleSubjectClick = () => {
    navigate("/lession-course");
  }
  return (
    <Box
      sx={{
        flexGrow: 1,
        p: 4,
        width: { sm: `calc(100% - ${65}px)` },
        ml: { sm: `${65}px` },
      }}
    >
      <Typography variant="h4" sx={{ mb: 5, fontWeight: 600 }}>
        Course
      </Typography>
      <Grid onClick={() => handleSubjectClick()} container spacing={3}>
        {subjects.map((subject) => (
          <Grid
            item
            xs={12}
            sm={6}
            md={3}
            key={subject.id}
            sx={{
              p: 1.5,
            }}
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
                borderRadius: 3,
                cursor: "pointer",
                border: "1px solid #e0e0e0",
              }}
            >
              <CardContent
                sx={{
                  flexGrow: 1,
                  p: 3,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  alignItems: "center",
                  textAlign: "center",
                }}
              >
                <Typography
                  variant="h6"
                  component="h2"
                  sx={{
                    fontWeight: 500,
                    fontSize: "1rem",
                    lineHeight: 1.4,
                    maxHeight: "2.8em",
                    overflow: "hidden",
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                    mb: 2,
                  }}
                >
                  {subject.name}
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    fontSize: "1.25rem",
                    fontWeight: "600",
                    color: "primary.main",
                    p: 1,
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
