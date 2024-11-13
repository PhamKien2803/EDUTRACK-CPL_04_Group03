import React, { useEffect, useState } from 'react';
import Header from '../../../../components/lecturers_components/Lesstion_Lecturers/Lesstion_Header/Header';
import Content from '../../../../components/lecturers_components/Lesstion_Lecturers/Lesstion_Content/Content';
import { getAssignmentSlot, getClass, getCourse, getCourseSemesterById, getCouseraInLecturers, getParticipants, getQuestionSLot, getSLot } from '../../../../service/ApiService';
import { assignmentSlot, classRoom, courses, lession, participants, questionSlot, slot } from '../../../../models/Interface';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';


function Lession_Lecturers() {
    const [lessionData, setLession] = useState<lession>();
    const [slot, setSlot] = useState<slot[]>([]);
    const [participants, setParticipants] = useState<participants[]>([]);
    const [questionSlot, setQuestionSlot] = useState<questionSlot[]>([]);
    const [course, setGetCourse] = useState<courses[]>([]);
    const [assignmentSlot, setAssignmentSlot] = useState<assignmentSlot[]>([]);
    const [classes, setClasses] = useState<classRoom[]>([]);
    const [slotSelected, setSlotSelected] = useState<string>();
    const [classId, setclassId] = useState<string>("");

    const location = useLocation();
    const param = new URLSearchParams(location.search);
    const cID = param.get('CourseID');
    const sID = param.get('semesterId');

    // console.log(cID, sID);
    const account = useSelector((state: any) => state.account.account);

    // console.log(account);


    console.log(classId);



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

    console.log(lessionData);

    const getLession = async () => {
        const res = await getCouseraInLecturers(cID, sID, account.UserID);
        // console.log(res);

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
        // console.log("res", res);

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

                        />
                    </div> :
                    <div>
                        LOADING...
                    </div>
            }
        </div>
    );
}

export default Lession_Lecturers;