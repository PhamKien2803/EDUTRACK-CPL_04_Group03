import { ExamDetail } from "../components/student_components/examtest/ExamDetail";
import { ExamList } from "../components/student_components/examtest/ExamList";
import Profile from "../components/student_components/profile/profile";
import EditProfile from "../components/student_components/profile/updateProfile";
import LecturersHomePage from "../page/home-page/lecturers-home/LecturersHomePage";
import StaffHomePage from "../page/home-page/staff-home/StaffHomePage";
import DicussionPage from "../page/home-page/student-home/DicussionPage";
import Lession from "../page/home-page/student-home/Lession";
import LessionInfor from "../page/home-page/student-home/LessionInfor";
import StudentHome from "../page/home-page/student-home/StudentHome";


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
        path: "/home-page",
        component: StudentHome
    },

    {
        name: "lession",
        key: "LessionPage",
        path: "/lession-course",
        component: Lession
    },

    {
        name: "examtest",
        key: "ExamTestPage",
        path: "/exam-test",
        component: ExamList
    },
    {
        name: "examtest",
        key: "ExamTestPage",
        path: "/examDetail",
        component: ExamDetail
    },

    {
        name: "lession_infor",
        key: "LessionInforPage",
        path: "/lession-infor/details/:id",
        component: LessionInfor
    },

    {
        name: "Dicussion",
        key: "DicussionPage",
        path: "/dicussion-page",
        component: DicussionPage
    },
    {
        name: "Profile",
        key: "ProfilePage",
        path: "/profile",
        component: Profile
    },
    {
        name: "Update-Profile",
        key: "ProfilePage",
        path: "/edit-profile",
        component: EditProfile
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