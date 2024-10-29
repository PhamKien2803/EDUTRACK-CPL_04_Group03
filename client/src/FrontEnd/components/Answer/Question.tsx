import { Card, CardContent, Typography, Box } from '@mui/material';
import { useState, useEffect } from 'react';

function Question() {
  const [timeRemaining, setTimeRemaining] = useState<number>(20);
  const [isTimeOver, setIsTimeOver] = useState<boolean>(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timer); //Stop time === 0
          setIsTimeOver(true); 
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    
    // Format time ( MM:SS )
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  const renderIsTimeOver = () => {
    if (isTimeOver) {
      return (
        <span style={{ color: 'red' }}>Discussion time is over</span>
      );
    }else{
      return (
        formatTime(timeRemaining)
      );
    }
  }

  return (
    <div style={{ marginTop: "3rem" }}>
      <h1 style={{ fontFamily: "sans-serif", fontWeight: "bold" }}>Question 1</h1>
      <Card style={{
        border: "1px solid lightgray",
        borderRadius: "20px",
        maxWidth: "850px",
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
              {renderIsTimeOver()}
            </Typography>
          </Box>
          <hr style={{
            border: "1px solid lightgray",
            margin: "8px auto"
          }} />
          <Typography variant="body2" style={{ color: "#555", fontSize: "14px" }}>
            What is the difference between full-stack web development and web development? (at least 3 differences)
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
}

export default Question;
