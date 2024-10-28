import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Avatar, Typography } from "@mui/material";
import GroupIcon from "@mui/icons-material/Group";


function StudentList() {
    interface Student {
        name?: string;
        id?: string;
        email?: string;
        avatar?: string;
    }
    const studentData: Student[] = [
        { name: "Lê Thị Minh Anh", id: "HE163502", email: "anhltmhe163502@fpt.edu.vn" },
        { name: "Phạm Thị Quỳnh Dung", id: "HE171569", email: "dungptqhe171569@fpt.edu.vn" },
        { name: "Lưu Ngọc Lê Hoàng", id: "HE163605", email: "hoanglnlhe163605@fpt.edu.vn" },
        { name: "Nguyễn Việt Hoàng", id: "HE180240", email: "hoangnvhe180240@fpt.edu.vn" },
        { name: "Vũ Thị Thu Huyền", id: "HE172681", email: "huyenvtthe172681@fpt.edu.vn" },
        { name: "Nguyễn Thị Huyền", id: "HE172781", email: "huyennnthe172781@fpt.edu.vn" },
        { name: "Phạm Duy Kiên", id: "HE170155", email: "kienpdhe170155@fpt.edu.vn" },
        { name: "Vũ Diệu Linh", id: "HE176833", email: "linhvdhe176833@fpt.edu.vn" },
        
    ];

    return (
        <div className="container">
            <div className="row">
                <h4>Class: SE2810</h4>
                <hr style={{ border: "2px solid lightgray", margin: "8px auto" }} />
                <h4 style={{ fontSize: "20px" }}>The number of students who joined the group: 20</h4>
            </div>
            <div className="row">
                <div className="col-12">
                    <TableContainer component={Paper} sx={{ maxHeight: 400 }}>
                        <Table stickyHeader aria-label="student table">
                            <TableHead>
                                <TableRow>
                                    <TableCell></TableCell>
                                    <TableCell><Typography fontWeight="bold">Name</Typography></TableCell>
                                    <TableCell><Typography fontWeight="bold">ID</Typography></TableCell>
                                    <TableCell><Typography fontWeight="bold">Email</Typography></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {studentData.map((student, index) => (
                                    <TableRow key={index}>
                                        <TableCell>
                                            <Avatar sx={{ bgcolor: "#3f51b5", width: 30, height: 30 }}>
                                                <GroupIcon fontSize="small" />
                                            </Avatar>
                                        </TableCell>
                                        <TableCell>
                                            <Typography>{student.name}</Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Typography>{student.id}</Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Typography>{student.email}</Typography>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
            </div>
        </div>
    )
}

export default StudentList
