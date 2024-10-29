import StudentHome from "../page/StudentHome/StudentHome";
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
        name: "student_home",
        key: "StudentHomePage",
        path: "/homePage",
        component: StudentHome
    },

    {
        name: "lession",
        key: "LessionPage",
        path: "/lessioncourse",
        component: Lession
    },

    {
        name: "lession_infor",
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
        path: "/lecturer/homePage",
        component: LecturersHomePage
    }
];

const routesStaffHome: Router[] = [
    {
        key: "homepage_staff",
        path: "/staff/homePage",
        component: StaffHomePage
    }
];


const routes: Router[] = [...routesStudentHome, ...routesLecturersHome, ...routesStaffHome];

export { routes };
