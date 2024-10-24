import Breadcrumb from '../../components/HeaderNav/Breadcrumb'
import Question from '../../components/Answer/Question'
import ProgressTracker from '../../components/Answer/ProgressTracker'
import NavTabs from '../../components/Answer/NavTabss/NavTabs'

function DicussionPage() {

    return (
        <div>
            <Breadcrumb />
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
