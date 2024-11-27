import { useEffect, useState } from 'react';
import Question from '../../../components/student_components/dicussion-question/content/Question';
import NavTabs from '../../../components/student_components/navtab-dicussion/NavTabs';
import ProgressTracker from '../../../components/student_components/tracking-column/ProgressTracker';
import { getQuestionSLot, getSLotById, getQuestionSlotBySlotId } from "../../../service/ApiService";
import { slot as Slot, questionSlot } from "../../../models/Interface";
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Box, Button } from '@mui/material';
import ReplyAllIcon from '@mui/icons-material/ReplyAll';

function DicussionPage() {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const slotID = searchParams.get('slotID');
    const questionID = searchParams.get('id');
    const [questionSlot, setQuestionSlot] = useState<questionSlot[]>([]);
    console.log(questionSlot);
    const [slots, setSlots] = useState<Slot[]>([]);
    const [selectedSlot, setSelectedSlot] = useState<Slot | null>(null);
    useEffect(() => {
        if (slotID) {
            getSlotById(slotID);
        }
    }, [slotID]);

    useEffect(() => {
        fetchQuestionSLot();
    }, []);

    const getSlotById = async (id: string) => {
        try {
            const res: Slot = await getSLotById(id);
            setSelectedSlot(res);
            if (id) {
                getQuestionSlotBySlotId(id);
            }
        } catch (error) {
            console.error("Error fetching slot by ID:", error);
        }
    };

    const fetchQuestionSLot = async () => {
        const res = await getQuestionSLot()
        if (Array.isArray(res)) {
            setQuestionSlot(res);
        }
    }

    return (
        <div>
            <div style={{ width: '98%' }} className='container-fluid'>
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                    <Button sx={{ marginTop: "0.5rem" }} variant='outlined' color='secondary' startIcon={<ReplyAllIcon />} onClick={() => navigate(-1)}>Back</Button>
                </Box>
                <div className='row'>
                    <div className='col-7'>
                        <Question questionSlot={questionSlot} slots={slots} questionID={questionID} setSlots={setSlots} selectedSlot={selectedSlot} />
                        <NavTabs />
                    </div>
                    <div className='col-5'>
                        <ProgressTracker />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DicussionPage;
