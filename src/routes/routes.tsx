import { ExamDetail } from "../components/student_components/examtest/ExamDetail";
import { ExamList } from "../components/student_components/examtest/ExamList";
import { HistoryExam } from "../components/student_components/examtest/exam-history/HistoryExam";
import Profile from "../components/student_components/profile/profile";
import EditProfile from "../components/student_components/profile/updateProfile";
import { AddExam } from "../page/home-page/lecturers-home/Exam/AddExam";
import LecturersHomePage from "../page/home-page/lecturers-home/LecturersHomePage";
import StaffHomePage from "../page/home-page/staff-home/StaffHomePage";
import DicussionPage from "../page/home-page/student-home/DicussionPage";
import Lession from "../page/home-page/student-home/Lession";
import LessionInfor from "../page/home-page/student-home/LessionInfor";
import StudentHome from "../page/home-page/student-home/StudentHome";
import Lession_Lecturers from "../page/home-page/lecturers-home/Lecturers_Lesstion/Lession_Lecturers";
import SessionDicussion from "../page/home-page/lecturers-home/Session/SessionDicussion";
import SessionAssignment from "../page/home-page/lecturers-home/Session/SessionAssignment";
import SessionDetails from "../page/home-page/lecturers-home/Session/SessionDetails";
import DicussionAssignment from "../page/home-page/student-home/DicussionAssignment";
import LogoutButton from "../page/Auth/logout/logout";
import Contact from "../components/student_components/contact-support/contact";
import VerifyOTP from "../page/Auth/forgot-password/VerifyOTP";
import ResetPassword from "../page/Auth/forgot-password/ResetPassword";

import { AddingCourseSemester } from "../page/home-page/staff-home/ManageCourseSemester/AddingCourseSemester";
import { MangerCourse } from "../page/home-page/staff-home/ManageCourseSemester/MangerCourse";
import ManageExam from "../page/home-page/lecturers-home/Exam/ManageExam";
import { ViewExam } from "../page/home-page/lecturers-home/Exam/ViewExam";
import { ViewDetailResult } from "../page/home-page/lecturers-home/Exam/ViewDetailResult";
import { UpdateExam } from "../page/home-page/lecturers-home/Exam/UpdateExam";

import DashBoardPage from "../page/home-page/student-home/DashBoardPage";

import CreatingClass from "../page/home-page/staff-home/CreatingClass/CreatingClass";

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
    component: StudentHome,
  },

  {
    name: "lession",
    key: "LessionPage",
    path: "/lession-course",
    component: Lession,
  },

  {
    name: "examtest",
    key: "ExamTestPage",
    path: "/exam-test",
    component: ExamList,
  },
  {
    name: "examtest",
    key: "ExamTestPage",
    path: "/examDetail",
    component: ExamDetail,
  },

  {
    name: "lession_infor",
    key: "LessionInforPage",
    path: "/lession-infor/details/:id",
    component: LessionInfor,
  },

  {
    name: "Dicussion",
    key: "DicussionPage",
    path: "/dicussion-page/question",
    component: DicussionPage,
  },

  {
    name: "DicussionAssignment",
    key: "DicussionAssignment",
    path: "/dicussion-page/assignment",
    component: DicussionAssignment,
  },

  {
    name: "History",
    key: "History",
    path: "/history",
    component: HistoryExam,
  },

  {
    name: "AddExam",
    key: "AddExam",
    path: "/addingExam",
    component: AddExam,
  },

  {
    name: "Profile",
    key: "ProfilePage",
    path: "/profile",
    component: Profile,
  },
  {
    name: "Profile",
    key: "ProfilePage",
    path: "/profile",
    component: Profile,
  },
  {
    name: "AddExam",
    key: "AddExam",
    path: "/addingExam",
    component: AddExam,
  },
  {
    name: "Profile",
    key: "ProfilePage",
    path: "/profile",
    component: Profile,
  },

  {
    name: "Update-Profile",
    key: "ProfilePage",
    path: "/edit-profile",
    component: EditProfile,
  },
  {
    name: "Logout",
    key: "LogoutPage",
    path: "/logout",
    component: LogoutButton,
  },
  {
    name: "Contact",
    key: "ContactPage",
    path: "/contact",
    component: Contact,
  },
  // {
  //   name: "VerifyOTP",
  //   key: "VerifyOTPPage",
  //   path: "/verify-otp",
  //   component: VerifyOTP
  // },
  // {
  //   name: "ResetPassword",
  //   key: "ResetPasswordPage",
  //   path: "/reset-password",
  //   component: ResetPassword
  // },

  {
    name: "Update-Profile",
    key: "ProfilePage",
    path: "/edit-profile",
    component: EditProfile,
  },
  {
    name: "Logout",
    key: "LogoutPage",
    path: "/logout",
    component: LogoutButton,
  },
  {
    name: "Dashboard",
    key: "DashboardPage",
    path: "/dashboardPage",
    component: DashBoardPage,
  },
];

const routesLecturersHome: Router[] = [
  {
    name: "lecturers_home",
    key: "homepage_lecturer",
    path: "/lecturer/homePage",
    component: LecturersHomePage,
  },
  {
    name: "AddExam",
    key: "AddExam",
    path: "/addingExam",
    component: AddExam,
  },
  {
    name: "lecturers_home",
    key: "homepage_lecturer",
    path: "/lecturer/homePage",
    component: LecturersHomePage,
  },

  {
    name: "lession",
    key: "LessionPage",
    path: "/lecturer/lession-course",
    component: Lession_Lecturers,
  },
  {
    name: "SessionDetails",
    key: "SessionDetails",
    path: "/lecturer/session-details",
    component: SessionDetails,
  },

  {
    name: "SessionDicussion",
    key: "SessionDicussion",
    path: "/lecturer/session-question",
    component: SessionDicussion,
  },

  {
    name: "SessionAssignment",
    key: "SessionAssignment",
    path: "/lecturer/session-assignment",
    component: SessionAssignment,
  },

  {
    name: "lession",
    key: "LessionPage",
    path: "/lecturer/lession-course",
    component: Lession_Lecturers,
  },
  {
    name: "Profile",
    key: "ProfilePage",
    path: "/profile",
    component: Profile,
  },
  {
    name: "lession",
    key: "LessionPage",
    path: "/lecturer/lession-course",
    component: Lession_Lecturers,
  },
  {
    name: "Profile",
    key: "ProfilePage",
    path: "/profile",
    component: Profile,
  },

  {
    name: "Update-Profile",
    key: "ProfilePage",
    path: "/edit-profile",
    component: EditProfile,
  },
  {
    name: "Logout",
    key: "LogoutPage",
    path: "/logout",
    component: LogoutButton,
  },

  {
    name: "Update-Profile",
    key: "ProfilePage",
    path: "/edit-profile",
    component: EditProfile,
  },
  {
    name: "Logout",
    key: "LogoutPage",
    path: "/logout",
    component: LogoutButton,
  },

  {
    name: "AddExam",
    key: "AddExam",
    path: "/addingExam",
    component: AddExam,
  },

  {
    name: "manageExam",
    key: "manageExam",
    path: "/manageExam",
    component: ManageExam,
  },
  {
    name: "viewExam",
    key: "viewExam",
    path: "/viewExam",
    component: ViewExam,
  },
  ,
  {
    name: "ViewDetailResult",
    key: "ViewDetailResult",
    path: "/viewDetailResult",
    component: ViewDetailResult,
  },
  {
    name: "updateExam",
    key: "updateExam",
    path: "/updateExam",
    component: UpdateExam,
  },
];

const routesStaffHome: Router[] = [
  {
    key: "homepage_staff",
    path: "/staff/homePage",
    component: StaffHomePage,
  },
  {
    key: "create_class",
    path: "/staff/create-class",
    component: CreatingClass,
  },
  {
    key: "AddingCourseSemester",
    path: "/AddingCourseSemester",
    component: AddingCourseSemester,
  },
  {
    key: "manage_course_semester",
    path: "/manage_course_semester",
    component: MangerCourse,
  },
];

export { routesLecturersHome, routesStaffHome, routesStudentHome };
