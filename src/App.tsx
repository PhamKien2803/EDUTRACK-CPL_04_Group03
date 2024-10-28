import { Fragment } from "react/jsx-runtime"
// import DicussionPage from "./page/StudentHome/DicussionPage"
import Breadcrumb from "./components/HeaderNav/Breadcrumb"
import SessionInforPage from "./page/StudentHome/SessionInforPage"
// import { ExamDetail } from "./components/Exam/ExamDetail"

function App() {

  return (
    <Fragment>
      {/* Header Nav */}
      <Breadcrumb />
      
      <SessionInforPage/>
      {/* <DicussionPage /> */}
      {/* <ExamDetail /> */}
    </Fragment>
  )
}

export default App
