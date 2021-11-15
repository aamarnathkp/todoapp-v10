import React from "react";
import { useSelector } from "react-redux";

import "./Header.css";
import TaskStatus from "./TaskStatus";

const TodoHeader = () => {
    const total = useSelector((state) => state.todo.total);
    const pending = useSelector((state) => state.todo.task_types["Pending"]);
    const progress = useSelector((state) => state.todo.task_types["Progress"]);
    const completed = useSelector(
        (state) => state.todo.task_types["Completed"]
    );

    return (
        <div className='TodoHeader'>
            <div className='TodoAppName'>
                <h1>Todo List APP</h1>
            </div>
            <div className='TodoAppStatus'>
                <TaskStatus count={total} taskname='Total Tasks' />
                <TaskStatus count={pending} taskname='Pending Tasks ' />
                <TaskStatus count={progress} taskname='Progress Tasks' />
                <TaskStatus count={completed} taskname='Completed Tasks' />
            </div>
        </div>
    );
};

export default TodoHeader;
