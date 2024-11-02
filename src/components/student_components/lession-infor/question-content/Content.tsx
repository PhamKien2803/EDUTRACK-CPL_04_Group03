import React from "react";
import { Box, Container, Typography } from "@mui/material";
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";
import { useNavigate, useParams } from "react-router-dom";
import { slot as Slot, questionSlot } from "../../../../models/Interface";

interface Props {
    questionSlot: questionSlot[];
    slots: Slot[];
}

const Content: React.FC<Props> = ({ questionSlot }) => {
    const navigate = useNavigate();
    const { id: SlotId } = useParams<{ id: string }>(); 

    const filteredQuestions = questionSlot.filter(qs => qs.Slotid === SlotId);

    const handleClickToDiscussion = (questionId: string) => {
        navigate(`/discussion-page/${questionId}`);
    };

    return (
        <Container sx={{ padding: "10px 10px" }}>
            {filteredQuestions.map((qs, index) => (
                <Box
                    key={qs.QuestionID}
                    onClick={() => handleClickToDiscussion(qs.QuestionID)}
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
                    <Box>
                        <Typography variant="body1" fontWeight="bold">
                            Question {index + 1}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {qs.content.length > 50 ? `${qs.content.substring(0, 50)}...` : qs.content}
                        </Typography>
                        <Typography
                            variant="caption"
                            sx={{
                                color: qs.Status === 0 ? "red" : "green",
                                fontWeight: "bold",
                            }}
                        >
                            {qs.Status === 0 ? "Not Started" : "In Progress"}
                        </Typography>
                    </Box>
                </Box>
            ))}
        </Container>
    );
};

export default Content;
