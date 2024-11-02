import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CourseOutline from "../../../components/student_components/lession-infor/lession-outline/CourseOutline";
import TrackingOnline from "../../../components/student_components/lession-infor/student-status/TrackingOnline";
import NavTabsSession from "../../../components/student_components/navtab-lession/NavTabsSession";
import { getSLot, getSLotById, getQuestionSlotBySlotId } from "../../../service/ApiService";
import { slot as Slot } from "../../../models/Interface";
import { CircularProgress } from "@mui/material";

function LessionInfor() {
    const { id } = useParams<{ id: string }>();
    const [slots, setSlots] = useState<Slot[]>([]);
    const [selectedSlot, setSelectedSlot] = useState<Slot | null>(null);

    useEffect(() => {
        getSlots();
        if (id) {
            getSlotById(id);
        }
    }, [id]);

    const getSlots = async () => {
        try {
            const res = await getSLot();
            if (Array.isArray(res)) {
                setSlots(res);
            }
        } catch (error) {
            console.error("Error fetching slots:", error);
        }
    };

    const getSlotById = async (id: string) => {
        try {
            const res: Slot = await getSLotById(id);
            setSelectedSlot(res);
        } catch (error) {
            console.error("Error fetching slot by ID:", error);
        }
    };

    const getQuestionSlotBySlotIds = async (slotId: string) => {
        try {
            const res = await getQuestionSlotBySlotId(slotId);
            if (Array.isArray(res)) {
                setSelectedSlot((prevSlot) => ({
                    ...prevSlot!,
                    questionSlot: res, 
                }));
            }
        } catch (error) {
            console.error("Error fetching question slot by slot ID:", error);
        }
    };

    // Fetch question slot when `selectedSlot` is set
    useEffect(() => {
        if (selectedSlot) {
            getQuestionSlotBySlotIds(selectedSlot.id);
        }
    }, [selectedSlot]);

    return (
        <div className="container">
            {slots.length > 0 ? (
                <div className="row">
                    <div style={{ padding: "0px" }} className="col-9">
                        <CourseOutline
                            slots={slots}
                            selectedSlot={selectedSlot}
                        />
                        <NavTabsSession />
                    </div>
                    <div className="col-3">
                        <TrackingOnline />
                    </div>
                </div>
            ) : (
                <div>
                    <CircularProgress color="secondary" />
                </div>
            )}
        </div>
    );
}

export default LessionInfor;
