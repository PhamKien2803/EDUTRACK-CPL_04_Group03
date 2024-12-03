import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import { Box, Card, IconButton, MenuItem, TextField, Typography } from '@mui/material';
import { toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';
import { postSlot } from '../../../../service/ExamApi';
import { slot } from '../../../../models/Interface';
import  CloseIcon  from '@mui/icons-material/Close';

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

interface Props {
    open: boolean,
    handleClickModal: () => void,
    handleAddSlot: (slot: string) => void,
    setData: (Slot: slot) => void,
}

export const ModalAdd: React.FC<Props> = ({ open, handleClickModal, handleAddSlot, setData }) => {
    const [status, setState] = React.useState<boolean>(true);
    const [description, setDescription] = React.useState<string>("")
    const [timeStart, setTimeStart] = React.useState<string>(new Date().toISOString().split('T')[0]);
    const [timeEnd, setTimeEnd] = React.useState<string>(getTomorrowDate)

    function getTomorrowDate() {
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 7);
        return tomorrow.toISOString().split('T')[0];
    }

    const handleAddSlots = async () => {
        if (!description) {
            toast.error("Please fill in the description");
            return;
        }

        const newSlot = {
            id: uuidv4(),
            SlotName: "slot",
            Description: description,
            TimeStart: timeStart,
            TimeEnd: timeEnd,
            Status: status,
        };

        try {
            await postSlot(newSlot);
            handleAddSlot(newSlot.id);
            setData(newSlot);
            handleClickModal();
            setDescription("");
            setTimeStart(new Date().toISOString().split("T")[0]);
            setTimeEnd(getTomorrowDate());
            toast.success("Slot added successfully");
        } catch (error) {
            console.error("Error adding slot:", error);
            toast.error("Failed to add slot");
        }
    };

    // return (
    //     <Dialog
    //         open={open}
    //         TransitionComponent={Transition}
    //         keepMounted
    //         onClose={handleClickModal}
    //         aria-describedby="alert-dialog-slide-description"
    //         maxWidth="md"
    //         fullWidth
    //     >
    //         <Box
    //             sx={{
    //                 maxHeight: "600px",
    //                 overflowY: "auto",
    //                 overflowX: "hidden",
    //                 padding: "24px",
    //                 backgroundColor: "#f4f6f8",
    //             }}
    //         >
    //             <Card
    //                 sx={{
    //                     padding: "24px",
    //                     border: "1px solid #e0e0e0",
    //                     borderRadius: "16px",
    //                     backgroundColor: "#fff",
    //                 }}
    //             >   <Box display={'flex'} justifyContent={'space-between'} sx={{ mb: 3, fontWeight: "bold" }}>
    //                     <Typography
    //                         variant="h5"
    //                         component="div"
    //                     >
    //                         Add Slot Details
    //                     </Typography>
    //                     <Button variant='outlined' onClick={() => handleAddSlots()}>
    //                         save
    //                     </Button>
    //                 </Box>


    //                 <Box display="flex" gap={3} mb={3}>
    //                     <TextField
    //                         select
    //                         label="Status"
    //                         size="small"
    //                         value={status.toString()}
    //                         onChange={(e) => setState(e.target.value === "true")}
    //                         sx={{
    //                             minWidth: "200px",
    //                             fontSize: "1.2rem",
    //                         }}
    //                     >
    //                         <MenuItem value={"true"}>Start Slot</MenuItem>
    //                         <MenuItem value={"false"}>Not Start</MenuItem>
    //                     </TextField>

    //                     <TextField
    //                         label="Start"
    //                         type="date"
    //                         size="small"
    //                         fullWidth
    //                         onChange={e => setTimeStart(e.target.value)}
    //                         value={timeStart}
    //                         InputLabelProps={{ shrink: true }}
    //                         sx={{
    //                             fontSize: "1.2rem",
    //                         }}
    //                     />
    //                     <TextField
    //                         label="End"
    //                         type="date"
    //                         size="small"
    //                         fullWidth
    //                         value={timeEnd}
    //                         onChange={e => setTimeEnd(e.target.value)}
    //                         InputLabelProps={{ shrink: true }}
    //                         sx={{
    //                             fontSize: "1.2rem",
    //                         }}
    //                     />
    //                 </Box>

    //                 <TextField
    //                     placeholder="Comment description slot here ..."
    //                     multiline
    //                     rows={4}
    //                     value={description}
    //                     onChange={e => setDescription(e.target.value)}
    //                     fullWidth
    //                     sx={{
    //                         backgroundColor: "#f9f9f9",
    //                         borderRadius: "8px",
    //                         fontSize: "1.2rem",
    //                         "& .MuiOutlinedInput-root": {
    //                             padding: "12px",
    //                         },
    //                     }}
    //                 />
    //             </Card>
    //         </Box>
    //     </Dialog>
    // );

    return (
        <Dialog
          open={open}
          TransitionComponent={Transition}
          keepMounted
          onClose={handleClickModal}
          aria-describedby="alert-dialog-slide-description"
          maxWidth="sm"
          fullWidth
          sx={{
            "& .MuiDialog-paper": {
              borderRadius: "20px",
              boxShadow: "0 8px 24px rgba(0, 0, 0, 0.2)",
            },
          }}
        >
          <Box
            sx={{
              maxHeight: "600px",
              overflowY: "auto",
              padding: "24px",
              backgroundColor: "#f5f7fb",
            }}
          >
            <Card
              sx={{
                padding: "32px",
                border: "none",
                borderRadius: "16px",
                backgroundColor: "#ffffff",
                boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
              }}
            >
              {/* Header */}
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                sx={{ mb: 4 }}
              >
                <Typography variant="h5" component="div" fontWeight="600">
                  Add Slot Details
                </Typography>
                <IconButton
                  aria-label="close"
                  onClick={handleClickModal}
                  sx={{
                    color: "#444",
                    "&:hover": { backgroundColor: "#f5f5f5" },
                  }}
                >
                  <CloseIcon />
                </IconButton>
              </Box>
      
              {/* Form Fields */}
              <Box
                display="flex"
                flexDirection="column"
                gap={3}
                sx={{ mb: 3 }}
              >
                <TextField
                  select
                  label="Status"
                  size="small"
                  value={status.toString()}
                  onChange={(e) => setState(e.target.value === "true")}
                  sx={{
                    "& .MuiInputBase-root": {
                      fontSize: "1rem",
                      borderRadius: "8px",
                    },
                  }}
                >
                  <MenuItem value={"true"}>Start Slot</MenuItem>
                  <MenuItem value={"false"}>Not Start</MenuItem>
                </TextField>
      
                <Box display="flex" gap={2}>
                  <TextField
                    label="Start-Date"
                    type="date"
                    size="small"
                    fullWidth
                    onChange={(e) => setTimeStart(e.target.value)}
                    value={timeStart}
                    InputLabelProps={{ shrink: true }}
                    sx={{
                      "& .MuiInputBase-root": {
                        fontSize: "1rem",
                        borderRadius: "8px",
                      },
                    }}
                  />
                  <TextField
                    label="End-Date"
                    type="date"
                    size="small"
                    fullWidth
                    value={timeEnd}
                    onChange={(e) => setTimeEnd(e.target.value)}
                    InputLabelProps={{ shrink: true }}
                    sx={{
                      "& .MuiInputBase-root": {
                        fontSize: "1rem",
                        borderRadius: "8px",
                      },
                    }}
                  />
                </Box>
              </Box>
      
              <TextField
                placeholder="Add a comment or description here..."
                multiline
                rows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                fullWidth
                sx={{
                  backgroundColor: "#f9f9f9",
                  borderRadius: "8px",
                  "& .MuiOutlinedInput-root": {
                    padding: "12px",
                  },
                }}
              />
      
              {/* Actions */}
              <Box
                display="flex"
                justifyContent="flex-end"
                gap={2}
                sx={{ mt: 4 }}
              >
                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={handleClickModal}
                  sx={{
                    borderRadius: "8px",
                    textTransform: "none",
                    padding: "8px 16px",
                  }}
                >
                  Cancel
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleAddSlots()}
                  sx={{
                    borderRadius: "8px",
                    textTransform: "none",
                    padding: "8px 16px",
                  }}
                >
                  Save
                </Button>
              </Box>
            </Card>
          </Box>
        </Dialog>
      );
      
      

};
