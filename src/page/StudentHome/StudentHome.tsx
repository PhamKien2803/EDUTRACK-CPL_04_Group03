import { FaBars } from "react-icons/fa";
import SideBar from "../HomePage/SideBar";
import { useState } from "react";

import Dicussion from "../../components/Answer/Dicussions/Dicussion";

function HomePage() {
  const [collapsed, setCollapsed] = useState<boolean>(false);
  return (
    <div className="admin-container" style={{ display: "flex" }}>
      <div className="admin-sidebar" style={{ height: "100%" }}>
        <SideBar />
      </div>
      <div className="admin-main" style={{ width: "100%" }}>
        <div className="collapsed">
          <FaBars cursor={"pointer"} onClick={() => setCollapsed(!collapsed)} />
        </div>
        <div>
          <Dicussion></Dicussion>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
