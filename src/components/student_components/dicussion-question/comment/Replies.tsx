import React from 'react';
import { Box, Typography, Avatar, Paper } from '@mui/material';
import { Reply } from '../../../../models/Interface';



interface RepliesProps {
  replies: Reply[];
  username?: string;
}

const Replies: React.FC<RepliesProps> = ({ replies, username }) => {
  return (
    <Box sx={{ marginTop: 2 }}>
      {replies.map((reply) => (
        <Paper key={reply?.ReplyID} sx={{ padding: 1, marginBottom: 1, backgroundColor: '#f9f9f9' }}>
          <Box display="flex" alignItems="center">
            <Avatar sx={{ marginRight: 2, width: 24, height: 24 }}>
              {(username || 'U').charAt(0).toUpperCase()}
            </Avatar>
            <Box>
              <Typography variant="body2" color="text.primary">
                {username}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {reply?.ReplyContent}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {/* {new Date(reply?.timestamp).toLocaleString()} */}
              </Typography>
            </Box>
          </Box>
        </Paper>
      ))}
    </Box>
  );
};

export default Replies;
