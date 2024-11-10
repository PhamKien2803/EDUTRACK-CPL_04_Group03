import { useState } from 'react';
import { Box, Typography, Avatar, Paper, Rating, TextField, Button, Collapse, Divider, IconButton } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import ReplyIcon from '@mui/icons-material/Reply';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Swal from 'sweetalert2';

// Static data for comments
const comments = [
  {
    username: "Alice",
    text: "This was a helpful explanation. Thanks for the detailed insights!",
    rating: 4.5,
    timestamp: new Date().toISOString(),
    replies: [
      {
        username: "John",
        text: "Glad it helped, Alice! Let me know if you have further questions.",
        timestamp: new Date().toISOString(),
      }
    ]
  },
  {
    username: "Bob",
    text: "Could you elaborate more on state management in React? I am a bit confused about the hooks.",
    rating: 3.0,
    timestamp: new Date().toISOString(),
    replies: []
  }
];

// Rating labels
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

const Comment = () => {
  const [currentRating, setCurrentRating] = useState<number | null>(4.5);
  const [hover, setHover] = useState<number>(-1);
  const [replying, setReplying] = useState<boolean>(false);
  const [replyText, setReplyText] = useState<string>('');

  const handleReplyToggle = () => setReplying(!replying);

  const handleReplySubmit = () => {
    if (replyText.trim()) {
      // Normally, post reply to the server
      setReplyText('');
      setReplying(false);
      Swal.fire('Success', 'Your reply has been posted.', 'success');
    } else {
      Swal.fire('Warning', 'Reply cannot be empty.', 'warning');
    }
  };

  const handleRatingChange = (newValue: number | null) => setCurrentRating(newValue);

  return (
    <Box sx={{ width: '100%', maxWidth: '860px', mx: 'auto', mt: 4 }}>
      {comments.map((comment, index) => (
        <Paper key={index} elevation={3} sx={{ p: 3, mb: 2, borderRadius: 2 }}>
          <Box display="flex" alignItems="center" mb={1}>
            <Avatar sx={{ bgcolor: 'primary.main', mr: 2 }}>{comment.username.charAt(0)}</Avatar>
            <Box>
              <Typography variant="h6" sx={{ fontWeight: 'bold' }}>{comment.username}</Typography>
              <Typography variant="body2" color="text.secondary">{comment.text}</Typography>
              <Typography variant="caption" color="text.secondary">
                {comment.timestamp ? new Date(comment.timestamp).toLocaleString() : "Just now"}
              </Typography>
            </Box>
          </Box>

          <Box display="flex" alignItems="center" mt={1} mb={2}>
            <Rating
              name="hover-feedback"
              value={currentRating}
              precision={0.5}
              onChange={(_, newValue) => handleRatingChange(newValue)}
              onChangeActive={(_, newHover) => setHover(newHover)}
              emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
            />
            <Box sx={{ ml: 2, color: 'text.secondary' }}>
              {hover !== -1 ? labels[hover] : labels[currentRating || 0]}
            </Box>
          </Box>

          <Divider sx={{ my: 2 }} />

          <Box>
            <IconButton size="small" color="primary" onClick={handleReplyToggle}>
              <ReplyIcon fontSize="small" />
            </IconButton>
            <IconButton size="small" color="error">
              <DeleteIcon fontSize="small" />
            </IconButton>
            <IconButton size="small" color="primary">
              <EditIcon fontSize="small" />
            </IconButton>
          </Box>

          <Collapse in={replying} timeout="auto" unmountOnExit sx={{ mt: 2 }}>
            <TextField
              fullWidth
              multiline
              rows={2}
              variant="outlined"
              label="Your Reply"
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              sx={{ mb: 1 }}
            />
            <Button variant="contained" color="primary" onClick={handleReplySubmit}>
              Submit Reply
            </Button>
          </Collapse>

          <Box sx={{ mt: 3 }}>
            {comment.replies?.map((reply, index) => (
              <Paper key={index} elevation={1} sx={{ p: 2, mt: 2, borderRadius: 2 }}>
                <Box display="flex" alignItems="center">
                  <Avatar sx={{ bgcolor: 'secondary.main', mr: 2 }}>{reply.username.charAt(0)}</Avatar>
                  <Box>
                    <Typography variant="body2" sx={{ fontWeight: 'bold' }}>{reply.username}</Typography>
                    <Typography variant="body2" color="text.secondary">{reply.text}</Typography>
                    <Typography variant="caption" color="text.secondary">
                      {reply.timestamp ? new Date(reply.timestamp).toLocaleString() : "Just now"}
                    </Typography>
                  </Box>
                </Box>
              </Paper>
            ))}
          </Box>
        </Paper>
      ))}
    </Box>
  );
};

export default Comment;
