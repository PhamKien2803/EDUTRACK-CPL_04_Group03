import React, { useState, useEffect } from 'react';
import { Box, Typography, Avatar, Paper, Rating, TextField, Button, Collapse } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import Swal from 'sweetalert2';
import { replies as Reply, participants } from '../../../../models/Interface';
import { getParticipants, getRepliesContent, postReply, updateReply, deleteReply, updateRating } from '../../../../service/ApiService';
import { useSelector } from 'react-redux';
import ReplyComment from './ReplyComment';
import { useTranslation } from 'react-i18next';
import { t } from 'i18next';

interface Props {
  userIds: string;
  username: string;
  text?: string;
  time?: string;
  rating?: number;
  questionID?: string;
  answerId?: string;
  timestamp?: string;
}

const labels: { [index: number]: string } = {
  0.5: t('Useless', { defaultValue: 'Useless' }),
  1: t('Useless+', { defaultValue: 'Useless+' }),
  1.5: t('Poor', { defaultValue: 'Poor' }),
  2: t('Poor+', { defaultValue: 'Poor+' }),
  2.5: t('Ok', { defaultValue: 'Ok' }),
  3: t('Ok+', { defaultValue: 'Ok+' }),
  3.5: t('Good', { defaultValue: 'Good' }),
  4: t('Good+', { defaultValue: 'Good+' }),
  4.5: t('Excellent', { defaultValue: 'Excellent' }),
  5: t('Excellent+', { defaultValue: 'Excellent+' }),
};

const Comment: React.FC<Props> = ({ userIds, username, text, rating = 0, answerId, questionID, timestamp }) => {
  const [currentRating, setCurrentRating] = useState<number | null>(rating);
  const [hover, setHover] = useState<number>(-1);
  const [replying, setReplying] = useState<boolean>(false);
  const [replyText, setReplyText] = useState<string>('');
  const [replies, setReplies] = useState<Reply[]>([]);
  const [participants, setParticipants] = useState<participants[]>([]);
  const loggedInUserId = useSelector((state: { account: { account: { UserID: string } } }) => state.account.account.UserID);
  const { t } = useTranslation();
  useEffect(() => {
    if (answerId) fetchReplies(answerId);
  }, [answerId]);

  useEffect(() => {
    fetchParticipants();
  }, []);

  const fetchReplies = async (answerId: string) => {
    try {
      const data: Reply[] = await getRepliesContent();
      setReplies(data.filter((reply) => reply.answerID === answerId));
    } catch (e) {
      console.error(t('Error fetching replies:', { defaultValue: 'Error fetching replies:' }), e);
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

  const getUsernameByID = (userID: string) => participants.find((user) => user.id === userID)?.UserName || "Unknown User";

  const handleReplyToggle = () => setReplying(!replying);

  const handleReplySubmit = async () => {
    if (!replyText.trim() || !answerId) return;
    try {
      await postReply(answerId, replyText, loggedInUserId, new Date().toISOString());
      setReplyText('');
      setReplying(false);
      fetchReplies(answerId);
    } catch (error) {
      console.error(t('Error posting reply:', { defaultValue: 'Error posting reply:' }), error);
    }
  };

  const handleDeleteReply = async (replyId: string) => {
    if (!answerId) return;
    const result = await Swal.fire({
      title: t('Are you sure?', { defaultValue: 'Are you sure?' }),
      text: t('Do you really want to delete this reply?', { defaultValue: 'Do you really want to delete this reply?' }),
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: t('Yes, delete it!', { defaultValue: 'Just now' }),
    });

    if (result.isConfirmed) {
      try {
        await deleteReply({ id: replyId } as Reply);
        fetchReplies(answerId);
        Swal.fire(t('Deleted!', { defaultValue: 'Deleted!' }), t('Your reply has been deleted.', { defaultValue: 'Your reply has been deleted.' }), 'success');
      } catch (error) {
        console.error("Error deleting reply:", error);
        Swal.fire(t('Error', { defaultValue: 'Error' }), t('There was an error deleting the reply.', { defaultValue: 'There was an error deleting the reply.' }), 'error');
      }
    }
  };

  const handleUpdateReply = async (replyId: string, newContent: string, userId: string, answerId: string) => {
    try {
      await updateReply({ id: replyId, ReplyContent: newContent, UserID: userId, answerID: answerId, Timestamped: new Date().toISOString() } as Reply);
      fetchReplies(answerId);
    } catch (error) {
      console.error(t('Error updating reply:', { defaultValue: 'Error updating reply:' }), error);
    }
  };

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
      console.error(t('Error updating rating:', { defaultValue: 'Error updating rating:' }), error);
    }
  };

  return (
    <Paper elevation={5} sx={{ padding: 2, marginBottom: 2, width: '100%', maxWidth: '860px' }}>
      <Box display="flex" alignItems="center">
        <Avatar sx={{ marginRight: 2 }}>{(username || 'U').charAt(0).toUpperCase()}</Avatar>
        <Box flexGrow={1}>
          <Typography variant="h6">{username}</Typography>
          <Typography variant="body2" color="text.secondary">{text}</Typography>
          <Typography variant="caption" color="text.secondary">
            {timestamp ? new Date(timestamp).toLocaleString() : t('Just now', { defaultValue: 'Just now' })}
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
        {replies.map((reply) => (
          <ReplyComment
            key={reply.id}
            userIds={reply.UserID}
            replies={[reply]}
            timestamp={reply.Timestamped ? new Date(reply.Timestamped).toLocaleString() : t('Just now', { defaultValue: 'Just now' })}
            username={getUsernameByID(reply.UserID)}
            answerId={reply.answerID}
            onDelete={reply.UserID === loggedInUserId ? handleDeleteReply : undefined}
            onUpdate={reply.UserID === loggedInUserId ? handleUpdateReply : undefined}
          />
        ))}
      </Box>

      <Box sx={{ marginTop: 2 }}>
        <Button variant="outlined" size="small" onClick={handleReplyToggle}>
          {replying ? t('Cancel', { defaultValue: 'Cancel' }) : t('Reply', { defaultValue: 'Reply' })}
        </Button>
      </Box>

      <Collapse in={replying} timeout="auto" unmountOnExit>
        <Box sx={{ marginTop: 2 }}>
          <TextField
            fullWidth
            multiline
            rows={3}
            variant="outlined"
            label={t('Your Reply', { defaultValue: 'Your Reply' })}
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
          />
          <Box sx={{ marginTop: 1 }}>
            <Button variant="contained" color="primary" onClick={handleReplySubmit} disabled={!replyText.trim()}>
              {t('Submit Reply', { defaultValue: 'Submit Reply' })}
            </Button>
          </Box>
        </Box>
      </Collapse>
    </Paper>
  );
};

export default Comment;
