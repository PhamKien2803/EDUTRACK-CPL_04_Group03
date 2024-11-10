import AssignmentContent from "../../../../components/lecturers_components/session-assignment/content-assignment/AssignmentContent"
import TableSubmission from "../../../../components/lecturers_components/session-assignment/submission-assignment/TableSubmission"
import ColsContent from "../../../../components/lecturers_components/session-assignment/table-content/ColsContent"
import ColsStatus from "../../../../components/lecturers_components/session-assignment/table-content/ColsStatus"

function SessionAssignment() {
  return (
    <div>
      <div style={{ width: '98%' }} className='container-fluid'>
        <div className='row'>
          <div className='col-7'>
            <AssignmentContent />
            <hr style={{ border: '1px solid lightgray', margin: '8px auto' }} />
            <TableSubmission />
          </div>
          <div className='col-5'>
            <ColsContent />
            <hr style={{ border: '1px solid black', margin: '8px auto' }} />
            <ColsStatus />
          </div>
        </div>
      </div>
    </div>
  )
}

export default SessionAssignment
