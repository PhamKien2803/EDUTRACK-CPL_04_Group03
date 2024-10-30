import { useState } from 'react';
import "../css/Lession.css";
import { useNavigate } from 'react-router-dom';
const Header: React.FC = () => {
    // State to track the selected option from the dropdown
    const [activityFilter, setActivityFilter] = useState('All Activities');
    const [isVisible, setIsVisible] = useState(true);
    const navigate = useNavigate();

    const toggleVisibility = () => {
        setIsVisible(!isVisible);
    };
    const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setActivityFilter(event.target.value);
    };

    const navigateToExam = () => {
        navigate("/examtest");
    }


    return (
        <div>

            <div className="course-container">
                <nav className="breadcrumb">
                    <a href="#">Home</a> / <a>ENW492c ↔ Academic Writing Skills_Kỹ năng viết học thuật</a>
                </nav>
            </div>
            {isVisible && (

                <div className="select-container">

                    <select value={activityFilter} onChange={handleSelectChange} className="activity-select">
                        <option>All Activities</option>
                        <option>Hidden</option>
                        <option>On Going</option>
                        <option>Cancelled</option>
                        <option>Completed</option>
                        <option>Not Started</option>
                        <option>Assignment or Feedback</option>
                    </select>


                    <select>
                        <option>Slot 1</option>
                        <option>Slot 2</option>
                        <option>Slot 3</option>
                        <option>Slot 4</option>
                        <option>Slot 5</option>
                        <option>Slot 6</option>
                    </select>

                    <select>
                        <option>ENW492C.40</option>
                    </select>

                    <button onClick={() => navigateToExam()} className="button-exam">EXAM</button>
                </div>
            )}

            <button onClick={toggleVisibility} style={{ color: 'blue', border: 'none', background: 'none', cursor: 'pointer' }}>
                SHOW/HIDE (HIỆN/ẨN)
            </button>
        </div>



    )
}

export default Header
