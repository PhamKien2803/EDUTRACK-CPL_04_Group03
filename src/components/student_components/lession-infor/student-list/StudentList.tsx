import React, { useState, useEffect } from "react";
import {
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,
    Avatar, Typography, Box
} from "@mui/material";
import GroupIcon from "@mui/icons-material/Group";
import { getClass, getParticipants } from "../../../../service/ApiService";
import { useTranslation } from 'react-i18next';


interface Participant {
    id: string;
    UserName: string;
    Age: number;
    Gender: true;
    Address: string;
    Email: string;
    Password: string;
    Image: string;
    Role: number;
    isOnline: boolean;
    Status: boolean;
}

interface Classes {
    ClassID: string;
    ClassName: string;
    Student: string[];
    Status: boolean;
}

interface Props {
    participants: Participant[];
    classes: Classes[];
}

const StudentList: React.FC<Props> = () => {
    const [participants, setParticipants] = useState<Participant[]>([]);
    const [classes, setClasses] = useState<Classes[]>([]);
    const { t } = useTranslation();

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

    const getStudentsInClass = (classRoom: Classes) => {
        return participants.filter(participant =>
            classRoom.Student.includes(participant.id)
        );
    };

    return (
        <div className="container">
            {classes.map((classRoom) => {
                const students = getStudentsInClass(classRoom);

                return (
                    <Box key={classRoom.ClassID} mb={4}>
                        <Typography variant="h4">Class: {classRoom.ClassName}</Typography>
                        <Typography variant="subtitle1">
                            {t('number_of_students')}: {students.length}
                        </Typography>
                        <hr style={{ border: "2px solid lightgray", margin: "8px auto" }} />

                        <TableContainer component={Paper} sx={{ maxHeight: 400, marginTop: 2 }}>
                            <Table stickyHeader aria-label="student table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell></TableCell>
                                        <TableCell><Typography fontWeight="bold">{t('name_label')}</Typography></TableCell>
                                        <TableCell><Typography fontWeight="bold">{t('id_label')}</Typography></TableCell>
                                        <TableCell><Typography fontWeight="bold">{t('email_label')}</Typography></TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {students.map((student) => (
                                        <TableRow key={student.id}>
                                            <TableCell>
                                                <Avatar src={student.Image || ""} sx={{ bgcolor: "#3f51b5", width: 30, height: 30 }}>
                                                    {!student.Image && <GroupIcon fontSize="small" />}
                                                </Avatar>
                                            </TableCell>
                                            <TableCell>
                                                <Typography>{student.UserName}</Typography>
                                            </TableCell>
                                            <TableCell>
                                                <Typography>{student.id}</Typography>
                                            </TableCell>
                                            <TableCell>
                                                <Typography>{student.Email}</Typography>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Box>
                );
            })}
        </div>
    );
};

export default StudentList;
