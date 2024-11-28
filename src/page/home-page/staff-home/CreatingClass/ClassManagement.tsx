import React, { useEffect, useState } from "react";
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Box, Typography, useTheme } from "@mui/material";
import { getClass, updateClass, updateClassStatus } from "../../../../service/ApiService";
import { useNavigate } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import CreateIcon from "@mui/icons-material/AddCircleOutline";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteIcon from "@mui/icons-material/Delete";
import { Cancel, CheckCircle, ArrowBackIosNew, ArrowForwardIos } from "@mui/icons-material";

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
  console.log(setRowsPerPage);
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
  const theme = useTheme();

  const isDarkMode = theme.palette.mode === 'dark';

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
        Class Management
      </Typography>

      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Box display="flex" alignItems="center" gap={2}>
          <Button
            variant="outlined"
            color="error"
            onClick={() => navigate("/staff/create-class")}
            startIcon={<CreateIcon />}
          >
            Create Class
          </Button>
        </Box>


        <Box display="flex" alignItems="center" gap={1}>
          <SearchIcon sx={{ color: "#6A5ACD", marginTop: 2 }} />
          <TextField
            label="Enter classname to search"
            variant="standard"
            value={searchQuery}
            onChange={handleSearchChange}
            sx={{
              width: "300px",
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
              {["Class ID", "Class Name", "Student Count", "Status", "Actions"].map((header) => (
                <TableCell
                  key={header}
                  align="center"
                  sx={(theme) => ({
                    backgroundColor: theme.palette.mode === "dark" ? "#2C2C3E" : "#2C3E50",
                    color: "#FFFFFF",
                    fontWeight: 600,
                    fontSize: "14px",
                    textTransform: "uppercase",
                    letterSpacing: "0.5px",
                    borderBottom: theme.palette.mode === "dark" ? "1px solid #383850" : "1px solid #DADCE0",
                  })}
                >
                  {header}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredData
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((cls) => (
                <TableRow
                  key={cls.id}
                  sx={(theme) => ({
                    "&:nth-of-type(odd)": {
                      backgroundColor: theme.palette.mode === "dark" ? "#2A2A3C" : "#F4F6F8",
                    },
                    "&:nth-of-type(even)": {
                      backgroundColor: theme.palette.mode === "dark" ? "#24242F" : "#FFFFFF",
                    },
                    "&:hover": {
                      backgroundColor: theme.palette.mode === "dark" ? "#31313F" : "#E9ECEF",
                      transition: "background-color 0.2s ease-in-out",
                    },
                  })}
                >
                  <TableCell align="center" sx={{ fontSize: "14px", fontWeight: 500 }}>
                    {cls.ClassID}
                  </TableCell>
                  <TableCell align="center" sx={{ fontSize: "14px", fontWeight: 500 }}>
                    {cls.ClassName}
                  </TableCell>
                  <TableCell align="center" sx={{ fontSize: "14px", fontWeight: 500 }}>
                    {cls.Student.length}
                  </TableCell>
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
                    <Box display="flex" justifyContent="center" gap={1.5}>
                      <Button
                        variant="outlined"
                        sx={(theme) => ({
                          minWidth: "80px",
                          color: theme.palette.mode === "dark" ? "#FFFFFF" : "#2C3E50",
                          border: theme.palette.mode === "dark"
                            ? "1px solid #FFFFFF"
                            : "1px solid #2C3E50",
                          textTransform: "capitalize",
                          fontSize: "12px",
                          fontWeight: 600,
                          "&:hover": { backgroundColor: "#E9ECEF" },
                        })}
                        onClick={() => handleViewClick(cls.ClassID)}
                        startIcon={<VisibilityIcon sx={{ fontSize: "16px" }} />}
                      >
                        View
                      </Button>
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
                        onClick={() => handleEditClick(cls.id, cls.ClassName)}
                        startIcon={<EditIcon sx={{ fontSize: "16px" }} />}
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
                        startIcon={<DeleteIcon sx={{ fontSize: "16px" }} />}
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
              backgroundColor: "#D3D3D3", // Màu xám cho button disabled
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

      <Dialog
        open={showModal}
        onClose={() => setShowModal(false)}
        maxWidth="sm"
        fullWidth
        sx={{
          "& .MuiDialog-paper": {
            padding: "16px",
            backgroundColor: isDarkMode ? "#212121" : "#FFFFFF", // Nền tối hoặc sáng tùy thuộc vào theme
            borderRadius: "8px",
            boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)", // Bóng nhẹ cho nền sáng
          },
        }}
      >
        <DialogTitle
          sx={{
            textAlign: "center",
            color: isDarkMode ? "#FFFFFF" : "#333333", // Chữ sáng khi ở theme tối, chữ tối khi ở theme sáng
            fontWeight: "600",
            fontSize: "1.1rem",
          }}
        >
          Update Class Name
        </DialogTitle>

        <DialogContent>
          <TextField
            label="Class Name"
            variant="standard"
            fullWidth
            value={newClassName}
            onChange={(e) => setNewClassName(e.target.value)}
            sx={{
              marginBottom: 2,
              backgroundColor: isDarkMode ? "#333333" : "#F5F5F5", // Nền input tối hoặc sáng
              borderRadius: "6px",
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: isDarkMode ? "#444" : "#D1D1D1", // Đường viền sáng/tối tùy theo theme
                },
                "&:hover fieldset": {
                  borderColor: "#6200EE", // Màu xanh tím khi hover
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#6200EE", // Màu xanh tím khi focus
                },
              },
              "& .MuiInputLabel-root": {
                color: "#6200EE", // Màu nhạt cho label
              },
            }}
          />
        </DialogContent>

        <DialogActions
          sx={{
            justifyContent: "flex-end", // Đưa các nút về bên phải
            gap: 1,
          }}
        >
          <Button
            onClick={() => setShowModal(false)}
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
            onClick={handleSaveClick}
            sx={{
              backgroundColor: "#4fc3f7", // Màu xanh ngọc cho nút Save
              color: "white",
              borderRadius: "4px",
              "&:hover": { backgroundColor: "#0288D1" }, // Xanh đậm khi hover
              fontWeight: "600",
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
