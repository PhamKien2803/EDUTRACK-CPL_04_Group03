import React, { useState } from 'react';
import {
    Card, Typography, Button, Grid, List, ListItem, Divider, Box,
    Select, MenuItem, Link, ListItemIcon, ListItemText, Collapse
} from '@mui/material';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';

import { classRoom, courses, lession, participants, questionSlot, slot } from '../../../../models/Interface';

interface Props {
    questionSlot: questionSlot[];
    slot: slot[];
    lession: lession;
    participants: participants[];
    classes: classRoom[];
    courses: courses[];
    setclassId:(id:string)=>void
}

const Content: React.FC<Props> = ({ questionSlot, slot, lession, participants, classes, courses,setclassId }) => {
    const [visibleSlots, setVisibleSlots] = useState<{ [key: string]: boolean }>({});

    const toggleVisibility = (slotId: string) => {
        setVisibleSlots((prev) => ({
            ...prev,
            [slotId]: !prev[slotId],
        }));
    };

    console.log(classes);
    

    return (
        <div>
            <main>
                <Grid container spacing={3}>
                    {lession.SlotID.map((item, index) => (
                        <Grid item xs={12} md={8} key={`slot-grid-${index}`}>
                            <Box
                                mb={2}
                                p={2}
                                border={1}
                                borderRadius={2}
                                borderColor="grey.300"
                                boxShadow={2}
                                onClick={() => toggleVisibility(item)}
                            >
                                <Box bgcolor="grey.100" borderRadius="8px" p={2}>
                                    <Box display="flex" justifyContent="space-between" alignItems="center">
                                        <Typography variant="h6" component="div" bgcolor="lightpink" borderRadius={2} p={0.5}>
                                            Slot{index +1}: 
                                        </Typography>
                                        
                                        <Box display="flex" alignItems="center" gap={2}>
                                            <Typography variant="body2" color="textSecondary">
                                                Timestart-timeEnd
                                            </Typography>
                                            <Link href={`/lecturer/session-details?Slotid=${item}&classid=${classes[0]?.ClassID}`}>
                                            <Button component={Link} variant="outlined" color="secondary" size="small">
                                                Update Slot
                                            </Button></Link>
                                        </Box>
                                    </Box>
                                    <Typography variant="body1" color="textSecondary" mt={1} mb={1} fontWeight="bold">
                                    {slot.find(sl=>sl.id===item)?.Description}
                                    </Typography>
                                </Box>

                                <Divider sx={{ my: 2 }} />

                                <Collapse in={visibleSlots[item]}>
                                    <Typography variant="subtitle1" color="primary" gutterBottom>
                                        Questions:
                                    </Typography>
                                    <List>
                                        {questionSlot
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
                                            ))}
                                    </List>
                                </Collapse>
                            </Box>
                        </Grid>
                    ))}

                    <Grid item xs={12} md={4}>
                        <Card variant="outlined" style={{ padding: '20px' }}>
                            <Typography variant="h6">Class</Typography>
                            {/* <Select variant="outlined" sx={{ minWidth: 200 }} onChange={e=>setclassId(e.target.value)} size="small" displayEmpty defaultValue={lession.ClassID}>
                                {
                                    classes.map((cls,index)=>(
                                        <MenuItem key={index} value={cls.ClassID}>
                                            {cls.ClassName}
                                        </MenuItem>
                                    ))
                                }
                                
                                
                            </Select> */}
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
                                    <ListItem>{participants.find(pr=>pr.id === lession.LecturersID)?.Email}</ListItem>
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
};

export default Content;