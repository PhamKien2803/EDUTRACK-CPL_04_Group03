import React from 'react';
import { Card, Typography, Button, Grid, List, ListItem, Divider, Box, Breadcrumbs, Select, MenuItem, Link, ListItemIcon, ListItemText, Collapse } from '@mui/material';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import AssignmentIcon from '@mui/icons-material/Assignment';
function Content(props) {
    return (
        <div>
            <main>


                <Grid container spacing={3} >
                    <Grid item xs={12} md={8}>
                        <Box
                            // key={`slot-${index}`}
                            mb={2}
                            p={2}
                            border={1}
                            borderRadius={2}
                            borderColor="grey.300"
                            boxShadow={2}
                        // ref={(el: HTMLDivElement | null) => (slotRefs.current[sl] = el)}
                        // onClick={() => toggleVisibility(sl)}
                        >
                            <Box bgcolor="grey.100" borderRadius="8px" p={2}>
                                <Box display="flex" justifyContent="space-between" alignItems="center">
                                    <Typography variant="h6" component="div" bgcolor={"lightpink"} borderRadius={2} p={0.5}>
                                        SlotName
                                    </Typography>
                                    <Box display="flex" alignItems="center" gap={2}>
                                        <Typography variant="body2" color="textSecondary">
                                            Timestart-timeEnd
                                        </Typography>
                                        <Button
                                            component={Link}
                                            // to={`/lession-infor/details/${sl}`}
                                            variant="outlined"
                                            color="secondary"
                                            size="small"
                                        >
                                            View Slot
                                        </Button>
                                    </Box>
                                </Box>
                                <Typography variant="body1" color="textSecondary" mt={1} mb={1} fontWeight={"bold"}>
                                    {/* {currentSlot?.Description.split('\n').map((line, index) => (
                                    <span key={index}>
                                        {line}
                                        <br />
                                    </span>
                                ))} */}
                                </Typography>
                            </Box>

                            <hr style={{ border: '1px solid lightgray', margin: '8px auto' }} />

                            {/* Questions Collapse */}
                            <Collapse
                            // in={visibleSlots[sl]}
                            >
                                <Divider sx={{ my: 2 }} />
                                <Typography variant="subtitle1" color="primary" gutterBottom>
                                    Questions:
                                </Typography>
                                <List>
                                    {/* {questionSlot
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
                                                    secondary={qs.Status === 0 ? 'Not started' : 'On-Going'}
                                                    secondaryTypographyProps={{
                                                        color: qs.Status === 0 ? 'error' : 'success',
                                                        fontWeight: 'bold',
                                                    }}
                                                />
                                                <ArrowForwardIosIcon fontSize="small" color="action" />
                                            </ListItem>
                                        ))} */}

                                    {/* Assignment */}
                                    {/* {assignmentSlot?.filter((as) => as?.Slotid === sl)?.map((as, index) => (
                                        <ListItem
                                            key={`as-${index}`}
                                            onClick={() => handleClickToAssignment()}
                                            component="li"
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
                                                <AssignmentIcon color="action" />
                                            </ListItemIcon>
                                            <ListItemText
                                                primary={`Assignment ${index + 1}: ${as.title.substring(0, 50)}...`}
                                                secondary={as.Status === 0 ? 'Not started' : 'On-Going'}
                                                secondaryTypographyProps={{
                                                    color: as.Status === 0 ? 'error' : 'success',
                                                    fontWeight: 'bold',
                                                }}
                                            />
                                            <ArrowForwardIosIcon fontSize="small" color="action" />
                                        </ListItem>
                                    ))} */}
                                </List>
                            </Collapse>
                        </Box>
                    </Grid>

                    <Grid item xs={12} md={4}>
                        <Card variant="outlined" style={{ padding: '20px' }}>
                            <Typography variant="h6">Class</Typography>
                            <Select variant="outlined"
                                sx={{ minWidth: 200 }}
                                size="small"
                                displayEmpty
                                defaultValue="index" >
                                <MenuItem value="index">
                                    SE17B01-DN-Spring2023
                                </MenuItem>
                            </Select>
                            <Divider style={{ margin: '10px 0' }} />
                            <Typography variant="body2">0 online</Typography>
                            <Typography variant="body2">20 students</Typography>
                            <Typography variant="body2">20 slots</Typography>
                            <Divider style={{ margin: '10px 0' }} />
                            <Typography variant="body2">Start date: 17:00 02/01/2023</Typography>

                            <div style={{ marginTop: '20px' }}>
                                <Typography variant="body1">Lecturer (2)</Typography>
                                <List>
                                    <ListItem>edu_next_ltr_fpt_edu_01</ListItem>
                                    <ListItem>quangltn3@fpt.edu.vn</ListItem>
                                </List>
                            </div>

                            <Button variant="contained" color="primary" fullWidth>
                                Update Student List, Timetable
                            </Button>
                        </Card>
                    </Grid>
                </Grid>
            </main>

        </div>
    );
}

export default Content;