import Information from "../../../components/student_components/dicussion-assignment/information-assignment/Information"
import OverViews from "../../../components/student_components/dicussion-assignment/overviews-assignment/OverViews"
import Submited from "../../../components/student_components/dicussion-assignment/submited-assignment/Submited"
import { useSearchParams } from 'react-router-dom';
import { assignmentSlot, slot as Slot } from './../../../models/Interface';
import { getAssignmentSlot, getSLotById, getAssignmentSlotById } from "../../../service/ApiService";
import { useState, useEffect } from "react";

function DicussionAssignment() {
    const [searchParams] = useSearchParams();
    const slotID = searchParams.get('slotID');
    const assignmentID = searchParams.get('id');
    const [assignmentSlot, setAssignmentSlot] = useState<assignmentSlot[]>([]);
    const [slots, setSlots] = useState<Slot[]>([]);
    const [selectedSlot, setSelectedSlot] = useState<Slot | null>(null);

    useEffect(() => {
        if(slotID){
            fetchSlotById(slotID);
        }
    }, [slotID]);

    useEffect(() => {
        fetchAssignmentSlot();
    }, [])

    const fetchSlotById = async (id: string) => {
        try {
            const response = await getSLotById(id);
            const res: Slot = response.data;
            setSelectedSlot(res);
            if (id) {
                fetchAssignmentSlotById(id);
            }
        } catch (error) {
            console.error("Error fetching slot by ID:", error);
        }
    };

    const fetchAssignmentSlotById = async (slotId: string) => {
        try {
            const res = await getAssignmentSlotById(slotId);
            if (Array.isArray(res)) {
                setAssignmentSlot(res);
            }
        } catch (error) {
            console.error("Error fetching assignment slot by slot ID:", error);
        }
    }

    const fetchAssignmentSlot = async () => {
        try {
            const res = await getAssignmentSlot();
            if (Array.isArray(res)) {
                setAssignmentSlot(res);
            }
        } catch (error) {
            console.error("Error fetching assignment slot:", error);
        }
    }

    return (
        <div>
            <div style={{ width: '98%' }} className='container-fluid'>
                <div className='row'>
                    <div className='col-7'>
                        <Information assignmentSlot={assignmentSlot} assignmentID={assignmentID} slots={slots} setSlots={setSlots} selectedSlot={selectedSlot}  />
                        <hr style={{ border: '1px solid lightgray', margin: '8px auto' }} />
                        <Submited />
                    </div>
                    <div className='col-5'>
                        <OverViews />
                        <hr style={{ border: '1px solid black', margin: '8px auto' }} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DicussionAssignment
