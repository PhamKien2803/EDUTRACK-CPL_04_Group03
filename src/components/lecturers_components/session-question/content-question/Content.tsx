import { Card, CardContent, Typography, Box, Button, IconButton, Menu, MenuItem } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useState, useEffect } from 'react';
import { questionSlot, slot } from '../../../../models/Interface';

interface Props {
    questionSlot: questionSlot[];
    slots: slot[];
    questionID: string | null;
    setSlots: (slots: slot[]) => void;
    selectedSlot: slot | null;
  }

const Content: React.FC<Props> = ({questionSlot}) => {
    const questionData = [
        { Slotid: "1", QuestionID: "101", content: "Explain the concept of state management in React.", TimeLimit: 1800 },
    ];

    const formatTime = (seconds: number) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
    };

    return (
        <div style={{ marginTop: "3rem" }}>
            <h1 style={{ fontFamily: "sans-serif", fontWeight: "bold" }}>Questions</h1>
            {questionData.length ? (
                questionData.map((question, index) => (
                    <QuestionCard key={index} question={question} formatTime={formatTime} />
                ))
            ) : (
                <Typography variant="body1" style={{ color: "#555", fontSize: "14px" }}>
                    No questions available for this slot.
                </Typography>
            )}
        </div>
    );
};

interface QuestionSlot {
    Slotid: string;
    QuestionID: string;
    content: string;
    TimeLimit: number;
}

interface QuestionCardProps {
    question: QuestionSlot;
    formatTime: (seconds: number) => string;
}

const QuestionCard: React.FC<QuestionCardProps> = ({ question, formatTime }) => {
    const defaultTime = 1800; // 30 minutes in seconds
    const storageKey = `timer-${question.QuestionID}`;
    
    const getSavedTime = () => {
        const savedTimeData = localStorage.getItem(storageKey);
        if (savedTimeData) {
            const { timeRemaining, isActive } = JSON.parse(savedTimeData);
            return { timeRemaining, isActive };
        }
        return { timeRemaining: defaultTime, isActive: false };
    };

    const [timeRemaining, setTimeRemaining] = useState<number>(getSavedTime().timeRemaining);
    const [timerActive, setTimerActive] = useState<boolean>(getSavedTime().isActive);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    useEffect(() => {
        let timer: number;
        if (timerActive && timeRemaining > 0) {
            timer = window.setInterval(() => {
                setTimeRemaining((prevTime) => prevTime - 1);
            }, 1000);
        } else if (timeRemaining <= 0) {
            setTimerActive(false);
        }

        // Save timer state to local storage on every update
        localStorage.setItem(storageKey, JSON.stringify({ timeRemaining, isActive: timerActive }));
        
        return () => window.clearInterval(timer);
    }, [timerActive, timeRemaining]);

    const handleStart = () => {
        setTimerActive(true);
        if (timeRemaining === defaultTime) {
            setTimeRemaining(defaultTime);
        }
    };

    const handleStop = () => {
        setTimerActive(false);
    };

    const handleRestart = () => {
        setTimeRemaining(defaultTime);
        setTimerActive(true);
        handleMenuClose();
    };

    const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    return (
        <Card style={{
            border: "1px solid lightgray",
            borderRadius: "20px",
            maxWidth: "850px",
            marginBottom: "1rem",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            overflow: "hidden"
        }}>
            <CardContent style={{
                backgroundColor: "rgb(250, 246, 246)",
                padding: "16px",
                fontFamily: "'Poppins', sans-serif"
            }}>
                <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Typography variant="h6" component="div" style={{ color: '#3a3a3a', marginBottom: '8px' }}>
                        Content
                    </Typography>
                    <Typography variant="h6" component="div" style={{ color: '#3a3a3a', fontWeight: 'bold' }}>
                        {formatTime(timeRemaining)}
                    </Typography>
                </Box>
                <hr style={{ border: "1px solid lightgray", margin: "8px auto" }} />
                <Typography variant="body2" style={{ color: "#555", fontSize: "14px" }}>
                    {question.content}
                </Typography>

                <Box mt={2} display="flex" justifyContent="flex-end" alignItems="center" gap={1}>
                    {!timerActive ? (
                        <Button variant="contained" color="primary" onClick={handleStart}>
                            Start Question
                        </Button>
                    ) : (
                        <>
                            <Button variant="contained" color="secondary" onClick={handleStop}>
                                Stop Question
                            </Button>
                            <IconButton onClick={handleMenuOpen}>
                                <MoreVertIcon />
                            </IconButton>
                            <Menu
                                anchorEl={anchorEl}
                                open={Boolean(anchorEl)}
                                onClose={handleMenuClose}
                            >
                                <MenuItem onClick={handleRestart}>Restart Time</MenuItem>
                            </Menu>
                        </>
                    )}
                </Box>
            </CardContent>
        </Card>
    );
};

export default Content;
