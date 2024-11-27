import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Icon,
} from "@mui/material";
import { useSelector } from "react-redux";
import Confetti from "react-confetti";
import dataCarousel from "../../../../database.json";
import Carousel from "react-bootstrap/Carousel";
import {
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
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";


function DashBoardPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [dataCourse, setDataCourse] = useState<courses[]>([]);
  const [dataSemester, setDataSemester] = useState<Semester[]>([]);
  const [semesterId, setSemesterId] = useState<string>("");
  const [dataClass, setDataClass] = useState<classRoom[]>([]);
  const [data, setData] = useState<CourseSemester[]>([]);
  const [dataSlot, setSlot] = useState<slot[]>([]);
  console.log("dataSlot", dataSlot);
  const [dataQuestion, setQuestion] = useState<questionSlot[]>([]);
  const [dataAnswer, setAnswer] = useState<answerQuestionSlot[]>([]);

  interface RootState {
    account: {
      account: {
        UserID: string;
        UserName: string;
        Image: string;
      };
      isAuthenticated: boolean;
    };
  }

  const account = useSelector((state: RootState) => state.account.account);


  useEffect(() => {
    fetchCourse();
    fetchDataSemester();
    fetchClassByUserid();
    fetchSlot();
    fetchQuestionSlot();
    fetchAnswerQuestion();
  }, []);

  useEffect(() => {
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

  const fetchClassByUserid = async () => {
    const res = await getClass();

    if (Array.isArray(res)) {
      const filteredData = res.filter((item) =>
        item.Student.includes(account.UserID)
      );
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
          marginBottom: "20px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
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
                borderRadius: "12px",
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
                    borderRadius: "8px",
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
          src={account.Image || "https://www.w3schools.com/howto/img_avatar.png"}
          alt="Profile"
          sx={{ width: 50, height: 50, borderRadius: "50%", marginRight: 2 }}
        />
        <Box>
          <Typography
            variant="h6"
            fontWeight="bold"
            sx={{ marginBottom: "4px", color: "#333" }}
          >
            Welcome back, {account.UserName}
          </Typography>
          <Typography
            variant="body2"
            color="primary"
            sx={{
              cursor: "pointer",
              fontWeight: "bold",
              "&:hover": {
                textDecoration: "underline",
                color: "#007bff",
              },
            }}
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
            sx={{
              width: "100%",
              maxWidth: "200px",
              marginBottom: "30px",
              borderRadius: "8px",
              boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
            }}
            value={semesterId}
            onChange={(e) => setSemesterId(e.target.value)}
          >
            {dataSemester && dataSemester.length > 0 ? (
              dataSemester
                ?.slice()
                .reverse()
                .map((item) => (
                  <MenuItem key={`se-${item.SemesterID}`} value={item.SemesterID}>
                    {item.SemesterName}
                  </MenuItem>
                ))
            ) : (
              <MenuItem disabled>
                {t("No semesters available")} {/* Tùy chỉnh thông báo */}
              </MenuItem>
            )}
          </Select>
        </FormControl>
        {/* Hiển thị thông báo nếu không có môn học */}
        {semesterId &&
          dataSemester.filter((course) => course.SemesterID === semesterId).length ===
          0 && (
            <Box
              sx={{
                textAlign: "center",
                padding: "20px",
                backgroundColor: "#f9f9f9",
                borderRadius: "12px",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                color: "#555",
                marginTop: "20px",
              }}
            >
              <Typography variant="h6" fontWeight="bold" sx={{ marginBottom: "8px" }}>
                {t("No courses found")}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                {t("Please select another semester or check back later.")}
              </Typography>
            </Box>
          )}
      </Box>


      {/* Streak Section */}
      {data.map((item) => (
        <Box key={item.id} mb={4} sx={{ width: "100%" }}>
          {" "}
          {/* Khoảng cách giữa các card */}
          <Card sx={{
            transition: "transform 0.3s, box-shadow 0.3s",
            "&:hover": {
              transform: "scale(1.02)",
              boxShadow: "0 10px 20px rgba(160, 50, 160, 0.6)",
            },
            background: "linear-gradient(135deg, #f9f9f9, #ffffff)",
            borderRadius: "12px",
            padding: "15px",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
          }}
            variant="outlined">
            <CardContent>
              <Grid sx={{
                animation: "fadeIn 0.8s ease-in-out",
                "@keyframes fadeIn": {
                  from: { opacity: 0, transform: "translateY(20px)" },
                  to: { opacity: 1, transform: "translateY(0)" },
                },
              }} container spacing={2} alignItems="center">
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
                    {countTotalSlot(item.id) !== 0 && countAnswer(item.id) / countTotalSlot(item.id) === 1 && (
                      <>
                        <Box
                          sx={{
                            position: "absolute",
                            top: "-40px",
                            left: "50%",
                            transform: "translateX(-50%)",
                            zIndex: 3,
                            fontSize: "20px",
                            fontWeight: "bold",
                            color: "black",
                            textAlign: "center",
                            whiteSpace: "nowrap",
                          }}
                        >
                          Congratulations! 🎉 You've completed the course.
                        </Box>

                        {/* Confetti*/}
                        <Confetti
                          width={200}
                          height={200}
                          recycle={false}
                          numberOfPieces={150}
                          gravity={0.4}
                          initialVelocityY={10}
                          colors={["#f59c0b", "#ff6347", "#ffd700", "#adff2f"]}
                          confettiSource={{ x: 38, y: 45, w: 0, h: 0 }}
                        />
                      </>
                    )}

                    {/* Background Circle */}
                    <svg
                      width={80}
                      height={80}
                      style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                      }}
                    >
                      <circle cx={40} cy={40} r={36} fill="none" stroke="#e0e0e0" strokeWidth={6} />
                    </svg>

                    {/* Progress Circle */}
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
                        stroke="#f59c0b"
                        strokeWidth={6}
                        strokeDasharray={2 * Math.PI * 36}
                        strokeDashoffset={
                          2 *
                          Math.PI *
                          36 -
                          (countTotalSlot(item.id) === 0
                            ? 0
                            : (countAnswer(item.id) / countTotalSlot(item.id)) * 2 * Math.PI * 36)
                        }
                        strokeLinecap="round"
                        transform="rotate(-90 40 40)"
                        style={{
                          animation: "progress 1s ease-out forwards",
                        }}
                      />
                    </svg>

                    {/* Progress Text */}
                    <Typography
                      variant="h6"
                      fontWeight="bold"
                      sx={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        color: "black",
                        zIndex: 2,
                      }}
                    >
                      {countTotalSlot(item.id) === 0
                        ? 0
                        : Math.round((countAnswer(item.id) / countTotalSlot(item.id)) * 100)}
                      %
                    </Typography>
                  </Box>

                  <style>
                    {`
                     @keyframes shake {
                         0% {
                  transform: translateX(-50%) rotate(0deg);
                      }
                   25% {
                   transform: translateX(-50%) rotate(10deg);
                        }
                           50% {
                   transform: translateX(-50%) rotate(-10deg);
                        }
                      75% {
                   transform: translateX(-50%) rotate(10deg);
                   }
                        100% {
                   transform: translateX(-50%) rotate(0deg);
                   }  
                        }
                    `}
                  </style>
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
                      onClick={() =>
                        navigate(`/lession-course?subjectId=${item.id}`)
                      }
                      variant="contained"
                      startIcon={<Icon>activity</Icon>}
                      size="medium"
                      sx={{
                        background: "linear-gradient(90deg, #16a28b, #20c997)",
                        color: "#fff",
                        borderRadius: "20px",
                        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                        transition: "all 0.3s ease",
                        "&:hover": {
                          background: "linear-gradient(90deg, #20c997, #16a28b)",
                          boxShadow: "0 8px 16px rgba(0, 0, 0, 0.3)",
                        },
                        "&:active": {
                          transform: "scale(0.95)",
                          boxShadow: "inset 0 4px 8px rgba(0, 0, 0, 0.2)",
                        },
                      }}
                    >
                      See All Activity
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
