import React, { useEffect, useState } from "react";
import { createClass, getParticipants } from "../../../../service/ApiService";
import { TextField, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Checkbox, Typography } from "@mui/material";
import { FaSearch } from "react-icons/fa"; 
import { v4 as uuidv4 } from "uuid";
import Swal from "sweetalert2"; // Import SweetAlert2

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
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [className, setClassName] = useState<string>("");
  const [selectedParticipants, setSelectedParticipants] = useState<Set<string>>(new Set());
  const [currentPage, setCurrentPage] = useState(1); // Trang hiện tại
  const [itemsPerPage] = useState(5); // Số học viên mỗi trang

  useEffect(() => {
    getParticipants()
      .then((response) => {
        console.log("API response:", response);
        const filteredParticipants = response.filter(
          (participant: Participant) => participant.Role === 0
        );
        setParticipants(filteredParticipants);
      })
      .catch((error) => {
        console.error("Error fetching participants:", error);
      });
  }, []);

  const handleCheckboxChange = (id: string) => {
    setSelectedParticipants((prevSelected) => {
      const newSelected = new Set(prevSelected);
      if (newSelected.has(id)) {
        newSelected.delete(id);
      } else {
        newSelected.add(id);
      }
      return newSelected;
    });
  };

  const filteredParticipants = participants.filter((participant) =>
    participant.id.toLowerCase().includes(searchTerm.toLowerCase()) || 
    participant.UserName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastParticipant = currentPage * itemsPerPage;
  const indexOfFirstParticipant = indexOfLastParticipant - itemsPerPage;
  const currentParticipants = filteredParticipants.slice(indexOfFirstParticipant, indexOfLastParticipant);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
  const totalPages = Math.ceil(filteredParticipants.length / itemsPerPage);

  const handleCreateClass = () => {
    if (className.trim() === "" || selectedParticipants.size === 0) {
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
      Student: Array.from(selectedParticipants),
      Status: true,
    };

    createClass(newClass)
      .then((response) => {
        console.log("Class created successfully:", response);
        Swal.fire({
          icon: "success",
          title: "Class created successfully!",
          text: `Class ${className} has been created.`,
        });
      })
      .catch((error) => {
        console.error("Error creating class:", error);
        Swal.fire({
          icon: "error",
          title: "Failed to create class",
          text: "There was an error creating the class. Please try again.",
        });
      });
  };

  return (
    <div style={{ margin: "20px", padding: "20px", borderRadius: "10px" }}>
      <div style={{ textAlign: "center", marginBottom: "30px" }}>
        <Typography variant="h1" style={{ color: "#62825D", fontWeight: "bold" }}>
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

      <h3 style={{ textAlign: "center", color: "#526E48" }}>Student List</h3>

      <div style={{ display: "flex", alignItems: "center", marginBottom: "20px", justifyContent: "center" }}>
        <IconButton color="primary">
          <FaSearch />
        </IconButton>
        <TextField
          label="Search by ID or Name"
          variant="outlined"
          fullWidth
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            backgroundColor: "#fff",
            borderRadius: "5px",
            padding: "5px",
            marginLeft: "10px",
          }}
        />
      </div>

      <Typography variant="body1" style={{ marginBottom: "20px", color: "#526E48" }}>
        Selected Participants: {selectedParticipants.size}
      </Typography>

      <TableContainer component={Paper}>
        <Table>
          <TableHead style={{ backgroundColor: "#62825D", color: "#fff" }}>
            <TableRow>
              <TableCell><strong>Select</strong></TableCell>
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
                    <Checkbox
                      checked={selectedParticipants.has(participant.id)}
                      onChange={() => handleCheckboxChange(participant.id)}
                    />
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
                  No participants found matching your search.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <div style={{ marginTop: "20px", textAlign: "center" }}>
        <Button
          variant="contained"
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
          style={{ backgroundColor: "#526E48", color: "#fff", marginRight: "10px" }}
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
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={currentPage === totalPages}
          style={{ backgroundColor: "#526E48", color: "#fff", marginLeft: "10px" }}
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
          backgroundColor: "#9EDF9C",
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
