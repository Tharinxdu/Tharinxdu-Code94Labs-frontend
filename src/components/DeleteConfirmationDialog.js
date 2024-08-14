import React from 'react';
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Button,
    IconButton,
    Box,
    Typography
} from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

const DeleteConfirmationDialog = ({ open, onClose, onConfirm }) => {
    return (
        <Dialog
            open={open}
            onClose={onClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            maxWidth="xs"
            fullWidth
        >
            <Box sx={{ position: 'absolute', top: 8, right: 8 }}>
                <IconButton onClick={onClose}>
                    <CloseIcon />
                </IconButton>
            </Box>
            <DialogTitle id="alert-dialog-title" sx={{ textAlign: 'center', paddingTop: 4 }}>
                <ErrorOutlineIcon sx={{ fontSize: 48, color: '#FF1744' }} />
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description" sx={{ textAlign: 'center' }}>
                    <Typography variant="h5" fontWeight="bold">ARE YOU SURE?</Typography>
                    <Typography variant="body1" sx={{ mt: 2 }}>
                        You will not be able to undo this action if you proceed!
                    </Typography>
                </DialogContentText>
            </DialogContent>
            <DialogActions sx={{ justifyContent: 'center', paddingBottom: 2 }}>
                <Button onClick={onClose} variant="outlined" sx={{ mr: 2 }}>
                    Cancel
                </Button>
                <Button onClick={onConfirm} variant="contained" color="primary">
                    Delete
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default DeleteConfirmationDialog;
