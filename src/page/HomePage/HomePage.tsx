import { FaBars } from "react-icons/fa";
import SideBar from "./SideBar";
import { useState } from "react";
import Subject from "./Subject";
import { ExamList } from "../../components/Exam/ExamList";

function HomePage() {
  const [collapsed, setCollapsed] = useState<boolean>(false);
  return (
    <div className='admin-container' style={{ display: "flex" }}>
      <div className='admin-sidebar' style={{ height: '100%' }}>
        <SideBar collapsed={collapsed} />
      </div>
      <div className='admin-main' style={{ width: '100%' }}>
        <div className='collapsed'>
          <FaBars cursor={'pointer'} onClick={() => setCollapsed(!collapsed)} />
        </div>
        <div>
          <ExamList />
        </div>

      </div>

    </div>
  );
}

export default HomePage;
