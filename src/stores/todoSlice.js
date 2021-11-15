import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    todos: [],
    task_types: { Pending: 0, Progress: 0, Completed: 0 },
    total: 0,
};

const todoSlice = createSlice({
    name: "todo",
    initialState,
    reducers: {
        todoAdd(state, action) {
            let total = state.total;
            let status = action.payload.status;
            state.todos.push(action.payload);
            state.total = total + 1;
            state.task_types[status] = state.task_types[status] + 1;
        },
        todoDelete(state, action) {
            const todoId = action.payload;
            const todosIndex = state.todos.findIndex(
                ({ uuid }) => uuid === todoId
            );
            const deletedTodo = state.todos[todosIndex];
            const todosU = [...state.todos];
            todosU.splice(todosIndex, 1);
            state.total = state.total - 1;
            state.todos = todosU;
            state.task_types[deletedTodo.status] =
                state.task_types[deletedTodo.status] - 1;
        },
        todoModify(state, action) {
            console.log("uuid ", action.payload);
            let oldStatus = "";
            let newStatus = "";
            const modifiedTodos = state.todos.map((todo) => {
                if (todo.uuid === action.payload?.uuid) {
                    oldStatus = todo.status;
                    newStatus = action.payload.status;
                    return {
                        ...todo,
                        name: action.payload.name,
                        description: action.payload.description,
                        status: action.payload.status,
                    };
                }
                return todo;
            });
            state.todos = modifiedTodos;
            if (oldStatus !== newStatus) {
                state.task_types[newStatus] = state.task_types[newStatus] + 1;
                state.task_types[oldStatus] = state.task_types[oldStatus] - 1;
            }
        },
    },
});

export const { todoAdd, todoDelete, todoModify } = todoSlice.actions;

export default todoSlice.reducer;
