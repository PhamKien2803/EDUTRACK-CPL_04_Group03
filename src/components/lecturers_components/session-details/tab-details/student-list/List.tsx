import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,
  Avatar, Typography, Box, Divider
} from "@mui/material";
import GroupIcon from "@mui/icons-material/Group";
import { useLocation } from "react-router-dom";
import { participants, classRoom } from "../../../../../models/Interface";

interface Props {
  participants: participants[];
  classes: classRoom[];
}
const List: React.FC<Props> = ({ participants, classes }) => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const classid = queryParams.get("classid");

  const getStudentsInClass = (classRoom: classRoom) => {
    return participants.filter(participant => classRoom.Student.includes(participant.id));
  };

  const filteredClasses = classid
    ? classes.filter(classRoom => classRoom.ClassID === classid)
    : classes;

  return (
    <Box sx={{ padding: 3 }}>
      {filteredClasses.map((classRoom) => {
        const students = getStudentsInClass(classRoom);

        return (
          <Box key={classRoom.ClassID} mb={4} sx={{ bgcolor: "#f9f9f9", borderRadius: 2, padding: 3, boxShadow: 1 }}>
            <Typography variant="h5" fontWeight="600" color="primary.main" mb={1}>
              Class: {classRoom.ClassName}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Number of Students: {students.length}
            </Typography>
            <Divider sx={{ my: 2, borderColor: "primary.light" }} />

            <TableContainer component={Paper} elevation={2} sx={{ borderRadius: 2, overflow: "hidden" }}>
              <Table stickyHeader aria-label="student table" size="small">
                <TableHead>
                  <TableRow sx={{ bgcolor: "primary.light" }}>
                    <TableCell></TableCell>
                    <TableCell><Typography variant="subtitle2" fontWeight="bold">Name</Typography></TableCell>
                    <TableCell><Typography variant="subtitle2" fontWeight="bold">ID</Typography></TableCell>
                    <TableCell><Typography variant="subtitle2" fontWeight="bold">Email</Typography></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {students.map((student) => (
                    <TableRow key={student.id} hover>
                      <TableCell width="5%">
                        <Avatar src={student.Image || ""} sx={{ bgcolor: "#3f51b5", width: 28, height: 28 }}>
                          {!student.Image && <GroupIcon fontSize="small" />}
                        </Avatar>
                      </TableCell>
                      <TableCell><Typography variant="body2">{student.UserName}</Typography></TableCell>
                      <TableCell><Typography variant="body2" color="text.secondary">{student.id}</Typography></TableCell>
                      <TableCell><Typography variant="body2" color="text.secondary">{student.Email}</Typography></TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        );
      })}
    </Box>
  );
};

export default List;
