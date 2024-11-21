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

interface Props {
    lession: Lession;
    slot: Slot[];
    questionSlot: QuestionSlot[];
    assignmentSlot: assignmentSlot[];
    slotSelected: string;
}

const Content: React.FC<Props> = ({ lession, slot, questionSlot, assignmentSlot, slotSelected }) => {
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
                        border={1}
                        borderRadius={2}
                        borderColor="grey.300"
                        boxShadow={2}
                        ref={(el: HTMLDivElement | null) => (slotRefs.current[sl] = el)}
                        onClick={() => toggleVisibility(sl)}
                    >
                        <Box bgcolor="grey.100" borderRadius="8px" p={2}>
                            <Box display="flex" justifyContent="space-between" alignItems="center">
                                <Typography variant="h6" component="div" bgcolor={"lightpink"} borderRadius={2} p={0.5}>
                                    {currentSlot?.SlotName || `Slot ${index + 1}`}
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
                            <Typography variant="body1" color="textSecondary" mt={1} mb={1} fontWeight={"bold"}>
                                {currentSlot?.Description.split('\n').map((line, index) => (
                                    <span key={index}>
                                        {line}
                                        <br />
                                    </span>
                                ))}
                            </Typography>
                        </Box>

                        <hr style={{ border: '1px solid lightgray', margin: '8px auto' }} />

                        {/* Questions Collapse */}
                        <Collapse in={visibleSlots[sl]}>
                            <Divider sx={{ my: 2 }} />
                            <Typography variant="subtitle1" color="primary" gutterBottom>
                                Questions:
                            </Typography>
                            <List>
                                {/* Hiển thị các câu hỏi (Question) chỉ khi Status là On-Going */}
                                {questionSlot
                                    .filter((qs) => qs.Slotid === sl)
                                    .map((qs, qIndex) => (
                                        <ListItem
                                            key={`qs-${qIndex}`}
                                            component="li"
                                            onClick={() => qs.Status !== 0 && handleClicktoDiscussion(qs.QuestionID, sl)} // Chỉ xử lý khi Status != 0
                                            sx={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                cursor: qs.Status !== 0 ? 'pointer' : 'not-allowed', // Không cho click nếu Status = 0
                                                opacity: qs.Status !== 0 ? 1 : 0.5, // Làm mờ nếu Status = 0
                                                '&:hover': qs.Status !== 0 && {
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
                                                secondary={qs.Status === 0 ? 'Not started' : 'On-Going'}
                                                secondaryTypographyProps={{
                                                    color: qs.Status === 0 ? 'error' : 'success', // Phân biệt màu sắc
                                                    fontWeight: 'bold',
                                                }}
                                            />
                                            {qs.Status !== 0 && <ArrowForwardIosIcon fontSize="small" color="action" />}
                                        </ListItem>
                                    ))}
                                {/* Hiển thị phần bài tập (Assignment) không thay đổi */}
                                {assignmentSlot?.filter((as) => as?.Slotid === sl)?.map((as, index) => (
                                    <ListItem
                                        key={`as-${index}`}
                                        onClick={() => as.Status !== 0 && handleClickToAssignment(as.AssignmentID, sl)} // Chỉ xử lý khi Status != 0
                                        component="li"
                                        sx={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            cursor: as.Status !== 0 ? 'pointer' : 'not-allowed', // Không cho click nếu Status = 0
                                            opacity: as.Status !== 0 ? 1 : 0.5, // Làm mờ nếu Status = 0
                                            '&:hover': as.Status !== 0 && {
                                                backgroundColor: 'rgba(0, 123, 255, 0.1)',
                                                transform: 'scale(1.02)',
                                            },
                                            transition: 'background-color 0.3s, transform 0.3s',
                                        }}
                                    >
                                        <ListItemIcon>
                                            <AssignmentIcon color="action" />
                                        </ListItemIcon>
                                        <ListItemText
                                            primary={`Assignment ${index + 1}: ${as.title.substring(0, 50)}...`}
                                            secondary={as.Status !== 0 ? 'On-Going' : 'Not started'}
                                            secondaryTypographyProps={{
                                                color: as.Status !== 0 ? 'success' : 'error',
                                                fontWeight: 'bold',
                                            }}
                                        />
                                        {as.Status !== 0 && <ArrowForwardIosIcon fontSize="small" color="action" />}
                                    </ListItem>
                                ))}
                            </List>

                        </Collapse>
                    </Box>
                );
            })}

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
