import React, { useState, useEffect } from "react";
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,
  Avatar, Typography, Box, Divider
} from "@mui/material";
import GroupIcon from "@mui/icons-material/Group";
import { getClass, getParticipants } from "../../../../../service/ApiService";
import { classRoom, participants } from "../../../../../models/Interface";



interface ListProps {
  participants: participants[];
  classes: classRoom[];
}

const List: React.FC<ListProps> = () => {
  const [participants, setParticipants] = useState<participants[]>([]);
  const [classes, setClasses] = useState<classRoom[]>([]);

  useEffect(() => {
    fetchParticipants();
    fetchClasses();
  }, []);

  const fetchParticipants = async () => {
    const res = await getParticipants();
    if (Array.isArray(res)) {
      setParticipants(res);
    }
  };

  const fetchClasses = async () => {
    const res = await getClass();
    if (Array.isArray(res)) {
      setClasses(res);
    }
  };

  const getStudentsInClass = (classRoom: classRoom) => {
    return participants.filter(participant => classRoom.Student.includes(participant.id));
  };

  return (
    <Box sx={{ padding: 3 }}>
      {classes.map((classRoom) => {
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
