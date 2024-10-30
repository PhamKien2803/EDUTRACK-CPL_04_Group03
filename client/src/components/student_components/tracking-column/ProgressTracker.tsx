import ChartStatistics from "./ChartStatistics"
import ClassMeetingCard from "./ClassMeetingCard"
import UpcomingQuestionsTable from "./UpcomingQuestionsTable"


function ProgressTracker() {
  return (
    <div>
      <ChartStatistics totalStudents={20} studentsCommented={10}/>
      <hr style={{
        border: "1px solid lightgray",
        margin: "8px auto"
      }} />
      <UpcomingQuestionsTable/>
      <hr style={{
        border: "1px solid lightgray",
        margin: "8px auto"
      }} />
      <ClassMeetingCard/>
    </div>
  )
}

export default ProgressTracker
