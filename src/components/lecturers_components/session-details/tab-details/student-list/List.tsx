import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,
  Avatar, Typography, Box, Divider
} from "@mui/material";
import GroupIcon from "@mui/icons-material/Group";
import { useLocation } from "react-router-dom";
import { participants, classRoom } from "../../../../../models/Interface";
import { useTranslation } from 'react-i18next';

interface Props {
  participants: participants[];
  classes: classRoom[];
}
const List: React.FC<Props> = ({ participants, classes }) => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const classid = queryParams.get("classid");

  const { t } = useTranslation();

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
          <Box
            key={classRoom.ClassID}
            mb={4}
            sx={{
              bgcolor: "background.paper",
              borderRadius: 4,
              p: 3,
              boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
              transition: "transform 0.3s, box-shadow 0.3s",
              "&:hover": {
                transform: "translateY(-5px)",
                boxShadow: "0 6px 20px rgba(0, 0, 0, 0.15)",
              },
            }}
          >
            {/* Class Header */}
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              sx={{
                mb: 2,
              }}
            >
              <Typography variant="h5" fontWeight="bold" color="primary.main">
                {t('class', { defaultValue: 'Class:' })} {classRoom.ClassName}
              </Typography>
              <Typography
                variant="body2"
                fontWeight="bold"
                sx={{
                  color: "text.secondary",
                  bgcolor: "primary.light",
                  px: 2,
                  py: 0.5,
                  borderRadius: 2,
                }}
              >
                {students.length} {t('students', { defaultValue: 'Students' })}
              </Typography>
            </Box>

            <Divider sx={{ my: 2, borderColor: "divider" }} />

            {/* Student Table */}
            <TableContainer
              component={Paper}
              elevation={3}
              sx={{
                borderRadius: 3,
                overflow: "hidden",
                bgcolor: "background.default",
              }}
            >
              <Table stickyHeader aria-label="student table">
                <TableHead>
                  <TableRow
                    sx={{
                      bgcolor: "primary.main",
                      "& .MuiTableCell-root": {
                        color: "common.white",
                        fontWeight: "bold",
                      },
                    }}
                  >
                    <TableCell></TableCell>
                    <TableCell>
                      <Typography color="common.black" variant="subtitle2" fontWeight="bold">
                        {t('name', { defaultValue: 'Name' })}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography color="common.black" variant="subtitle2" fontWeight="bold">
                        {t('id', { defaultValue: 'ID' })}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography color="common.black" variant="subtitle2" fontWeight="bold">
                        {t('email', { defaultValue: 'Email' })}
                      </Typography>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {students.map((student) => (
                    <TableRow
                      key={student.id}
                      hover
                      sx={{
                        "&:hover": {
                          bgcolor: "action.hover",
                        },
                      }}
                    >
                      <TableCell width="5%">
                        <Avatar
                          src={student.Image || ""}
                          sx={{
                            bgcolor: "primary.light",
                            width: 32,
                            height: 32,
                            fontSize: "14px",
                          }}
                        >
                          {!student.Image && <GroupIcon fontSize="small" />}
                        </Avatar>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2" fontWeight="medium">
                          {student.UserName}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2" color="text.secondary">
                          {student.id}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2" color="text.secondary">
                          {student.Email}
                        </Typography>
                      </TableCell>
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
