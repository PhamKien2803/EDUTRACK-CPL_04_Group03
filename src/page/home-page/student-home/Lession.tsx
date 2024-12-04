import { useEffect, useState } from "react";
import Content from "../../../components/student_components/lession/lession-content/Content";
import Header from "../../../components/student_components/lession/lession-header/Header";
import { getClass, getCourseSemesterById, getParticipants, getQuestionSLot, getSLot, getAssignmentSlot, getCourse, getCouseraInLecturers } from "../../../service/ApiService";
import { classRoom, lession, participants, questionSlot, slot, assignmentSlot, courses } from "../../../models/Interface";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

function Lession() {
    const [lessionData, setLession] = useState<lession>();
    const [slot, setSlot] = useState<slot[]>([]);
    const [participants, setParticipants] = useState<participants[]>([]);
    const [questionSlot, setQuestionSlot] = useState<questionSlot[]>([]);
    const [course, setGetCourse] = useState<courses[]>([]);
    const [assignmentSlot, setAssignmentSlot] = useState<assignmentSlot[]>([]);
    const [classes, setClasses] = useState<classRoom[]>([]);
    const [slotSelected, setSlotSelected] = useState<string>();
    const location = useLocation();
    const param = new URLSearchParams(location.search);
    const sID = param.get('subjectId');
    const [classId, setclassId] = useState<string>("");
    const cID = param.get('CourseID');
    interface RootState {
        account: {
            account: {
                UserID: string;
            };
        };
    }
    const account = useSelector((state: RootState) => state.account.account);



    useEffect(() => {
        // getLession();
        getParticipant();
        getSlot();
        fetchQuestionSlot();
        fetchAssignmentSlot();
        fetchClass();
        getCourses();

    }, []);

    useEffect(() => {
        getLession();

    }, [classId])

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

    const getCourses = async () => {
        const res = await getCourse();
        console.log("res", res);

        if (Array.isArray(res)) {
            setGetCourse(res);
        }
    }

    const fetchAssignmentSlot = async () => {
        const res = await getAssignmentSlot()
        if (Array.isArray(res)) {
            setAssignmentSlot(res);
        }
    }

    const fetchClass = async () => {
        const resCourse = await getCouseraInLecturers(cID, sID, account.UserID);
        const res = await getClass();
        let class2: classRoom[];
        if (Array.isArray(res) && Array.isArray(resCourse)) {
            const updatedClasses = resCourse.map(item => res.find(cl => cl.ClassID === item.ClassID));
            setClasses(updatedClasses)
            setclassId(res[0].ClassID)
        }



    }

    return (
        <div>
            {
                lessionData && slot && participants && questionSlot && classes ?
                    <div>
                        <Header
                            courses={course}
                            questionSlot={questionSlot}
                            slot={slot}
                            lession={lessionData}
                            participants={participants}
                            classes={classes}
                            setSelected={setSlotSelected}
                        />
                        <Content setclassId={setclassId} classId={classId} lession={lessionData} slot={slot} questionSlot={questionSlot} assignmentSlot={assignmentSlot} slotSelected={slotSelected || ''} />
                    </div> :
                    <div>
                        LOADING...
                    </div>
            }
        </div>
    );
}

export default Lession;
