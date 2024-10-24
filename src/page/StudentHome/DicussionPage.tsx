import Breadcrumb from '../../components/HeaderNav/Breadcrumb'
import Question from '../../components/Answer/Question'
import Dicussion from '../../components/Answer/Dicussion'
import Comment from '../../components/Answer/Comment'
import ProgressTracker from '../../components/Answer/ProgressTracker'

function DicussionPage() {

    return (
        <div>
            <Breadcrumb />
            <div style={{ width: '98%' }} className='container-fluid'>
                <div className='row'>
                    <div className='col-8'>
                        <Question />
                        <Dicussion />
                        <Comment />
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
