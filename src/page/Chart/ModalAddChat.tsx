import { Box, Modal, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
interface Props {
    open: boolean,
    handleChangeOpen: () => void
}
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};
export const ModalAddChat: React.FC<Props> = ({ open, handleChangeOpen }) => {
    const [input, setInput] = useState("");


    return (
        <Modal
            open={open}
            onClose={handleChangeOpen}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <TextField
                    variant="standard"
                    fullWidth
                />
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
                </Typography>
            </Box>
        </Modal>
    )
}
