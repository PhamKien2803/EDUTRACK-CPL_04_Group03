import React, { useEffect, useState } from "react";
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Box, Typography } from "@mui/material";
import { getClass, updateClass, updateClassStatus } from "../../../../service/ApiService";
import { useNavigate } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import CreateIcon from "@mui/icons-material/AddCircleOutline";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteIcon from "@mui/icons-material/Delete";


interface ClassData {
  ClassID: string;
  ClassName: string;
  Student: string[];
  Status: boolean;
  id: string;
}

const ClassManagement: React.FC = () => {
  const [classData, setClassData] = useState<ClassData[]>([]);
  const [editingClass, setEditingClass] = useState<string | null>(null);
  const [newClassName, setNewClassName] = useState<string>("");
  const [showModal, setShowModal] = useState<boolean>(false); 
  const [searchQuery, setSearchQuery] = useState<string>(""); 
  const [filteredData, setFilteredData] = useState<ClassData[]>([]); 
  const [page, setPage] = useState<number>(0); 
  const [rowsPerPage, setRowsPerPage] = useState<number>(5);
  const navigate = useNavigate();

  
  useEffect(() => {
    fetchClasses();
  }, []);

  const fetchClasses = () => {
    getClass()
      .then((response) => {
        setClassData(response);
        setFilteredData(response); 
      })
      .catch((error) => {
        console.error("Lỗi khi lấy dữ liệu class:", error);
      });
  };

  const handleViewClick = (classId: string) => {
    navigate(`/class/${classId}/students`);
  };


  const handleEditClick = (id: string, currentName: string) => {
    setEditingClass(id);
    setNewClassName(currentName);
    setShowModal(true);
  };

  const handleSaveClick = () => {
    if (editingClass) {
      updateClass(editingClass, { ClassName: newClassName })
        .then(() => {
          fetchClasses(); 
          setShowModal(false); 
          setEditingClass(null);
          setNewClassName("");
        })
        .catch((error) => {
          console.error("Error to update class:", error);
        });
    }
  };

 
  const handleStatusChange = (id: string, currentStatus: boolean) => {
    updateClassStatus(id, !currentStatus)
      .then(() => {
        fetchClasses();
      })
      .catch((error) => {
        console.error("Error to update class status:", error);
      });
  };

 
  const handleNextPage = () => {
    if (page < Math.ceil(filteredData.length / rowsPerPage) - 1) {
      setPage(page + 1);
    }
  };

  const handlePrevPage = () => {
    if (page > 0) {
      setPage(page - 1);
    }
  };


  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value.toLowerCase().trim();
    setSearchQuery(query);
  
    if (query) {
      const filtered = classData.filter(
        (cls) =>
          cls.ClassID.toLowerCase().includes(query) ||
          cls.ClassName.toLowerCase().includes(query) ||
          (cls.Status ? "active" : "inactive").toLowerCase().includes(query)
      );
      setFilteredData(filtered);
    } else {
      setFilteredData(classData); 
    }
  
    setPage(0); 
  };
  
  

  return (
    <div style={{ padding: "20px" }}>
      <h2 style={{ textAlign: "center", color: "#A5B68D" }}>Class Management</h2>

     
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Box display="flex" alignItems="center" gap={2}>
          
          <Button
            variant="contained"
            onClick={() => navigate("/staff/create-class")}
            sx={{
              backgroundColor: "#5F6F65",
              color: "white",
              "&:hover": { backgroundColor: "#A5B68D" },
            }}
            startIcon={<CreateIcon />}
          >
            Create Class
          </Button>
        </Box>

     
        <Box display="flex" alignItems="center" gap={1}>
          <SearchIcon sx={{ color: "#3A3A3A" }} />
          <TextField
            label="Search"
            variant="outlined"
            value={searchQuery}
            onChange={handleSearchChange}
            sx={{
              width: "300px", 
              backgroundColor: "#C9DABF",
            }}
          />
        </Box>
      </Box>


      <TableContainer
        component={Paper}
        sx={{
          maxHeight: 600,
          backgroundColor: "#C9DABF",
          borderRadius: "10px",
          boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
        }}
      >
        <Table stickyHeader aria-label="class table">
          <TableHead>
            <TableRow>
              <TableCell align="center" style={{ backgroundColor: "#5F6F65", color: "white" }}>Class ID</TableCell>
              <TableCell align="center" style={{ backgroundColor: "#5F6F65" , color: "white"}}>Class Name</TableCell>
              <TableCell align="center" style={{ backgroundColor: "#5F6F65" , color: "white" }}>Student Count</TableCell>
              <TableCell align="center" style={{ backgroundColor: "#5F6F65"  , color: "white"}}>Status</TableCell>
              <TableCell align="center" style={{ backgroundColor: "#5F6F65"  , color: "white"}}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
  {filteredData
    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
    .map((cls) => (
      <TableRow key={cls.id}>
        <TableCell align="center">{cls.ClassID}</TableCell>
        <TableCell align="center">{cls.ClassName}</TableCell>
        <TableCell align="center">{cls.Student.length}</TableCell>
        <TableCell align="center">
          {cls.Status ? (
            <span style={{ color: "green" }}>Active</span>
          ) : (
            <span style={{ color: "red" }}>Inactive</span>
          )}
        </TableCell>
        <TableCell align="center">
          <Box display="flex" justifyContent="center" gap={1}>
            <Button
              variant="contained"
              style={{ backgroundColor: "#808D7C", color: "white" }}
              onClick={() => handleViewClick(cls.ClassID)}
              startIcon={<VisibilityIcon />}
            >
              View
            </Button>
            <Button
              variant="contained"
              style={{ backgroundColor: "#808D7C", color: "white" }}
              onClick={() => handleEditClick(cls.id, cls.ClassName)}
              startIcon={<EditIcon />}
            >
              Edit
            </Button>
            <Button
              variant="outlined"
              style={{ backgroundColor: "#808D7C", color: "white" }}
              onClick={() => handleStatusChange(cls.id, cls.Status)}
              startIcon={<DeleteIcon />}
            >
              {cls.Status ? "Delete" : "Undo"}
            </Button>
          </Box>
        </TableCell>
      </TableRow>
    ))}
</TableBody>

        </Table>
      </TableContainer>

      {/* Pagination */}
      <Box display="flex" justifyContent="center" mt={2}>
        <Button
          onClick={handlePrevPage}
          disabled={page === 0}
          sx={{
            backgroundColor: "#C1CFA1",
            color: "#3A3A3A",
            "&:hover": { backgroundColor: "#A5B68D" },
          }}
        >
          Prev
        </Button>
        <Typography variant="body1" sx={{ margin: "0 10px" }}>
          Page {page + 1} of {Math.ceil(filteredData.length / rowsPerPage)}
        </Typography>
        <Button
          onClick={handleNextPage}
          disabled={page >= Math.ceil(filteredData.length / rowsPerPage) - 1}
          sx={{
            backgroundColor: "#C1CFA1",
            color: "#3A3A3A",
            "&:hover": { backgroundColor: "#A5B68D" },
          }}
        >
          Next
        </Button>
      </Box>

     
      <Dialog
        open={showModal}
        onClose={() => setShowModal(false)}
        maxWidth="sm"
        fullWidth
        sx={{
          "& .MuiDialog-paper": {
            padding: "20px",
          },
        }}
      >
        <DialogTitle style={{ textAlign: "center", color: "#5F6F65" }}>Update Class Name</DialogTitle>
        <DialogContent>
          <TextField
            label=""
            variant="outlined"
            fullWidth
            value={newClassName}
            onChange={(e) => setNewClassName(e.target.value)}
            sx={{
              marginBottom: 2,
              backgroundColor: "#C9DABF",
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setShowModal(false)}
            sx={{
              backgroundColor: "#5F6F65",
              color: "white",
              "&:hover": { backgroundColor: "#5F6F65" },
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSaveClick}
            sx={{
              backgroundColor: "#5F6F65",
              color: "white",
              "&:hover": { backgroundColor: "#5F6F65" },
            }}
          >
            Save Changes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ClassManagement;
