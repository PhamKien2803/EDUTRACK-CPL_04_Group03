import React from "react";
import { Box, Container, Typography } from "@mui/material";
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";
import { useNavigate, useParams } from "react-router-dom";
import { slot as Slot, questionSlot, assignmentSlot } from "../../../../models/Interface";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn"

interface Props {
    questionSlot: questionSlot[];
    assignmentSlot: assignmentSlot[];
    slots: Slot[];
}

const Content: React.FC<Props> = ({ questionSlot, assignmentSlot }) => {
    const navigate = useNavigate();
    const { id: SlotId } = useParams<{ id: string }>();

    const filteredQuestions = questionSlot.filter(qs => qs.Slotid === SlotId);
    const filteredAssignments = assignmentSlot.filter(asm => asm.Slotid === SlotId);
    const handleClickToDiscussion = (questionId: string, slotId: string) => {
        navigate(`/dicussion-page/question?slotID=${slotId}&questionid=${questionId}`);

    };

    const handleClickToAssignment = () => {
        navigate(`/dicussion-page/assignment`);
    }

    return (
        <Container sx={{ padding: "10px 10px" }}>
            {filteredQuestions.map((qs, index) => (
                <Box
                    key={qs.QuestionID}
                    onClick={() => handleClickToDiscussion(qs.QuestionID, qs.Slotid)}
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
                    <QuestionAnswerIcon sx={{ marginRight: "8px", color: "orange" }} />
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

            {filteredAssignments.map((asm, index) => (
                <Box
                    key={asm.AssignmentID}
                    onClick={() => handleClickToAssignment()}
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        backgroundColor: "#f0f8ff",
                        padding: "10px",
                        borderRadius: "6px",
                        marginBottom: "6px",
                        cursor: "pointer",
                        "&:hover": {
                            backgroundColor: "#e0e0e0",
                        },
                    }}
                >
                    <AssignmentTurnedInIcon sx={{ marginRight: "6px", color: "purple", fontSize: "1.5rem" }} />
                    <Box>
                        <Typography variant="body1" fontWeight="bold" sx={{ fontSize: "1rem" }}>
                            Assignment {index + 1}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ fontSize: "0.875rem" }}>
                            {asm.title.length > 40 ? `${asm.title.substring(0, 40)}...` : asm.title}
                        </Typography>
                        <Typography
                            variant="caption"
                            sx={{
                                color: asm.Status === 0 ? "red" : "green",
                                fontWeight: "bold",
                                fontSize: "0.75rem",
                            }}
                        >
                            {asm.Status === 0 ? "Not Started" : "In Progress"}
                        </Typography>
                    </Box>
                </Box>
            ))}
        </Container>
    );
};

export default Content;
