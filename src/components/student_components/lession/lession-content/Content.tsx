import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import "../css/Lession.css";

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

interface questionSlot {
    QuestionID: string,
    content: string,
    TimeLimit?: number,
    Slotid: string,
    Status: number
}

interface Props {
    lession: lession,
    slot: slot[],
    questionSlot: questionSlot[]
}


const Content: React.FC<Props> = ({ lession, slot, questionSlot }) => {
    const [isVisible, setIsVisible] = useState<boolean>(true);
    const navigate = useNavigate();

    const handleClicktoDicussion = (questionid: string, slotId: string) => {
        navigate(`/dicussion-page/question?slotID=${slotId}&id=${questionid}`);
    }
    const toggleVisibility = () => {
        setIsVisible(!isVisible);
    };

    return (
        <>
            {
                lession?.SlotID?.map((sl, index) => (
                    <div key={`slot-${index}`} onClick={toggleVisibility} className="course-info clickable">
                        <div className="boder2">
                            <div className="slot-header">
                                <div className="slot-number">slot {index + 1}</div>
                                <div
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "flex-end",
                                        fontSize: "18px",
                                        fontWeight: "bold",
                                        color: "blue",
                                        marginRight: "2rem",
                                        cursor: "pointer"
                                    }}
                                >
                                    <Link
                                        style={{ textDecoration: "none" }}
                                        to={`/lession-infor/details/${sl}`}
                                    >
                                        View Slots
                                    </Link>
                                </div>
                                <div className="date-time">
                                    {slot.find(s => s.id === sl)?.TimeStart} - {slot.find(s => s.id === sl)?.TimeEnd}
                                </div>
                            </div>


                            <div className="course-content">
                                <h3>{slot.find(s => s.id === sl)?.Description} </h3>
                            </div>
                        </div>

                        {isVisible && (
                            <div>
                                <div className="tile" style={{ margin: "10px 0px 0px 0px" }}>QUESTION:</div>
                                {questionSlot.map((qs, index) => (
                                    <div style={{ cursor: "pointer" }} className="question-container" onClick={() => handleClicktoDicussion(qs.QuestionID, sl)}>

                                        {/* <Link to={`/dicussion-page/question/${qs.QuestionID}`} className="question-item"> */}
                                        <div key={`qs-${index}`} className="question-item">
                                            <div className="question-icon">Q{index + 1}</div>
                                            <div className="question-text">{qs.content.substring(0, 50)}...</div>
                                            {qs.Status === 0 ? <div className="question-status not-started">Not start</div> : <div className="question-status started">Go</div>}
                                        </div>
                                        {/* </Link> */}


                                    </div>
                                ))}

                            </div>
                        )}

                    </div>
                ))
            }
        </>



    );
}

export default Content;
