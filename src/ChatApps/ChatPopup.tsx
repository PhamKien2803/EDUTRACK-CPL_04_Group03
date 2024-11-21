import React, { useState } from 'react';
import {
    Box,
    Button,
    Typography,
    TextField,
    IconButton,
    Avatar,
    Divider,
    List,
    ListItem,
    ListItemText,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';

const ChatPopup: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<string[]>([]);
    const [inputMessage, setInputMessage] = useState('');

    const toggleChat = () => setIsOpen(!isOpen);

    const handleSendMessage = () => {
        if (inputMessage.trim()) {
            setMessages([...messages, inputMessage]);
            setInputMessage('');
        }
    };

    return (
        <Box
            sx={{
                position: 'fixed',
                bottom: 20,
                right: 20,
                width: isOpen ? 350 : 60,
                height: isOpen ? 500 : 60,
                backgroundColor: '#fff',
                borderRadius: '15px',
                boxShadow: 3,
                display: 'flex',
                flexDirection: 'column',
                overflow: 'hidden',
                transition: 'all 0.3s ease',
            }}
        >
            {/* Header */}
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    p: 1,
                    backgroundColor: '#3f51b5',
                    color: '#fff',
                }}
            >
                {isOpen ? (
                    <>
                        <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                            Chat with Teachers
                        </Typography>
                        <IconButton size="small" onClick={toggleChat} sx={{ color: '#fff' }}>
                            <CloseIcon />
                        </IconButton>
                    </>
                ) : (
                    <IconButton size="small" onClick={toggleChat} sx={{ color: '#fff' }}>
                        <ChatBubbleOutlineIcon />
                    </IconButton>
                )}
            </Box>

            {/* Chat Messages */}
            {isOpen && (
                <>
                    <Box
                        sx={{
                            flex: 1,
                            overflowY: 'auto',
                            padding: 2,
                        }}
                    >
                        <List>
                            {messages.map((msg, index) => (
                                <ListItem key={index}>
                                    <Avatar
                                        alt="User"
                                        src={`https://i.pravatar.cc/150?img=${index + 1}`}
                                        sx={{ marginRight: 1 }}
                                    />
                                    <ListItemText primary={msg} />
                                </ListItem>
                            ))}
                        </List>
                    </Box>

                    <Divider />

                    {/* Input Area */}
                    <Box
                        sx={{
                            p: 1,
                            display: 'flex',
                            alignItems: 'center',
                        }}
                    >
                        <TextField
                            fullWidth
                            size="small"
                            placeholder="Type a message..."
                            variant="outlined"
                            value={inputMessage}
                            onChange={(e) => setInputMessage(e.target.value)}
                        />
                        <Button
                            variant="contained"
                            color="primary"
                            sx={{ ml: 1 }}
                            onClick={handleSendMessage}
                        >
                            Send
                        </Button>
                    </Box>
                </>
            )}
        </Box>
    );
};

export default ChatPopup;
