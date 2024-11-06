import { Fragment, useEffect, useState } from "react";
import { Box, Button, TextField, Typography, Paper } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import Swal from 'sweetalert2';
import Comment from "./Comment";
import { participants, answerQuestionSlot } from "../../../../models/Interface";
import { getAnswerQuestionSlot, getParticipants, postComment } from "../../../../service/ApiService";
import { useSearchParams } from "react-router-dom";

const Discussion: React.FC = () => {
  const [searchParams] = useSearchParams();
  const questionID = searchParams.get('questionid');
  const [answerQuestionSlots, setAnswerQuestionSlots] = useState<answerQuestionSlot[]>([]);
  const [participants, setParticipants] = useState<participants[]>([]);
  const [text, setText] = useState<string>("");

  const handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value);
  };

  const handleSubmit = async () => {
    if (!text.trim()) {
      Swal.fire({
        icon: 'question',
        title: 'Question',
        text: 'Please enter a comment before submitting.',
        confirmButtonText: 'OK',
      });
      return;
    }

    const newComment: answerQuestionSlot = {
      id: Math.random().toString(36).substr(2, 9),
      comment: text,
      QuestionID: questionID || "",
      UserID: "he173077",
      replies: [],
    };

    try {
      await postComment(newComment);
      setAnswerQuestionSlots([...answerQuestionSlots, newComment]);
      setText("");
    } catch (error) {
      console.error("Error posting comment:", error);
    }
  };

  useEffect(() => {
    fetchAnswerQuestionSlot();
    fetchParticipants();
  }, []);

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

  return (
    <Fragment>
      <Box
        sx={{
          maxWidth: "850px",
          margin: "20px auto",
          padding: "20px",
          border: "1px solid lightgray",
          borderRadius: "10px",
          backgroundColor: "#fff",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
        }}
      >
        <TextField
          value={text}
          onChange={handleTextChange}
          placeholder="Write your answer here...."
          multiline
          rows={4}
          fullWidth
          variant="outlined"
          sx={{
            marginBottom: "20px",
            borderRadius: "10px",
            backgroundColor: "#f9f9f9",
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: '#ccc',
              },
              '&:hover fieldset': {
                borderColor: '#3f51b5', // Màu viền khi hover
              },
              '&.Mui-focused fieldset': {
                borderColor: '#3f51b5', // Màu viền khi focus
              },
            },
          }}
        />
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <Button
            variant="contained"
            endIcon={<SendIcon />}
            color="primary"
            onClick={handleSubmit}
            sx={{
              padding: "10px 20px",
              fontWeight: "bold",
              textTransform: "none",
              borderRadius: "20px",
              backgroundColor: "#3f51b5",
              '&:hover': {
                backgroundColor: "#303f9f",
              },
            }}
          >
            SEND
          </Button>
        </div>
      </Box>

      <Typography variant="h6" sx={{ margin: "1rem", fontWeight: "bold" }}>
        Your Comments Here
      </Typography>

      {filterCommentQuestion.map((answer) => (
        <Paper key={answer.id} elevation={2} sx={{ marginBottom: "10px", padding: "10px", borderRadius: "8px" }}>
          <Comment
            username={getUsernameById(answer.UserID)}
            text={answer.comment}
            time={"Just now"}
            answerId={answer.id}
          />
        </Paper>
      ))}
    </Fragment>
  );
};

export default Discussion;
