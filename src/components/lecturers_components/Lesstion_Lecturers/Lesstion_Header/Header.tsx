import React from 'react';
import { Card, Typography, Button, Grid, List, ListItem, Divider } from '@mui/material';

const Header: React.FC = () => {
    return (
        <div style={{ padding: '20px' }}>
            <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="h6">FPT Education</Typography>
                <Typography variant="body1">User Guide | Chat</Typography>
            </header>

            <main>
                <Typography variant="h4" style={{ margin: '20px 0' }}>
                    OOP with Java Lab_ Thực hành OOP với Java
                </Typography>
                <Typography variant="body1">Course code: LAB211</Typography>

                <Grid container spacing={3} style={{ marginTop: '20px' }}>
                    <Grid item xs={12} md={8}>
                        <Card variant="outlined">
                            <Typography variant="h6" style={{ padding: '10px' }}>Slot 1</Typography>
                            <Divider />
                            <List>
                                <ListItem>Orientation</ListItem>
                                <ListItem>Orientation</ListItem>
                                <ListItem>Orientation</ListItem>
                            </List>
                            <Button variant="text" style={{ margin: '10px' }}>View Detail</Button>
                        </Card>

                        <Card variant="outlined" style={{ marginTop: '20px' }}>
                            <Typography variant="h6" style={{ padding: '10px' }}>Slot 2</Typography>
                            <Divider />
                            <List>
                                <ListItem>Orientation</ListItem>
                                <ListItem>Practice</ListItem>
                                <ListItem>Mentor review</ListItem>
                            </List>
                            <Button variant="text" style={{ margin: '10px' }}>View Detail</Button>
                        </Card>

                        <Card variant="outlined" style={{ marginTop: '20px' }}>
                            <Typography variant="h6" style={{ padding: '10px' }}>Slot 3</Typography>
                            <Divider />
                            <List>
                                <ListItem>...</ListItem>
                                {/* Additional content for Slot 3 */}
                            </List>
                            <Button variant="text" style={{ margin: '10px' }}>View Detail</Button>
                        </Card>
                    </Grid>

                    <Grid item xs={12} md={4}>
                        <Card variant="outlined" style={{ padding: '20px' }}>
                            <Typography variant="h6">Class</Typography>
                            <Typography variant="body1">SE17B01-DN-Spring2023</Typography>
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
};

export default Header;
