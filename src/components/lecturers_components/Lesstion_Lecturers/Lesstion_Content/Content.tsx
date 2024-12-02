import React, { useState, useCallback } from 'react';
import { useNavigate } from "react-router-dom";
import {
    Card, Typography, Button, Grid, List, ListItem, Divider, Box,
    Select, MenuItem, Link, ListItemIcon, ListItemText, Collapse
} from '@mui/material';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import { assignmentSlot, classRoom, courses, lession, participants, questionSlot, slot } from '../../../../models/Interface';
import { useTranslation } from 'react-i18next';

interface Props {
    questionSlot: questionSlot[];
    assignmentSlot: assignmentSlot[];
    slot: slot[];
    lession: lession;
    participants: participants[];
    classes: classRoom[];
    courses: courses[];
    setclassId: (id: string) => void;
    classId: string;
}

const Content: React.FC<Props> = ({ questionSlot, slot, lession, participants, classes, setclassId, classId }) => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const [visibleSlots, setVisibleSlots] = useState<{ [key: string]: boolean }>({});
    const [updatedQuestions, setUpdatedQuestions] = useState(questionSlot);
    console.log(setUpdatedQuestions)
    const toggleVisibility = useCallback((slotId: string) => {
        setVisibleSlots((prev) => ({
            ...prev,
            [slotId]: !prev[slotId],
        }));
    }, []);

    const handleClickToAssignment = (assignmentId: string, slotId: string) => {
        navigate(`/lecturer/session-assignment?Slotid=${slotId}&assignmentid=${assignmentId}`);
    };

    return (
        <div style={{ overflowX: 'hidden', padding: '16px', background: 'linear-gradient(to bottom, #f9f9f9, #ffffff)' }}>
            <main>
                <Grid container spacing={3}>
                    {/* Left Panel */}
                    <Grid item xs={12} md={7.5}>
                        {lession.SlotID.map((item, index) => (
                            <Box
                                key={`slot-grid-${index}`}
                                mb={2}
                                p={2}
                                borderRadius={2}
                                sx={{
                                    border: visibleSlots[item] ? '2px solid purple' : '1px solid #ddd',
                                    boxShadow: visibleSlots[item] ? '0 6px 12px rgba(0, 0, 0, 0.1)' : '0 2px 4px rgba(0, 0, 0, 0.1)',
                                    cursor: 'pointer',
                                    transition: 'all 0.3s ease-in-out',
                                    '&:hover': {
                                        borderColor: 'purple',
                                        boxShadow: '0 6px 12px rgba(0, 0, 0, 0.2)',
                                    },
                                }}
                                onClick={() => toggleVisibility(item)}
                            >
                                <Box bgcolor="grey.100" borderRadius="8px" p={2}>
                                    <Box display="flex" justifyContent="space-between" alignItems="center">
                                        <Box
                                            sx={{
                                                display: 'inline-block',
                                                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', 
                                                borderRadius: 2.5, 
                                                padding: '8px 16px', 
                                                backgroundColor: '#b39ddb', 
                                            }}
                                        >
                                            <Typography variant="subtitle2" color="black" fontSize={15}>
                                                {t('Slot')} {index + 1}
                                            </Typography>
                                        </Box>{t('Questions')}

                                        <Box display="flex" alignItems="center" gap={2}>
                                            <Typography variant="body2" color="textSecondary">
                                                {slot.find(sl => sl.id === item)?.TimeStart} - {slot.find(sl => sl.id === item)?.TimeEnd}
                                            </Typography>
                                            <Link href={`/lecturer/session-details?Slotid=${item}&classid=${classId}`}>
                                                <Button variant="outlined" color="secondary" size="small">
                                                {t('UpdateSlot')}
                                                </Button>
                                            </Link>
                                        </Box>
                                    </Box>
                                    <Typography variant="body1" color="textSecondary" mt={1} mb={1} fontWeight="bold">
                                        {slot.find(sl => sl.id === item)?.Description.split('\n').map((line, lineIndex) => (
                                            <React.Fragment key={lineIndex}>
                                                {line}
                                                <br />
                                            </React.Fragment>
                                        ))}
                                    </Typography>
                                </Box>
                                <Divider sx={{ my: 2 }} />
                                <Collapse in={visibleSlots[item]}>
                                    <Typography variant="subtitle1" color="primary" gutterBottom>
                                    {t('Questions')}:
                                    </Typography>
                                    <List>
                                        {updatedQuestions
                                            .filter((qs) => qs.Slotid === item)
                                            .map((qs, qIndex) => (
                                                <ListItem
                                                    key={`qs-${qIndex}`}
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
                                                    <Link
                                                        href={`/lecturer/session-question?slotid=${item}&Questionid=${qs.id}`}
                                                        style={{ textDecoration: 'none', flexGrow: 1 }}
                                                    >
                                                        <ListItemText
                                                            primary={`Q${qIndex + 1}: ${qs.content.substring(0, 50)}...`}
                                                            secondary={qs.Status === 0 ? t("NotStarted") : t("OnGoing")}
                                                            secondaryTypographyProps={{
                                                                color: qs.Status === 0 ? 'error' : 'success',
                                                                fontWeight: 'bold',
                                                            }}
                                                        />
                                                    </Link>
                                                    <ArrowForwardIosIcon fontSize="small" color="action" />
                                                </ListItem>
                                            ))}
                                    </List>
                                    <Divider sx={{ my: 2 }} />
                                    <Typography variant="subtitle1" color="primary" gutterBottom>
                                    {t('Assignments')}
                                    </Typography>
                                    <List>
                                        {slot
                                            .filter((sl) => sl.id === item)
                                            .map((sl, slIndex) => (
                                                <ListItem
                                                    key={`assignment-${slIndex}`}
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
                                                    <Link
                                                        onClick={() => handleClickToAssignment(sl.id, item)}
                                                        style={{ textDecoration: 'none', flexGrow: 1 }}
                                                    >
                                                        <ListItemText
                                                            primary={`Assignment ${slIndex + 1}`}
                                                            secondary={t('ClickToViewDetails')}
                                                            secondaryTypographyProps={{
                                                                color: 'primary',
                                                                fontWeight: 'bold',
                                                            }}
                                                        />
                                                    </Link>
                                                    <ArrowForwardIosIcon fontSize="small" color="action" />
                                                </ListItem>
                                            ))}
                                    </List>
                                </Collapse>
                            </Box>
                        ))}
                    </Grid>

                    {/* Right Panel */}
                    <Grid item xs={12} md={4}>
                        <Card variant="outlined" sx={{ p: 3, borderRadius: 2, boxShadow: 3 }}>
                            <Typography variant="h6">{t('Class')}</Typography>
                            <Select
                                variant="outlined"
                                sx={{ minWidth: 200 }}
                                onChange={(e) => setclassId(e.target.value)}
                                size="small"
                                displayEmpty
                                value={lession.ClassID || ''}
                            >
                                {classes.map((cls, index) => (
                                    <MenuItem key={index} value={cls.ClassID}>
                                        {cls.ClassName}
                                    </MenuItem>
                                ))}
                            </Select>
                            <Divider sx={{ my: 2 }} />
                            <Typography variant="body2">20 {t('Students')}</Typography>
                            <Typography variant="body2">20 {t('Slots')}</Typography>
                            <Divider style={{ margin: '10px 0' }} />
                            <Typography variant="body2">

                                {t('StartDate')} 17:00 02/01/2023</Typography>

                            <div style={{ marginTop: '20px' }}>
                                <Typography variant="body1">{t('Lecturer')}:</Typography>
                                <List>
                                    <ListItem>{participants.find(pr => pr.id === lession.LecturersID)?.Email}</ListItem>
                                </List>
                            </div>
                            <Link href={`/manageExam?csID=${lession.id}`}>
                                <Button variant="contained" color="secondary" fullWidth>
                                    {t('ExamManagement')}
                                </Button>
                            </Link>
                        </Card>
                    </Grid>
                </Grid>
            </main>
        </div>
    );
};

export default Content;
