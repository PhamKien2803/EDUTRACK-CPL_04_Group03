import { useState } from 'react';
import {
    Typography,
    List,
    ListItemText,
    Button,
    Collapse,
} from '@mui/material';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { slot as Slot } from "../../../../models/Interface";

interface Props {
    slots: Slot[];
    selectedSlot: Slot | null;
}

const CourseOutline: React.FC<Props> = ({ selectedSlot }) => {
    const [showContent, setShowContent] = useState(false);

    const handleToggleContent = () => {
        setShowContent((prev) => !prev);
    };

    return (
        <div style={{ width: '100%', maxWidth: '930px', margin: 'auto' }}>
            <Button
                onClick={handleToggleContent}
                style={{
                    color: showContent ? 'red' : 'green',
                    fontWeight: 'bold',
                    fontSize: '16px',
                }}
                endIcon={showContent ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            >
                {showContent ? 'HIDE LESSON INFO' : 'SHOW LESSON INFO'}
            </Button>

            <Collapse in={showContent} timeout="auto" unmountOnExit>
                <div>
                    <Typography variant="h5" style={{ marginTop: 16, fontWeight: 'bold' }}>
                        Course Introduction
                    </Typography>

                    <List component="nav">
                        {selectedSlot && (
                            <Typography variant="h6" style={{ marginTop: 16 }}>
                                <ListItemText primary={selectedSlot.Description} />
                            </Typography>
                        )}

                    </List>


                </div>
            </Collapse>
        </div>
    );
};

export default CourseOutline;
