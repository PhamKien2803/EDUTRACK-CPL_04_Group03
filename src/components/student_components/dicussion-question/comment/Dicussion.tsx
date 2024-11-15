import React, { Fragment, useEffect, useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import SaveIcon from '@mui/icons-material/Save';
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Swal from "sweetalert2";
import Comment from "./Comment";
import { participants, answerQuestionSlot } from "../../../../models/Interface";
import { getAnswerQuestionSlot, getParticipants } from "../../../../service/ApiService";
import { postComment, updateComment, deleteComment } from "../../../../service/ApiService";
import { useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from '../../../../redux/reducer/rootReducer';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Discussion: React.FC = () => {
  const userid = useSelector((state: { account: { account: { UserID: string } } }) => state.account.account.UserID);
  const settingStatus = useSelector((state: RootState) => state.commentSettings.settingStatus); // Lấy cài đặt từ Redux
  const [searchParams] = useSearchParams();
  const questionID = searchParams.get("questionid");
  const [answerQuestionSlots, setAnswerQuestionSlots] = useState<answerQuestionSlot[]>([]);
  const [participants, setParticipants] = useState<participants[]>([]);
  const [text, setText] = useState<string>("");
  const [editingCommentId, setEditingCommentId] = useState<string | null>(null);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedCommentId, setSelectedCommentId] = useState<string | null>(null);

  const handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value);
  };

  const handleSubmit = async () => {
    if (!text.trim()) {
      Swal.fire({
        icon: "question",
        title: "Question",
        text: "Please enter a comment before submitting.",
        confirmButtonText: "OK",
      });
      return;
    }

    if (text.length > 800) {
      toast.error("Comment cannot exceed 800 characters.");
      return;
    }
    const currentTimestamp = new Date().toISOString();

    if (editingCommentId) {
      const updatedComment = {
        ...answerQuestionSlots.find((comment) => comment.id === editingCommentId),
        comment: text,
        Timestamped: currentTimestamp,
      } as answerQuestionSlot;

      try {
        await updateComment(updatedComment);
        setAnswerQuestionSlots(
          answerQuestionSlots.map((comment) =>
            comment.id === editingCommentId ? updatedComment : comment
          )
        );
        setEditingCommentId(null);
        setText("");
      } catch (error) {
        console.error("Error updating comment:", error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "There was an error updating the comment.",
          confirmButtonText: "OK",
        });
      }
    } else {
      const newComment: answerQuestionSlot = {
        id: "c" + Math.floor(100 + Math.random() * 900),
        comment: text,
        QuestionID: questionID || "",
        UserID: userid,
        Rating: 0,
        Replies: [],
        Timestamped: currentTimestamp,
      };

      try {
        await postComment(newComment);
        setAnswerQuestionSlots([...answerQuestionSlots, newComment]);
        setText("");
      } catch (error) {
        console.error("Error posting comment:", error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "There was an error posting the comment.",
          confirmButtonText: "OK",
        });
      }
    }
  };

  useEffect(() => {
    fetchAnswerQuestionSlot();
    fetchParticipants();
  }, [userid, settingStatus]);

  const fetchAnswerQuestionSlot = async () => {
    try {
      const res: answerQuestionSlot[] = await getAnswerQuestionSlot();
      setAnswerQuestionSlots(res);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchParticipants = async () => {
    try {
      const res: participants[] = await getParticipants();
      setParticipants(res);
    } catch (error) {
      console.log(error);
    }
  };

  const getUsernameById = (userID: string) => {
    const user = participants.find((participant) => participant.id === userID);
    return user ? user.UserName : "Unknown User";
  };

  const filterCommentQuestion = answerQuestionSlots.filter(
    (comment) => comment?.QuestionID === questionID
  );

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, commentId: string) => {
    setAnchorEl(event.currentTarget);
    setSelectedCommentId(commentId);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedCommentId(null);
  };

  const handleEditComment = (commentId: string) => {
    const commentToEdit = answerQuestionSlots.find((comment) => comment.id === commentId);
    if (commentToEdit) {
      setText(commentToEdit.comment);
      setEditingCommentId(commentId);
    }
    handleMenuClose();
  };

  const handleDeleteComment = (commentId: string) => {
    handleMenuClose();
    Swal.fire({
      title: "Are you sure?",
      text: "Do you really want to delete this comment? This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await deleteComment(commentId);
          setAnswerQuestionSlots(answerQuestionSlots.filter((comment) => comment.id !== commentId));
          Swal.fire("Deleted!", "Your comment has been deleted.", "success");
        } catch (error) {
          console.error("Error deleting comment:", error);
          Swal.fire("Error", "There was an error deleting your comment.", "error");
        }
      }
    });
  };

  const handleCancelEdit = () => {
    setEditingCommentId(null);
    setText("");
  };

  const filterCommentsBasedOnSettings = (comment: answerQuestionSlot) => {
    if (settingStatus === 1) {
      // Only show own comments
      return comment.UserID === userid;
    } else if (settingStatus === 2) {
      // Show all comments but no replies (assumed to handle elsewhere)
      return true;
    } else if (settingStatus === 3) {
      // Show all comments and replies
      return true;
    }
    return true;
  };

  return (
    <Fragment>
      <ToastContainer position="top-right" autoClose={3000} />

      <Box
        sx={{
          maxWidth: "750px",
          margin: "20px auto",
          padding: "30px",
          border: "1px solid #e0e0e0",
          borderRadius: "12px",
          backgroundColor: "#ffffff",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Typography variant="h6" sx={{ marginBottom: "12px", fontWeight: "600" }}>
          Add a Comment
        </Typography>
        <TextField
          value={text}
          onChange={handleTextChange}
          placeholder="Type your comment here..."
          multiline
          rows={4}
          fullWidth
          variant="outlined"
          sx={{
            marginBottom: "20px",
            borderRadius: "12px",
            backgroundColor: "#f4f6f8",
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "#b0bec5",
              },
              "&:hover fieldset": {
                borderColor: "#3f51b5",
              },
              "&.Mui-focused fieldset": {
                borderColor: "#3f51b5",
              },
            },
          }}
        />
        <Box sx={{ display: "flex", justifyContent: "space-between", gap: "15px" }}>
          {editingCommentId ? (
            <>
              <Button
                onClick={handleCancelEdit}
                sx={{
                  fontWeight: "bold",
                  color: "#757575",
                  textTransform: "none",
                  "&:hover": { color: "#3f51b5" },
                }}
              >
                Cancel
              </Button>
              <Button
                onClick={handleSubmit}
                size="small"
                color="secondary"
                startIcon={<SaveIcon />}
                variant="contained"
              >
                Save
              </Button>
            </>
          ) : (
            <Button
              variant="contained"
              endIcon={<SendIcon />}
              onClick={handleSubmit}
              sx={{
                padding: "10px 20px",
                fontWeight: "bold",
                textTransform: "none",
                backgroundColor: "#3f51b5",
                "&:hover": { backgroundColor: "#303f9f" },
              }}
            >
              Send
            </Button>
          )}
        </Box>
      </Box>

      <Typography variant="h6" sx={{ margin: "1rem", fontWeight: "bold", color: "#3f51b5" }}>
        Your Comments
      </Typography>

      {filterCommentQuestion.filter(filterCommentsBasedOnSettings).map((answer) => (
        <Paper
          key={answer.id}
          elevation={3}
          sx={{
            marginBottom: "10px",
            padding: "15px",
            borderRadius: "12px",
            backgroundColor: "#f9f9f9",
            position: "relative",
            boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.1)",
          }}
        >
          <Comment
            userIds={answer?.UserID}
            username={getUsernameById(answer?.UserID)}
            rating={answer?.Rating}
            text={answer?.comment}
            questionID={answer?.QuestionID}
            timestamp={answer?.Timestamped}
            answerId={answer?.id}
            settingStatus={settingStatus}
          />

          {answer.UserID === userid && (
            <IconButton
              aria-label="more"
              onClick={(event) => handleMenuOpen(event, answer?.id)}
              sx={{ position: "absolute", top: 10, right: 10, color: "#3f51b5" }}
            >
              <MoreVertIcon />
            </IconButton>
          )}

          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl) && selectedCommentId === answer.id}
            onClose={handleMenuClose}
          >
            {answer.UserID === userid && (
              <>
                <MenuItem onClick={() => handleEditComment(answer.id)}>Edit</MenuItem>
                <MenuItem onClick={() => handleDeleteComment(answer.id)}>Delete</MenuItem>
              </>
            )}
          </Menu>
        </Paper>
      ))}
    </Fragment>
  );
};

export default Discussion;
