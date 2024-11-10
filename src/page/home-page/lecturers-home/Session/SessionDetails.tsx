import AddActivity from "../../../../components/lecturers_components/session-details/add-activity/AddActivity"
import TabSession from "../../../../components/lecturers_components/session-details/tab-details/TabSession"

function SessionDetails() {
  return (
    <div>
      <div style={{ width: '98%' }} className='container-fluid'>
        <div className='row'>
          <div className='col-12'>
            <TabSession />
            <hr style={{ border: '1px solid lightgray', margin: '8px auto' }} />
            <AddActivity />
          </div>
        </div>
      </div>
    </div>
  )
}

export default SessionDetails
