import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Pagination } from '@mui/material';
import "../css/Lession.css";

interface Lession {
    id: string,
    SemesterID: string,
    SlotID: string[],
    CourseID: string,
    StudentID: string,
    LecturersID: string,
    ClassID: string
}

interface Slot {
    id: string,
    SlotName: string,
    Description: string,
    TimeStart: string,
    TimeEnd: string,
    Status: boolean
}

interface QuestionSlot {
    QuestionID: string,
    content: string,
    TimeLimit?: number,
    Slotid: string,
    Status: number
}

interface Props {
    lession: Lession,
    slot: Slot[],
    questionSlot: QuestionSlot[]
}

const Content: React.FC<Props> = ({ lession, slot, questionSlot }) => {
    const [isVisible, setIsVisible] = useState<boolean>(true);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const itemsPerPage = 1;
    const navigate = useNavigate();

    const handleClicktoDiscussion = (questionid: string, slotId: string) => {
        navigate(`/dicussion-page/question?slotID=${slotId}&questionid=${questionid}`);
    };

    const toggleVisibility = () => {
        setIsVisible(!isVisible);
    };

    const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setCurrentPage(value);
    };

    const paginatedSlots = lession.SlotID.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    return (
        <>
            {paginatedSlots.map((sl, index) => (
                <div key={`slot-${index}`} onClick={toggleVisibility} className="course-info clickable">
                    <div className="boder2">
                        <div className="slot-header">
                            <div className="slot-number">slot {index + 1 + (currentPage - 1) * itemsPerPage}</div>
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
                                <div key={`qs-${index}`} style={{ cursor: "pointer" }} className="question-container" onClick={() => handleClicktoDicussion(qs.QuestionID, sl)}>
                                    <div className="question-item">
                                        <div className="question-icon">Q{index + 1}</div>
                                        <div className="question-text">{qs.content.substring(0, 50)}...</div>
                                        {qs.Status === 0 ? <div className="question-status not-started">Not start</div> : <div className="question-status started">Go</div>}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            ))}

            <Pagination
                count={Math.ceil(lession.SlotID.length / itemsPerPage)}
                page={currentPage}
                onChange={handlePageChange}
                color="primary"
                style={{ marginTop: '20px', display: 'flex', justifyContent: 'center' }}
            />
        </>
    );
};

export default Content;
