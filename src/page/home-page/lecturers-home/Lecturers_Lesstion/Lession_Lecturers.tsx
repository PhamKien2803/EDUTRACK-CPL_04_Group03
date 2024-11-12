import React, { useEffect, useState } from 'react';
import Header from '../../../../components/lecturers_components/Lesstion_Lecturers/Lesstion_Header/Header';
import Content from '../../../../components/lecturers_components/Lesstion_Lecturers/Lesstion_Content/Content';
import { getAssignmentSlot, getClass, getCourse, getCourseSemesterById, getCouseraInLecturers, getParticipants, getQuestionSLot, getSLot } from '../../../../service/ApiService';
import { assignmentSlot, classRoom, courses, lession, participants, questionSlot, slot } from '../../../../models/Interface';
import { useLocation } from 'react-router-dom';


function Lession_Lecturers() {
    const [lessionData, setLession] = useState<lession[]>([]);
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


    useEffect(() => {

        getLession();

    }, []);

    const getLession = async () => {

        const res = await getCouseraInLecturers("FER201", "fall24", "lt12345");
        console.log(res);


        setLession(res);


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
        const res = await getClass();
        if (Array.isArray(res)) {
            setClasses(res);
        }
    }

    return (
        <div>
            {
                // lessionData &&
                slot && participants && questionSlot && classes ?
                    <div>
                        <Header
                            courses={course}
                            questionSlot={questionSlot}
                            slot={slot}
                            // lession={lessionData}
                            participants={participants}
                            classes={classes}
                        // setSelected={setSlotSelected}
                        />
                        <Content />
                    </div> :
                    <div>
                        LOADING...
                    </div>
            }
        </div>
    );
}

export default Lession_Lecturers;