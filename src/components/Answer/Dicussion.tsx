import { useState } from "react";
import { Card, CardContent, Typography, IconButton, TextField } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';

const Dicussion = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [answer, setAnswer] = useState("");

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    setIsEditing(false);
  };

  const handleDelete = () => {
    setAnswer("");
  };

  return (
    <div style={{ marginTop: "3rem" }}>
      <h1 style={{ fontFamily: "sans-serif", fontWeight: "bold" }}>123</h1>
      <Card style={{ border: "2px solid grey" }}>
        <CardContent>
          <Typography variant="h5" component="div">
            Answer
          </Typography>
          <hr />
          
          {isEditing ? (
            <TextField
              fullWidth
              multiline
              rows={4}
              variant="outlined"
              value={answer}
              // onChange={(e) => setAnswer(e.target.value)}
            />
          ) : (
            <Typography variant="body2" style={{ marginBottom: "1rem" }}>
              {answer}
            </Typography>
          )}

          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            {isEditing ? (
              <IconButton onClick={handleSave}>
                <SaveIcon />
              </IconButton>
            ) : (
              <IconButton onClick={handleEdit}>
                <EditIcon />
              </IconButton>
            )}
            <IconButton onClick={handleDelete}>
              <DeleteIcon />
            </IconButton>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dicussion;
