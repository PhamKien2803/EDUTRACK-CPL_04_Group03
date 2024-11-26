import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Divider,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { useSelector } from "react-redux";

import dataCarousel from "../../../../database.json";
import Carousel from "react-bootstrap/Carousel";
import {
  getAnswerQuestionSlot,
  getAnswerQuestionSlotByUserId,
  getClass,
  getCourse,
  getCourseSemesterByUserId,
  getQuestionSLot,
  getSemester,
  getSLot,
} from "../../../service/ApiService";
import {
  answerQuestionSlot,
  classRoom,
  courses,
  CourseSemester,
  questionSlot,
  Semester,
  slot,
} from "../../../models/Interface";
import { log } from "console";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

interface DashBoardPageProps {
  CourseName: string;
  ClassName: string;
  LecturerDate: string;
  progress: string;
  TotalSlot: string;
  CompletedSlot: string;
  TotalQuestion: string;
  CompletedQuestion: string;
  TotalAssignment: string;
  CompletedAssignment: string;
}

function DashBoardPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [dataCourse, setDataCourse] = useState<courses[]>([]);
  const [dataSemester, setDataSemester] = useState<Semester[]>([]);
  const [semesterId, setSemesterId] = useState<string>("");
  const [dataClass, setDataClass] = useState<classRoom[]>([]);
  const [data, setData] = useState<CourseSemester[]>([]);
  const [dataSlot, setSlot] = useState<slot[]>([]);
  const [dataQuestion, setQuestion] = useState<questionSlot[]>([]);
  const [dataAnswer, setAnswer] = useState<answerQuestionSlot[]>([]);

  const account = useSelector((state: any) => state.account.account);
  const isAuthenticated = useSelector(
    (state: any) => state.account.isAuthenticated
  );

  console.log("data", data);

  // console.log(account);
  // console.log(isAuthenticated);

  useEffect(() => {
    fetchCourse();
    fetchDataSemester();
    fetchClassByUserid();
    fetchSlot();
    fetchQuestionSlot();
    fetchAnswerQuestion();
  }, []);

  useEffect(() => {
    // console.log('hello');

    if (semesterId) fetchCourseSemester();
  }, [semesterId]);
  const fetchCourseSemester = async () => {
    const results = await Promise.all(
      dataClass.map(async (item) => {
        const res = await getCourseSemesterByUserId(item.ClassID);
        return Array.isArray(res)
          ? res.filter((i) => i.SemesterID === semesterId)
          : [];
      })
    );
    setData(results.flat());
  };

  const countTotalSlot = (id: string) => {
    let count = 0;
    data
      .find((item) => item.id === id)
      ?.SlotID.map((item) => {
        dataQuestion.forEach((slot) => {
          if (slot.Slotid === item) {
            count++;
          }
        });
      });
    return count;
  };

  console.log("dataquestion", dataQuestion);

  const countAnswer = (id: string) => {
    let count = 0;
    const courseSemester = data.find((item) => item.id === id);
    if (courseSemester) {
      courseSemester.SlotID.forEach((slotId) => {
        dataQuestion.forEach((question) => {
          if (question.Slotid === slotId) {
            if (
              dataAnswer.some(
                (answer) => answer.QuestionID === question.QuestionID
              )
            ) {
              count++;
            }
          }
        });
      });
    }
    return count;
  };

  console.log("Total answerSlot: ", countAnswer("cs13"));

  console.log("data", data);

  console.log("Total Slot: ", countTotalSlot("cs13"));

  const fetchSlot = async () => {
    const res = await getSLot();
    if (Array.isArray(res) && res.length > 0) {
      setSlot(res);
    }
  };

  const fetchQuestionSlot = async () => {
    const res = await getQuestionSLot();
    if (Array.isArray(res) && res.length > 0) {
      setQuestion(res);
    }
  };

  const fetchAnswerQuestion = async () => {
    const res = await getAnswerQuestionSlotByUserId(account.UserID);
    if (Array.isArray(res) && res.length > 0) {
      setAnswer(res);
    }
  };

  // console.log(data);

  const fetchClassByUserid = async () => {
    const res = await getClass();
    // console.log(res);

    if (Array.isArray(res)) {
      const filteredData = res.filter((item) =>
        item.Student.includes(account.UserID)
      );
      // console.log(filteredData);
      setDataClass(filteredData);
    }
  };

  const fetchDataSemester = async () => {
    const res = await getSemester();
    if (Array.isArray(res) && res.length > 0) {
      const latestSemesterId = res[res.length - 1].SemesterID;
      setSemesterId(latestSemesterId);
      setDataSemester(res);
    }
  };

  const fetchCourse = async () => {
    const res = await getCourse();
    if (Array.isArray(res) && res.length > 0) {
      setDataCourse(res);
    }
  };
  // console.log(semesterId);

  // const handleSubjectClick = () => {
  //   navigate("/lession-course");
  // };
  // console.log(dataSemester);
  return (
    <Box p={3} bgcolor="#f9fafb" minHeight="100vh">
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
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
              </Box>
            </Box>
          </Carousel.Item>
        ))}
      </Carousel>

      {/* Header Section */}
      <Box mb={3} display="flex" alignItems="center">
        <Box
          component="img"
          src={account.Image}
          alt="Profile"
          sx={{ width: 50, height: 50, borderRadius: "50%", marginRight: 2 }}
        />
        <Box>
          <Typography
            variant="h6"
            fontWeight="bold"
            sx={{ marginBottom: "4px" }}
          >
            Welcome back, {account.UserName}
          </Typography>
          <Typography
            variant="body2"
            color="primary"
            sx={{ cursor: "pointer" }}
            onClick={() => navigate(`/profile`)}
          >
            Open Profile
          </Typography>
        </Box>
      </Box>

      <Box sx={{ minWidth: 120 }}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">{t("year")}</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="year"
            sx={{ width: "100%", maxWidth: "200px", marginBottom: "30px" }}
            value={semesterId}
            onChange={(e) => setSemesterId(e.target.value)}
          >
            {dataSemester
              ?.slice()
              .reverse()
              .map((item) => (
                <MenuItem key={`se-${item.SemesterID}`} value={item.SemesterID}>
                  {item.SemesterName}
                </MenuItem>
              ))}
          </Select>
        </FormControl>
      </Box>

      {/* Streak Section */}
      {data.map((item) => (
        <Box key={item.id} mb={4} sx={{ width: "100%" }}>
          {" "}
          {/* Khoảng cách giữa các card */}
          <Card variant="outlined">
            <CardContent>
              <Grid container spacing={2} alignItems="center">
                {/* Title */}
                <Grid item xs={12} md={4}>
                  <Typography variant="h6" fontWeight="bold" mb={1}>
                    {
                      dataCourse.find((course) => course.id === item.CourseID)
                        ?.id
                    }
                  </Typography>
                  <Typography variant="body2" color="textSecondary" mb={2}>
                    {
                      dataCourse.find((course) => course.id === item.CourseID)
                        ?.CourseName
                    }
                  </Typography>
                </Grid>

                {/* Progress Circle */}
                <Grid item xs={12} md={4}>
                  <Box
                    sx={{
                      width: 80,
                      height: 80,
                      borderRadius: "50%",
                      position: "relative",
                      margin: "0 auto",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <svg
                      width={80}
                      height={80}
                      style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                      }}
                    >
                      <circle
                        cx={40}
                        cy={40}
                        r={36}
                        fill="none"
                        stroke="#e0e0e0"
                        strokeWidth={6}
                      />
                      <circle
                        cx={40}
                        cy={40}
                        r={36}
                        fill="none"
                        stroke="#f59c0b"
                        strokeWidth={6}
                        strokeDasharray={2 * Math.PI * 36}
                        strokeDashoffset={
                          2 * Math.PI * 36 -
                          (countTotalSlot(item.id) === 0
                            ? 0
                            : countAnswer(item.id) / countTotalSlot(item.id)) *
                            2 *
                            Math.PI *
                            36
                        }
                        strokeLinecap="round"
                        transform="rotate(-90 40 40)"
                      />
                    </svg>
                    <Typography
                      variant="h6"
                      fontWeight="bold"
                      sx={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                      }}
                    >
                      {countTotalSlot(item.id) === 0
                        ? 0
                        : Math.round(
                            (countAnswer(item.id) / countTotalSlot(item.id)) *
                              100
                          )}
                      %
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} md={1}></Grid>
                {/* Course Info */}
                <Grid item xs={12} md={3}>
                  <Box
                    display="flex"
                    flexDirection="column"
                    alignItems="flex-start"
                    justifyContent="center"
                    gap={1}
                  >
                    {/* Slot */}
                    <Typography
                      variant="body2"
                      style={{ display: "flex", alignItems: "center" }}
                    >
                      <span
                        style={{
                          display: "inline-block",
                          width: "8px",
                          height: "8px",
                          backgroundColor: "#f59c0b",
                          borderRadius: "50%",
                          marginRight: "8px",
                          flexShrink: 0,
                        }}
                      ></span>
                      Questions: &nbsp;
                      <span style={{ fontWeight: "bold" }}>
                        {countAnswer(item.id)}/{countTotalSlot(item.id)}
                      </span>
                    </Typography>

                    {/* Visit */}
                    <Typography
                      variant="body2"
                      style={{ display: "flex", alignItems: "center" }}
                    >
                      <span
                        style={{
                          display: "inline-block",
                          width: "8px",
                          height: "8px",
                          backgroundColor: "#16a28b",
                          borderRadius: "50%",
                          marginRight: "8px",
                          flexShrink: 0,
                        }}
                      ></span>
                      visit: &nbsp;
                      <span style={{ fontWeight: "bold" }}>1/1</span>
                    </Typography>

                    {/* Start Date */}
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      style={{ display: "flex", alignItems: "center" }}
                    >
                      <span
                        style={{
                          display: "inline-block",
                          width: "8px",
                          height: "8px",
                          backgroundColor: "transparent",
                          borderRadius: "50%",
                          marginRight: "8px",
                          flexShrink: 0,
                        }}
                      ></span>
                      Start Date: &nbsp;
                      {
                        dataSemester.find(
                          (semester) => semester.SemesterID === item.SemesterID
                        )?.StartDate
                      }
                    </Typography>

                    {/* End Date */}
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      style={{ display: "flex", alignItems: "center" }}
                    >
                      <span
                        style={{
                          display: "inline-block",
                          width: "8px",
                          height: "8px",
                          backgroundColor: "transparent",
                          borderRadius: "50%",
                          marginRight: "8px",
                          flexShrink: 0,
                        }}
                      ></span>
                      End Date: &nbsp;&nbsp;
                      {
                        dataSemester.find(
                          (semester) => semester.SemesterID === item.SemesterID
                        )?.EndDate
                      }
                    </Typography>

                    {/* Button */}
                    <Button
                      variant="contained"
                      size="medium"
                      style={{
                        alignSelf: "flex-start",
                        backgroundColor: "#16a28b",
                        color: "#fff",
                        textTransform: "capitalize",
                        borderRadius: "8px",
                        padding: "6px 16px",
                        fontWeight: "bold",
                        fontSize: "14px",
                        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                        transition: "transform 0.2s, box-shadow 0.2s",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = "scale(1.05)";
                        e.currentTarget.style.boxShadow =
                          "0 6px 10px rgba(0, 0, 0, 0.15)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = "scale(1)";
                        e.currentTarget.style.boxShadow =
                          "0 4px 6px rgba(0, 0, 0, 0.1)";
                      }}
                      onClick={() =>
                        navigate(`/lession-course?subjectId=${item.id}`)
                      }
                    >
                      See all activity
                    </Button>
                  </Box>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Box>
      ))}
    </Box>
  );
}

export default DashBoardPage;
