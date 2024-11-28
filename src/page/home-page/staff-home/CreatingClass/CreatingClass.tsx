import React, { useEffect, useState } from "react";
import { createClass, getParticipants } from "../../../../service/ApiService";
import {
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Autocomplete,
  IconButton,
  Box,
  Grid,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { v4 as uuidv4 } from "uuid";
import Swal from "sweetalert2";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { useNavigate } from "react-router-dom";
import ReplyAllIcon from '@mui/icons-material/ReplyAll';

interface Participant {
  UserName: string;
  Age: number;
  Gender: boolean;
  Address: string;
  Email: string;
  id: string;
  Role: number;
  isOnline: boolean;
  Status: boolean;
}

const CreatingClass: React.FC = () => {
  const navigate = useNavigate();
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [className, setClassName] = useState<string>("");
  const [selectedParticipants, setSelectedParticipants] = useState<Participant[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage] = useState<number>(5); // Số lượng học sinh mỗi trang

  useEffect(() => {
    getParticipants()
      .then((response) => {
        const filteredParticipants = response.filter(
          (participant: Participant) => participant.Role === 0
        );
        setParticipants(filteredParticipants);
      })
      .catch((error) => {
        console.error("Error fetching participants:", error);
      });
  }, []);

  const handleAddParticipant = (participant: Participant | null) => {
    if (participant && !selectedParticipants.some((p) => p.id === participant.id)) {
      setSelectedParticipants((prev) => [...prev, participant]);
    }
  };

  const handleRemoveParticipant = (id: string) => {
    setSelectedParticipants((prevSelected) =>
      prevSelected.filter((participant) => participant.id !== id)
    );
  };

  const handleCreateClass = () => {
    if (className.trim() === "" || selectedParticipants.length === 0) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please enter a class name and select at least one participant.",
      });
      return;
    }

    const newClass = {
      ClassID: uuidv4(),
      ClassName: className,
      Student: selectedParticipants.map((p) => p.id),
      Status: true,
    };

    createClass(newClass)
      .then(() => {
        Swal.fire({
          icon: "success",
          title: "Class created successfully!",
          text: `Class ${className} has been created.`,
        });
      })
      .catch(() => {
        Swal.fire({
          icon: "error",
          title: "Failed to create class",
          text: "There was an error creating the class. Please try again.",
        });
      });
  };

  const indexOfLastParticipant = currentPage * itemsPerPage;
  const indexOfFirstParticipant = indexOfLastParticipant - itemsPerPage;
  const currentParticipants = selectedParticipants.slice(indexOfFirstParticipant, indexOfLastParticipant);
  const totalPages = Math.ceil(selectedParticipants.length / itemsPerPage);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <>
      <Box
        sx={{
          backgroundColor: (theme) => theme.palette.background.paper,
          borderRadius: "8px",
          p: 4,
          boxShadow: 3,
        }}
      >
        <Grid item>
          <Button
            startIcon={<ReplyAllIcon />}
            onClick={() => navigate("/staff/manage_class")}
            variant="outlined"
            color="primary"
          >
            Back
          </Button>
        </Grid>
        {/* Title */}
        <Typography
          variant="h4"
          sx={{
            textAlign: "center",
            fontWeight: 700,
            color: (theme) => theme.palette.text.primary,
            mb: 3,
          }}
        >
          Create Class
        </Typography>

        {/* Class Name Input */}
        <TextField
          label="Class Name"
          variant="outlined"
          fullWidth
          value={className}
          onChange={(e) => setClassName(e.target.value)}
          sx={{
            mb: 3,
            "& .MuiOutlinedInput-root": {
              backgroundColor: (theme) => theme.palette.background.default,
            },
          }}
        />

        {/* Participant Autocomplete */}
        <Autocomplete
          options={participants}
          getOptionLabel={(option) => `${option.UserName} (${option.id})`}
          renderInput={(params) => (
            <TextField {...params} label="Search Students" variant="outlined" />
          )}
          onChange={(event, value) => handleAddParticipant(value)}
          sx={{ mb: 3 }}
        />

        {/* Selected Participants Table */}
        <Typography
          variant="subtitle1"
          sx={{ mb: 1, color: (theme) => theme.palette.text.secondary }}
        >
          Selected Participants: {selectedParticipants.length}
        </Typography>

        <TableContainer component={Paper}>
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
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>Remove</TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>ID</TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>Name</TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>Age</TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>Gender</TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>Address</TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>Email</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {currentParticipants.map((participant) => (
                <TableRow key={participant.id}>
                  <TableCell>
                    <IconButton
                      onClick={() => handleRemoveParticipant(participant.id)}
                      sx={{
                        color: "error.main",
                        "&:hover": { bgcolor: "error.light" },
                      }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                  <TableCell>{participant.id}</TableCell>
                  <TableCell>{participant.UserName}</TableCell>
                  <TableCell>{participant.Age}</TableCell>
                  <TableCell>{participant.Gender ? "Male" : "Female"}</TableCell>
                  <TableCell>{participant.Address}</TableCell>
                  <TableCell>{participant.Email}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Pagination */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            mt: 3,
            gap: 1,
          }}
        >
          <Button
            variant="outlined"
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </Button>
          {Array.from({ length: totalPages }).map((_, index) => (
            <Button
              key={index}
              variant={currentPage === index + 1 ? "contained" : "outlined"}
              onClick={() => paginate(index + 1)}
            >
              {index + 1}
            </Button>
          ))}
          <Button
            variant="outlined"
            onClick={() => paginate(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
          </Button>
        </Box>

        {/* Create Class Button */}
        <Button
          variant="contained"
          onClick={handleCreateClass}
          sx={{
            mt: 3,
            bgcolor: "success.main",
            "&:hover": { bgcolor: "success.dark" },
          }}
          startIcon={<CheckCircleOutlineIcon />}
        >
          Create Class
        </Button>
      </Box>
    </>

  );


};

export default CreatingClass;
