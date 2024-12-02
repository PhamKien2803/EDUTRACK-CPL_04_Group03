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
    IconButton,
    Tooltip,
} from "@mui/material";
import { styled } from "@mui/system";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { lession, slot } from "../../../../models/Interface";
import { useLocation, useNavigate } from "react-router-dom";
import { getCourseSemesterById, getSLot } from "../../../../service/ApiService";
import ReplyAllIcon from '@mui/icons-material/ReplyAll';
import { ModalAdd } from "./ModalAdd";
import { addSlotInLession, deleteSlot } from "../../../../service/ExamApi";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import { ModalUpdate } from "./ModalUpdate";

// interface Task {
//     id: number;
//     name: string;
//     description: string;
//     timeStart: string;
//     timeEnd: string;
//     status: string;
// }

// const data: Task[] = [
//     {
//         id: 1,
//         name: "Task A",
//         description: "Description for Task A",
//         timeStart: "2024-12-01 08:00",
//         timeEnd: "2024-12-01 10:00",
//         status: "Completed",
//     },
//     {
//         id: 2,
//         name: "Task B",
//         description: "Description for Task B",
//         timeStart: "2024-12-01 11:00",
//         timeEnd: "2024-12-01 13:00",
//         status: "Pending",
//     },
//     {
//         id: 3,
//         name: "Task C",
//         description: "Description for Task C",
//         timeStart: "2024-12-02 09:00",
//         timeEnd: "2024-12-02 11:00",
//         status: "In Progress",
//     },
// ];

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    fontWeight: "bold",
    color: theme.palette.common.white,
    textAlign: "center",
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
    console.log(slotUpdate);
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
                    if (lession) {
                        await addSlotInLession(lsId, lession.SlotID.filter(sl => sl !== id));
                    }
                    if (lession) {
                        setLession({ ...lession, SlotID: lession.SlotID.filter(sl => sl !== id) });
                    }
                    toast.success('Delete succesfully')
                } catch (error) {
                    console.log(error);
                }

            }
        });

    };


    const handleAddSlot = async (slot: string) => {
        if (lession) {
            await addSlotInLession(lsId, [...lession.SlotID, slot]);
        }
    }
    const setData = (slot1: slot) => {
        setSlot([...slot, slot1])
        if (lession) {
            setLession({ ...lession, SlotID: [...(lession.SlotID || []), slot1.id] });
        }
    }

    return (
        <>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    margin: '20px 0',
                    padding: '0 16px',
                }}
            >
                <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => navigate(-1)}
                    startIcon={<ReplyAllIcon />}
                    sx={{ fontWeight: 'bold' }}
                >
                    Back
                </Button>
                <Button
                    variant="contained"
                    color="error"
                    onClick={() => handleClickModal()}
                    startIcon={<AddCircleOutlineIcon />}
                    sx={{ fontWeight: 'bold' }}
                >
                    Add Slot
                </Button>
            </Box>

            <TableContainer component={Paper} sx={{ boxShadow: 3, borderRadius: '8px', overflow: 'hidden' }}>
                <Table>
                    <TableHead sx={(theme) => ({
                        backgroundColor: theme.palette.mode === "dark" ? "#2C2C3E" : "#2C3E50",
                        color: "#FFFFFF",
                        fontWeight: 600,
                        fontSize: "14px",
                        textTransform: "uppercase",
                        letterSpacing: "0.5px",
                        borderBottom: theme.palette.mode === "dark" ? "1px solid #383850" : "1px solid #DADCE0",
                    })}>
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
                        {lession?.SlotID.map((row, index) => {
                            const slotData = slot?.find((s) => s.id === row);
                            return (
                                <StyledTableRow key={row}>
                                    <TableCell align="center">{index + 1}</TableCell>
                                    <TableCell align="center">{slotData?.id}</TableCell>
                                    <TableCell align="center">
                                        {slotData?.Description && slotData.Description.length > 60
                                            ? `${slotData.Description.substring(0, 60)}...`
                                            : slotData?.Description || 'N/A'}
                                    </TableCell>
                                    <TableCell align="center">{slotData?.TimeStart}</TableCell>
                                    <TableCell align="center">{slotData?.TimeEnd}</TableCell>
                                    <TableCell sx={{ alignItems: 'center', justifyContent: 'center', display: 'flex' }}>
                                        <Box
                                            sx={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                padding: '4px 8px',
                                                borderRadius: '4px',
                                                color: slotData?.Status ? 'green' : 'red',
                                                backgroundColor: slotData?.Status
                                                    ? 'rgba(76, 175, 80, 0.1)'
                                                    : 'rgba(244, 67, 54, 0.1)',
                                                border: `1px solid ${slotData?.Status ? 'rgba(76, 175, 80, 0.6)' : 'rgba(244, 67, 54, 0.6)'
                                                    }`,
                                                fontWeight: 'bold',
                                                fontSize: '0.9rem',
                                                textTransform: 'uppercase',
                                                width: 'fit-content',
                                                minWidth: '120px',
                                            }}
                                        >
                                            {slotData?.Status ? (
                                                <>
                                                    <CheckCircleIcon
                                                        sx={{ fontSize: '1.2rem', marginRight: '6px', color: 'green' }}
                                                    />
                                                    Start Slot
                                                </>
                                            ) : (
                                                <>
                                                    <CancelIcon
                                                        sx={{ fontSize: '1.2rem', marginRight: '6px', color: 'red' }}
                                                    />
                                                    Not Start
                                                </>
                                            )}
                                        </Box>
                                    </TableCell>

                                    <TableCell align="center">
                                        <Tooltip title="Update Course">
                                            <IconButton
                                                color="primary"
                                                onClick={() => handleUpdate(row)}
                                                sx={{ marginRight: '8px' }}
                                            >
                                                <EditIcon />
                                            </IconButton>
                                        </Tooltip>
                                        <Tooltip title="Delete Course">
                                            <IconButton color="error" onClick={() => handleDelete(row)}>
                                                <DeleteIcon />
                                            </IconButton>
                                        </Tooltip>
                                    </TableCell>
                                </StyledTableRow>
                            );
                        })}
                    </TableBody>
                    <TableFooter>
                        <TableRow>
                            <TablePagination
                                rowsPerPageOptions={[3, 5, 10]}
                                count={lession?.SlotID.length || 0}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                onPageChange={handleChangePage}
                                onRowsPerPageChange={handleChangeRowsPerPage}
                                sx={{
                                    alignItems: "center",
                                    justifyContent: "flex-end",
                                    padding: "8px 16px",
                                    "& .MuiTablePagination-toolbar": {
                                        minHeight: "48px",
                                    },
                                    "& .MuiTablePagination-selectLabel, .MuiTablePagination-displayedRows": {
                                        margin: 0,
                                        lineHeight: "1.5",
                                    },
                                    "& .MuiTablePagination-select": {
                                        fontSize: "14px",
                                        marginRight: "8px",
                                    },
                                }}
                            />
                        </TableRow>
                    </TableFooter>
                </Table>
            </TableContainer>

            <ModalAdd open={open} handleClickModal={handleClickModal} handleAddSlot={handleAddSlot} setData={setData} />
            {/* Uncomment the below code if ModalUpdate is needed */}
            {/* <ModalUpdate open2={open2} handleClickModal2={handleClickModal2} slotUpdate={slotUpdate} /> */}
        </>
    );



    
};
