import { useEffect, useState } from 'react';
import Question from '../../../components/student_components/dicussion-question/content/Question';
import NavTabs from '../../../components/student_components/navtab-dicussion/NavTabs';
import ProgressTracker from '../../../components/student_components/tracking-column/ProgressTracker';
import { getQuestionSLot, getSLotById, getQuestionSlotBySlotId } from "../../../service/ApiService";
import { slot as Slot, questionSlot } from "../../../models/Interface";
import { useSearchParams } from 'react-router-dom';

function DicussionPage() {
    const [searchParams] = useSearchParams();
    const slotID = searchParams.get('slotID');  
    const questionID = searchParams.get('id');  
    const [questionSlot, setQuestionSlot] = useState<questionSlot[]>([]);
    const [slots, setSlots] = useState<Slot[]>([]);
    const [selectedSlot, setSelectedSlot] = useState<Slot | null>(null);
    console.log(questionID, setSlots, selectedSlot)
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
                getQuestionSlotBySlotIds(id);
            }
        } catch (error) {
            console.error("Error fetching slot by ID:", error);
        }
    };

    const getQuestionSlotBySlotIds = async (slotId: string) => {
        try {
            const res = await getQuestionSlotBySlotId(slotId);
            if (Array.isArray(res)) {
                setQuestionSlot(res);
            }
        } catch (error) {
            console.error("Error fetching question slot by slot ID:", error);
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
                <div className='row'>
                    <div className='col-8'>
                        <Question questionSlot={questionSlot} slots={slots} />
                        <NavTabs />
                    </div>
                    <div className='col-4'>
                        <ProgressTracker />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DicussionPage;
