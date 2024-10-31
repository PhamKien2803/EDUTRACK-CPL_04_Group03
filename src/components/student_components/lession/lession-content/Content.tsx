import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "../css/Lession.css";

const Content: React.FC = () => {
    const [isVisible, setIsVisible] = useState<boolean>(true);
    const navigate = useNavigate();

    const handleClicktoDicussion = () => {
        navigate("/dicussion-page");
    }

    const handleClicktoLessionInfor = () => {
        navigate("/lession-infor");
    }

    const toggleVisibility = () => {
        setIsVisible(!isVisible);
    };

    return (
        <div onClick={toggleVisibility} className="course-info clickable">
            <div className="boder2">
                <div className="slot-header">
                    <div className="slot-number">Slot 1</div>
                    <div onClick={() => handleClicktoLessionInfor()} style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "flex-end",
                        fontSize: "18px",
                        fontWeight: "bold",
                        color: "blue",
                        marginRight: "2rem",
                        cursor: "pointer"
                    }}>View Slots</div>
                    <div className="date-time">
                        18:00 09/09/2024 - 19:30 09/09/2024
                    </div>
                </div>

                <div className="course-content">
                    <h3>Introduction to the online course ENW492c</h3>
                    <p><strong>MOOC 1:</strong></p>
                    <ul>
                        <li>Week 1: Course Introduction</li>
                        <li>Week 2: Verb Tenses and Conjunctions</li>
                        <li>Week 3: Compound and Complex Sentences</li>
                        <li>Week 4: More Commas, Parallel Structure, and Sentence Variety</li>
                    </ul>
                    <p><strong>MOOC 2:</strong></p>
                    <ul>
                        <li>Week 1: Course Introduction</li>
                        <li>Week 2: Essay Writing</li>
                    </ul>
                    <p>Review MOOC1</p>
                </div>
            </div>
            {isVisible && (
                <div style={{ cursor: "pointer" }} className="question-container" onClick={() => handleClicktoDicussion()}>
                    QUESTION:
                    <div className="question-item" >
                        <div className="question-icon">Q1</div>
                        <div className="question-text">Q1</div>
                        <div className="question-status not-started">Not start</div>
                    </div>
                    <div className="question-item">
                        <div className="question-icon">Q2</div>
                        <div className="question-text">Q2</div>
                        <div className="question-status not-started">Not start</div>
                    </div>
                    <div className="question-item">
                        <div className="question-icon">Q3</div>
                        <div className="question-text">Q3</div>
                        <div className="question-status not-started">Not start</div>
                    </div>
                </div>
            )}

        </div>
    );
}

export default Content;
