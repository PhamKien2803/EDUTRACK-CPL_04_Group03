import React from 'react';
import './Lession.css';

function Content() {
    return (
        <div>
            <div className="course-info">
                <div className="boder2">
                    <div className="slot-header">
                        <div className="slot-number">Slot 1</div>
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
            </div>
        </div>
    );
}

export default Content;