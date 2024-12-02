import { useEffect, useState } from 'react';
import Header from '../../../../components/lecturers_components/Lesstion_Lecturers/Lesstion_Header/Header';
import Content from '../../../../components/lecturers_components/Lesstion_Lecturers/Lesstion_Content/Content';
import { getAssignmentSlot, getClass, getCourse, getCouseraInLecturers, getParticipants, getQuestionSLot, getSLot } from '../../../../service/ApiService';
import { assignmentSlot, classRoom, courses, lession, participants, questionSlot, slot } from '../../../../models/Interface';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
// import 'bootstrap/dist/css/bootstrap.min.css';
import { useTranslation } from 'react-i18next';
   
function Lession_Lecturers() {
    const [lessionData, setLession] = useState<lession>();
    const [slot, setSlot] = useState<slot[]>([]);
    const [participants, setParticipants] = useState<participants[]>([]);
    const [questionSlot, setQuestionSlot] = useState<questionSlot[]>([]);
    const [course, setGetCourse] = useState<courses[]>([]);
    const [assignmentSlot, setAssignmentSlot] = useState<assignmentSlot[]>([]);
    const [classes, setClasses] = useState<classRoom[]>([]);
    const [classId, setclassId] = useState<string>("");

    const location = useLocation();
    const param = new URLSearchParams(location.search);
    const cID = param.get('CourseID');
    const sID = param.get('semesterId');
    const { t } = useTranslation();
    // console.log(cID, sID);
    interface RootState {
        account: {
            account: {
                UserID: string;
            };
        };
    }

    const account = useSelector((state: RootState) => state.account.account);

    useEffect(() => {

        getParticipant();
        getSlot();
        fetchClass();
        fetchAssignmentSlot();
        getCourses();
        fetchQuestionSlot();
    }, []);

    useEffect(() => {
        getLession();

    }, [classId])

    const getLession = async () => {
        const res = await getCouseraInLecturers(cID, sID, account.UserID);
        if (Array.isArray(res)) {
            if (classId) {
                setLession(res.find(item => item.ClassID === classId));

            } else {
                setLession(res[0]);
            }
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
                lessionData &&
                    slot && participants && questionSlot && classes ?
                    <div>
                        <Header
                            courses={course}
                            lession={lessionData}
                        />
                        <Content
                            courses={course}
                            questionSlot={questionSlot}
                            slot={slot}
                            lession={lessionData}
                            participants={participants}
                            classes={classes}
                            setclassId={setclassId}
                            classId={classId}
                            assignmentSlot={assignmentSlot}

                        />
                    </div> :
                    <div>
                        {t("loading")}
                    </div>
            }
        </div>
    );
}

export default Lession_Lecturers;