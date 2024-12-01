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
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';

interface Props {
    slots: Slot[];
    selectedSlot: Slot | null;
}

const CourseOutline: React.FC<Props> = ({ slots }) => {
    const { t } = useTranslation();
    const [showContent, setShowContent] = useState(false);
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const Slotid = queryParams.get("Slotid");

    const handleToggleContent = () => {
        setShowContent((prev) => !prev);
    };

    // Find the slot that matches the Slotid
    const matchingSlot = slots.find((slot) => slot.id === Slotid);

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
                {showContent ? t('lesson_info_hide') : t('lesson_info_show')}
            </Button>
            <Collapse in={showContent} timeout="auto" unmountOnExit>
                <div>
                    <Typography variant="h5" style={{ marginTop: 16, fontWeight: 'bold' }}>
                        {t('course_intro')}
                    </Typography>
                    <List component="nav">
                        {matchingSlot ? (
                            <Typography variant="h6" style={{ marginTop: 16 }}>
                                <ListItemText 
                                    primary={matchingSlot.Description} 
                                />
                            </Typography>
                        ) : (
                            <Typography variant="body1" color="textSecondary" style={{ marginTop: 16 }}>
                                {t('no_lesson_found')}
                            </Typography>
                        )}
                    </List>
                </div>
            </Collapse>
        </div>
    );
};

export default CourseOutline;
