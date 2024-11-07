import React, { useState, useEffect } from 'react';
import { Box, Typography, Avatar, Paper, Rating, TextField, Button, Collapse } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import Replies from './Replies';
import Swal from 'sweetalert2';
import { replies as Reply, answerQuestionSlot, participants } from '../../../../models/Interface';
import { getParticipants, getRepliesContent, postReply, updateReply, deleteReply, updateRating } from '../../../../service/ApiService';

interface Props {
  userIds?: string;
  username?: string;
  text?: string;
  time?: string;
  rating?: number;
  questionID?: string;
  answerId?: string;
  timestamp?: string;
}

const labels: { [index: number]: string } = {
  0.5: 'Useless',
  1: 'Useless+',
  1.5: 'Poor',
  2: 'Poor+',
  2.5: 'Ok',
  3: 'Ok+',
  3.5: 'Good',
  4: 'Good+',
  4.5: 'Excellent',
  5: 'Excellent+',
};

const Comment: React.FC<Props> = ({userIds, username, text, rating = 0, answerId, questionID, timestamp }) => {
  const [currentRating, setCurrentRating] = useState<number | null>(rating);
  const [hover, setHover] = useState<number>(-1);
  const [replying, setReplying] = useState<boolean>(false);
  const [replyText, setReplyText] = useState<string>('');
  const [replies, setReplies] = useState<Reply[]>([]);
  const [participants, setParticipants] = useState<participants[]>([]);

  console.log(userIds)

  useEffect(() => {
    if (answerId) {
      fetchReplies(answerId);
    }
  }, [answerId]);

  useEffect(() => {
    fetchParticipants();
  }, []);

  const fetchReplies = async (answerId: string) => {
    try {
      const data: Reply[] = await getRepliesContent();
      const filteredReplies = data.filter((reply) => reply.answerID === answerId);
      setReplies(filteredReplies);
    } catch (e) {
      console.error("Error fetching replies:", e);
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

  const getUsernameByID = (userID: string) => {
    const user = participants.find((user) => user.id === userID);
    return user?.UserName || "Unknown User";
  };

  const handleReplyToggle = () => {
    setReplying(!replying);
  };

  const handleReplySubmit = async () => {
    if (replyText.trim() && answerId) {
      try {
        const userId = userIds || "defaultUserId";
        const currentTimestamp = new Date().toISOString();
        await postReply(answerId, replyText, userId, currentTimestamp);
        setReplyText('');
        setReplying(false);
        fetchReplies(answerId);
      } catch (error) {
        console.error("Error posting reply:", error);
      }
    } else {
      alert("Reply cannot be empty.");
    }
  };

  const handleDeleteReply = async (replyId: string) => {
    if (answerId) {
      const result = await Swal.fire({
        title: 'Are you sure?',
        text: "Do you really want to delete this reply?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!',
      });

      if (result.isConfirmed) {
        try {
          await deleteReply({ id: replyId } as Reply);
          fetchReplies(answerId);
          Swal.fire('Deleted!', 'Your reply has been deleted.', 'success');
        } catch (error) {
          console.error("Error deleting reply:", error);
          Swal.fire('Error', 'There was an error deleting the reply.', 'error');
        }
      }
    }
  };

  const handleUpdateReply = async (replyId: string, newContent: string, userId: string, answerId: string) => {
    if (answerId) {
      try {
        await updateReply({ id: replyId, ReplyContent: newContent, UserID: userId, answerID: answerId, Timestamped: new Date().toISOString() } as Reply);
        fetchReplies(answerId);
      } catch (error) {
        console.error("Error updating reply:", error);
      }
    }
  };

  const handleRatingChange = async (newValue: number | null) => {
    setCurrentRating(newValue);

    // Giữ nguyên tất cả dữ liệu và chỉ cập nhật Rating
    if (answerId) {
      const updatedRatingData: answerQuestionSlot = {
        id: answerId, 
        Rating: newValue || 0, 
        comment: text || "",    
        QuestionID: questionID || "",     
        UserID: userIds || "",     
        Replies: replies.map((reply) => reply.id),  
        Timestamped: new Date().toISOString(),
      };

      try {
        await updateRating(updatedRatingData);  // Cập nhật chỉ Rating
      } catch (error) {
        console.error("Error updating rating:", error);
      }
    }
  };

  return (
    <Paper elevation={5} sx={{ padding: 2, marginBottom: 2, width: '100%', maxWidth: '860px' }}>
      <Box display="flex" alignItems="center">
        <Avatar sx={{ marginRight: 2 }}>
          {(username || 'U').charAt(0).toUpperCase()}
        </Avatar>
        <Box flexGrow={1}>
          <Typography variant="h6">{username}</Typography>
          <Typography variant="body2" color="text.secondary">{text}</Typography>
          <Typography variant="caption" color="text.secondary">{timestamp ? new Date(timestamp).toLocaleString() : "Just now"}</Typography>
        </Box>
      </Box>

      <Box sx={{ display: 'flex', alignItems: 'center', marginTop: 2 }}>
        <Rating
          name="hover-feedback"
          value={currentRating}
          precision={0.5}
          onChange={(_event, newValue) => handleRatingChange(newValue)}
          onChangeActive={(_event, newHover) => setHover(newHover)}
          getLabelText={(value) => `${value} Star${value !== 1 ? 's' : ''}`}
          emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
        />
        <Box sx={{ ml: 2 }}>
          {hover !== -1 ? labels[hover] : labels[currentRating || 0]}
        </Box>
      </Box>

      <Box>
        {replies?.map((reply) => (
          <Replies
            userIds={reply?.UserID}
            key={reply?.id}
            replies={[reply]}
            timestamp={reply?.Timestamped ? new Date(reply?.Timestamped).toLocaleString() : "Just now"}
            username={getUsernameByID(reply?.UserID)}
            answerId={reply?.answerID}
            onDelete={handleDeleteReply}
            onUpdate={handleUpdateReply}
          />
        ))}
      </Box>

      <Box sx={{ marginTop: 2 }}>
        <Button variant="outlined" size="small" onClick={handleReplyToggle}>
          {replying ? 'Cancel' : 'Reply'}
        </Button>
      </Box>

      <Collapse in={replying} timeout="auto" unmountOnExit>
        <Box sx={{ marginTop: 2 }}>
          <TextField
            fullWidth
            multiline
            rows={3}
            variant="outlined"
            label="Your Reply"
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
          />
          <Box sx={{ marginTop: 1 }}>
            <Button variant="contained" color="primary" onClick={handleReplySubmit}>
              Submit Reply
            </Button>
          </Box>
        </Box>
      </Collapse>
    </Paper>
  );
};

export default Comment;
