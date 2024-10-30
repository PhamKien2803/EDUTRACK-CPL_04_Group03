import Question from '../../../components/student_components/dicussion-question/content/Question'
import NavTabs from '../../../components/student_components/navtab-dicussion/NavTabs'
import ProgressTracker from '../../../components/student_components/tracking-column/ProgressTracker'

function DicussionPage() {

    return (
        <div>
            {/* <Breadcrumb /> */}
            <div style={{ width: '98%' }} className='container-fluid'>
                <div className='row'>
                    <div className='col-8'>
                        <Question />
                        <NavTabs/>
                    </div>
                    <div className='col-4'>
                        <ProgressTracker />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DicussionPage
