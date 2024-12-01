import React, { useState, useEffect, useRef } from 'react';
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
    Divider,
    Pagination,
} from '@mui/material';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import AssignmentIcon from '@mui/icons-material/Assignment';
import { lession as Lession, slot as Slot, questionSlot as QuestionSlot, assignmentSlot } from "../../../../models/Interface"
import { useTranslation } from 'react-i18next';


interface Props {
    lession: Lession;
    slot: Slot[];
    questionSlot: QuestionSlot[];
    assignmentSlot: assignmentSlot[];
    slotSelected: string;
    setclassId: (id: string) => void;
    classId: string;
}

const Content: React.FC<Props> = ({ lession, slot, questionSlot, assignmentSlot, slotSelected, classId }) => {
    const { t } = useTranslation();
    const [visibleSlots, setVisibleSlots] = useState<{ [key: string]: boolean }>({});
    const [currentPage, setCurrentPage] = useState<number>(1);
    const itemsPerPage = 2;
    const navigate = useNavigate();

    const slotRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

    const handleClicktoDiscussion = (questionid: string, slotId: string) => {
        navigate(`/dicussion-page/question?slotID=${slotId}&questionid=${questionid}`);
    };

    const handleClickToAssignment = (assignmentid: string, slotId: string) => {
        navigate(`/dicussion-page/assignment?slotID=${slotId}&assignmentid=${assignmentid}`);
    };

    const toggleVisibility = (slotId: string) => {
        setVisibleSlots((prev) => ({
            ...prev,
            [slotId]: !prev[slotId],
        }));
    };

    const handlePageChange = (__event: React.ChangeEvent<unknown>, value: number) => {
        setCurrentPage(value);
    };

    const paginatedSlots = lession.SlotID.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    useEffect(() => {
        if (slotSelected && slotRefs.current[slotSelected]) {
            slotRefs.current[slotSelected]?.scrollIntoView({
                behavior: 'smooth',
                block: 'center',
            });
            setVisibleSlots((prev) => ({
                ...prev,
                [slotSelected]: true,
            }));
        }
    }, [slotSelected]);

    return (
        <Box>
            {paginatedSlots.map((sl, index) => {
                const currentSlot = slot.find((s) => s.id === sl);
                return (
                    <Box
                        key={`slot-${index}`}
                        mb={2}
                        p={2}
                        borderRadius={2}
                        sx={{
                            border: visibleSlots[sl] ? '2px solid purple' : '1px solid #ddd',
                            boxShadow: visibleSlots[sl]
                                ? '0 6px 12px rgba(0, 0, 0, 0.1)'
                                : '0 2px 4px rgba(0, 0, 0, 0.1)',
                            cursor: 'pointer',
                            transition: 'all 0.3s ease-in-out',
                            '&:hover': {
                                borderColor: 'purple',
                                boxShadow: '0 6px 12px rgba(0, 0, 0, 0.2)',
                            },
                        }}
                        ref={(el: HTMLDivElement | null) => (slotRefs.current[sl] = el)}
                        onClick={() => toggleVisibility(sl)}
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
                                        {currentSlot?.SlotName || `Slot ${index + 1}`}
                                    </Typography>
                                </Box>
                                <Box display="flex" alignItems="center" gap={2}>
                                    <Typography variant="body2" color="textSecondary">
                                        {currentSlot?.TimeStart} - {currentSlot?.TimeEnd}
                                    </Typography>
                                    <Button
                                        component={Link}
                                        to={`/lession-infor/details?Slotid=${sl}&classid=${classId}`}
                                        variant="outlined"
                                        color="secondary"
                                        size="small"
                                    >
                                        {t('view_slot')}
                                    </Button>
                                </Box>
                            </Box>
                            <Typography
                                variant="body1"
                                color="textSecondary"
                                mt={1}
                                mb={1}
                                fontWeight="bold"
                            >
                                {currentSlot?.Description.split('\n').map((line, index) => (
                                    <React.Fragment key={index}>
                                        {line}
                                        <br />
                                    </React.Fragment>
                                ))}
                            </Typography>
                        </Box>

                        <Divider sx={{ my: 2 }} />

                        {/* Questions and Assignments */}
                        <Collapse in={visibleSlots[sl]}>
                            <Typography variant="subtitle1" color="primary" gutterBottom>
                                {t('questions')}
                            </Typography>
                            <List>
                                {questionSlot
                                    .filter((qs) => qs.Slotid === sl)
                                    .map((qs, qIndex) => (
                                        <ListItem
                                            key={`qs-${qIndex}`}
                                            sx={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                cursor: qs.Status !== 0 ? 'pointer' : 'not-allowed',
                                                opacity: qs.Status !== 0 ? 1 : 0.5,
                                                '&:hover': qs.Status !== 0 ? {
                                                    backgroundColor: 'rgba(0, 123, 255, 0.1)',
                                                    transform: 'scale(1.02)',
                                                } : {},
                                                transition: 'background-color 0.3s, transform 0.3s',
                                            }}
                                            onClick={() =>
                                                qs.Status !== 0 &&
                                                handleClicktoDiscussion(qs.QuestionID, sl)
                                            }
                                        >
                                            <ListItemIcon>
                                                <HelpOutlineIcon color="action" />
                                            </ListItemIcon>
                                            <ListItemText
                                                primary={`Q${qIndex + 1}: ${qs.content.substring(
                                                    0,
                                                    50
                                                )}...`}
                                                secondary={
                                                    qs.Status === 0
                                                        ? t('not_started1')
                                                        : t('on_going')
                                                }
                                                secondaryTypographyProps={{
                                                    color: qs.Status === 0 ? 'error' : 'success',
                                                    fontWeight: 'bold',
                                                }}
                                            />
                                            {qs.Status !== 0 && (
                                                <ArrowForwardIosIcon
                                                    fontSize="small"
                                                    color="action"
                                                />
                                            )}
                                        </ListItem>
                                    ))}

                                {assignmentSlot
                                    ?.filter((as) => as?.Slotid === sl)
                                    ?.map((as, index) => (
                                        <ListItem
                                            key={`as-${index}`}
                                            onClick={() =>
                                                as.Status !== 0 &&
                                                handleClickToAssignment(as.AssignmentID, sl)
                                            }
                                            sx={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                cursor: as.Status !== 0 ? 'pointer' : 'not-allowed',
                                                opacity: as.Status !== 0 ? 1 : 0.5,
                                                '&:hover': as.Status !== 0 ? {
                                                    backgroundColor: 'rgba(0, 123, 255, 0.1)',
                                                    transform: 'scale(1.02)',
                                                } : {},
                                                transition: 'background-color 0.3s, transform 0.3s',
                                            }}
                                        >
                                            <ListItemIcon>
                                                <AssignmentIcon color="action" />
                                            </ListItemIcon>
                                            <ListItemText
                                                primary={`Assignment ${index + 1}: ${as.title.substring(
                                                    0,
                                                    50
                                                )}...`}
                                                secondary={
                                                    as.Status !== 0 ? t('on_going') : t('not_started1')
                                                }
                                                secondaryTypographyProps={{
                                                    color: as.Status !== 0 ? 'success' : 'error',
                                                    fontWeight: 'bold',
                                                }}
                                            />
                                            {as.Status !== 0 && (
                                                <ArrowForwardIosIcon
                                                    fontSize="small"
                                                    color="action"
                                                />
                                            )}
                                        </ListItem>
                                    ))}
                            </List>
                        </Collapse>
                    </Box>
                )
            }
            )}

            {/* Pagination */}
            <Pagination
                count={Math.ceil(lession.SlotID.length / itemsPerPage)}
                page={currentPage}
                onChange={handlePageChange}
                color="primary"
                sx={{ mt: 3, display: 'flex', justifyContent: 'center' }}
            />
        </Box>





    );
};

export default Content;
