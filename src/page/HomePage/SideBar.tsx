import { DiReact } from "react-icons/di";
import { FaGem, FaGithub } from 'react-icons/fa';
import { MdDashboard } from "react-icons/md";
import {
  Menu,
  MenuItem,
  ProSidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SubMenu,
} from 'react-pro-sidebar';
import 'react-pro-sidebar/dist/css/styles.css';
import sidebarBg from '../../assets/bg2.jpg';

function SideBar(props) {
  const { collapsed, toggled, handleToggleSidebar } = props;

  return (
    <>
      <ProSidebar
        image={sidebarBg}
        collapsed={collapsed}
        toggled={toggled}
        breakPoint="md"
        onToggle={handleToggleSidebar}
      >
        <SidebarHeader>
          <div
            style={{
              padding: '24px',
              textTransform: 'uppercase',
              fontWeight: 'bold',
              fontSize: 14,
              letterSpacing: '1px',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}
          >   <DiReact size={'3em'} color={'00bfff'} />


            Admin dashboard
          </div>
        </SidebarHeader>

        <SidebarContent>
          <Menu iconShape="circle">
            <MenuItem
              icon={<MdDashboard />}

            >
              Dashboard

            </MenuItem>

          </Menu>
          <Menu iconShape="circle">
            <SubMenu

              icon={<FaGem />}
              title={"Fuatures"}
            >
              <MenuItem> Manager Quiz</MenuItem>
              <MenuItem>Manage Users</MenuItem>
              <MenuItem> Manage Questio</MenuItem>
            </SubMenu>

          </Menu>
        </SidebarContent>

        <SidebarFooter style={{ textAlign: 'center' }}>
          <div
            className="sidebar-btn-wrapper"
            style={{
              padding: '20px 24px',
            }}
          >
            <a
              href="https://github.com/PhuongHE173077/FER202_Project"
              target="_blank"
              className="sidebar-btn"
              rel="noopener noreferrer"
            >
              <FaGithub />
              <span style={{ whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>
                Quizz dashboard
              </span>
            </a>
          </div>
        </SidebarFooter>
      </ProSidebar>
    </>

  );
}

export default SideBar;