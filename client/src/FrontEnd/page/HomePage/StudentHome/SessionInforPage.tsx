import CourseOutline from "../../../components/SessionInfor/CourseOutline"
import TrackingOnline from "../../../components/SessionInfor/StudentTracking/TrackingOnline"
import NavTabsSession from "../../Layouts/NavTabsSession/NavTabsSession"

function SessionInforPage() {
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

export default SessionInforPage
