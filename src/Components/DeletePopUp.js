import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import DeleteIcon from '@mui/icons-material/Delete';
import MUIButton from '@mui/material/Button';
import { Button } from 'react-bootstrap';

export default function DeletePopUp({ open, setOpen, handleConfirm, filename }) {
    const handleClose = (choice) => {
        handleConfirm(choice, filename);
        setOpen(false);
    };

    return (
        <>
            <Button style={{ position: 'absolute', top: '-40px', right: '10px' }}  variant="outlined" onClick={() => setOpen(true)}>
                <DeleteIcon />
            </Button>
            <Dialog
                open={open}
                onClose={() => handleClose('No')}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"Confirm Deletion"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Are you sure you want to delete?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <MUIButton onClick={() => handleClose(false)} color="primary">
                        No
                    </MUIButton>
                    <MUIButton onClick={() => handleClose(true)} color="error" autoFocus>
                        Yes
                    </MUIButton>
                </DialogActions>
            </Dialog>
        </>
    );
}