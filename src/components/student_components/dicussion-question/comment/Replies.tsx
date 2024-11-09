import React, { useState } from 'react';
import { Box, Typography, Avatar, Paper, IconButton, TextField, Menu, MenuItem, Button } from '@mui/material';
import { replies as Reply } from '../../../../models/Interface';
import MoreVertIcon from '@mui/icons-material/MoreVert';

interface RepliesProps {
  userIds?: string;
  replies: Reply[];
  username?: string;
  answerId: string;
  userid?: string;
  timestamp?: string;
  onDelete: (replyId: string) => void;
  onUpdate: (replyId: string, newContent: string, userId: string, answerId: string) => void;
}

const Replies: React.FC<RepliesProps> = ({ replies, username = 'User', userIds, answerId, onDelete, onUpdate, timestamp }) => {
  const [editMode, setEditMode] = useState<string | null>(null);
  const [editText, setEditText] = useState<string>('');
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedReplyId, setSelectedReplyId] = useState<string | null>(null);

  console.log(userIds)
  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, replyId: string) => {
    setAnchorEl(event.currentTarget);
    setSelectedReplyId(replyId);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedReplyId(null);
  };

  const handleEdit = (replyId: string, currentContent: string) => {
    setEditMode(replyId);
    setEditText(currentContent);
    handleMenuClose();
  };

  const handleSave = (replyId: string) => {
    if (editText.trim() !== '') {
      onUpdate(replyId, editText, userIds || '', answerId);
      setEditMode(null);
      setEditText('');
    } else {
      alert("Reply cannot be empty.");
    }
  };

  const handleCancel = () => {
    setEditMode(null);
    setEditText('');
  };


  return (
    <Box sx={{ marginTop: 2 }}>
      {replies.map((reply) => (
        <Paper
          key={reply?.id}
          sx={{
            padding: 2,
            marginBottom: 2,
            backgroundColor: editMode === reply?.id ? '#e3f2fd' : '#ffffff',
            position: 'relative',
            borderRadius: 2,
            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.2)',
            transition: 'background-color 0.3s ease',
          }}
        >
          <Box display="flex" alignItems="center">
            <Avatar sx={{ marginRight: 2, width: 32, height: 32, fontSize: '0.875rem', bgcolor: '#1976d2' }}>
              {username.charAt(0).toUpperCase()}
            </Avatar>
            <Box flex={1}>
              <Typography variant="body2" fontWeight="bold" color="text.primary">
                {username}
              </Typography>
              {editMode === reply?.id ? (
                <TextField
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                  fullWidth
                  variant="outlined"
                  size="small"
                  sx={{
                    marginTop: 1,
                    marginBottom: 1,
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 1,
                    },
                  }}
                />
              ) : (
                <Typography variant="body2" color="text.secondary" sx={{ marginTop: 0.5 }}>
                  {reply?.ReplyContent}
                </Typography>
              )}
              <Typography variant="caption" color="text.secondary">{timestamp}</Typography>
            </Box>

            {editMode === reply?.id ? (
              <Box sx={{ position: 'absolute', top: 8, right: 8 }}>
                <Button
                  variant="contained"
                  color="secondary"
                  size="small"
                  onClick={() => handleSave(reply?.id)}
                  sx={{
                    marginRight: 1,
                    padding: '4px 12px',
                    textTransform: 'none',
                    fontSize: '0.8rem',
                  }}
                >
                  Save
                </Button>
                <Button
                  variant="outlined"
                  color="primary"
                  size="small"
                  onClick={handleCancel}
                  sx={{
                    padding: '4px 12px',
                    textTransform: 'none',
                    fontSize: '0.8rem',
                  }}
                >
                  Cancel
                </Button>
              </Box>
            ) : (
              <IconButton onClick={(event) => handleMenuOpen(event, reply?.id)}>
                <MoreVertIcon sx={{ color: '#555' }} />
              </IconButton>
            )}
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl) && selectedReplyId === reply?.id}
              onClose={handleMenuClose}
              PaperProps={{
                sx: { borderRadius: 1, boxShadow: '0 1px 3px rgba(0, 0, 0, 0.15)' },
              }}
            >
              <MenuItem onClick={() => handleEdit(reply?.id, reply.ReplyContent)} sx={{ fontSize: '0.875rem' }}>
                Edit
              </MenuItem>
              <MenuItem onClick={() => onDelete(reply?.id)} sx={{ fontSize: '0.875rem', color: '#d32f2f' }}>
                Delete
              </MenuItem>
            </Menu>
          </Box>
        </Paper>
      ))}
    </Box>
  );
};

export default Replies;