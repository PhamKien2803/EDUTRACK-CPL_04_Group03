import { useState } from 'react';
import "../css/Lession.css";
import { useNavigate } from 'react-router-dom';

interface lession {
  id: string,
  SemesterID: string,
  SlotID: string[]
  CourseID: string,
  StudentID: string,
  LecturersID: string,
  ClassID: string
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

interface classRoom {
  ClassID: string,
  ClassName: string,
  Student: string[],
  Status: boolean
}




interface Props {
  lession: lession,
  partcipants: participants[],
  classes: classRoom[],
  setselected: (id: string) => void
}

const Header: React.FC<Props> = ({ lession, classes }) => {
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
    navigate("/exam-test");
  }
  console.log(lession);


  return (
    <>

      <div>

        <div className="course-container">
          <nav className="breadcrumb">
            <a href="/homePage">Home</a> {lession?.CourseID} <a> ↔ Academic Writing Skills_Kỹ năng viết học thuật</a>
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
              {lession.SlotID.map((id, index) => (
                <option key={`slot-${id}`}>slot {index + 1}</option>
              ))}


            </select>

            <select>
              <option>{classes.find(c => c.ClassID === lession?.ClassID)?.ClassName}</option>
            </select>

            <button onClick={() => navigateToExam()} className="button-exam">EXAM</button>
          </div>

        )}

        <button onClick={toggleVisibility} style={{ color: 'blue', border: 'none', background: 'none', cursor: 'pointer', marginLeft: '20px' }}>
          SHOW/HIDE (HIỆN/ẨN)
        </button>
        <div className='lecturer'>TEACHERS:  THOPN3@FPT.EDU.VN</div>
      </div>



    </>

  )
}

export default Header
