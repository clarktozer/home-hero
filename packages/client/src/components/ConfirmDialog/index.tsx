import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle
} from "@material-ui/core";
import React, { FC } from "react";
import { ConfirmDialogProps } from "./types";

export const ConfirmDialog: FC<ConfirmDialogProps> = ({
    children,
    onClose,
    onConfirm,
    isOpen,
    title
}) => (
    <Dialog onClose={onClose} open={isOpen}>
        <DialogTitle>{title}</DialogTitle>
        {children && <DialogContent>{children}</DialogContent>}
        <DialogActions>
            <Button onClick={onClose} color="primary" variant="contained">
                Cancel
            </Button>
            <Button
                onClick={onConfirm}
                color="primary"
                variant="contained"
                autoFocus
            >
                Yes
            </Button>
        </DialogActions>
    </Dialog>
);
