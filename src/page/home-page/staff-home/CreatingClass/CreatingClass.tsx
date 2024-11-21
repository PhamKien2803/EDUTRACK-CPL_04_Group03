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
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete"; // Import biểu tượng thùng rác
import { v4 as uuidv4 } from "uuid";
import Swal from "sweetalert2";

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
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [className, setClassName] = useState<string>("");
  const [selectedParticipants, setSelectedParticipants] = useState<Participant[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage] = useState<number>(2); // Số lượng học sinh mỗi trang

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
      .then((response) => {
        Swal.fire({
          icon: "success",
          title: "Class created successfully!",
          text: `Class ${className} has been created.`,
        });
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Failed to create class",
          text: "There was an error creating the class. Please try again.",
        });
      });
  };

  // Phân trang: Tính toán danh sách học sinh hiển thị
  const indexOfLastParticipant = currentPage * itemsPerPage;
  const indexOfFirstParticipant = indexOfLastParticipant - itemsPerPage;
  const currentParticipants = selectedParticipants.slice(indexOfFirstParticipant, indexOfLastParticipant);
  const totalPages = Math.ceil(selectedParticipants.length / itemsPerPage);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div style={{ padding: "20px", borderRadius: "10px" }}>
      <div style={{ textAlign: "center", marginBottom: "30px" }}>
        <Typography variant="h2" style={{ color: "#62825D", fontWeight: "bold" }}>
          Create Class
        </Typography>
      </div>

      <TextField
        label="Enter Name of Class"
        variant="outlined"
        fullWidth
        value={className}
        onChange={(e) => setClassName(e.target.value)}
        style={{
          marginBottom: "20px",
          backgroundColor: "#fff",
          borderRadius: "5px",
          padding: "5px",
        }}
      />

      <div style={{ marginBottom: "20px" }}>
        <Autocomplete
          options={participants}
          getOptionLabel={(option) => `${option.UserName} (${option.id})`}
          renderInput={(params) => <TextField {...params} label="Search and Select Students" variant="outlined" />}
          onChange={(event, value) => handleAddParticipant(value)}
          style={{ backgroundColor: "#fff", borderRadius: "5px" }}
        />
      </div>

      <Typography variant="body1" style={{ marginBottom: "20px", color: "#526E48", textDecoration: "underline" }}>
        Selected Participants: {selectedParticipants.length}
      </Typography>

      <TableContainer component={Paper}>
        <Table>
          <TableHead style={{ backgroundColor: "#62825D", color: "#fff" }}>
            <TableRow>
              <TableCell><strong>Remove</strong></TableCell>
              <TableCell><strong>ID</strong></TableCell>
              <TableCell><strong>Name</strong></TableCell>
              <TableCell><strong>Age</strong></TableCell>
              <TableCell><strong>Gender</strong></TableCell>
              <TableCell><strong>Address</strong></TableCell>
              <TableCell><strong>Email</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {currentParticipants.length > 0 ? (
              currentParticipants.map((participant) => (
                <TableRow key={participant.id} style={{ backgroundColor: "#F3F9F3" }}>
                  <TableCell>
                    <IconButton
                      onClick={() => handleRemoveParticipant(participant.id)}
                      style={{
                        backgroundColor: "#62825D",
                        color: "#fff",
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
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} align="center">
                  <Typography variant="body2" color="textSecondary" style={{ fontStyle: 'italic' }}>
                    No student in class. Please choose at least one student in class!
                  </Typography>
                </TableCell>
              </TableRow>

            )}
          </TableBody>
        </Table>
      </TableContainer>

      <div style={{ marginTop: "20px", textAlign: "center" }}>
        <Button
          variant="contained"
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
          style={{ backgroundColor: "#9EDF9C", color: "#fff", marginRight: "10px" }}
        >
          Previous
        </Button>
        {Array.from({ length: totalPages }, (_, index) => (
          <Button
            key={index}
            variant="outlined"
            onClick={() => paginate(index + 1)}
            style={{
              marginLeft: "5px",
              backgroundColor: currentPage === index + 1 ? "#62825D" : "#fff",
              color: currentPage === index + 1 ? "#fff" : "#000",
            }}
          >
            {index + 1}
          </Button>
        ))}
        <Button
          variant="contained"
          onClick={() => paginate(currentPage + 1)}
          disabled={currentPage === totalPages}
          style={{ backgroundColor: "#9EDF9C", color: "#fff", marginLeft: "10px" }}
        >
          Next
        </Button>
      </div>

      <Button
        variant="contained"
        color="primary"
        onClick={handleCreateClass}
        style={{
          display: "block",
          margin: "20px auto",
          backgroundColor: "#62825D",
          color: "#fff",
          padding: "10px 20px",
          fontSize: "16px",
        }}
      >
        Create Class
      </Button>
    </div>
  );
};

export default CreatingClass;
