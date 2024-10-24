import { Card, CardContent, Typography } from '@mui/material';

function Question() {
  return (
    <div style={{ marginTop: "3rem" }}>
      <h1 style={{ fontFamily: "sans-serif", fontWeight: "bold" }}>Question 1</h1>
      <Card style={{
        border: "1px solid lightgray",
        borderRadius: "20px",
        maxWidth: "800px",
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
          <Typography variant="h6" component="div" style={{ color: "#3a3a3a", marginBottom: "8px" }}>
            Content
          </Typography>
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
  )
}

export default Question
