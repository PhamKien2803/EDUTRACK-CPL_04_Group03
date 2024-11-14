import { useSearchParams } from "react-router-dom";
import AssignmentContent from "../../../../components/lecturers_components/session-assignment/content-assignment/AssignmentContent"
import TableSubmission from "../../../../components/lecturers_components/session-assignment/submission-assignment/TableSubmission"
import ColsContent from "../../../../components/lecturers_components/session-assignment/table-content/ColsContent"
import ColsStatus from "../../../../components/lecturers_components/session-assignment/table-content/ColsStatus"
import { useEffect, useState } from "react";
import { getAssignmentSlot, getAssignmentSlotById, getSLotById, getAnswerAssignmentSlot, getParticipants } from "../../../../service/ApiService";
import { assignmentSlot, slot as Slot, answerAssignmentSlot, participants } from '../../../../models/Interface';

function SessionAssignment() {
  const [searchParams] = useSearchParams();
  const slotID = searchParams.get('Slotid');
  const assignmentID = searchParams.get('assignmentid');
  const [assignmentSlot, setAssignmentSlot] = useState<assignmentSlot[]>([]);
  const [answerAssignmentSlot, setAnswerAssignmentSlot] = useState<answerAssignmentSlot[]>([]);
  const [participants, setParticipants] = useState<participants[]>([]);
  const [slots, setSlots] = useState<Slot[]>([]);
  const [selectedSlot, setSelectedSlot] = useState<Slot | null>(null);

  console.log(answerAssignmentSlot)

  useEffect(() => {
    if (slotID) {
      fetchSlotById(slotID);
    }
  }, [slotID]);

  useEffect(() => {
    fetchAssignmentSlot();
    fetchAnswerAssignmentSlot();
    fetchParticipants();
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

  const fetchAnswerAssignmentSlot = async () => {
    try {
      const res = await getAnswerAssignmentSlot();
      if (Array.isArray(res)) {
        setAnswerAssignmentSlot(res);
      }
    } catch (error) {
      console.error("Error fetching answer assignment slot:", error);
    }
  }

  const fetchParticipants = async () => {
    try {
      const res = await getParticipants();
      if (Array.isArray(res)) {
        setParticipants(res);
      }
    } catch (error) {
      console.error("Error fetching participants:", error);
    }
  }

  return (
    <div>
      <div style={{ width: '98%' }} className='container-fluid'>
        <div className='row'>
          <div className='col-7'>
            <AssignmentContent assignmentSlot={assignmentSlot} assignmentID={assignmentID} slots={slots} setSlots={setSlots} selectedSlot={selectedSlot} />
            <hr style={{ border: '1px solid lightgray', margin: '8px auto' }} />
            <TableSubmission answerAssignmentSlot={answerAssignmentSlot} participants={participants} />
          </div>
          <div className='col-5'>
            <ColsContent />
            <hr style={{ border: '1px solid black', margin: '8px auto' }} />
            <ColsStatus />
          </div>
        </div>
      </div>
    </div>
  )
}

export default SessionAssignment
