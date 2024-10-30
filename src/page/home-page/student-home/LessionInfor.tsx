import CourseOutline from "../../../components/student_components/lession-infor/lession-outline/CourseOutline"
import TrackingOnline from "../../../components/student_components/lession-infor/student-status/TrackingOnline"
import NavTabsSession from "../../../components/student_components/navtab-lession/NavTabsSession"


function LessionInfor() {
    return (
        <div className="container">
            <div className="row">
                <div style={{padding: "0px 0px"}} className="col-9">
                    <CourseOutline/>
                    <NavTabsSession/>
                </div>
                <div className="col-3">
                    <TrackingOnline/>
                </div>
            </div>
        </div>
    )
}

export default LessionInfor
