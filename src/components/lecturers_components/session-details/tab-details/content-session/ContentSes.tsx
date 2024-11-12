import React, { useState } from "react";
import { Box, Container, Typography, Button, IconButton } from "@mui/material";
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";
import { assignmentSlot, questionSlot, slot } from "../../../../../models/Interface";

interface Props {
  questionSlot: questionSlot[];
  assignmentSlot: assignmentSlot[];
  slots: slot[];
}

const ContentSes: React.FC<Props> = () => {
  const navigate = useNavigate();

  const handleClickToDiscussion = () => {
    navigate("/lecturer/session-question");
  };

  const handleClickToAssignment = () => {
    navigate("/lecturer/session-assignment");
  };

  const [questionSlot, setQuestionSlot] = useState<questionSlot[]>([
    {
      QuestionID: "1",
      Slotid: "1",
      content: "What is the capital of France?",
      Status: 1,
      UserID: "user1",
      TimeStart: "2023-01-01T10:00:00Z",
      TimeEnd: "2023-01-01T11:00:00Z",
    },
    {
      QuestionID: "2",
      Slotid: "1",
      content: "Explain the theory of relativity.",
      Status: 0,
      UserID: "user2",
      TimeStart: "2023-01-02T10:00:00Z",
      TimeEnd: "2023-01-02T11:00:00Z",
    },
    {
      QuestionID: "3",
      Slotid: "2",
      content: "Describe the process of photosynthesis.",
      Status: 1,
      UserID: "user3",
      TimeStart: "2023-01-03T10:00:00Z",
      TimeEnd: "2023-01-03T11:00:00Z",
    },
  ]);

  const [assignmentSlot, setAssignmentSlot] = useState<assignmentSlot[]>([
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
  ]);

  const SlotId = "1";
  const filteredQuestions = questionSlot.filter((qs) => qs.Slotid === SlotId);
  const filteredAssignments = assignmentSlot.filter((asm) => asm.Slotid === SlotId);

  const handleStatusToggle = (id: string, type: "question" | "assignment") => {
    if (type === "question") {
      setQuestionSlot((prevQuestions) =>
        prevQuestions.map((qs) =>
          qs.QuestionID === id
            ? { ...qs, Status: qs.Status === 0 ? 1 : qs.Status === 1 ? 2 : 0 }
            : qs
        )
      );
    } else {
      setAssignmentSlot((prevAssignments) =>
        prevAssignments.map((asm) =>
          asm.AssignmentID === id
            ? { ...asm, Status: asm.Status === 0 ? 1 : asm.Status === 1 ? 2 : 0 }
            : asm
        )
      );
    }
  };

  const handleEdit = (id: string, type: "question" | "assignment") => {
    // Add edit logic here
    console.log(`Edit ${type} with ID: ${id}`);
  };

  const handleDelete = (id: string, type: "question" | "assignment") => {
    // Add delete logic here
    console.log(`Delete ${type} with ID: ${id}`);
  };

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
          <Box flex="1">
            <Typography variant="body1" fontWeight="bold" sx={{ fontSize: "1rem" }}>
              Question {index + 1}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ fontSize: "0.875rem" }}>
              {qs.content.length > 40 ? `${qs.content.substring(0, 40)}...` : qs.content}
            </Typography>
            <Typography
              variant="caption"
              sx={{
                color: qs.Status === 0 ? "red" : qs.Status === 1 ? "green" : "gray",
                fontWeight: "bold",
                fontSize: "0.75rem",
              }}
            >
              {qs.Status === 0 ? "Not Started" : qs.Status === 1 ? "In Progress" : "Finished"}
            </Typography>
          </Box>
          <Button
            size="medium"
            variant={qs.Status === 0 ? "outlined" : "contained"}
            color={qs.Status === 0 ? "warning" : qs.Status === 1 ? "error" : "secondary"}
            onClick={(e) => {
              e.stopPropagation();
              handleStatusToggle(qs.QuestionID, "question");
            }}
          >
            {qs.Status === 0 ? "Start" : qs.Status === 1 ? "Stop" : "Restart"}
          </Button>
          <IconButton onClick={(e) => { e.stopPropagation(); handleEdit(qs.QuestionID, "question"); }}>
            <EditIcon fontSize="small" />
          </IconButton>
          <IconButton onClick={(e) => { e.stopPropagation(); handleDelete(qs.QuestionID, "question"); }}>
            <DeleteIcon fontSize="small" />
          </IconButton>
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
          <Box flex="1">
            <Typography variant="body1" fontWeight="bold" sx={{ fontSize: "1rem" }}>
              Assignment {index + 1}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ fontSize: "0.875rem" }}>
              {asm.title.length > 40 ? `${asm.title.substring(0, 40)}...` : asm.title}
            </Typography>
            <Typography
              variant="caption"
              sx={{
                color: asm.Status === 0 ? "red" : asm.Status === 1 ? "green" : "gray",
                fontWeight: "bold",
                fontSize: "0.75rem",
              }}
            >
              {asm.Status === 0 ? "Not Started" : asm.Status === 1 ? "In Progress" : "Finished"}
            </Typography>
          </Box>
          <Button
            size="medium"
            variant={asm.Status === 0 ? "outlined" : "contained"}
            color={asm.Status === 0 ? "warning" : asm.Status === 1 ? "error" : "secondary"}
            onClick={(e) => {
              e.stopPropagation();
              handleStatusToggle(asm.AssignmentID, "assignment");
            }}
          >
            {asm.Status === 0 ? "Start" : asm.Status === 1 ? "Stop" : "Restart"}
          </Button>
          <IconButton onClick={(e) => { e.stopPropagation(); handleEdit(asm.AssignmentID, "assignment"); }}>
            <EditIcon fontSize="small" />
          </IconButton>
          <IconButton onClick={(e) => { e.stopPropagation(); handleDelete(asm.AssignmentID, "assignment"); }}>
            <DeleteIcon fontSize="small" />
          </IconButton>
        </Box>
      ))}
    </Container>
  );
};

export default ContentSes;
