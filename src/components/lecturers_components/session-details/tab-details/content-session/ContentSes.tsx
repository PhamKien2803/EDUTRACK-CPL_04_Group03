import React from "react";
import { Box, Container, Typography } from "@mui/material";
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";
import { useNavigate } from "react-router-dom";

const ContentSes: React.FC = () => {
  const navigate = useNavigate();

  // Hard-coded mock data for testing UI
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

  const SlotId = "1"; 
  const filteredQuestions = questionSlot.filter((qs) => qs.Slotid === SlotId);

  const handleClickToDiscussion = (questionId: string, slotId: string) => {
    navigate(`/discussion-page/question?slotID=${slotId}&questionid=${questionId}`);
  };

  return (
    <Container sx={{ padding: "8px", maxWidth: "500px" }}>
      {filteredQuestions.map((qs, index) => (
        <Box
          key={qs.QuestionID}
          onClick={() => handleClickToDiscussion(qs.QuestionID, qs.Slotid)}
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
          <QuestionAnswerIcon sx={{ marginRight: "6px", color: "#4285F4", fontSize: "1.5rem" }} />
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
    </Container>
  );
};

export default ContentSes;
