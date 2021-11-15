import React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "./Button";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import CancelIcon from "@mui/icons-material/Cancel";

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 500,
    bgcolor: "azure",
    border: "2px solid aqua",
    boxShadow: 24,
    borderRadius: 8,
    p: 4,
};

export default function TodoModal({ open, onClose, onSuccess, onCancel }) {
    return (
        <div>
            <Modal
                open={open}
                onClose={onClose}
                aria-labelledby='modal-modal-title'
                aria-describedby='modal-modal-description'>
                <Box sx={style}>
                    <h2>Do you want to delete this task?</h2>
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "space-evenly",
                            alignItems: "center",
                            width: "100%",
                        }}>
                        <Button
                            component={<DeleteForeverIcon />}
                            onClick={onSuccess}
                            label='Delete'></Button>
                        <Button
                            component={<CancelIcon />}
                            onClick={onCancel}
                            label='Clear'></Button>
                    </div>
                </Box>
            </Modal>
        </div>
    );
}
