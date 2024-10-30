import Subject from "../../../components/student_components/course/subject";
import SideBar from "../../../layouts/side-bar/SideBar";

function HomePage() {
  return (
    <div className="admin-container">
      <div className="admin-sidebar"></div>
      <SideBar />

      <div className="admin-main">
        <div className="collapsed"></div>
        <Subject />
      </div>
    </div>
  );
}

export default HomePage;
