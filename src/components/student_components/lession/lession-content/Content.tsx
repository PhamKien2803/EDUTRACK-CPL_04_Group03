import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
    Box,
    Typography,
    Button,
    Collapse,
    List,
    ListItem,
    ListItemText,
    ListItemIcon,
    Divider
} from '@mui/material';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import { lession as Lession, slot as Slot, questionSlot as QuestionSlot } from "../../../../models/Interface"

// interface Lession {
//     id: string;
//     SemesterID: string;
//     SlotID: string[];
//     CourseID: string;
//     StudentID: string;
//     LecturersID: string;
//     ClassID: string;
// }

// interface Slot {
//     id: string;
//     SlotName: string;
//     Description: string;
//     TimeStart: string;
//     TimeEnd: string;
//     Status: boolean;
// }

// interface QuestionSlot {
//     QuestionID: string;
//     content: string;
//     TimeLimit?: number;
//     Slotid: string;
//     Status: number;
// }

interface Props {
    lession: Lession;
    slot: Slot[];
    questionSlot: QuestionSlot[];
}

const Content: React.FC<Props> = ({ lession, slot, questionSlot }) => {
    const [visibleSlots, setVisibleSlots] = useState<{ [key: string]: boolean }>({});
    const navigate = useNavigate();

    const handleClicktoDiscussion = (questionid: string, slotId: string) => {
        navigate(`/dicussion-page/question?slotID=${slotId}&questionid=${questionid}`);
    };

    const toggleVisibility = (slotId: string) => {
        setVisibleSlots((prev) => ({
            ...prev,
            [slotId]: !prev[slotId],
        }));
    };

    return (
        <Box>
            {lession?.SlotID?.map((sl, index) => {
                const currentSlot = slot.find((s) => s.id === sl);

                return (
                    <Box key={`slot-${index}`} mb={2} p={2} border={1} borderRadius={2} borderColor="grey.300" boxShadow={1} onClick={() => toggleVisibility(sl)}>
                        {/* Slot Header */}
                        <Box display="flex" justifyContent="space-between" alignItems="center" >
                            <Typography variant="h6" component="div">
                                {currentSlot?.SlotName}
                            </Typography>
                            <Box display="flex" alignItems="center" gap={2}>
                                <Typography variant="body2" color="textSecondary">
                                    {currentSlot?.TimeStart} - {currentSlot?.TimeEnd}
                                </Typography>
                                <Button
                                    component={Link}
                                    to={`/lession-infor/details/${sl}`}
                                    variant="outlined"
                                    color="secondary"
                                    size="small"
                                >
                                    View Slot
                                </Button>
                            </Box>
                        </Box>

                        <Typography variant="body1" color="textSecondary" mt={1} mb={1}>
                            {currentSlot?.Description}
                        </Typography>

                        {/* Questions Collapse */}
                        <Collapse in={visibleSlots[sl]}>
                            <Divider sx={{ my: 2 }} />
                            <Typography variant="subtitle1" color="primary" gutterBottom>
                                Questions:
                            </Typography>
                            <List>
                                {questionSlot
                                    .filter((qs) => qs.Slotid === sl)
                                    .map((qs, qIndex) => (
                                        <ListItem
                                            key={`qs-${qIndex}`}
                                            component="li"
                                            onClick={() => handleClicktoDiscussion(qs.QuestionID, sl)}
                                            sx={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                cursor: 'pointer',
                                                '&:hover': {
                                                    backgroundColor: 'rgba(0, 123, 255, 0.1)',
                                                    transform: 'scale(1.02)',
                                                },
                                                transition: 'background-color 0.3s, transform 0.3s',
                                            }}
                                        >
                                            <ListItemIcon>
                                                <HelpOutlineIcon color="action" />
                                            </ListItemIcon>
                                            <ListItemText
                                                primary={`Q${qIndex + 1}: ${qs.content.substring(0, 50)}...`}
                                                secondary={qs.Status === 0 ? 'Not started' : 'Go'}
                                                secondaryTypographyProps={{
                                                    color: qs.Status === 0 ? 'error' : 'success',
                                                    fontWeight: 'bold',
                                                }}
                                            />
                                            <ArrowForwardIosIcon fontSize="small" color="action" />
                                        </ListItem>
                                    ))}
                            </List>
                        </Collapse>
                    </Box>
                );
            })}
        </Box>
    );
};

export default Content;
