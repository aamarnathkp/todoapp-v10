import React from "react";

import "./TodoApp.css";
import TodoBody from "../../components/TodoBody/TodoBody";
import TodoHeader from "../../components/TodoHeader/Header";

const TodoApp = () => {
    return (
        <div className='todoapp'>
            <TodoHeader />
            <TodoBody />
        </div>
    );
};

export default TodoApp;
