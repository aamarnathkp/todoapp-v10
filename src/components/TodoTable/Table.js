import React, { useState } from "react";
import { useSelector } from "react-redux";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import { todoDelete } from "../../stores/todoSlice";
import Button from "../UI/Button";
import TodoModal from "../UI/TodoModal";

const columns = [
    { id: "name", label: "TASK NAME", minWidth: 100 },
    { id: "description", label: "DESCRIPTION", minWidth: 170 },
    { id: "status", label: "STATUS", minWidth: 100 },
    { id: "actions", label: "ACTIONS", minWidth: 100, align: "center" },
];

const theme = createTheme({
    components: {
        MuiTableRow: {
            styleOverrides: {
                root: {
                    "&:hover": {
                        backgroundColor: "#8afffffa !important",
                    },
                },
            },
        },
    },
});

const TodoTable = () => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [modalOpen, setModalOpen] = useState(false);
    const [delTodoUuid, setDelTodoUuid] = useState("");
    const rows = useSelector((state) => state.todo.todos);
    const dispatch = useDispatch();
    const history = useHistory();

    const handleClose = () => setModalOpen(false);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const onDeleteHandler = (todoId) => {
        dispatch(todoDelete(todoId));
        setModalOpen(false);
    };

    const onDeleteModalHandler = (uuid) => {
        setModalOpen(true);
        setDelTodoUuid(uuid);
    };

    const onDeleteCancel = () => {
        setDelTodoUuid("");
        setModalOpen(false);
    };

    const onModifyHandler = (row) => {
        history.push({
            pathname: "/modify",
            state: row,
        });
    };

    let tableHeadings = (
        <TableRow>
            {columns.map((column) => (
                <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}>
                    {column.label}
                </TableCell>
            ))}
        </TableRow>
    );

    const sortRowsOnStatus = (rows) => {
        let rowsU = [...rows];
        let ordering = {};
        let sortOrder = ["Pending", "Progress", "Completed"];
        for (let i = 0; i < sortOrder.length; i++) ordering[sortOrder[i]] = i;
        return rowsU.sort((a, b) => {
            return ordering[a.status] - ordering[b.status];
        });
    };

    let tableRowsPerPage = sortRowsOnStatus(rows).slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
    );

    let tableBody = tableRowsPerPage.map((row) => {
        return (
            <ThemeProvider theme={theme}>
                <TableRow hover role='checkbox' tabIndex={-1} key={row.code}>
                    {columns.map((column) => {
                        const value = row[column.id];
                        return (
                            <TableCell key={column.id} align={column.align}>
                                {column.id === "actions" ? (
                                    <div className='TodoModifyActions'>
                                        <Button
                                            component={<ModeEditIcon />}
                                            onClick={() => onModifyHandler(row)}
                                            label='Edit'></Button>
                                        <Button
                                            component={<DeleteForeverIcon />}
                                            onClick={() =>
                                                onDeleteModalHandler(row.uuid)
                                            }
                                            label='Delete'></Button>
                                    </div>
                                ) : (
                                    value
                                )}
                            </TableCell>
                        );
                    })}
                </TableRow>
            </ThemeProvider>
        );
    });

    return (
        <Paper sx={{ width: "90%", overflow: "hidden" }}>
            <TodoModal
                open={modalOpen}
                onClose={handleClose}
                onSuccess={() => onDeleteHandler(delTodoUuid)}
                onCancel={onDeleteCancel}
            />
            <TableContainer sx={{ maxHeight: 480 }}>
                <Table stickyHeader aria-label='sticky table'>
                    <TableHead>{tableHeadings}</TableHead>
                    <TableBody>{tableBody}</TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component='div'
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Paper>
    );
};

export default TodoTable;
