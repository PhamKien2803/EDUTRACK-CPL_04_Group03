import SideBar from "../HomePage/SideBar";
import Subject from "../HomePage/Subject";

function HomePage() {
  return (
    <div className="admin-container">
      <div className="admin-sidebar"></div>
      <SideBar></SideBar>

      <div className="admin-main">
        <div className="collapsed"></div>
        <Subject />
        <div></div>
      </div>
    </div>
  );
}

export default HomePage;
