import { Card, CardContent, Typography, Box } from '@mui/material';
import { useState, useEffect } from 'react';
import { slot as Slot, questionSlot } from "../../../../models/Interface";
import { useSearchParams } from 'react-router-dom';
import { updateStatusQuestionSLot } from "../../../../service/ApiService";

interface Props {
  questionSlot: questionSlot[];
  slots: Slot[];
  questionID: string | null;
  setSlots: (slots: Slot[]) => void;
  selectedSlot: Slot | null;
}

const Question: React.FC<Props> = ({ questionSlot }) => {
  const [searchParams] = useSearchParams();
  const slotID = searchParams.get('slotID');
  const questionID = searchParams.get('questionid');

  const filteredQuestions = questionSlot.filter(qs => qs.Slotid === slotID && qs.QuestionID === questionID);

  return (
    <div style={{ marginTop: "3rem" }}>
      <h1 style={{ fontFamily: "sans-serif", fontWeight: "bold" }}>Questions</h1>
      {filteredQuestions.length ? (
        filteredQuestions.map((question, index) => (
          <QuestionCard key={index} question={question} />
        ))
      ) : (
        <Typography variant="body1" style={{ color: "#555", fontSize: "14px" }}>
          No questions available for this slot.
        </Typography>
      )}
    </div>
  );
};

interface QuestionCardProps {
  question: questionSlot;
}

const QuestionCard: React.FC<QuestionCardProps> = ({ question }) => {
  const [timeRemaining, setTimeRemaining] = useState<number | null>(null);
  const [status, setStatus] = useState<number>(question.Status);

  const parseTimeToSeconds = (timeString: string): number => {
    const [hours, minutes, seconds] = timeString.split(':').map(Number);
    return hours * 3600 + minutes * 60 + seconds;
  };

  const updateQuestionStatus = async (questionID: string, status: number) => {
    const updatedQuestion = { ...question, Status: status };

    try {
      await updateStatusQuestionSLot({
        ...updatedQuestion,
        Status: updatedQuestion.Status,
      });
      console.log('Status updated successfully');
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  useEffect(() => {
    if (status !== 1) {
      return;
    }

    const storedTimeRemaining = localStorage.getItem(`timeRemaining_${question.QuestionID}`);
    const initialTimeRemaining = storedTimeRemaining ? parseInt(storedTimeRemaining, 10) : null;

    if (initialTimeRemaining !== null) {
      setTimeRemaining(initialTimeRemaining);
    } else {
      const startSeconds = parseTimeToSeconds(question.TimeStart);
      const endSeconds = parseTimeToSeconds(question.TimeEnd);
      const initialTimeRemaining = endSeconds - startSeconds;
      setTimeRemaining(initialTimeRemaining);
    }

    const timerInterval = setInterval(() => {
      setTimeRemaining((prevTime) => {
        if (prevTime === null || prevTime <= 1) {
          clearInterval(timerInterval);
          localStorage.removeItem(`timeRemaining_${question.QuestionID}`);

          if (status === 1) {
            setStatus(2); //Thay đổi status khi hết thời gian
            updateQuestionStatus(question.QuestionID, 2); //Tự set lại
          }

          return 0;
        }

        localStorage.setItem(`timeRemaining_${question.QuestionID}`, (prevTime - 1).toString());
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timerInterval);
  }, [question.TimeStart, question.TimeEnd, question.QuestionID, status, question.SettingStatus]);

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;

    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <Card style={{
      border: "1px solid lightgray",
      borderRadius: "20px",
      maxWidth: "850px",
      marginBottom: "1rem",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      transition: "transform 0.3s ease-in-out",
      overflow: "hidden"
    }}
      onMouseEnter={e => e.currentTarget.style.transform = "scale(1.05)"}
      onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
    >
      <CardContent style={{
        backgroundColor: "rgb(250, 246, 246)",
        padding: "16px",
        fontFamily: "'Poppins', sans-serif"
      }}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h6" component="div" style={{ color: '#3a3a3a', marginBottom: '8px' }}>
            Content
          </Typography>
          <Typography variant="body2" style={{ color: status === 2 ? 'red' : 'green', fontSize: "20px", marginTop: "8px" }}>
            {status === 0 ? 'Not Started' : status === 1 ? `Time remaining: ${formatTime(timeRemaining ?? 0)}` : 'Dicussion Time is over'}
          </Typography>
        </Box>
        <hr style={{ border: "1px solid lightgray", margin: "8px auto" }} />

        <Typography variant="body2" style={{ color: "#555", fontSize: "14px", marginBottom: "8px" }}>
          {question.content}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default Question;
