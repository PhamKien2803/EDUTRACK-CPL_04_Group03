import SideBar from "../HomePage/SideBar";
function HomePage() {
  return (
    <div className="admin-container" style={{ display: "flex" }}>
      <div className="admin-sidebar" style={{ height: "100%" }}>
        <SideBar />
      </div>
      <div className="admin-main" style={{ width: "100%" }}>
        <div className="collapsed">
        </div>
        <div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
