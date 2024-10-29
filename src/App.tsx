
import { Fragment } from "react/jsx-runtime"

import Lession from "./page/lession/Lession"

// import DicussionPage from "./page/StudentHome/DicussionPage"

// import { ExamDetail } from "./components/Exam/ExamDetail"


function App() {

  const showRoutes = (Component: React.ComponentType, routes: RouteType[]) => {
    return routes.map((route: RouteType) => (
      <Route
        key={route?.key}
        path={route?.path}
        element={<Component />}
      />
    ));
  };

  return (

    <Fragment>
      <Lession />

      {/* Header Nav */}
      {/* <Breadcrumb /> */}

      {/* <SessionInforPage/> */}
      {/* <DicussionPage /> */}
      {/* <ExamDetail /> */}
    </Fragment>


  )
}

export default App;
