import React from "react";
import AddTaskIcon from "@mui/icons-material/AddTask";
import LoadingButton from "@mui/lab/LoadingButton";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { useHistory } from "react-router-dom";

import "./TodoBody.css";
import TodoTable from "../TodoTable/Table";

const button = createTheme({
    components: {
        MuiLoadingButton: {
            styleOverrides: {
                root: {
                    backgroundColor: "#8afffffa !important",
                    color: "#000000",
                    "&:hover": {
                        backgroundColor: "aqua !important",
                    },
                },
            },
        },
    },
});

const TodoBody = () => {
    const history = useHistory();

    const onAdd = () => {
        history.push("/add");
    };

    return (
        <div className='TodoBody'>
            <div className='TodoAddAction'>
                <ThemeProvider theme={button}>
                    <LoadingButton
                        onClick={onAdd}
                        endIcon={<AddTaskIcon />}
                        loadingPosition='end'
                        variant='contained'>
                        ADD TASK
                    </LoadingButton>
                </ThemeProvider>
            </div>

            <TodoTable />
        </div>
    );
};

export default TodoBody;
