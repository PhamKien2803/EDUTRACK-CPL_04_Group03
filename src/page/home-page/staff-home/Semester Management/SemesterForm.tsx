import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  Typography,
  Grid,
} from "@mui/material";
import {
  getClass,
  getSemester,
  updateSemester,
  updateSemesterStatus,
  createNewSemester,
} from "../../../../service/ApiService";
import { useNavigate } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import CreateIcon from "@mui/icons-material/AddCircleOutline";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteIcon from "@mui/icons-material/Delete";

interface SemesterData {
  SemesterID: string;
  SemesterName: string;
  StartDate: string;
  EndDate: string;
  Status: boolean;
  id: string;
}

export interface NewSemester {
  SemesterID: string;
  SemesterName: string;
  StartDate: string;
  EndDate: string;
}

const ClassManagement: React.FC = () => {
  const [semesterData, setSemesterData] = useState<SemesterData[]>([]);
  const [editingSemester, setEditingSemester] = useState<string | null>(null);
  const [creatingemester, setCreateSemester] = useState<string | null>(null);
  const [semesterId, setNewSemesterId] = useState<string>("");
  const [newSemesterName, setNewSemesterName] = useState<string>("");
  const [startDate, setNewStartDate] = useState<string>("");
  const [endDate, setNewEndDate] = useState<string>("");
  const [showModalEdit, setShowModalEdit] = useState<boolean>(false);
  const [showModalCreate, setShowModalCreate] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filteredData, setFilteredData] = useState<SemesterData[]>([]);
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(5);
  const navigate = useNavigate();

  useEffect(() => {
    fetchSemester();
  }, []);

  const fetchSemester = () => {
    getSemester()
      .then((response) => {
        setSemesterData(response);
        setFilteredData(response);
      })
      .catch((error) => {
        console.error("Lỗi khi lấy dữ liệu class:", error);
      });
  };

  const handleEditClick = (id: string, currentName: string) => {
    setEditingSemester(id);
    setNewSemesterName(currentName);
    setShowModalEdit(true);
  };

  const handleCreateClick = () => {
    setShowModalCreate(true);
  };

  const handleSaveClick = () => {
    if (editingSemester) {
      updateSemester(editingSemester, {
        SemesterName: newSemesterName,
        StartDate: startDate,
        EndDate: endDate,
      })
        .then(() => {
          fetchSemester();
          setShowModalEdit(false);
          setEditingSemester(null);
          setNewSemesterName("");
        })
        .catch((error) => {
          console.error("Error to update class:", error);
        });
    }
  };

  const handleCreateClickForm = () => {
    if (
      semesterData.every(
        (cls) =>
          cls.SemesterID !== semesterId && cls.SemesterName !== newSemesterName
      )
    ) {
      // Tạo đối tượng trực tiếp mà không cần `new`
      const newSemester: NewSemester = {
        SemesterID: semesterId,
        SemesterName: newSemesterName,
        StartDate: startDate,
        EndDate: endDate,
      };

      createNewSemester(newSemester)
        .then(() => {
          fetchSemester();
          setShowModalCreate(false);
          setNewSemesterName("");
        })
        .catch((error) => {
          console.error("Error to update class:", error);
        });
    }
  };

  const handleStatusChange = (id: string, currentStatus: boolean) => {
    updateSemesterStatus(id, !currentStatus)
      .then(() => {
        fetchSemester();
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
      const filtered = semesterData.filter(
        (cls) =>
          cls.SemesterID.toLowerCase().includes(query) ||
          cls.SemesterName.toLowerCase().includes(query) ||
          (cls.Status ? "active" : "inactive").toLowerCase().includes(query)
      );
      setFilteredData(filtered);
    } else {
      setFilteredData(semesterData);
    }

    setPage(0);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2 style={{ textAlign: "center", color: "#A5B68D" }}>
        Semester Management
      </h2>

      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
      >
        <Box display="flex" alignItems="center" gap={2}>
          <Button
            variant="contained"
            onClick={() => handleCreateClick()}
            sx={{
              backgroundColor: "#5F6F65",
              color: "white",
              "&:hover": { backgroundColor: "#A5B68D" },
            }}
            startIcon={<CreateIcon />}
          >
            Create Semester
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
              <TableCell
                align="center"
                style={{ backgroundColor: "#5F6F65", color: "white" }}
              >
                Semester ID
              </TableCell>
              <TableCell
                align="center"
                style={{ backgroundColor: "#5F6F65", color: "white" }}
              >
                Semester Name
              </TableCell>
              <TableCell
                align="center"
                style={{ backgroundColor: "#5F6F65", color: "white" }}
              >
                Start date
              </TableCell>
              <TableCell
                align="center"
                style={{ backgroundColor: "#5F6F65", color: "white" }}
              >
                End date
              </TableCell>
              <TableCell
                align="center"
                style={{ backgroundColor: "#5F6F65", color: "white" }}
              >
                Status
              </TableCell>
              <TableCell
                align="center"
                style={{ backgroundColor: "#5F6F65", color: "white" }}
              >
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredData
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((cls) => (
                <TableRow key={cls.id}>
                  <TableCell align="center">{cls.SemesterID}</TableCell>
                  <TableCell align="center">{cls.SemesterName}</TableCell>
                  <TableCell align="center">{cls.StartDate}</TableCell>
                  <TableCell align="center">{cls.EndDate}</TableCell>
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
                        onClick={() =>
                          handleEditClick(cls.id, cls.SemesterName)
                        }
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
      {/* model update */}
      <Dialog
        open={showModalEdit}
        onClose={() => setShowModalEdit(false)}
        maxWidth="sm"
        fullWidth
        sx={{
          "& .MuiDialog-paper": {
            padding: "20px",
          },
        }}
      >
        <DialogTitle style={{ textAlign: "center", color: "#5F6F65" }}>
          Update Semester Name
        </DialogTitle>
        <DialogContent>
          <TextField
            label=""
            variant="outlined"
            fullWidth
            value={newSemesterName}
            onChange={(e) => setNewSemesterName(e.target.value)}
            sx={{
              marginBottom: 2,
              backgroundColor: "#C9DABF",
            }}
          />
        </DialogContent>
        {/* Start Date Field */}
        <Grid item xs={12} sm={6} sx={{ mt: 2, mb: 2 }}>
          <TextField
            label="Start Date"
            type="date" // Sử dụng type="date" để chỉ lấy ngày
            fullWidth
            value={startDate} // Gán giá trị ngày
            onChange={(e) => setNewStartDate(e.target.value)} // Cập nhật ngày khi thay đổi
            InputLabelProps={{ shrink: true }} // Đảm bảo nhãn luôn hiển thị
          />
        </Grid>

        {/* End Date Field */}
        <Grid item xs={12} sm={6} sx={{ mt: 2, mb: 2 }}>
          <TextField
            label="End Date"
            type="date" // Sử dụng type="date" để chỉ lấy ngày
            fullWidth
            value={endDate} // Gán giá trị ngày
            onChange={(e) => setNewEndDate(e.target.value)} // Cập nhật ngày khi thay đổi
            InputLabelProps={{ shrink: true }} // Đảm bảo nhãn luôn hiển thị
          />
        </Grid>

        <DialogActions>
          <Button
            onClick={() => setShowModalEdit(false)}
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
      {/* model create */}
      <Dialog
        open={showModalCreate}
        onClose={() => setShowModalCreate(false)}
        maxWidth="sm"
        fullWidth
        sx={{
          "& .MuiDialog-paper": {
            padding: "20px",
          },
        }}
      >
        <DialogTitle style={{ textAlign: "center", color: "#5F6F65" }}>
          Semester Id
        </DialogTitle>
        <DialogContent>
          <TextField
            label=""
            variant="outlined"
            fullWidth
            value={semesterId}
            onChange={(e) => setNewSemesterId(e.target.value)}
            sx={{
              marginBottom: 2,
              backgroundColor: "#C9DABF",
            }}
          />
        </DialogContent>
        <DialogTitle style={{ textAlign: "center", color: "#5F6F65" }}>
          Semester Name
        </DialogTitle>
        <DialogContent>
          <TextField
            label=""
            variant="outlined"
            fullWidth
            value={newSemesterName}
            onChange={(e) => setNewSemesterName(e.target.value)}
            sx={{
              marginBottom: 2,
              backgroundColor: "#C9DABF",
            }}
          />
        </DialogContent>
        {/* Start Date Field */}
        <Grid item xs={12} sm={6} sx={{ mt: 2, mb: 2 }}>
          <TextField
            label="Start Date"
            type="date"
            fullWidth
            value={startDate}
            onChange={(e) => setNewStartDate(e.target.value)}
            InputLabelProps={{ shrink: true }}
          />
        </Grid>

        {/* End Date Field */}
        <Grid item xs={12} sm={6} sx={{ mt: 2, mb: 2 }}>
          <TextField
            label="End Date"
            type="date"
            fullWidth
            value={endDate}
            onChange={(e) => setNewEndDate(e.target.value)}
            InputLabelProps={{ shrink: true }}
          />
        </Grid>

        <DialogActions>
          <Button
            onClick={() => setShowModalCreate(false)}
            sx={{
              backgroundColor: "#5F6F65",
              color: "white",
              "&:hover": { backgroundColor: "#5F6F65" },
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleCreateClickForm}
            sx={{
              backgroundColor: "#5F6F65",
              color: "white",
              "&:hover": { backgroundColor: "#5F6F65" },
            }}
          >
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ClassManagement;
