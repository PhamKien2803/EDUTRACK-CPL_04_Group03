import { Card, CardContent, Typography, Box } from '@mui/material';
import { useState, useEffect } from 'react';
import { slot as Slot, questionSlot } from "../../../../models/Interface";
import { useSearchParams } from 'react-router-dom';

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

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  return (
    <div style={{ marginTop: "3rem" }}>
      <h1 style={{ fontFamily: "sans-serif", fontWeight: "bold" }}>Questions</h1>
      {filteredQuestions.length ? (
        filteredQuestions.map((question, index) => (
          <QuestionCard key={index} question={question} formatTime={formatTime} />
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
  formatTime: (seconds: number) => string;
}

const QuestionCard: React.FC<QuestionCardProps> = ({ question, formatTime }) => {
  const [timeRemaining, setTimeRemaining] = useState<number>(parseInt(question.TimeLimit, 10));
  const [isTimeOver, setIsTimeOver] = useState<boolean>(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timer);
          setIsTimeOver(true);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const renderTime = () => {
    if (isTimeOver) {
      return <span style={{ color: 'red' }}>Discussion time is over</span>;
    } else {
      return formatTime(timeRemaining);
    }
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
          <Typography variant="h6" component="div" style={{ color: '#3a3a3a', fontWeight: 'bold' }}>
            {renderTime()}
          </Typography>
        </Box>
        <hr style={{ border: "1px solid lightgray", margin: "8px auto" }} />
        <Typography variant="body2" style={{ color: "#555", fontSize: "14px" }}>
          {question.content}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default Question;
