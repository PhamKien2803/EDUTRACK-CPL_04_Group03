import { useEffect, useState } from "react";
import Content from "../../../components/student_components/lession/lession-content/Content";
import Header from "../../../components/student_components/lession/lession-header/Header";
import { getClass, getCourseSemesterById, getParticipants, getQuestionSLot, getSLot } from "../../../service/ApiService";
import { classRoom, lession, participants, questionSlot, slot } from "../../../models/Interface";
import { useLocation } from "react-router-dom";

function Lession() {
    const [lessionData, setLession] = useState<lession>();
    const [slot, setSlot] = useState<slot[]>([]);
    const [participants, setParticipants] = useState<participants[]>([]);
    const [questionSlot, setQuestionSlot] = useState<questionSlot[]>([]);
    const [classes, setClasses] = useState<classRoom[]>([]);
    const [slotSelected, setSlotSelected] = useState<string>();
    console.log(slotSelected)
    const location = useLocation();
    const param = new URLSearchParams(location.search);
    const sID = param.get('subjectId');

    useEffect(() => {
        getLession();
        getParticipant();
        getSlot();
        fetchQuestionSlot();
        fetchClass();
    }, []);

    const getLession = async () => {
        if (typeof (sID) === 'string') {
            const res = await getCourseSemesterById(sID);
            setLession(res);
        }
    }

    const getParticipant = async () => {
        const res = await getParticipants();
        if (Array.isArray(res)) {
            setParticipants(res);
        }
    }

    const getSlot = async () => {
        const res = await getSLot();
        if (Array.isArray(res)) {
            setSlot(res);
        }
    }

    const fetchQuestionSlot = async () => {
        const res = await getQuestionSLot();
        if (Array.isArray(res)) {
            setQuestionSlot(res);
        }
    }

    const fetchClass = async () => {
        const res = await getClass();
        if (Array.isArray(res)) {
            setClasses(res);
        }
    }

    return (
        <div>
            {
                lessionData && slot && participants && questionSlot && classes ?
                    <div>
                        <Header
                            questionSlot={questionSlot}
                            slot={slot}
                            lession={lessionData}
                            participants={participants}
                            classes={classes}
                            setSelected={setSlotSelected}
                        />
                        <Content lession={lessionData} slot={slot} questionSlot={questionSlot} slotSelected={slotSelected} />
                    </div> :
                    <div>
                        LOADING...
                    </div>
            }
        </div>
    );
}

export default Lession;
