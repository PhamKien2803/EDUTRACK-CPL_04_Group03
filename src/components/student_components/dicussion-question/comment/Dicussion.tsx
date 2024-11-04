import { Fragment, useEffect, useState } from "react";
import { Box, Button } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Comment from "./Comment";
import { participants, answerQuestionSlot } from "../../../../models/Interface";
import { getAnswerQuestionSlot, getParticipants } from "../../../../service/ApiService";
import { useSearchParams } from "react-router-dom";

const modules = {
  toolbar: [
    [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
    [{ size: [] }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [{ 'list': 'ordered' }, { 'list': 'bullet' }],
    ['link', 'image', 'video'],
    [{ 'color': [] }, { 'background': [] }],
    [{ 'align': [] }],
    ['clean']
  ],
};

const formats = [
  'header', 'font', 'size',
  'bold', 'italic', 'underline', 'strike', 'blockquote',
  'list', 'bullet',
  'link', 'image', 'video',
  'color', 'background', 'align'
];

const Discussion: React.FC = () => {
  const [searchParams] = useSearchParams();
  const questionID = searchParams.get('questionid');
  const [answerQuestionSlots, setAnswerQuestionSlots] = useState<answerQuestionSlot[]>([]);
  const [participants, setParticipants] = useState<participants[]>([]);
  const [text, setText] = useState<string>("");

  const handleTextChange = (value: string) => {
    setText(value);
  };

  const handleSubmit = () => {
    console.log("Your comment:", text);
  };

  useEffect(() => {
    fetchAnswerQuestionSlot();
    fetchParticipants();
  }, []);

  const fetchAnswerQuestionSlot = async () => {
    try {
      const res: answerQuestionSlot[] = await getAnswerQuestionSlot();
      setAnswerQuestionSlots(res);
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchParticipants = async () => {
    try {
      const res: participants[] = await getParticipants();
      setParticipants(res);
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  const getUsernameById = (userID: string) => {
    const user = participants.find((participant) => participant.id === userID);
    return user ? user.UserName : "Unknown User";
  };

  const filterCommentQuestion = answerQuestionSlots.filter(
    (comment) => comment.QuestionID === questionID
  );

  return (
    <Fragment>
      <Box
        sx={{
          maxWidth: "850px",
          margin: "10px",
          padding: "10px",
          border: "1px solid lightgray",
          borderRadius: "10px",
          backgroundColor: "#fff",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
        }}
      >
        <ReactQuill
          value={text}
          onChange={handleTextChange}
          modules={modules}
          formats={formats}
          placeholder="Write your answer here...."
          style={{
            height: "110px",
            marginBottom: "20px",
            borderRadius: "10px",
            backgroundColor: "#f9f9f9",
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
            }}
          >
            SEND
          </Button>
        </div>
      </Box>
      <div style={{ margin: "1rem" }}>
        <span>Your Comments Here</span>
      </div>

      {filterCommentQuestion.map((answer) => (
        <Comment
          key={answer.id}
          username={getUsernameById(answer.UserID)}
          text={answer.comment}
          time={"Just now"} 
          rating={answer.rating}
        />
      ))}
    </Fragment>
  );
};

export default Discussion;
