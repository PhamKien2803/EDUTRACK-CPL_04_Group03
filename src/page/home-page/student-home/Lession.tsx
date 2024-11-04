import { useEffect, useState } from "react";
import Content from "../../../components/student_components/lession/lession-content/Content";
import Header from "../../../components/student_components/lession/lession-header/Header";
import Items from "../../../components/student_components/lession/lession-items/Items";
import { getClass, getCourseSemesterById, getParticipants, getQuestionSLot, getSLot } from "../../../service/ApiService";
import { useLocation } from "react-router-dom";

interface lession {
    id: string,
    SemesterID: string,
    SlotID: string[]
    CourseID: string,
    StudentID: string,
    LecturersID: string,
    ClassID: string
}

interface slot {
    id: string,
    SlotName: string,
    Description: string,
    TimeStart: string,
    TimeEnd: string,
    Status: boolean
}

interface participants {
    id: string,
    UserName: string,
    Age: number,
    Gender: true,
    Address: string,
    Email: string,
    Password: string,
    Image: string,
    Role: number,
    isOnline: boolean,
    Status: boolean
}

interface questionSlot {
    QuestionID: string,
    content: string,
    TimeLimit?: number,
    Slotid: string,
    Status: number
}

interface classRoom {
    ClassID: string,
    ClassName: string,
    Student: string[],
    Status: boolean
}

function Lession() {
    const [lession, setLesstion] = useState<lession>();
    const [slot, setSlot] = useState<slot[]>([]);
    const [participants, setParticipants] = useState<participants[]>([]);
    const [questionSlot, setQuestionSlot] = useState<questionSlot[]>([]);
    const [classes, setClasses] = useState<classRoom[]>([]);
    const [slotSelected, setSlotSelected] = useState<string>();
    const location = useLocation();
    const param = new URLSearchParams(location.search);
    const sID = param.get('subjectId');

    useEffect(() => {
        getLession();
        getParticipant();
        getSlot();
        fetchQuestionSLot();
        fetchClass();
    }, []);



    const getLession = async () => {
        if (typeof (sID) === 'string') {
            const res = await getCourseSemesterById(sID)
            setLesstion(res);
        }
    }

    const getParticipant = async () => {
        const res = await getParticipants()
        if (Array.isArray(res)) {
            setParticipants(res);
        }
    }

    const getSlot = async () => {
        const res = await getSLot()
        if (Array.isArray(res)) {
            setSlot(res);
        }
    }

    const fetchQuestionSLot = async () => {
        const res = await getQuestionSLot()
        if (Array.isArray(res)) {
            setQuestionSlot(res);
        }
    }

    const fetchClass = async () => {
        const res = await getClass()
        if (Array.isArray(res)) {
            setClasses(res);
        }
    }


    return (
        <div>
            {
                lession && slot && participants && questionSlot && classes ?
                    <div>
                        <Header lession={lession} partcipants={participants} classes={classes} setselected={setSlotSelected} />
                        <Content lession={lession} slot={slot} questionSlot={questionSlot} />

                    </div> :
                    <div>
                        LOADING...
                    </div>

            }

        </div>
    );
}

export default Lession;
