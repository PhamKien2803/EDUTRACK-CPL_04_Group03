import React, { useEffect, useState } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    TableFooter,
    TablePagination,
    Button,
    Box,
} from "@mui/material";
import { styled } from "@mui/system";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { lession, slot } from "../../../../models/Interface";
import { useLocation, useNavigate } from "react-router-dom";
import { getCourseSemesterById, getSLot, getSLotById } from "../../../../service/ApiService";
import ReplyAllIcon from '@mui/icons-material/ReplyAll';
import { ModalAdd } from "./ModalAdd";
import { addSlotInLession, deleteSlot } from "../../../../service/ExamApi";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { ModalUpdate } from "./ModalUpdate";

interface Task {
    id: number;
    name: string;
    description: string;
    timeStart: string;
    timeEnd: string;
    status: string;
}

const data: Task[] = [
    {
        id: 1,
        name: "Task A",
        description: "Description for Task A",
        timeStart: "2024-12-01 08:00",
        timeEnd: "2024-12-01 10:00",
        status: "Completed",
    },
    {
        id: 2,
        name: "Task B",
        description: "Description for Task B",
        timeStart: "2024-12-01 11:00",
        timeEnd: "2024-12-01 13:00",
        status: "Pending",
    },
    {
        id: 3,
        name: "Task C",
        description: "Description for Task C",
        timeStart: "2024-12-02 09:00",
        timeEnd: "2024-12-02 11:00",
        status: "In Progress",
    },
];

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    fontWeight: "bold",
    backgroundColor: theme.palette.primary.light,
    color: theme.palette.common.white,
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
        backgroundColor: theme.palette.action.hover,
    },
}));

export const ViewCourseSm: React.FC = () => {
    const [page, setPage] = useState<number>(0);
    const [rowsPerPage, setRowsPerPage] = useState<number>(3);
    const [slot, setSlot] = useState<slot[]>([]);
    const [lession, setLession] = useState<lession>();
    const [open, setOpen] = React.useState(false);
    const [slotUpdate, setSlotUpdate] = useState<slot>();
    const [open2, setOpen2] = React.useState(false);

    const navigate = useNavigate();

    const location = useLocation();
    const param = new URLSearchParams(location.search);
    const lsId = param.get('ls');
    useEffect(() => {
        fetchSlot();
        fetchLessionByID();
    }, [])

    const fetchSlot = async () => {
        const res = await getSLot();
        if (Array.isArray(res)) {
            setSlot(res)
        }
    }

    const fetchLessionByID = async () => {
        const res = await getCourseSemesterById(lsId)
        setLession(res)
    }
    const handleChangePage = (_: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleClickModal = () => {
        setOpen(!open);
    };
    const handleClickModal2 = () => {
        setOpen2(!open2);
    };

    const handleUpdate = (id: string) => {
        setSlotUpdate(slot.find(s => s.id == id))
        setOpen2(!open2);

    };

    const handleDelete = (id: string) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await deleteSlot(id)
                    await addSlotInLession(lsId, lession.SlotID.filter(sl => sl !== id))
                    setLession({ ...lession, SlotID: lession.SlotID.filter(sl => sl !== id) })
                    toast.success('Delete succesfully')
                } catch (error) {
                    console.log(error);
                }

            }
        });

    };





    const handleAddSlot = async (slot: string) => {
        await addSlotInLession(lsId, [...lession.SlotID, slot])
    }
    const setData = (slot1: slot) => {
        setSlot([...slot, slot1])
        setLession({ ...lession, SlotID: [...lession?.SlotID, slot1.id] })
    }

    return (
        <>
            <Box sx={{ margin: '20px 0 20px 0px', display: 'flex', justifyContent: 'space-between' }} >
                <Button variant="outlined" onClick={() => navigate(-1)} startIcon={<ReplyAllIcon />}>Back</Button>
                <Button variant="outlined" onClick={() => handleClickModal()} startIcon={<AddCircleOutlineIcon />}>Add Slot</Button>
            </Box >

            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>Index</StyledTableCell>
                            <StyledTableCell>ID</StyledTableCell>
                            <StyledTableCell>Description</StyledTableCell>
                            <StyledTableCell>Time Start</StyledTableCell>
                            <StyledTableCell>Time End</StyledTableCell>
                            <StyledTableCell>Status</StyledTableCell>
                            <StyledTableCell>Actions</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {lession?.SlotID.map((row, index) => (
                            <StyledTableRow key={row}>
                                <TableCell>{index + 1}</TableCell>
                                <TableCell>{slot?.find(s => s.id === row)?.id}</TableCell>
                                <TableCell>
                                    {slot?.find((s) => s.id === row)?.Description?.length > 60
                                        ? `${slot.find((s) => s.id === row)?.Description.substring(0, 60)}...`
                                        : slot.find((s) => s.id === row)?.Description || "N/A"}
                                </TableCell>

                                <TableCell>{slot?.find(s => s.id === row)?.TimeStart}</TableCell>
                                <TableCell>{slot?.find(s => s.id === row)?.TimeEnd}</TableCell>
                                <TableCell>{slot?.find(s => s.id === row)?.Status ? "Start slot" : "Not Start"}</TableCell>
                                <TableCell>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={() => handleUpdate(row)}
                                        startIcon={<EditIcon />}
                                        style={{ marginRight: "8px" }}
                                    >
                                        Update
                                    </Button>
                                    <Button
                                        variant="contained"
                                        color="secondary"
                                        onClick={() => handleDelete(row)}
                                        startIcon={<DeleteIcon />}
                                    >
                                        Delete
                                    </Button>
                                </TableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                    <TableFooter>
                        <TableRow>
                            <TablePagination
                                rowsPerPageOptions={[3, 5, 10]}
                                count={lession?.SlotID.length}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                onPageChange={handleChangePage}
                                onRowsPerPageChange={handleChangeRowsPerPage}
                            />
                        </TableRow>
                    </TableFooter>
                </Table>
            </TableContainer>
            <ModalAdd open={open} handleClickModal={handleClickModal} handleAddSlot={handleAddSlot} setData={setData} />
            <ModalUpdate open2={open2} handleClickModal2={handleClickModal2} slotUpdate={slotUpdate} />
        </>

    );
};
