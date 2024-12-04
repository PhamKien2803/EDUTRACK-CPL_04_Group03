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
  getSemester,
  updateSemester,
  updateSemesterStatus,
  createNewSemester,
} from "../../../../service/ApiService";
import { useNavigate } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import CreateIcon from "@mui/icons-material/AddCircleOutline";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { ArrowBackIosNew, ArrowForwardIos, Cancel, CheckCircle } from "@mui/icons-material";

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
  console.log(setRowsPerPage)
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
      <Typography
        variant="h2"
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
        Semester Management
      </Typography>

      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
      >
        <Box display="flex" alignItems="center" gap={2}>
          <Button
            variant="outlined"
            onClick={() => handleCreateClick()}
            color="error"
            startIcon={<CreateIcon />}
          >
            Create Semester
          </Button>
        </Box>

        <Box display="flex" alignItems="center" gap={1}>
          <SearchIcon sx={{ color: "#3A3A3A" }} />
          <TextField
            label="Enter semester name to search"
            variant="standard"
            value={searchQuery}
            onChange={handleSearchChange}
            sx={{
              width: "300px",
              marginBottom: 2,
            }}
          />
        </Box>
      </Box>

      <TableContainer
        component={Paper}
        sx={(theme) => {
          const isDarkTheme = theme.palette.mode === "dark";

          return {
            maxHeight: 600,
            backgroundColor: isDarkTheme ? "#1E1E2F" : "#F8F9FA",
            border: isDarkTheme ? "1px solid #383850" : "1px solid #DADCE0",
            borderRadius: "8px",
            overflow: "hidden",
            boxShadow: isDarkTheme
              ? "0px 4px 12px rgba(0, 0, 0, 0.5)"
              : "0px 4px 12px rgba(0, 0, 0, 0.1)",
          };
        }}
      >
        <Table stickyHeader aria-label="dynamic-theme-table">
          <TableHead>
            <TableRow>
              <TableCell
                align="center"
                sx={{ backgroundColor: "#263238", color: "white", fontWeight: "bold", fontSize: "16px" }}

              >
                Semester ID
              </TableCell>
              <TableCell
                align="center"
                sx={{ backgroundColor: "#263238", color: "white", fontWeight: "bold", fontSize: "16px" }}

              >
                Semester Name
              </TableCell>
              <TableCell
                align="center"
                sx={{ backgroundColor: "#263238", color: "white", fontWeight: "bold", fontSize: "16px" }}

              >
                Start date
              </TableCell>
              <TableCell
                align="center"
                sx={{ backgroundColor: "#263238", color: "white", fontWeight: "bold", fontSize: "16px" }}

              >
                End date
              </TableCell>
              <TableCell
                align="center"
                sx={{ backgroundColor: "#263238", color: "white", fontWeight: "bold", fontSize: "16px" }}

              >
                Status
              </TableCell>
              <TableCell
                align="center"
                sx={{ backgroundColor: "#263238", color: "white", fontWeight: "bold", fontSize: "16px" }}

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
                    <Box
                      sx={(theme) => ({
                        padding: "4px 10px",
                        borderRadius: "4px",
                        fontSize: "12px",
                        fontWeight: "bold",
                        textTransform: "uppercase",
                        display: "inline-flex",
                        alignItems: "center",
                        color: "white",
                        backgroundColor: cls.Status
                          ? theme.palette.success.main
                          : theme.palette.error.main,
                        backgroundColors: cls.Status
                          ? theme.palette.success.light
                          : theme.palette.error.light,
                        transition: "all 0.3s ease",
                      })}
                    >
                      {cls.Status ? (
                        <>
                          <CheckCircle
                            sx={{ marginRight: "5px", fontSize: "16px" }}
                          />
                          Active
                        </>
                      ) : (
                        <>
                          <Cancel
                            sx={{ marginRight: "5px", fontSize: "16px" }}
                          />
                          Inactive
                        </>
                      )}
                    </Box>
                  </TableCell>
                  <TableCell align="center">
                    <Box display="flex" justifyContent="center" gap={1}>
                      <Button
                        variant="outlined"
                        sx={{
                          minWidth: "80px",
                          color: "#007BFF",
                          border: "1px solid #007BFF",
                          textTransform: "capitalize",
                          fontSize: "12px",
                          fontWeight: 600,
                          "&:hover": { backgroundColor: "#EAF4FF" },
                        }}
                        onClick={() =>
                          handleEditClick(cls.id, cls.SemesterName)
                        }
                        startIcon={<EditIcon />}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="contained"
                        sx={{
                          minWidth: "80px",
                          color: "white",
                          backgroundColor: cls.Status ? "#A93226" : "#28A745",
                          textTransform: "capitalize",
                          fontSize: "12px",
                          fontWeight: 600,
                          "&:hover": {
                            backgroundColor: cls.Status ? "#922B21" : "#218838",
                          },
                        }}
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
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        mt={2}
        sx={{
          borderRadius: "5px",
          padding: "10px",
          backgroundColor: theme => theme.palette.background.paper,
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Button
          onClick={handlePrevPage}
          disabled={page === 0}
          sx={{
            backgroundColor: "#6A5ACD",
            color: "white",
            padding: "8px 16px",
            "&:hover": { backgroundColor: "#5A4ABF" },
            "&:disabled": {
              backgroundColor: "#D3D3D3",
              color: "#9E9E9E",
            },
            display: "flex",
            alignItems: "center",
          }}
        >
          <ArrowBackIosNew sx={{ fontSize: "16px", marginRight: "8px" }} /> Prev
        </Button>

        <Typography
          variant="body1"
          sx={{
            margin: "0 20px",
            color: "#6A5ACD",
            fontWeight: "bold",
            fontSize: "14px",
            display: "flex",
            alignItems: "center",
          }}
        >
          Page {page + 1} of {Math.ceil(filteredData.length / rowsPerPage)}
        </Typography>

        <Button
          onClick={handleNextPage}
          disabled={page >= Math.ceil(filteredData.length / rowsPerPage) - 1}
          sx={{
            backgroundColor: "#6A5ACD",
            color: "white",
            padding: "8px 16px",
            "&:hover": { backgroundColor: "#5A4ABF" },
            "&:disabled": {
              backgroundColor: "#D3D3D3",
              color: "#9E9E9E",
            },
            display: "flex",
            alignItems: "center",
          }}
        >
          Next <ArrowForwardIos sx={{ fontSize: "16px", marginLeft: "8px" }} />
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
            padding: "24px",
            borderRadius: "12px",
            backgroundColor: "#f7f9fc", // Màu nền sáng, hiện đại
            boxShadow: "0 8px 24px rgba(0, 0, 0, 0.2)", // Hiệu ứng bóng mờ
          },
        }}
      >
        <DialogTitle
          sx={{
            textAlign: "center",
            fontWeight: "bold",
            fontSize: "1.5rem",
            color: "#263238",
            mb: 2,
          }}
        >
          Update Semester
        </DialogTitle>
        <DialogContent>
          <Box
            component="form"
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 3,
            }}
          >
            {/* Semester Name */}
            <TextField
              label="Semester Name"
              variant="standard"
              fullWidth
              value={newSemesterName}
              onChange={(e) => setNewSemesterName(e.target.value)}
              sx={{
                backgroundColor: "white",
                borderRadius: "8px",
              }}
            />

            {/* Start Date */}
            <TextField
              label="Start Date"
              type="date"
              fullWidth
              value={startDate}
              onChange={(e) => setNewStartDate(e.target.value)}
              InputLabelProps={{ shrink: true }}
              sx={{
                backgroundColor: "white",
                borderRadius: "8px",
              }}
            />

            {/* End Date */}
            <TextField
              label="End Date"
              type="date"
              fullWidth
              value={endDate}
              onChange={(e) => setNewEndDate(e.target.value)}
              InputLabelProps={{ shrink: true }}
              sx={{
                backgroundColor: "white",
                borderRadius: "8px",
              }}
            />
          </Box>
        </DialogContent>

        <DialogActions
          sx={{
            justifyContent: "flex-end", 
            gap: 1,
          }}
        >
          <Button
            onClick={() => setShowModalEdit(false)}
            sx={{
              backgroundColor: "#6200EE", 
              color: "white",
              borderRadius: "4px",
              "&:hover": { backgroundColor: "#3700B3" }, 
              fontWeight: "600",
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSaveClick}
            sx={{
              backgroundColor: "#4fc3f7", 
              color: "white",
              borderRadius: "4px",
              "&:hover": { backgroundColor: "#0288D1" }, 
              fontWeight: "600",
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
            padding: "24px",
            borderRadius: "12px",
            backgroundColor: "#f7f9fc", // Nền sáng
            boxShadow: "0 8px 24px rgba(0, 0, 0, 0.2)", // Hiệu ứng bóng mờ
          },
        }}
      >
        <DialogTitle
          sx={{
            textAlign: "center",
            fontWeight: "bold",
            fontSize: "1.5rem",
            color: "#263238",
            mb: 2,
          }}
        >
          Create New Semester
        </DialogTitle>

        <DialogContent>
          <Box
            component="form"
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 3,
            }}
          >
            {/* Semester ID */}
            <TextField
              label="Semester ID"
              variant="standard"
              fullWidth
              value={semesterId}
              onChange={(e) => setNewSemesterId(e.target.value)}
              sx={{
                backgroundColor: "white",
                borderRadius: "8px",
              }}
            />

            {/* Semester Name */}
            <TextField
              label="Semester Name"
              variant="standard"
              fullWidth
              value={newSemesterName}
              onChange={(e) => setNewSemesterName(e.target.value)}
              sx={{
                backgroundColor: "white",
                borderRadius: "8px",
              }}
            />

            {/* Grid container for dates */}
            <Grid container spacing={0.5} padding={1}>
              {/* Start Date */}
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Start Date"
                  type="date"
                  fullWidth
                  value={startDate}
                  onChange={(e) => setNewStartDate(e.target.value)}
                  InputLabelProps={{ shrink: true }}
                  sx={{
                    backgroundColor: "white",
                    borderRadius: "8px",
                    ".MuiInputBase-root": {
                      height: "56px", 
                    },
                  }}
                />
              </Grid>

              {/* End Date */}
              <Grid item xs={12} sm={6}>
                <TextField
                  label="End Date"
                  type="date"
                  fullWidth
                  value={endDate}
                  onChange={(e) => setNewEndDate(e.target.value)}
                  InputLabelProps={{ shrink: true }}
                  sx={{
                    backgroundColor: "white",
                    borderRadius: "8px",
                    ".MuiInputBase-root": {
                      height: "56px", 
                    },
                  }}
                />
              </Grid>
            </Grid>
          </Box>
        </DialogContent>


        <DialogActions
          sx={{
            justifyContent: "flex-end", // Đưa các nút về bên phải
            gap: 1,
          }}
        >
          <Button
            onClick={() => setShowModalCreate(false)}
            sx={{
              backgroundColor: "#6200EE", // Màu tím đậm cho nút Cancel
              color: "white",
              borderRadius: "4px",
              "&:hover": { backgroundColor: "#3700B3" }, // Tím đậm hơn khi hover
              fontWeight: "600",
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleCreateClickForm}
            sx={{
              backgroundColor: "#4fc3f7", // Màu xanh ngọc cho nút Save
              color: "white",
              borderRadius: "4px",
              "&:hover": { backgroundColor: "#0288D1" }, // Xanh đậm khi hover
              fontWeight: "600",
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
