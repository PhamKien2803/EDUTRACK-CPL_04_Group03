import { Card, CardContent, Typography } from '@mui/material';

function Question() {
  return (
    <div style={{ marginTop: "3rem" }}>
      <h1 style={{ fontFamily: "sans-serif", fontWeight: "bold" }}>Question 1</h1>
      <Card>
        <CardContent>
          <Typography variant="h5" component="div">
            Content
          </Typography>
          <hr />
          <Typography variant="body2">
            What is the difference between full-stack web development and web development? (at least 3 differences)
          </Typography>
        </CardContent>
      </Card>
    </div>
  )
}

export default Question
