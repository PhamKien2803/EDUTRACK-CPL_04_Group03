import HomePage from "../page/HomePage/HomePage";
import LecturersHomePage from "../page/LecturersHome/LecturersHomePage";
import Lession from "../page/lession/Lession";
import StaffHomePage from "../page/StaffHome/StaffHomePage";
import DicussionPage from "../page/StudentHome/DicussionPage";
import SessionInforPage from "../page/StudentHome/SessionInforPage";

interface Router {
    name?: string;
    key?: string;
    path?: string;
    component: React.ComponentType;
}

const routesStudentHome: Router[] = [
    {
        name: "StudentHome",
        key: "StudentHomePage",
        path: "/homePage",
        component: HomePage
    },

    {
        name: "Lession",
        key: "LessionPage",
        path: "/lessioncourse",
        component: Lession
    },

    {
        name: "LessionInfor",
        key: "LessionInforPage",
        path: "/lessioninfor",
        component: SessionInforPage
    },

    {
        name: "Dicussion",
        key: "DicussionPage",
        path: "/dicussion",
        component: DicussionPage
    }


];

const routesLecturersHome: Router[] = [
    {
        key: "homepage_lecturer",
        path: "/",
        component: LecturersHomePage
    }
];

const routesStaffHome: Router[] = [
    {
        key: "homepage_staff",
        path: "/",
        component: StaffHomePage
    }
];

const routes: Router[] = [...routesStudentHome, ...routesLecturersHome, ...routesStaffHome];

export { routes };
