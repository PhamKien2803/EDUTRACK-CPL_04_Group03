import { Box, Container, Typography } from "@mui/material";
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";
import { useNavigate } from "react-router-dom";

function Content() {
    const navigate = useNavigate();
    const handleClicktoDicussion = () => {
        navigate("/dicussion-page");
    }
    const items = ["Q1", "Q2", "Q3", "Q4"];

    return (
        <Container sx={{padding: "10px 10px"}}>
            {items.map((item, index) => (
                <Box onClick={() => handleClicktoDicussion()}
                    key={index}
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        backgroundColor: "#f5f5f5",
                        padding: "16px",
                        borderRadius: "8px",
                        marginBottom: "8px",
                        cursor: "pointer",
                        "&:hover": {
                            backgroundColor: "#e0e0e0",
                        },
                    }}
                >
                    <QuestionAnswerIcon sx={{ marginRight: "8px", color: "#4285F4" }} />
                    <Typography variant="body1" fontWeight="bold">
                        {item}
                    </Typography>
                </Box>
            ))}
        </Container>
    );
}

export default Content;
