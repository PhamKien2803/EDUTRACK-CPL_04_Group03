import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField, IconButton, Pagination } from "@mui/material";
import { getParticipants, updateAccountStatus } from "../../../../service/ApiService";
import { Search as SearchIcon, Delete as DeleteIcon } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import {  Modal, Box, Typography } from "@mui/material";
const AccountManagement: React.FC = () => {
  const currentUsers = useSelector((state: any) => state.account.account); 
  const [participants, setParticipants] = useState<any[]>([]);
  const [filteredParticipants, setFilteredParticipants] = useState<any[]>([]); 
  const [searchTerm, setSearchTerm] = useState(""); 
  const [page, setPage] = useState(1); 
  const [rowsPerPage] = useState(5); 
  const dispatch = useDispatch();
  const navigate = useNavigate(); 
  const [openModal, setOpenModal] = useState(false);
  
  const fetchParticipants = async () => {
    try {
      const response = await getParticipants(); 
      const filteredParticipants = response?.filter((participant: any) => participant.id !== currentUsers.UserID);
      setParticipants(filteredParticipants); 
      setFilteredParticipants(filteredParticipants); 
    } catch (error) {
      console.error("Error fetching participants:", error);
    }
  };

  useEffect(() => {
    fetchParticipants(); 
  }, []);

  
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

  const paginatedParticipants = filteredParticipants.slice((page - 1) * rowsPerPage, page * rowsPerPage);

  const handleOpenModal = () => {
    setOpenModal(true);
  };
  const handleCloseModal = () => {
    setOpenModal(false);
  };


  const handleCreateAccountStudent = () => {
    navigate("/staff/create-account-student");
    handleCloseModal(); 
  };

 
  const handleCreateAccountLecturer = () => {
    navigate("/staff/create-account-lecture"); 
    handleCloseModal(); 
  };
  return (
    <div>
      
      <div>
      <h2 style={{ textAlign: "center", flexGrow: 1 , marginBottom: "20px",}}>Manage Account</h2>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "20px", alignItems: "center" }}>
       
        <Button
          variant="contained"
          color="primary"
          onClick={handleOpenModal} 
        >
          Create Account
        </Button>

        <TextField
          label="Search"
          variant="outlined"
          value={searchTerm}
          onChange={handleSearch}
          fullWidth
          style={{ maxWidth: "300px" }} 
          InputProps={{
            endAdornment: (
              <IconButton>
                <SearchIcon />
              </IconButton>
            ),
          }}
        />
      </div>

      <TableContainer component={Paper}>
        <Table size="small" style={{ width: "90%", alignItems: "center"}}> 
          <TableHead>
            <TableRow>
              <TableCell>UserName</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Role</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedParticipants.map((participant) => (
              <TableRow key={participant.id}>
                <TableCell>{participant.UserName}</TableCell>
                <TableCell>{participant.Email}</TableCell>
                <TableCell>
                  {participant.Role === 0
                    ? "Student"
                    : participant.Role === 1
                    ? "Lecturer"
                    : "Admin"}
                </TableCell>
                <TableCell>{participant.Status === "true" ? "Active" : "Inactive"}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color={participant.Status === "true" ? "secondary" : "primary"}
                    onClick={() => handleUpdateStatus(participant.id, participant.Status)}
                    startIcon={participant.Status === "true" ? <DeleteIcon /> : null} 
                  >
                    {participant.Status === "true" ? "Deactivate" : "Activate"}
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Pagination
        count={Math.ceil(filteredParticipants.length / rowsPerPage)}
        page={page}
        onChange={handleChangePage}
        color="primary"
        style={{ marginTop: "20px", display: "flex", justifyContent: "center" }}
      />

<Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "white",
            padding: 4,
            borderRadius: 2,
            boxShadow: 24,
            textAlign: "center",
          }}
        >
          <Typography id="modal-title" variant="h6" component="h2">
            You want to create an account for?
          </Typography>
          <div style={{ margin: "20px 0" }}>
            <Button
              variant="contained"
              color="secondary"
              onClick={handleCreateAccountStudent}
              style={{ marginRight: "10px" }}
            >
              Student
            </Button>
            <Button
              variant="contained"
              color="secondary"
              onClick={handleCreateAccountLecturer}
            >
              Lecturer
            </Button>
          </div>

          <div>
            <Button
              variant="outlined"
              onClick={handleCloseModal} 
              style={{ marginRight: "10px" }}
            >
              Cancel
            </Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default AccountManagement;
