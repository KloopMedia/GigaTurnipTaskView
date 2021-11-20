import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import {TextField} from "@mui/material";

type DialogProps = {
    open: boolean,
    reason: string,
    handleExclude: () => void,
    handleClose: () => void,
    handleReasonChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
}

const IntegratedTaskDialog = (props: DialogProps) => {
    const {open, reason, handleReasonChange, handleExclude, handleClose} = props;
    return (
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                Reason for removal.
            </DialogTitle>
            <DialogContent>
                {/*<DialogContentText id="alert-dialog-description">*/}
                {/*    */}
                {/*</DialogContentText>*/}
                <TextField
                    id="outlined-multiline-static"
                    margin="normal"
                    label={"Reason"}
                    value={reason}
                    onChange={handleReasonChange}
                    multiline
                    rows={4}
                    fullWidth
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={handleExclude} autoFocus>
                    Yes, Remove
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default IntegratedTaskDialog