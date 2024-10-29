import HomePage from "../page/StudentHome/StudentHome";

interface router {
  name?: string;
  key: string;
  path?: string;
  component?: React.ReactNode;
}

const routesStudentHome: router[] = [
  {
    name: "HomePage",
    key: "homepage",
    path: "/homePage",
    component: <HomePage />,
  },
];

const routesLecturersHome: router[] = [
  {
    exact: true,
    path: "/",
    // component: HomePage
  },
];

const routesStaffHome: router[] = [
  {
    exact: true,
    path: "/",
    // component: HomePage
  },
];
