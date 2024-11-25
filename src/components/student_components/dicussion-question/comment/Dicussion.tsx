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
import { participants, answerQuestionSlot, questionSlot } from "../../../../models/Interface";
import { getAnswerQuestionSlot, getParticipants, getQuestionSLot } from "../../../../service/ApiService";
import { postComment, updateComment, deleteComment } from "../../../../service/ApiService";
import { useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from '../../../../redux/reducer/rootReducer';
import { ToastContainer, toast } from "react-toastify";
import { useTranslation } from 'react-i18next';
import "react-toastify/dist/ReactToastify.css";

const Discussion: React.FC = () => {
  const { t } = useTranslation();
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

  const [questionSlots, setQuestionSlots] = useState<questionSlot[]>([]);
  const [isCommentDisabled, setIsCommentDisabled] = useState(false);
  const [commentStatusMessage, setCommentStatusMessage] = useState("");

  useEffect(() => {

    const checkStatus = () => {
      const hasNotStarted = questionSlots.some(slot => slot.Status === 0);
      const isTimeOver = questionSlots.some(slot => slot.Status === 2);
      const isRunning = questionSlots.some(slot => slot.Status === 1);

      if (isRunning) {
        setIsCommentDisabled(false);
        setCommentStatusMessage("");
      } else if (hasNotStarted) {
        setIsCommentDisabled(true);
        setCommentStatusMessage(t('questionNotStarted'));
      } else if (isTimeOver) {
        setIsCommentDisabled(true);
        setCommentStatusMessage(t('commentsDisabledTimeOver'));
      }
    };

    checkStatus();
    const interval = setInterval(checkStatus, 1000);

    return () => clearInterval(interval);
  }, [questionSlots, t]);

  const handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value);
  };

  const handleSubmit = async () => {
    if (!text.trim()) {
      Swal.fire({
        icon: "question",
        title: t('pleaseEnterComment'),
        text: t('pleaseEnterComment'),
        confirmButtonText: t('ok'),
      });
      return;
    }

    if (text.length > 800) {
      toast.error(t('commentTooLong'));
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
          title: t('errorUpdatingComment'),
          text: t('errorUpdatingComment'),
          confirmButtonText: t('ok'),
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
          title: t('errorPostingComment'),
          text: t('errorPostingComment'),
          confirmButtonText: t('ok'),
        });
      }
    }
  };

  useEffect(() => {
    fetchAnswerQuestionSlot();
    fetchParticipants();
    fetchQuestionSlot();
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

  const fetchQuestionSlot = async () => {
    try {
      const res: questionSlot[] = await getQuestionSLot();
      setQuestionSlots(res);
    } catch (error) {
      console.log(error);
    }
  };

  const getUsernameById = (userID: string) => {
    const user = participants.find((participant) => participant.id === userID);
    return user ? user.UserName : t('unknownUser');
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
      title: t('areYouSure'),
      text: t('deleteConfirmation'),
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: t('yesDeleteIt'),
      cancelButtonText: t('cancel1'),
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await deleteComment(commentId);
          setAnswerQuestionSlots(answerQuestionSlots.filter((comment) => comment.id !== commentId));
          Swal.fire(t('deleted'), t('commentDeleted'), "success");
        } catch (error) {
          console.error("Error deleting comment:", error);
          Swal.fire(t('error'), t('errorDeletingComment'), "error");
        }
      }
    });
  };

  const handleCancelEdit = () => {
    setEditingCommentId(null);
    setText("");
  };


  const filterCommentsBasedOnSettings = answerQuestionSlots.filter((comment) => {
    const questionSlot = questionSlots.find((q) => q.QuestionID === comment.QuestionID);
    if (!questionSlot) return false;

    const questionSetting = questionSlot.SettingStatus;

    if (questionSetting === 1) {

      return comment.UserID === userid;
    } else if (questionSetting === 2) {

      return true;
    } else if (questionSetting === 0) {

      return true;
    }

    return false;
  });

  const filteredComments = filterCommentQuestion.filter((comment) => {
    const questionSlot = questionSlots.find((q) => q.QuestionID === comment.QuestionID);
    return questionSlot && filterCommentsBasedOnSettings.includes(comment);
  });


  return (
    <Fragment>
      <ToastContainer position="top-right" autoClose={3000} />
      <Box>
        {isCommentDisabled ? (
          <Typography variant="h6" color="error" textAlign="center">
            {commentStatusMessage}
          </Typography>
        ) : (
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
              {t('addComment')}
            </Typography>
            <TextField
              value={text}
              onChange={handleTextChange}
              placeholder="Type your comment here..."
              multiline
              rows={4}
              fullWidth
              variant="outlined"
              disabled={isCommentDisabled}
              sx={{
                marginBottom: "20px",
                borderRadius: "12px",
                backgroundColor: "#f4f6f8",
              }}
            />
            <Box sx={{ display: "flex", justifyContent: "space-between", gap: "15px" }}>
              {editingCommentId ? (
                <>
                  <Button onClick={handleCancelEdit}>{t('cancel1')}</Button>
                  <Button
                    onClick={handleSubmit}
                    disabled={isCommentDisabled}
                    color="secondary"
                    variant="contained"
                    startIcon={<SaveIcon />}
                  >
                    {t('save')}
                  </Button>
                </>
              ) : (
                <Button
                  onClick={handleSubmit}
                  disabled={isCommentDisabled}
                  variant="contained"
                  sx={{
                    backgroundColor: isCommentDisabled ? "#b0bec5" : "#3f51b5",
                  }}
                  endIcon={<SendIcon />}
                >
                  {t('send')}
                </Button>
              )}
            </Box>
          </Box>
        )}
      </Box>

      <Typography variant="h6" sx={{ margin: "1rem", fontWeight: "bold", color: "#3f51b5" }}>
        {t('yourComments')}
      </Typography>

      {filteredComments.map((answer) => (
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
                <MenuItem onClick={() => handleEditComment(answer.id)}>{t('edit')}</MenuItem>
                <MenuItem onClick={() => handleDeleteComment(answer.id)}>{t('delete1')}</MenuItem>
              </>
            )}
          </Menu>
        </Paper>
      ))}
    </Fragment>
  );
};

export default Discussion;
