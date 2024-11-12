import Information from "../../../components/student_components/dicussion-assignment/information-assignment/Information"
import OverViews from "../../../components/student_components/dicussion-assignment/overviews-assignment/OverViews"
import Submited from "../../../components/student_components/dicussion-assignment/submited-assignment/Submited"

function DicussionAssignment() {
    return (
        <div>
            <div style={{ width: '98%' }} className='container-fluid'>
                <div className='row'>
                    <div className='col-7'>
                        <Information/>
                        <hr style={{ border: '1px solid lightgray', margin: '8px auto' }} />
                        <Submited/>
                    </div>
                    <div className='col-5'>
                        <OverViews/>
                        <hr style={{ border: '1px solid black', margin: '8px auto' }} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DicussionAssignment
