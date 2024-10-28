import { useState } from 'react';
import {
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Typography,
    List,
    ListItem,
    ListItemText,
    Button,
    Collapse,
} from '@mui/material';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

function CourseOutline() {
    const [showContent, setShowContent] = useState(false);

    const handleToggleContent = () => {
        setShowContent((prev) => !prev);
    };

    return (
        <div style={{ width: '100%', maxWidth: "930px", margin: 'auto' }}>
            <Button
                onClick={handleToggleContent}
                style={{
                    color: showContent ? 'red' : 'green',
                    fontWeight: 'bold',
                    fontSize: '16px',
                }}
                endIcon={showContent ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            >
                {showContent ? 'HIDDEN INFO SESSIONS' : 'SHOW INFO SESSIONS'}
            </Button>

            <Collapse in={showContent} timeout="auto" unmountOnExit>
                <div>
                    <Typography variant="h5" style={{ marginTop: 16, fontWeight: 'bold' }}>
                        Course Introduction
                    </Typography>
                    <List component="nav">
                        <ListItem>
                            <ListItemText primary="1.1 Full Stack Web Development: The Big Picture" />
                        </ListItem>
                        <ListItem>
                            <ListItemText primary="1.2 React 18 Introduction" />
                        </ListItem>

                        <Accordion>
                            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                <Typography>1.3 Git</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <List component="div" disablePadding>
                                    <ListItem>
                                        <ListItemText primary="Setting up Git" />
                                    </ListItem>
                                    <ListItem>
                                        <ListItemText primary="Basic Git Commands" />
                                    </ListItem>
                                    <ListItem>
                                        <ListItemText primary="Setting up an Online Git repository" />
                                    </ListItem>
                                </List>
                            </AccordionDetails>
                        </Accordion>

                        <Accordion>
                            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                <Typography>1.4 Node.js and NPM</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <List component="div" disablePadding>
                                    <ListItem>
                                        <ListItemText primary="Setting up Node.js and NPM" />
                                    </ListItem>
                                    <ListItem>
                                        <ListItemText primary="Basics of Node.js and NPM" />
                                    </ListItem>
                                </List>
                            </AccordionDetails>
                        </Accordion>
                    </List>
                </div>
            </Collapse>
            
        </div>
    );
};

export default CourseOutline;
