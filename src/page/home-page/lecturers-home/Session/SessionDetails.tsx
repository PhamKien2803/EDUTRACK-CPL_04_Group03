import {Box, IconButton, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import AddActivity from "../../../../components/lecturers_components/session-details/add-activity/AddActivity";
import TabSession from "../../../../components/lecturers_components/session-details/tab-details/TabSession";
import { useNavigate } from "react-router-dom";

function SessionDetails() {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        width: "98%",
        mx: "auto",
        mt: 2,
        bgcolor: "background.paper",
        borderRadius: 2,
        boxShadow: 1,
        p: 3,
      }}
    >
      <Box
        display="flex"
        alignItems="center"
        mb={2}
        sx={{
          gap: 1,
        }}
      >
        <IconButton
          onClick={() => navigate(-1)}
          size="small"
          sx={{
            bgcolor: "primary.light",
            color: "primary.main",
            "&:hover": { bgcolor: "primary.main", color: "white" },
          }}
        >
          <ArrowBackIcon />
        </IconButton>
        <Typography variant="h6" fontWeight="bold" color="primary.main">
          Session Home
        </Typography>
      </Box>
      <div>
        <TabSession />
        <hr style={{ border: "1px solid lightgray", margin: "8px auto" }} />
        <AddActivity />
      </div>
    </Box>
  );
}

export default SessionDetails;
