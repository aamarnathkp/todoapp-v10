import React from "react";

import "./TaskStatus.css";

const TaskStatus = ({ count, taskname }) => {
    return (
        <div className='TaskStatusContainer'>
            <div className='TaskStatusCount'>{count}</div>
            <p className='TaskStatusName'>{taskname}</p>
        </div>
    );
};

export default TaskStatus;
