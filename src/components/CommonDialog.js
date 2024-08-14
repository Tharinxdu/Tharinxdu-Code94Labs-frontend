import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const CommonDialog = ({ open, onClose, title, message, onConfirm, confirmButtonText = "OK", isError }) => {
    return (
        <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
            <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="h6" color={isError ? "error" : "primary"}>
                    {title}
                </Typography>
                <IconButton onClick={onClose}>
                    <CloseIcon />
                </IconButton>
            </DialogTitle>
            <DialogContent>
                <Typography sx={{ mt: 1, mb: 2 }}>{message}</Typography>
            </DialogContent>
            <DialogActions>
                {onConfirm && (
                    <Button onClick={onConfirm} color="primary" variant="contained" sx={{ textTransform: 'none' }}>
                        {confirmButtonText}
                    </Button>
                )}
                <Button onClick={onClose} color="primary" variant="outlined" sx={{ textTransform: 'none' }}>
                    Close
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default CommonDialog;
