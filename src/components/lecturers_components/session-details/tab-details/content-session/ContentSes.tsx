import React, { useEffect, useState } from "react";
import { Box, Container, Typography, Button, IconButton, Select, MenuItem, SelectChangeEvent, FormControl, InputLabel } from "@mui/material";
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Swal from "sweetalert2";
import { useNavigate, useLocation } from "react-router-dom";
import { updateStatusQuestionSLot, updateStatusAssignmentSlot, deleteQuestionSlot, deleteAssignmentSlot } from "../../../../../service/ApiService";
import { assignmentSlot, questionSlot, slot } from "../../../../../models/Interface";
import QuestionSlotUpdate from "./update-session/QuestionSlotUpdate";
import AssignmentSlotUpdateModal from "./update-session/AssignmentSlotUpdate";

interface Props {
  questionSlot: questionSlot[];
  assignmentSlot: assignmentSlot[];
  slots: slot[];
}

const ContentSes: React.FC<Props> = ({ questionSlot, assignmentSlot }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const Slotid = queryParams.get("Slotid");

  const [questionsslotStatus, setQuestionsslotStatus] = useState<questionSlot[]>(questionSlot);
  const [assignmentsslotStatus, setAssignmentsslotStatus] = useState<assignmentSlot[]>(assignmentSlot);

  const [selectedStatus, setSelectedStatus] = useState<number | "">("");
  const [openQuestionModal, setOpenQuestionModal] = useState(false);
  const [openAssignmentModal, setOpenAssignmentModal] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState<questionSlot | null>(null);
  const [selectedAssignment, setSelectedAssignment] = useState<assignmentSlot | null>(null);

  useEffect(() => {
    setQuestionsslotStatus(questionSlot);
    setAssignmentsslotStatus(assignmentSlot);
  }, [questionSlot, assignmentSlot]);

  const handleClickToDiscussion = (questionId: string, slotId: string) => {
    navigate(`/lecturer/session-question?Slotid=${slotId}&questionId=${questionId}`);
  };

  const handleClickToAssignment = (assignmentId: string, slotId: string) => {
    navigate(`/lecturer/session-assignment?Slotid=${slotId}&assignmentid=${assignmentId}`);
  };

  const handleStatusFilterChange = (event: SelectChangeEvent<number>) => {
    setSelectedStatus(event.target.value as number | "");
  };

  const handleEditQuestion = (question: questionSlot) => {
    if (question.Status === 1) {
      Swal.fire("Cannot Update", "Please stop the question before updating.", "warning");
      return;
    } else if (question.Status === 2) {
      Swal.fire("Cannot Update", "This question has been completed and cannot be updated.", "error");
      return;
    }

    setSelectedQuestion(question);
    setOpenQuestionModal(true);
  };

  const handleEditAssignment = (assignment: assignmentSlot) => {
    if (assignment.Status === 1) {
      Swal.fire("Cannot Update", "Please stop the assignment before updating.", "warning");
      return;
    } else if (assignment.Status === 2) {
      Swal.fire("Cannot Update", "This assignment has been completed and cannot be updated.", "error");
      return;
    }

    setSelectedAssignment(assignment);
    setOpenAssignmentModal(true);
  };

  const handleDelete = async (id: string, type: "question" | "assignment", currentStatus: number) => {
    if (currentStatus === 1) {
      await Swal.fire("Không thể xóa", "Vui lòng dừng trước khi xóa.", "warning");
      return;
    } else if (currentStatus === 2) {
      await Swal.fire("Không thể xóa", "Không thể xóa vì đã hoàn thành.", "error");
      return;
    }

    const result = await Swal.fire({
      title: "Bạn có chắc chắn muốn xóa?",
      text: "Hành động này không thể hoàn tác!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Xóa",
      cancelButtonText: "Hủy",
    });

    if (result.isConfirmed) {
      try {
        if (type === "question") {
          await deleteQuestionSlot(id);
          setQuestionsslotStatus((prevQuestions) =>
            prevQuestions.filter((qs) => qs.QuestionID !== id)
          );
          Swal.fire("Đã xóa!", "Question đã được xóa thành công.", "success");
        } else if (type === "assignment") {
          await deleteAssignmentSlot(id);
          setAssignmentsslotStatus((prevAssignments) =>
            prevAssignments.filter((asm) => asm.AssignmentID !== id)
          );
          Swal.fire("Đã xóa!", "Assignment đã được xóa thành công.", "success");
        }
      } catch (error) {
        console.log(error);
        Swal.fire("Lỗi", "Có lỗi xảy ra khi xóa.", "error");
      }
    }
  };

  const handleStatusQuestionSLotUpdate = async (questionId: string, currentStatus: number) => {
    const newStatus = currentStatus === 0 ? 1 : currentStatus === 1 ? 2 : 0;

    try {
      const questionToUpdate = questionsslotStatus.find((qs) => qs.QuestionID === questionId);
      if (questionToUpdate) {
        await updateStatusQuestionSLot({
          ...questionToUpdate,
          Status: newStatus,
        });

        setQuestionsslotStatus((prevQuestions) =>
          prevQuestions.map((qs) =>
            qs.QuestionID === questionId ? { ...qs, Status: newStatus } : qs
          )
        );

        console.log(`Status updated successfully for QuestionID: ${questionId}`);
      } else {
        console.error("Question not found");
      }
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const handleStatusAssignmentSlotUpdate = async (assignmentId: string, currentStatus: number) => {
    const newStatus = currentStatus === 0 ? 1 : currentStatus === 1 ? 2 : 0;

    try {
      const assignmentToUpdate = assignmentsslotStatus.find((asm) => asm.AssignmentID === assignmentId);
      if (assignmentToUpdate) {
        await updateStatusAssignmentSlot({
          ...assignmentToUpdate,
          Status: newStatus,
        });

        setAssignmentsslotStatus((prevAssignments) =>
          prevAssignments.map((asm) =>
            asm.AssignmentID === assignmentId ? { ...asm, Status: newStatus } : asm
          )
        );

        console.log(`Status updated successfully for AssignmentID: ${assignmentId}`);
      } else {
        console.error("Assignment not found");
      }
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const filteredQuestions = questionsslotStatus.filter(
    (qs) => qs.Slotid === Slotid && (selectedStatus === "" || qs.Status === selectedStatus)
  );

  const filteredAssignments = assignmentsslotStatus.filter(
    (asm) => asm.Slotid === Slotid && (selectedStatus === "" || asm.Status === selectedStatus)
  );
  return (
    <Container sx={{ padding: "8px", maxWidth: "500px" }}>
      <Box mb={2}>
        <FormControl variant="standard" sx={{ m: 1, minWidth: 160 }}>
          <InputLabel id="status-filter-label">Status Filter</InputLabel>
          <Select
            labelId="status-filter-label"
            id="status-filter"
            value={selectedStatus}
            onChange={handleStatusFilterChange}
            label="Status Filter"
          >
            <MenuItem value="">
              <em>All</em>
            </MenuItem>
            <MenuItem value={0}>Not Started</MenuItem>
            <MenuItem value={1}>In Progress</MenuItem>
            <MenuItem value={2}>Finished</MenuItem>
          </Select>
        </FormControl>
      </Box>
      {filteredQuestions.map((qs, index) => (
        <Box
          key={qs.QuestionID}
          onClick={() => handleClickToDiscussion(qs?.QuestionID, qs?.Slotid)}
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
              handleStatusQuestionSLotUpdate(qs.QuestionID, qs.Status);
            }}
          >
            {qs.Status === 0 ? "Start" : qs.Status === 1 ? "Stop" : "Restart"}
          </Button>
          <IconButton onClick={(e) => { e.stopPropagation(); handleEditQuestion(qs); }}>
            <EditIcon fontSize="small" />
          </IconButton>
          <IconButton onClick={(e) => { e.stopPropagation(); handleDelete(qs.id, "question", qs.Status); }}>
            <DeleteIcon fontSize="small" />
          </IconButton>
        </Box>
      ))}

      {filteredAssignments.map((asm, index) => (
        <Box
          key={asm.AssignmentID}
          onClick={() => handleClickToAssignment(asm?.AssignmentID, asm?.Slotid)}
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
              handleStatusAssignmentSlotUpdate(asm.AssignmentID, asm.Status);
            }}
          >
            {asm.Status === 0 ? "Start" : asm.Status === 1 ? "Stop" : "Restart"}
          </Button>
          <IconButton onClick={(e) => { e.stopPropagation(); handleEditAssignment(asm); }}>
            <EditIcon fontSize="small" />
          </IconButton>
          <IconButton onClick={(e) => { e.stopPropagation(); handleDelete(asm.id, "assignment", asm.Status); }}>
            <DeleteIcon fontSize="small" />
          </IconButton>
        </Box>
      ))}
      {/* Modals */}
      {openQuestionModal && selectedQuestion && (
        <QuestionSlotUpdate
          open={openQuestionModal}
          question={selectedQuestion}
          onClose={() => setOpenQuestionModal(false)}
          onSave={(updatedQuestion) => {
            setQuestionsslotStatus((prevQuestions) =>
              prevQuestions.map((qs) =>
                qs.QuestionID === updatedQuestion.QuestionID ? updatedQuestion : qs
              )
            );
            setOpenQuestionModal(false);
          }}

        />
      )}
      {openAssignmentModal && selectedAssignment && (
        <AssignmentSlotUpdateModal
          open={openAssignmentModal}
          assignment={selectedAssignment}
          onClose={() => setOpenAssignmentModal(false)}
          onSave={(updatedAssignment) => {
            setAssignmentsslotStatus((prevAssignments) =>
              prevAssignments.map((asm) =>
                asm.AssignmentID === updatedAssignment.AssignmentID ? updatedAssignment : asm
              )
            );
            setOpenAssignmentModal(false);
          }}
        />
      )}
    </Container>
  );
};

export default ContentSes;
