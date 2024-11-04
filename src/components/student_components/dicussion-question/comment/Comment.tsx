import { useState } from 'react';
import { Box, Typography, Avatar, Paper, Rating, TextField, Button } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';

interface Props {
  username?: string;
  text?: string;
  time?: string;
  rating?: number;
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

const Comment: React.FC<Props> = ({ username, text, time, rating = 0 }) => {
  const [currentRating, setCurrentRating] = useState<number | null>(rating);
  const [hover, setHover] = useState<number>(-1);
  const [replying, setReplying] = useState<boolean>(false);
  const [replyText, setReplyText] = useState<string>('');

  const handleReplyToggle = () => {
    setReplying(!replying);
  };

  const handleReplySubmit = () => {
    if (replyText.trim()) {
      console.log("Reply:", replyText);
      setReplyText('');
      setReplying(false);
    } else {
      alert("Reply cannot be empty.");
    }
  };

  return (
    <Paper
      elevation={5}
      sx={{ padding: 2, marginBottom: 2, width: '100%', maxWidth: '860px' }}
    >
      <Box display="flex" alignItems="center">
        <Avatar sx={{ marginRight: 2 }}>
          {(username || 'U').charAt(0).toUpperCase()}
        </Avatar>
        <Box flexGrow={1}>
          <Typography variant="h6">
            {username}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {text}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {time}
          </Typography>
        </Box>
      </Box>

      {/* Display Rating */}
      <Box sx={{ display: 'flex', alignItems: 'center', marginTop: 2 }}>
        <Rating
          name="hover-feedback"
          value={currentRating}
          precision={0.5}
          onChange={(_event, newValue) => setCurrentRating(newValue)}
          onChangeActive={(_event, newHover) => setHover(newHover)}
          getLabelText={(value) => `${value} Star${value !== 1 ? 's' : ''}`}
          emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
        />
        <Box sx={{ ml: 2 }}>
          {hover !== -1 ? labels[hover] : labels[currentRating || 0]}
        </Box>
      </Box>

      {/* Reply Section */}
      <Box sx={{ marginTop: 2 }}>
        <Button variant="outlined" size="small" onClick={handleReplyToggle}>
          {replying ? 'Cancel' : 'Reply'}
        </Button>
      </Box>

      {replying && (
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
      )}
    </Paper>
  );
};

export default Comment;
