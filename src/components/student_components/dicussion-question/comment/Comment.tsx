import React, { useState, useEffect } from 'react';
import { Box, Typography, Avatar, Paper, Rating, TextField, Button, Collapse } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import Replies from './Replies';
import Swal from 'sweetalert2';
import { replies as Reply, participants } from '../../../../models/Interface';
import { getParticipants, getRepliesContent, postReply, updateReply, deleteReply, updateRating } from '../../../../service/ApiService';
import { useSelector } from 'react-redux';

interface Props {
  userIds: string;
  username: string;
  text?: string;
  time?: string;
  rating?: number;
  questionID?: string;
  answerId?: string;
  timestamp?: string;
  settingStatus: number; // 1: only show replies of the user, 2: show all replies but no reply option, 0: full permissions
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

const Comment: React.FC<Props> = ({ userIds, username, text, rating = 0, answerId, questionID, timestamp, settingStatus }) => {
  const [currentRating, setCurrentRating] = useState<number | null>(rating);
  const [hover, setHover] = useState<number>(-1);
  const [replying, setReplying] = useState<boolean>(false);
  const [replyText, setReplyText] = useState<string>('');
  const [replies, setReplies] = useState<Reply[]>([]);
  const [participants, setParticipants] = useState<participants[]>([]);
  const [filteredReplies, setFilteredReplies] = useState<Reply[]>([]);
  const loggedInUserId = useSelector((state: { account: { account: { UserID: string } } }) => state.account.account.UserID);

  // Fetching replies based on the answerId
  useEffect(() => {
    if (answerId) fetchReplies(answerId);
  }, [answerId]);

  // Fetching participants when the component loads
  useEffect(() => {
    fetchParticipants();
  }, []);

  // Fetch replies
  const fetchReplies = async (answerId: string) => {
    try {
      const data: Reply[] = await getRepliesContent();
      setReplies(data.filter((reply) => reply.answerID === answerId));
    } catch (e) {
      console.error("Error fetching replies:", e);
    }
  };

  // Fetch participants
  const fetchParticipants = async () => {
    try {
      const res: participants[] = await getParticipants();
      setParticipants(res);
    } catch (error) {
      console.log(error);
    }
  };

  // Get username by user ID
  const getUsernameByID = (userID: string) => participants.find((user) => user.id === userID)?.UserName || "Unknown User";

  // Toggle reply input
  const handleReplyToggle = () => setReplying(!replying);

  // Handle reply submission
  const handleReplySubmit = async () => {
    if (!replyText.trim() || !answerId) return;
    try {
      await postReply(answerId, replyText, loggedInUserId, new Date().toISOString());
      setReplyText('');
      setReplying(false);
      fetchReplies(answerId);
    } catch (error) {
      console.error("Error posting reply:", error);
    }
  };

  // Handle deleting a reply
  const handleDeleteReply = async (replyId: string) => {
    if (!answerId) return;
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
  };

  // Handle updating a reply
  const handleUpdateReply = async (replyId: string, newContent: string, userId: string, answerId: string) => {
    try {
      await updateReply({ id: replyId, ReplyContent: newContent, UserID: userId, answerID: answerId, Timestamped: new Date().toISOString() } as Reply);
      fetchReplies(answerId);
    } catch (error) {
      console.error("Error updating reply:", error);
    }
  };

  // Handle rating changes
  const handleRatingChange = async (newValue: number | null) => {
    setCurrentRating(newValue);
    if (!answerId) return;
    try {
      await updateRating({
        id: answerId,
        Rating: newValue || 0,
        comment: text || "",
        QuestionID: questionID || "",
        UserID: userIds || "",
        Replies: replies.map((reply) => reply.id),
        Timestamped: new Date().toISOString(),
      });
    } catch (error) {
      console.error("Error updating rating:", error);
    }
  };

  useEffect(() => {
    if (settingStatus === 1) {
      setFilteredReplies(replies.filter((reply) => reply.UserID === loggedInUserId)); 
    } else if (settingStatus === 2) {
      setFilteredReplies(replies); 
    } else {
      setFilteredReplies(replies); 
    }
  }, [settingStatus, replies, loggedInUserId]);

  const isReplyingDisabled = settingStatus === 2 || (settingStatus === 1 && loggedInUserId !== userIds);
  // const isReplyingDisabled = settingStatus === 2

  return (
    <Paper elevation={5} sx={{ padding: 2, marginBottom: 2, width: '100%', maxWidth: '860px' }}>
      <Box display="flex" alignItems="center">
        <Avatar sx={{ marginRight: 2 }}>{(username || 'U').charAt(0).toUpperCase()}</Avatar>
        <Box flexGrow={1}>
          <Typography variant="h6">{username}</Typography>
          <Typography variant="body2" color="text.secondary">{text}</Typography>
          <Typography variant="caption" color="text.secondary">
            {timestamp ? new Date(timestamp).toLocaleString() : "Just now"}
          </Typography>
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
        <Box sx={{ ml: 2 }}>{labels[hover >= 0 ? hover : currentRating || 0]}</Box>
      </Box>

      <Box>
        {filteredReplies.map((reply) => (
          <Replies
            key={reply.id}
            userIds={reply.UserID}
            replies={[reply]}
            timestamp={reply.Timestamped ? new Date(reply.Timestamped).toLocaleString() : "Just now"}
            username={getUsernameByID(reply.UserID)}
            answerId={reply.answerID}
            onDelete={reply.UserID === loggedInUserId && !isReplyingDisabled ? handleDeleteReply : undefined}
            onUpdate={reply.UserID === loggedInUserId && !isReplyingDisabled ? handleUpdateReply : undefined}
          />
        ))}
      </Box>

      {!isReplyingDisabled && (
        <Box sx={{ marginTop: 2 }}>
          <Button variant="outlined" size="small" onClick={handleReplyToggle}>
            {replying ? 'Cancel' : 'Reply'}
          </Button>
        </Box>
      )}

      {!isReplyingDisabled && (
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
              <Button variant="contained" color="primary" onClick={handleReplySubmit} disabled={!replyText.trim()}>
                Submit Reply
              </Button>
            </Box>
          </Box>
        </Collapse>
      )}
    </Paper>
  );
};

export default Comment;
