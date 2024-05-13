import React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import DeleteIcon from '@mui/icons-material/Delete';

export default function DeletePopUp({ open, setOpen, handleConfirm, filename }) {
    const handleClose = (choice) => {
        handleConfirm(choice, filename);
        setOpen(false);
    };

    return (
        <>
            <Button variant="outlined" onClick={() => setOpen(true)}>
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
                    <Button onClick={() => handleClose(true)} color="error" autoFocus>
                        Yes
                    </Button>
                    <Button onClick={() => handleClose(false)} color="primary">
                        No
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}