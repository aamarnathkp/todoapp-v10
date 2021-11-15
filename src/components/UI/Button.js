import React from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import LoadingButton from "@mui/lab/LoadingButton";

const button = createTheme({
    components: {
        MuiLoadingButton: {
            styleOverrides: {
                root: {
                    backgroundColor: "#8afffffa !important",
                    color: "#000000",
                    height: "24px",
                    "&:hover": {
                        backgroundColor: "aqua !important",
                    },
                },
            },
        },
    },
});

const Button = ({ component, label, onClick, type, disabled = false }) => {
    return (
        <ThemeProvider theme={button}>
            <LoadingButton
                endIcon={component}
                // loading={loading}
                // small
                loadingPosition='end'
                onClick={onClick}
                type={type}
                disabled={disabled}
                variant='contained'>
                {label}
            </LoadingButton>
        </ThemeProvider>
    );
};

export default Button;
