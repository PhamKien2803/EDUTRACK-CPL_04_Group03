interface router {
    name?: string,
    key: string,
    path: string,
    component?: React.ReactNode
}


const routesStudentHome: router[] = [
    {
        name: "HomePage",
        key: "homepage",
        path: "/",
        //  component: <HomePage
    }
]

const routesLecturersHome = [
    {
        exact: true,
        path: "/",
        // component: HomePage
    }
]

const routesStaffHome = [
    {
        exact: true,
        path: "/",
        // component: HomePage
    }
]