import React from "react";
import { Box, Container, Typography } from "@mui/material";
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import { useNavigate } from "react-router-dom";

const ContentSes: React.FC = () => {
  const navigate = useNavigate();

  const handleClickToDiscussion = () => {
    navigate("/lecturer/session-dicussion");
  };

  const handleClickToAssignment = () => {
    navigate("/lecturer/session-assignment");

  };

  // Mock data for testing UI
  const questionSlot = [
    {
      QuestionID: "1",
      Slotid: "1",
      content: "What is the capital of France?",
      Status: 1,
    },
    {
      QuestionID: "2",
      Slotid: "1",
      content: "Explain the theory of relativity.",
      Status: 0,
    },
    {
      QuestionID: "3",
      Slotid: "2",
      content: "Describe the process of photosynthesis.",
      Status: 1,
    },
  ];

  const AssignmentSlot = [
    {
      AssignmentID: "a111",
      UserID: "lt12345",
      title: "ReactJS là gì? Ưu điểm của ứng dụng ReactJS so với các công nghệ web truyền thống?",
      description: "Assignment 1",
      urlfile: "https://www.w3schools.com/",
      TimeLimit: "1500",
      Slotid: "1",
      Status: 0,
    },
  ];

  const SlotId = "1";
  const filteredQuestions = questionSlot.filter((qs) => qs.Slotid === SlotId);
  const filteredAssignments = AssignmentSlot.filter((asm) => asm.Slotid === SlotId);

  return (
    <Container sx={{ padding: "8px", maxWidth: "500px" }}>
      {filteredQuestions.map((qs, index) => (
        <Box
          key={qs.QuestionID}
          onClick={handleClickToDiscussion}
          sx={{
            display: "flex",
            alignItems: "center",
            backgroundColor: "#f8f8f8",
            padding: "10px",
            borderRadius: "6px",
            marginBottom: "6px",
            cursor: "pointer",
            "&:hover": {
              backgroundColor: "#e0e0e0",
            },
          }}
        >
          <QuestionAnswerIcon sx={{ marginRight: "6px", color: "orange", fontSize: "1.5rem" }} />
          <Box>
            <Typography variant="body1" fontWeight="bold" sx={{ fontSize: "1rem" }}>
              Question {index + 1}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ fontSize: "0.875rem" }}>
              {qs.content.length > 40 ? `${qs.content.substring(0, 40)}...` : qs.content}
            </Typography>
            <Typography
              variant="caption"
              sx={{
                color: qs.Status === 0 ? "red" : "green",
                fontWeight: "bold",
                fontSize: "0.75rem",
              }}
            >
              {qs.Status === 0 ? "Not Started" : "In Progress"}
            </Typography>
          </Box>
        </Box>
      ))}

      {filteredAssignments.map((asm, index) => (
        <Box
          key={asm.AssignmentID}
          onClick={() => handleClickToAssignment()}
          sx={{
            display: "flex",
            alignItems: "center",
            backgroundColor: "#f0f8ff",
            padding: "10px",
            borderRadius: "6px",
            marginBottom: "6px",
            cursor: "pointer",
            "&:hover": {
              backgroundColor: "#e0e0e0",
            },
          }}
        >
          <AssignmentTurnedInIcon sx={{ marginRight: "6px", color: "purple", fontSize: "1.5rem" }} />
          <Box>
            <Typography variant="body1" fontWeight="bold" sx={{ fontSize: "1rem" }}>
              Assignment {index + 1}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ fontSize: "0.875rem" }}>
              {asm.title.length > 40 ? `${asm.title.substring(0, 40)}...` : asm.title}
            </Typography>
            <Typography
              variant="caption"
              sx={{
                color: asm.Status === 0 ? "red" : "green",
                fontWeight: "bold",
                fontSize: "0.75rem",
              }}
            >
              {asm.Status === 0 ? "Not Started" : "In Progress"}
            </Typography>
          </Box>
        </Box>
      ))}
    </Container>
  );
};

export default ContentSes;
