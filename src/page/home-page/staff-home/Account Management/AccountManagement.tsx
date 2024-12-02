import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useTheme } from "@mui/material/styles";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  IconButton,
  Pagination,
  Box,
  Typography,
  Modal,
  useMediaQuery,
  FormControl,
  InputLabel,
  Select,
  MenuItem, SelectChangeEvent,
} from "@mui/material";
import { Search as SearchIcon, Delete as DeleteIcon, } from "@mui/icons-material";
import { deleteParticipant, getParticipants, updateAccountStatus } from "../../../../service/ApiService";
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import PersonIcon from '@mui/icons-material/Person';
import SchoolIcon from '@mui/icons-material/School';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { Cancel } from "@mui/icons-material";
import { participants } from "../../../../models/Interface";
import Swal from "sweetalert2";
import StudentAccountCreating from "./StudentAccountCreating";
import LectureAccountCreating from "./LectureAccountCreate";

const AccountManagement: React.FC = () => {
  interface RootState {
    account: {
      account: {
        UserID: string;
      };
    };
  }

  const currentUsers = useSelector((state: RootState) => state.account.account);
  const [participants, setParticipants] = useState<participants[]>([]);
  const [filteredParticipants, setFilteredParticipants] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [rowsPerPage] = useState(5);
  const [openModal, setOpenModal] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [accountType, setAccountType] = useState('');

  // Handle select change
  const handleSelectChange = (event: SelectChangeEvent<string>) => {
    setAccountType(event.target.value);
  };

  // Open Modal function
  const handleOpenModals = () => {
    if (!accountType) {
      Swal.fire({ icon: 'warning', title: 'Oops!', text: 'Please select an account type first!', confirmButtonText: 'OK' });
    } else {
      setOpenModal(true);
    }
  };

  // Close Modal function
  const handleCloseModals = () => {
    setOpenModal(false);
    setAccountType('');
  };


  const fetchParticipants = async () => {
    try {
      const response = await getParticipants();
      const filteredParticipants = response?.filter(
        (participant: participants) => participant.id !== currentUsers.UserID
      );
      setParticipants(filteredParticipants);
      setFilteredParticipants(filteredParticipants);
    } catch (error) {
      console.error("Error fetching participants:", error);
    }
  };

  useEffect(() => {
    fetchParticipants();
  }, [fetchParticipants]);

  const handleUpdateStatus = async (id: string, currentStatus: "true" | "false") => {
    if (id === currentUsers.UserID) {
      alert("You cannot change your own status!");
      return;
    }

    try {
      const newStatus = currentStatus === "true" ? "false" : "true";
      await updateAccountStatus(id, newStatus);
      fetchParticipants();
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  useEffect(() => {
    const result = participants.filter((participant) => {
      return (
        participant.UserName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        participant.Email.toLowerCase().includes(searchTerm.toLowerCase())
      );
    });
    setFilteredParticipants(result);
  }, [searchTerm, participants]);

  const handleChangePage = (event: any, value: number) => {
    setPage(value);
  };

  const paginatedParticipants = filteredParticipants.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );

  // const handleOpenModal = () => setOpenModal(true);
  // const handleCloseModal = () => setOpenModal(false);

  // const handleCreateAccountStudent = () => {
  //   navigate("/staff/create-account-student");
  //   handleCloseModal();
  // };

  // const handleCreateAccountLecturer = () => {
  //   navigate("/staff/create-account-lecture");
  //   handleCloseModal();
  // };

  const handleDeleteParticipant = async (id: string) => {
    if (id === currentUsers.UserID) {
      Swal.fire({
        icon: "warning",
        title: "Action Denied!",
        text: "You cannot delete your own account!",
      });
      return;
    }

    const result = await Swal.fire({
      title: "Are you sure?",
      text: "Do you really want to delete this account? This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    });

    if (result.isConfirmed) {
      try {
        await deleteParticipant(id);
        await fetchParticipants();
        Swal.fire({
          icon: "success",
          title: "Deleted!",
          text: "The account has been successfully deleted.",
        });
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Error!",
          text: "There was an error deleting the account. Please try again.",
        });
        console.error("Error deleting participant:", error);
      }
    }
  };


  return (
    <Box
      sx={{
        p: 3,
        bgcolor: theme.palette.background.default,
        color: theme.palette.text.primary,
        minHeight: "100vh",
      }}
    >
      {/* Header */}
      <Typography
        variant={isMobile ? "h5" : "h4"}
        style={{
          textAlign: "center",
          color: "inherit",
          fontFamily: "'Roboto', sans-serif",
          fontWeight: "700",
          fontSize: "36px",
          letterSpacing: "1.5px",
          textTransform: "uppercase",
          margin: "20px 0",
          padding: "5px",
          position: "relative",
        }}
        sx={(theme) => ({
          color: theme.palette.mode === 'dark' ? 'white' : 'black',
        })}
      >
        Manage Account
      </Typography>

      {/* Toolbar */}
      <Box
        sx={{
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          justifyContent: "space-between",
          alignItems: "center",
          gap: isMobile ? 2 : 4,
          mb: 4,
        }}
      >
        {/* Account Type and Create Account */}
        <Box
          sx={{
            display: "flex",
            flexDirection: isMobile ? "column" : "row",
            alignItems: "center",
            gap: 2,
          }}
        >
          {/* Account Type Select */}
          <FormControl sx={{ minWidth: 120 }}>
            <InputLabel id="account-type-label">Select Role</InputLabel>
            <Select
              labelId="account-type-label"
              value={accountType}
              onChange={handleSelectChange}
              label="Account Type"
              sx={{ width: 150 }}
            >
              <MenuItem value="Student">Student</MenuItem>
              <MenuItem value="Lecturer">Lecturer</MenuItem>
            </Select>
          </FormControl>

          {/* Create Account Button */}
          <Button
            variant="contained"
            color="secondary"
            onClick={handleOpenModals}
            size="large"
            sx={{ textTransform: "capitalize", px: 3 }}
          >
            Create Account
          </Button>
        </Box>

        {/* Search Box */}
        <Box
          sx={{
            flex: isMobile ? "1 0 100%" : "0 0 auto", // To adjust width on smaller screens
            display: "flex",
            justifyContent: "flex-end", // Align search to the right
          }}
        >
          <TextField
            label="Search"
            variant="outlined"
            value={searchTerm}
            onChange={handleSearch}
            fullWidth={isMobile}
            sx={{
              maxWidth: isMobile ? "100%" : "300px",
            }}
            InputProps={{
              endAdornment: (
                <IconButton>
                  <SearchIcon />
                </IconButton>
              ),
            }}
          />
        </Box>
      </Box>


      {/* Table */}
      <TableContainer component={Paper} sx={{ borderRadius: 2, overflow: "hidden" }}>
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
              <TableCell sx={{ textAlign: "center", color: "#fff" }}>UserName</TableCell>
              <TableCell sx={{ textAlign: "center", color: "#fff" }}>Email</TableCell>
              <TableCell sx={{ textAlign: "center", color: "#fff" }}>Role</TableCell>
              <TableCell sx={{ textAlign: "center", color: "#fff" }}>Status</TableCell>
              <TableCell sx={{ textAlign: "center", color: "#fff" }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedParticipants.map((participant) => (
              <TableRow key={participant.id}>
                <TableCell sx={{ textAlign: "center" }}>{participant.UserName}</TableCell>
                <TableCell sx={{ textAlign: "center" }}>{participant.Email}</TableCell>
                <TableCell>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1, justifyContent: "center" }}>
                    {participant.Role === 0 && (
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: 1,
                          padding: "5px 10px",
                          borderRadius: "20px",
                          bgcolor: "rgba(0, 123, 255, 0.1)",
                        }}
                      >
                        <SchoolIcon
                          fontSize="small"
                          sx={{ color: "rgb(0, 123, 255)" }}
                        />
                        <Typography
                          variant="body2"
                          sx={{
                            color: "rgb(0, 123, 255)",
                            fontWeight: "bold",
                          }}
                        >
                          Student
                        </Typography>
                      </Box>
                    )}
                    {participant.Role === 1 && (
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: 1,
                          padding: "5px 10px",
                          borderRadius: "20px",
                          bgcolor: "rgba(40, 167, 69, 0.1)",
                        }}
                      >
                        <PersonIcon
                          fontSize="small"
                          sx={{ color: "rgb(40, 167, 69)" }}
                        />
                        <Typography
                          variant="body2"
                          sx={{
                            color: "rgb(40, 167, 69)",
                            fontWeight: "bold",
                          }}
                        >
                          Lecturer
                        </Typography>
                      </Box>
                    )}
                    {participant.Role === 2 && (
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: 1,
                          padding: "5px 10px",
                          borderRadius: "20px",
                          bgcolor: "rgba(220, 53, 69, 0.1)",
                        }}
                      >
                        <AdminPanelSettingsIcon
                          fontSize="small"
                          sx={{ color: "rgb(220, 53, 69)" }}
                        />
                        <Typography
                          variant="body2"
                          sx={{
                            color: "rgb(220, 53, 69)",
                            fontWeight: "bold",
                          }}
                        >
                          Admin
                        </Typography>
                      </Box>
                    )}
                  </Box>
                </TableCell>


                <TableCell>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: 1,
                      padding: "5px 10px",
                      borderRadius: "20px",
                      transition: "background-color 0.4s ease, color 0.4s ease",
                      bgcolor:
                        participant.Status === "true"
                          ? "rgba(40, 167, 69, 0.1)"
                          : "rgba(220, 53, 69, 0.1)",
                    }}
                  >
                    {participant.Status === "true" ? (
                      <>
                        <CheckCircleIcon
                          fontSize="small"
                          sx={{
                            color: "rgb(40, 167, 69)",
                            transition: "color 0.4s ease",
                          }}
                        />
                        <Typography
                          variant="body2"
                          sx={{
                            color: "rgb(40, 167, 69)",
                            fontWeight: "bold",
                            transition: "color 0.4s ease",
                          }}
                        >
                          Active
                        </Typography>
                      </>
                    ) : (
                      <>
                        <Cancel
                          fontSize="small"
                          sx={{
                            color: "rgb(220, 53, 69)",
                            transition: "color 0.4s ease",
                          }}
                        />
                        <Typography
                          variant="body2"
                          sx={{
                            color: "rgb(220, 53, 69)",
                            fontWeight: "bold",
                            transition: "color 0.4s ease",
                          }}
                        >
                          Inactive
                        </Typography>
                      </>
                    )}
                  </Box>
                </TableCell>


                <TableCell sx={{ display: "flex", justifyContent: "center" }}>
                  <Button
                    variant="contained"
                    onClick={() => handleUpdateStatus(participant.id, participant.Status)}
                    startIcon={
                      participant.Status === "true" ? <Cancel /> : <CheckCircleIcon />
                    }
                    sx={{
                      color: "white",
                      bgcolor: participant.Status === "true" ? "error.main" : "success.main",
                      "&:hover": {
                        bgcolor: participant.Status === "true" ? "error.dark" : "success.dark",
                      },
                      textTransform: "capitalize",
                      fontWeight: "bold",
                      borderRadius: "8px",
                      padding: "6px 16px",
                      mr: 1,
                    }}
                  >
                    {participant.Status === "true" ? "Inactive" : "Activate"}
                  </Button>
                  <IconButton
                    color="error"
                    onClick={() => handleDeleteParticipant(participant.id)}
                    sx={{
                      border: "1px solid red",
                      borderRadius: "8px",
                      padding: "6px 8px",
                      fontSize: "16px",
                      gap: "4px",
                      color: "red",
                      "& .MuiSvgIcon-root": {
                        fontSize: "16px",
                      },
                      "&:hover": {
                        backgroundColor: "rgba(255,0,0,0.1)",
                      },
                    }}
                  >
                    <DeleteIcon /> Delete
                  </IconButton>

                </TableCell>


              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pagination */}
      <Pagination
        count={Math.ceil(filteredParticipants.length / rowsPerPage)}
        page={page}
        onChange={handleChangePage}
        color="primary"
        sx={{ mt: 4, display: "flex", justifyContent: "center" }}
      />


      <Modal open={openModal} onClose={handleCloseModals}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            bgcolor: 'background.paper',
            borderRadius: 2,
            p: 4,
            boxShadow: 24,
            textAlign: 'center',
          }}
        >
          {/* Conditional Rendering of Form */}
          {accountType === 'Student' && <StudentAccountCreating handleCloseModals={handleCloseModals} />}
          {accountType === 'Lecturer' && <LectureAccountCreating handleCloseModals={handleCloseModals} />}
        </Box>
      </Modal>

    </Box>
  );


};

export default AccountManagement;
